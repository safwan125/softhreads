import { GraphQLClient } from 'graphql-request';



export const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://softhreads.com/graphql';

export const client = new GraphQLClient(WORDPRESS_API_URL, {
  cache: 'no-store', // Always fetch fresh data (Auth, Cart, Mutations)
});

export const cachedClient = new GraphQLClient(WORDPRESS_API_URL, {
  next: { revalidate: 60 }, // Cache for 60 seconds (Products, Static Data)
});

// Re-export the Product interface used by the app
export interface Product {
  id: string; // Slug
  databaseId: number; // Woo ID
  name: string;
  price: number;
  salePrice?: number;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
}

export async function fetchWooCommerceProducts(category?: string, featured?: boolean, first: number = 20, search?: string): Promise<Product[]> {
  const query = `
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

  try {
    const variables: any = {
      count: first,
    };

    if (category) variables.category = category;
    if (featured !== undefined && featured !== null) variables.featured = featured;
    if (search) variables.search = search;

    console.log('[WP] Fetching Products Variables:', variables);

    const data: any = await cachedClient.request(query, variables);
    const nodes = data?.products?.nodes || [];
    console.log('[WP] Products Found:', nodes.length);

    if (nodes.length === 0) {
      console.warn('[WP] No products found in API.');
      return [];
    }

    // Transform
    const products = nodes.map((node: any) => transformWooProduct(node));
    return products;

  } catch (e) {
    console.error("WP Fetch Error:", e);
    return [];
  }
}

export async function fetchWooProduct(slug: string): Promise<Product | null> {
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id, idType: SLUG) {
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
              }
          }
      }
    }
  `;
  try {
    const data: any = await cachedClient.request(query, { id: slug });
    if (data?.product) {
      return transformWooProduct(data.product);
    }
    return null;
  } catch (e) {
    console.error("WP Fetch Single Error:", e);
    return null;
  }
}


function transformWooProduct(node: any): Product {
  // Price in Woo is string "₹1,200", need to parse
  const parsePrice = (p: string) => p ? parseFloat(p.toString().replace(/[^0-9.]/g, '')) : 0;

  const price = parsePrice(node.price || node.regularPrice || '0');
  const salePrice = node.salePrice ? parsePrice(node.salePrice) : undefined;

  // Attributes
  const colors: { name: string, hex: string }[] = [];
  const sizes: string[] = [];

  if (node.attributes?.nodes) {
    node.attributes.nodes.forEach((attr: any) => {
      if (attr.name.toLowerCase() === 'color' || attr.name.toLowerCase() === 'colors') {
        attr.options.forEach((opt: string) => {
          colors.push({ name: opt, hex: '#000000' }); // Hex needs mapping or separate mechanism
        });
      }
      if (attr.name.toLowerCase() === 'size' || attr.name.toLowerCase() === 'sizes') {
        sizes.push(...attr.options);
      }
    });
  }

  return {
    id: node.slug, // Using Slug as ID for frontend routing! Or 'databaseId' stringified. Slug is SEO friendly.
    databaseId: node.databaseId,
    name: node.name,
    price,
    salePrice,
    category: node.productCategories?.nodes?.find((c: any) => c.name !== 'Uncategorized')?.name || 'General',
    description: node.shortDescription?.replace(/<[^>]*>?/gm, '') || '', // Strip HTML
    longDescription: node.description || '', // Keep HTML for rich text rendering
    image: node.image?.sourceUrl || '/placeholder.png', // Ensure this asset exists or use a valid URL
    colors: colors.length > 0 ? colors : [{ name: 'Default', hex: '#000000' }],
    sizes: sizes.length > 0 ? sizes : ['One Size'],
    inStock: node.stockStatus === 'IN_STOCK',
    featured: node.featured || false // Try to read direct field if available, or rely on query filtering
  };
}
