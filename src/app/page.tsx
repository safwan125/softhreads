import { fetchWooCommerceProducts } from '@/lib/wordpress';
import { HomeClient } from '@/components/HomeClient';



import { NewsletterPopup } from '@/components/NewsletterPopup';

export default async function Home() {
  // Fetch Featured Products from WooCommerce
  // If no products are explicitly marked "featured", we fallback to just the latest products so the carousel isn't empty.
  let featuredProducts = await fetchWooCommerceProducts(undefined, true, 4);
  const allProducts = await fetchWooCommerceProducts(undefined, undefined, 8);

  if (featuredProducts.length === 0 && allProducts.length > 0) {
    featuredProducts = allProducts.slice(0, 4);
  }

  // Fetch Generic Products for "Sale" section (simulated by filtering or just showing latest)
  // Real WooGraphQL would allow specific query for onSale: true
  // For now, if no products are on sale, we show random products to keep the section alive or hide it if strictly needed.
  // The user wants "visuals restore", which implies showing *something*.
  const saleProducts = allProducts.filter(p => p.salePrice !== undefined && p.salePrice < p.price);

  return (
    <>
      <HomeClient
        featuredProducts={featuredProducts}
        saleProducts={saleProducts.length > 0 ? saleProducts : allProducts.slice(0, 4)} // Fallback for sale section too
      />
      <NewsletterPopup />
    </>
  );
}

