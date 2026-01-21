import { client } from './wordpress';
import { gql } from 'graphql-request';
import { Product } from './wordpress';

export interface CartData {
    items: {
        key: string;
        product: {
            node: {
                id: string; // Global ID
                databaseId: number;
                name: string;
                slug: string;
                image: { sourceUrl: string };
                price: string; // Formatted price
            }
        };
        quantity: number;
        variation?: {
            node: {
                id: string;
                name: string;
                price: string; // Formatted variation price
                attributes: {
                    nodes: {
                        name: string;
                        value: string;
                    }[]
                }
            }
        }
    }[];
    total: string;
}

// Fetch the Cart
export const getCart = async (token?: string): Promise<CartData | null> => {
    const query = gql`
        query GetCart {
            cart {
                contents {
                    nodes {
                        key
                        quantity
                        product {
                            node {
                                id
                                databaseId
                                name
                                slug
                                image {
                                    sourceUrl
                                }
                                ... on SimpleProduct {
                                    price
                                }
                                ... on VariableProduct {
                                    price
                                }
                            }
                        }
                        variation {
                            node {
                                id
                                name
                                price
                                attributes {
                                    nodes {
                                        name
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
                total
            }
        }
    `;

    try {
        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const data: any = await client.request(query, {}, headers);
        if (!data?.cart?.contents?.nodes) return null;

        return {
            items: data.cart.contents.nodes,
            total: data.cart.total
        };
    } catch (e) {
        console.warn("Fetch Cart Error (will retry if possible):", e);
        return null;
    }
};

// Add Item to Cart
export const addCartItem = async (productId: number, quantity: number = 1, variationId?: number, token?: string) => {
    const mutation = gql`
        mutation AddToCart($productId: Int!, $quantity: Int!, $variationId: Int) {
            addToCart(input: {productId: $productId, quantity: $quantity, variationId: $variationId, clientMutationId: "uuid"}) {
                cart {
                    contents {
                        nodes {
                            key
                            product {
                                node {
                                    name
                                }
                            }
                            quantity
                        }
                    }
                }
            }
        }
    `;

    try {
        console.log('[API] addCartItem called', { productId, quantity, variationId, hasToken: !!token });
        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        // Note: If using variation, productId often refers to parent, but mutation generally needs productId. 
        // For variable products, usually you need to pass variationId.
        const variables = variationId
            ? { productId, quantity, variationId }
            : { productId, quantity };

        const data: any = await client.request(mutation, variables as any, headers);
        console.log('[API] addCartItem success', data);
        return data?.addToCart?.cart;
    } catch (e) {
        console.error("Add to Cart Error:", e);
        throw e;
    }
};

// Update Item Quantity
export const updateCartItemQuantum = async (key: string, quantity: number, token?: string) => {
    const mutation = gql`
        mutation UpdateCartItem($key: ID!, $quantity: Int!) {
            updateItemQuantities(input: {items: [{key: $key, quantity: $quantity}], clientMutationId: "uuid"}) {
                cart {
                    contents {
                        nodes {
                            key
                            quantity
                        }
                    }
                }
            }
        }
    `;
    try {
        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        await client.request(mutation, { key, quantity }, headers);
    } catch (e) {
        console.error("Update Cart Item Error:", e);
    }
}

// Remove Item
export const removeCartItem = async (keys: string[], token?: string) => {
    const mutation = gql`
        mutation RemoveCartItem($keys: [ID]!) {
            removeItemsFromCart(input: {keys: $keys, clientMutationId: "uuid"}) {
                 cart {
                    contents {
                        nodes {
                            key
                        }
                    }
                }
            }
        }
    `;
    try {
        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        await client.request(mutation, { keys }, headers);
    } catch (e) {
        console.error("Remove Cart Item Error:", e);
    }
}

// Clear Cart
export const clearCartAPI = async (token?: string): Promise<boolean> => {
    const mutation = gql`
        mutation EmptyCart {
            emptyCart(input: {clientMutationId: "uuid"}) {
                cart {
                    total
                }
            }
        }
    `;
    try {
        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        await client.request(mutation, {}, headers);
        return true;
    } catch (e) {
        console.warn("Clear Cart Failed (Attempted to fix corrupt session):", e);
        return false;
    }
};
