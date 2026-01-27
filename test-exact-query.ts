import { client } from './src/lib/wordpress';
import { gql } from 'graphql-request';

// EXACT query from src/lib/wordpress.ts
const query = gql`
    query GetProducts($count: Int, $category: String, $featured: Boolean, $search: String) {
      products(first: $count, where: { category: $category, featured: $featured, search: $search }) {
        nodes {
          databaseId
          slug
          name
          shortDescription
          description
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
            stockStatus
            attributes {
              nodes {
                name
                options
              }
            }
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
            stockStatus
            attributes {
              nodes {
                name
                options
              }
            }
          }
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

async function test() {
  const variables = { count: 20 };
  console.log('--- Testing FULL QUERY ---');
  try {
    const data: any = await client.request(query, variables);
    console.log('FULL NODES:', data.products.nodes.length);
    if (data.products.nodes.length > 0) {
      console.log('Sample:', JSON.stringify(data.products.nodes[0], null, 2));
    }
  } catch (e: any) {
    console.error('FULL QUERY ERROR:', JSON.stringify(e, null, 2));
  }
}

test();
