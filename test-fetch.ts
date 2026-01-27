import { fetchWooCommerceProducts, WORDPRESS_API_URL } from './src/lib/wordpress';

// Manually set env if needed, or rely on hardcoded fallback in wordpress.ts if present
// But wait, wordpress.ts imports process.env.
// Let's mock process.env before import? No, imports happen first.
// Actually, wordpress.ts has: 
// export const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://softhreads.com/graphql';
// So it should default correctly.

async function testLogic() {
  console.log('Testing fetchWooCommerceProducts logic...');
  console.log('API URL being used:', WORDPRESS_API_URL);

  try {
    const products = await fetchWooCommerceProducts();
    console.log('Product Count:', products.length);
    if (products.length > 0) {
      console.log('First Product:', JSON.stringify(products[0], null, 2));
    } else {
      console.log('Result: Empty Array');
    }
  } catch (e: any) {
    console.error('Test Failed:', e);
  }
}

testLogic();
