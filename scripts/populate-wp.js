const { GraphQLClient, gql } = require('graphql-request');

const ENDPOINT = 'https://softhreads.com/graphql';
const USERNAME = 'Admin';
const PASSWORD = 'oYLk1gvdTB@%p#RaQ*';

// Client for Auth
const client = new GraphQLClient(ENDPOINT);

// Temporary product data (copied from src/data/products.ts to avoid TS compilation issues in simple script)
const products = [
    {
        name: 'Classic White Tee',
        price: 45,
        salePrice: 35,
        category: 'T-Shirts',
        description: 'Premium cotton essential tee',
        image: 'https://images.unsplash.com/photo-1729864210127-0c0dc835dd78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMGFwcGFyZWx8ZW58MXx8fHwxNzY4Mjc1NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        stockStatus: 'IN_STOCK'
    },
    {
        name: 'Comfort Hoodie',
        price: 89,
        category: 'Hoodies',
        description: 'Soft fleece hoodie for everyday wear',
        image: 'https://images.unsplash.com/photo-1588011025378-15f4778d2558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMHN0cmVldHdlYXJ8ZW58MXx8fHwxNzY4Mjc2OTY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        stockStatus: 'IN_STOCK'
    },
    {
        name: 'Slim Fit Denim',
        price: 120,
        salePrice: 95,
        category: 'Jeans',
        description: 'Classic slim fit jeans',
        image: 'https://images.unsplash.com/photo-1602585198422-d795fa9bfd6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjgyNTQ5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        stockStatus: 'IN_STOCK'
    },
    {
        name: 'Summer Dress',
        price: 75,
        category: 'Dresses',
        description: 'Lightweight summer dress',
        image: 'https://images.unsplash.com/photo-1760124146284-0720713f0311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        stockStatus: 'IN_STOCK'
    }
];

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { clientMutationId: "uniqueId", username: $username, password: $password }) {
      authToken
      user {
        id
        name
      }
    }
  }
`;

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($name: String!, $description: String!, $regularPrice: String, $salePrice: String, $stockStatus: StockStatusEnum) {
    createProduct(input: {
      name: $name, 
      description: $description, 
      regularPrice: $regularPrice, 
      salePrice: $salePrice, 
      stockStatus: $stockStatus, 
      status: PUBLISH, 
      type: SIMPLE 
    }) {
      product {
        id
        databaseId
        name
      }
    }
  }
`;

async function populate() {
    console.log('Authenticating...');
    let authToken;
    try {
        const data = await client.request(LOGIN_MUTATION, { username: USERNAME, password: PASSWORD });
        authToken = data.login.authToken;
        console.log('Success! Logged in as:', data.login.user.name);
    } catch (error) {
        console.error('Login Failed:', error.response?.errors || error.message);
        return;
    }

    const authClient = new GraphQLClient(ENDPOINT, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    console.log('Creating Products...');
    for (const p of products) {
        try {
            console.log(`Creating ${p.name}...`);
            await authClient.request(CREATE_PRODUCT_MUTATION, {
                name: p.name,
                description: p.description,
                regularPrice: p.price.toString(),
                salePrice: p.salePrice ? p.salePrice.toString() : null,
                stockStatus: p.stockStatus
            });
            console.log(`✓ Created ${p.name}`);
        } catch (error) {
            console.error(`x Failed to create ${p.name}:`, error.response?.errors?.[0]?.message || error.message);
        }
    }
    console.log('Done!');
}

populate();
