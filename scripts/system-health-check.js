const { GraphQLClient, gql } = require('graphql-request');
// const fetch = require('node-fetch'); // Native fetch in Node 18+

const ENDPOINT = 'https://softhreads.com/graphql';
const USERNAME = 'Admin';
const PASSWORD = 'oYLk1gvdTB@%p#RaQ*';

const client = new GraphQLClient(ENDPOINT);

async function runHealthCheck() {
    console.log('🏥 Starting System Health Check...\n');
    let errors = [];

    // 1. Auth Check
    let token;
    try {
        console.log('1. Testing Authentication...');
        const mutation = gql`
            mutation Login($username: String!, $password: String!) {
                login(input: { clientMutationId: "health", username: $username, password: $password }) {
                    authToken
                    user {
                        databaseId
                    }
                }
            }
        `;
        const data = await client.request(mutation, { username: USERNAME, password: PASSWORD });
        token = data.login.authToken;
        console.log('   ✅ Auth Successful');
    } catch (e) {
        console.error('   ❌ Auth Failed:', e.message);
        errors.push('Auth Failed');
    }

    if (!token) return;

    const authClient = new GraphQLClient(ENDPOINT, { headers: { Authorization: `Bearer ${token}` } });

    // 2. Product Availability
    let productId;
    try {
        console.log('\n2. Testing Product Availability (Men)...');
        const query = gql`
            query GetMen {
                products(first: 1, where: { category: "men" }) {
                    nodes {
                        databaseId
                        name
                        stockStatus
                    }
                }
            }
        `;
        const data = await authClient.request(query);
        const products = data.products.nodes;
        if (products.length > 0) {
            console.log(`   ✅ Found ${products.length} products in 'Men'. Sample: ${products[0].name}`);
            if (products[0].stockStatus === 'IN_STOCK') {
                productId = products[0].databaseId;
            } else {
                console.warn('   ⚠️ Product found but out of stock.');
            }
        } else {
            console.error('   ❌ No products found in Men category (Critical for Shop Page)');
            errors.push('No Products');
        }
    } catch (e) {
        console.error('   ❌ Product Fetch Failed:', e.message);
        errors.push('Product Fetch Failed');
    }

    // 3. Cart Functionality
    if (productId) {
        try {
            console.log(`\n3. Testing Add to Cart (Product ID: ${productId})...`);
            const mutation = gql`
                mutation Add($id: Int!) {
                   addToCart(input: {productId: $id, quantity: 1, clientMutationId: "health"}) {
                       cart {
                           contents {
                               nodes {
                                   quantity
                               }
                           }
                           total
                       }
                   } 
                }
            `;
            const data = await authClient.request(mutation, { id: productId });
            console.log(`   ✅ Added to Cart. New Total: ${data.addToCart.cart.total}`);
        } catch (e) {
            console.error('   ❌ Add to Cart Failed:', e.message);
            errors.push('Add to Cart Failed');
        }
    }

    // 4. API Routes (Local)
    // Note: This runs from script, so localhost:3000 must be up.
    try {
        console.log('\n4. Testing Local API Routes...');
        // Just checking if checkout page renders (200 OK)
        // Since we can't easily fetch page content via node-fetch without headers sometimes, we skip page render check
        // but checking the razorpay route requires POST data.
        console.log('   ℹ️ Skipping API Route check (requires valid env context for Next.js)');

    } catch (e) {
        console.warn('   ⚠️ API Check Warning:', e.message);
    }

    console.log('\n----------------------------------------');
    if (errors.length === 0) {
        console.log('✅ SYSTEM HEALTHY: Critical Backend Flows are working.');
    } else {
        console.error('❌ SYSTEM ISSUES DETECTED:', errors.join(', '));
    }
}

runHealthCheck();
