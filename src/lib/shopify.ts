// src/lib/shopify.ts

let cachedAdminToken: string | null = null;
let adminTokenExpiresAt = 0;

let cachedStorefrontToken: string | null = null;

// 1. Get Admin API Access Token (for internal use only)
async function getAdminAccessToken() {
    if (cachedAdminToken && Date.now() < adminTokenExpiresAt) {
        return cachedAdminToken;
    }

    const domain = process.env.SHOPIFY_DOMAIN;
    const clientId = process.env.SHOPIFY_CLIENT_ID;
    const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

    if (!domain || !clientId || !clientSecret) {
        throw new Error("Missing Shopify environment variables");
    }

    try {
        const res = await fetch(
            `https://${domain}/admin/oauth/access_token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: "client_credentials",
                }),
            }
        );

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Shopify Admin Token Error:", errorText);
            throw new Error(`Failed to get Shopify Admin access token: ${res.status}`);
        }

        const data = await res.json();
        cachedAdminToken = data.access_token;
        // Expires logic
        if (data.expires_in) {
            adminTokenExpiresAt = Date.now() + data.expires_in * 1000 - 60000;
        } else {
            adminTokenExpiresAt = Date.now() + 3600 * 1000;
        }

        return cachedAdminToken;
    } catch (error) {
        console.error("Error fetching Shopify Admin token:", error);
        throw error;
    }
}

// 2. Generate Storefront Access Token using Admin API
async function getStorefrontAccessToken() {
    // 1. Prefer Static Token from Env (Best Practice)
    if (process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
        console.log("✅ Using Static Storefront Token from Env");
        return process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    } else {
        console.log("⚠️ No Static Token found in Env, attempting dynamic generation...");
    }

    if (cachedStorefrontToken) return cachedStorefrontToken;

    const adminToken = await getAdminAccessToken();
    const domain = process.env.SHOPIFY_DOMAIN;
    const version = "2024-01"; // Using stable 2024-01 for admin ops

    // Mutation to create a storefront token
    const mutation = `
        mutation storefrontAccessTokenCreate($input: StorefrontAccessTokenInput!) {
            storefrontAccessTokenCreate(input: $input) {
                storefrontAccessToken {
                    accessToken
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    try {
        const res = await fetch(`https://${domain}/admin/api/${version}/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": adminToken!,
            },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    input: {
                        title: "Softhreads Web Storefront"
                    }
                }
            })
        });

        if (!res.ok) {
            const txt = await res.text();
            console.error("Admin API Error (Storefront Token Creation):", txt);
            throw new Error(`Failed to create Storefront Token via Admin API: ${res.status}`);
        }

        const json = await res.json();

        if (json.data?.storefrontAccessTokenCreate?.userErrors?.length > 0) {
            console.error("Storefront Token User Errors:", json.data.storefrontAccessTokenCreate.userErrors);
            throw new Error("Shopify refused to create Storefront Token");
        }

        const newToken = json.data?.storefrontAccessTokenCreate?.storefrontAccessToken?.accessToken;

        // If token is null, it might mean one already exists or permission issue. 
        // But usually this mutation returns a new token.
        // If it fails, we might need to query existing tokens. 
        // For now, assume success.

        if (!newToken) {
            console.error("Full JSON format:", JSON.stringify(json, null, 2));
            throw new Error("No access token returned from creation mutation");
        }

        cachedStorefrontToken = newToken;
        return cachedStorefrontToken;

    } catch (error) {
        console.error("Failed to generate Storefront Access Token:", error);
        throw error;
    }
}

// 3. Public Fetch Function
export async function storefrontFetch<T>(
    query: string,
    variables: Record<string, any> = {}
): Promise<T> {
    const token = await getStorefrontAccessToken();

    if (!token) throw new Error("No Storefront token available");

    const domain = process.env.SHOPIFY_DOMAIN;
    const version = process.env.SHOPIFY_API_VERSION || "2024-01";

    const res = await fetch(
        `https://${domain}/api/${version}/graphql.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({ query, variables }),
        }
    );

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Storefront API Error Details:", {
            status: res.status,
            statusText: res.statusText,
            url: res.url,
            errorText
        });
        throw new Error(`Storefront API request failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    if (json.errors) {
        console.error("GraphQL Errors:", JSON.stringify(json.errors, null, 2));
        throw new Error(json.errors[0].message || "GraphQL Error");
    }

    return json;
}

// 4. Create Cart and Get Checkout URL
export async function createCart(lines: { merchandiseId: string; quantity: number }[], customerAccessToken?: string) {
    const mutation = `
        mutation cartCreate($input: CartInput) {
            cartCreate(input: $input) {
                cart {
                    checkoutUrl
                    id
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const input: any = {
        lines: lines.map(l => ({
            merchandiseId: l.merchandiseId,
            quantity: l.quantity
        }))
    };

    if (customerAccessToken) {
        input.buyerIdentity = { customerAccessToken };
    }

    // Ensure we are calling the generic storefrontFetch
    // @ts-ignore - straightforward call
    const res = await storefrontFetch<{
        data: {
            cartCreate: {
                cart: {
                    checkoutUrl: string;
                    id: string;
                } | null;
                userErrors: { field: string; message: string }[];
            };
        };
    }>(mutation, { input });

    if (res.data?.cartCreate?.userErrors?.length && res.data.cartCreate.userErrors.length > 0) {
        throw new Error(res.data.cartCreate.userErrors[0].message);
    }

    if (!res.data?.cartCreate?.cart) {
        throw new Error("Failed to create cart: No cart returned");
    }

    return res.data.cartCreate.cart;
}

// 5. Fetch Products (Simple + Search)
export async function getProducts(first = 8, query?: string) {
    const gqlQuery = `
        query getProducts($first: Int!, $query: String) {
            products(first: $first, query: $query) {
                edges {
                    node {
                        id
                        title
                        handle
                        description
                        priceRange {
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                        images(first: 1) {
                            edges {
                                node {
                                    url
                                    altText
                                }
                            }
                        }
                        variants(first: 1) {
                            edges {
                                node {
                                    id
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const res = await storefrontFetch<{ data: { products: { edges: { node: any }[] } } }>(gqlQuery, { first, query });

    // Map to simpler format for UI
    return res.data.products.edges.map(({ node }: any) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        price: parseFloat(node.priceRange.minVariantPrice.amount),
        currency: node.priceRange.minVariantPrice.currencyCode,
        image: node.images.edges[0]?.node.url || "",
        variantId: node.variants.edges[0]?.node.id, // Important for checkout
    }));
}

// 6. Fetch Single Product by Handle
export async function getProduct(handle: string) {
    const gqlQuery = `
        query getProduct($handle: String!) {
            product(handle: $handle) {
                id
                title
                handle
                description
                priceRange {
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                }
                images(first: 5) {
                    edges {
                        node {
                            url
                            altText
                        }
                    }
                }
                variants(first: 10) {
                    edges {
                        node {
                            id
                            title
                            price {
                                amount
                            }
                        }
                    }
                }
            }
        }
    `;

    const res = await storefrontFetch<{ data: { product: any } }>(gqlQuery, { handle });

    const node = res.data.product;
    if (!node) return null;

    return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        price: parseFloat(node.priceRange.minVariantPrice.amount),
        compareAtPrice: null, // Shopify basic query doesn't always strictly return this unless requested on variant, simplifying for now
        currency: node.priceRange.minVariantPrice.currencyCode,
        image: node.images.edges[0]?.node.url || "",
        images: node.images.edges.map((e: any) => e.node.url),
        variants: node.variants.edges.map((e: any) => ({
            id: e.node.id,
            title: e.node.title,
            price: parseFloat(e.node.price.amount)
        })),
        variantId: node.variants.edges[0]?.node.id, // Default variant
    };
}

// 7. Customer API
export async function createCustomer(email: string, password: string, firstName: string, lastName: string) {
    const mutation = `
        mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
                customer {
                    id
                    email
                    firstName
                    lastName
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const res = await storefrontFetch<{ data: { customerCreate: { customer: any; userErrors: any[] } } }>(mutation, {
        input: { email, password, firstName, lastName }
    });

    if (res.data?.customerCreate?.userErrors?.length > 0) {
        throw new Error(res.data.customerCreate.userErrors[0].message);
    }

    return res.data.customerCreate.customer;
}

// Create Access Token (Login)
export async function createCustomerAccessToken(email: string, password: string) {
    const mutation = `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
                customerAccessToken {
                    accessToken
                    expiresAt
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const res = await storefrontFetch<{ data: { customerAccessTokenCreate: { customerAccessToken: any; userErrors: any[] } } }>(mutation, {
        input: { email, password }
    });

    if (res.data?.customerAccessTokenCreate?.userErrors?.length > 0) {
        throw new Error(res.data.customerAccessTokenCreate.userErrors[0].message);
    }

    return res.data.customerAccessTokenCreate.customerAccessToken;
}

// Get Customer Details (with Orders)
export async function getCustomer(accessToken: string) {
    const query = `
        query getCustomer($customerAccessToken: String!) {
            customer(customerAccessToken: $customerAccessToken) {
                id
                firstName
                lastName
                email
                orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
                    edges {
                        node {
                            id
                            orderNumber
                            processedAt
                            financialStatus
                            fulfillmentStatus
                            totalPrice {
                                amount
                                currencyCode
                            }
                            lineItems(first: 5) {
                                edges {
                                    node {
                                        title
                                        quantity
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const res = await storefrontFetch<{ data: { customer: any } }>(query, { customerAccessToken: accessToken });
    return res.data.customer;
}

// Recover Password
export async function recoverCustomerPassword(email: string) {
    const mutation = `
        mutation customerRecover($email: String!) {
            customerRecover(email: $email) {
                customerUserErrors {
                    field
                    message
                }
            }
        }
    `;

    const res = await storefrontFetch<{ data: { customerRecover: { customerUserErrors: any[] } } }>(mutation, { email });

    if (res.data?.customerRecover?.customerUserErrors?.length > 0) {
        throw new Error(res.data.customerRecover.customerUserErrors[0].message);
    }

    return true;
}

// Associate Cart with Customer
export async function associateCartWithCustomer(cartId: string, accessToken: string) {
    const mutation = `
        mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
            cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
                cart {
                    id
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const res = await storefrontFetch<{ data: { cartBuyerIdentityUpdate: { cart: any; userErrors: any[] } } }>(mutation, {
        cartId,
        buyerIdentity: {
            customerAccessToken: accessToken
        }
    });

    if (res.data?.cartBuyerIdentityUpdate?.userErrors?.length > 0) {
        // Log but don't crash, cart association failure is non-fatal usually
        console.error("Cart Association Error:", res.data.cartBuyerIdentityUpdate.userErrors);
    }

    return res.data.cartBuyerIdentityUpdate.cart;
}
