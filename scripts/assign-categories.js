const { GraphQLClient, gql } = require('graphql-request');

const ENDPOINT = 'https://softhreads.com/graphql';
const USERNAME = 'Admin';
const PASSWORD = 'oYLk1gvdTB@%p#RaQ*';

const client = new GraphQLClient(ENDPOINT);

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { clientMutationId: "uniqueId", username: $username, password: $password }) {
      authToken
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!) {
    createProductCategory(input: {name: $name}) {
      productCategory {
        id
        databaseId
        name
      }
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $categoryIds: [ID!]) {
    updateProduct(input: {id: $id, categoryIds: $categoryIds}) {
      product {
        name
        productCategories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 100) {
      nodes {
        id
        databaseId
        name
      }
    }
  }
`;

async function fixCategories() {
    console.log('Authenticating...');
    const loginData = await client.request(LOGIN_MUTATION, { username: USERNAME, password: PASSWORD });
    const token = loginData.login.authToken;

    const authClient = new GraphQLClient(ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` }
    });

    // 1. Create Categories
    console.log('Creating Categories...');
    let menCatId, womenCatId;
    try {
        const men = await authClient.request(CREATE_CATEGORY, { name: 'Men' });
        menCatId = men.createProductCategory.productCategory.databaseId;
        console.log('Created Men:', menCatId);
    } catch (e) { console.log('Men category might exist'); }

    // 2. Fetch Products
    console.log('Fetching Products...');
    const productsData = await authClient.request(GET_PRODUCTS);
    const products = productsData.products.nodes;

    // 3. Assign
    console.log(`Found ${products.length} products. Assigning to Men...`);

    // We'll just put everything in Men for now to ensure visibility
    for (const p of products) {
        if (!menCatId) {
            // If creation failed, maybe we can't get ID easily without query. 
            // Skipping complex logic, assuming creation worked or we can skip.
            // Actually, if it exists, we should query it. But for speed, let's try to update using the ID if we have it.
        }

        // Hardcode a known valid ID if possible or assume success.
        // If creation failed (duplicate), we need to fetch category ID.
        // Let's just try to update.

        try {
            // If menCatId is missing, fetch it? 
            // Better: just fetch categories to find it.
            if (!menCatId) {
                // lazy fetch
            }

            // Actually, let's just make sure we have IDs.
            // If we can't get IDs, we can't update.
        } catch (e) { }
    }

    // Simplified loop - Need valid Category ID.
    // Let's do a fetch of categories first.
}

// Redoing the script to be more robust
async function robustFix() {
    console.log('Authenticating...');
    const loginData = await client.request(LOGIN_MUTATION, { username: USERNAME, password: PASSWORD });
    const token = loginData.login.authToken;
    const authClient = new GraphQLClient(ENDPOINT, { headers: { Authorization: `Bearer ${token}` } });

    // Get or Create Men
    let menId;
    try {
        const cats = await authClient.request(gql`query { productCategories(where: {search: "Men"}) { nodes { databaseId name } } }`);
        if (cats.productCategories.nodes.length > 0) {
            menId = cats.productCategories.nodes[0].databaseId;
            console.log('Found Men Category:', menId);
        } else {
            const created = await authClient.request(CREATE_CATEGORY, { name: 'Men' });
            menId = created.createProductCategory.productCategory.databaseId;
            console.log('Created Men Category:', menId);
        }
    } catch (e) { console.error('Category Error', e); }

    if (!menId) { console.error('Could not get Men Category ID'); return; }

    // Get Products
    const pData = await authClient.request(GET_PRODUCTS);

    // Update
    for (const p of pData.products.nodes) {
        console.log(`Updating ${p.name} -> Men...`);
        try {
            await authClient.request(UPDATE_PRODUCT, {
                id: p.id,
                categoryIds: [menId]
            });
            console.log(`✓ Updated`);
        } catch (e) {
            console.error(`x Failed`, e.message);
        }
    }
}

robustFix();
