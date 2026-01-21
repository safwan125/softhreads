const { GraphQLClient, gql } = require('graphql-request');

const ENDPOINT = 'https://softhreads.com/graphql';
const client = new GraphQLClient(ENDPOINT);

const QUERY = gql`
  query DebugCats {
    productCategories(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        count
      }
    }
    products(first: 10) {
        nodes {
            name
            slug
            productCategories {
                nodes {
                    name
                    slug
                }
            }
        }
    }
  }
`;

async function run() {
    try {
        const data = await client.request(QUERY);
        console.log('Categories:', JSON.stringify(data.productCategories.nodes, null, 2));
        console.log('Sample Products:', JSON.stringify(data.products.nodes, null, 2));
    } catch (e) {
        console.error(e);
    }
}

run();
