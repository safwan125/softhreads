import { fetchAPI, transformProduct } from '@/lib/strapi';
import { HomeClient } from '@/components/HomeClient';
import { products as dummyProducts } from '@/data/products';

export const dynamic = 'force-dynamic'; // Ensures data is fresh

import { NewsletterPopup } from '@/components/NewsletterPopup';

export default async function Home() {
  // Fetch Featured Products
  const featuredRes = await fetchAPI("/products", {
    filters: { isFeatured: { $eq: true } },
    populate: "*"
  });

  // Fetch Sale Products (products with salePrice not null)
  const saleRes = await fetchAPI("/products", {
    filters: { salePrice: { $notNull: true } },
    populate: "*"
  });

  const featuredProducts = featuredRes?.data?.map(transformProduct) || [];
  const saleProducts = saleRes?.data?.map(transformProduct) || [];

  // Fallback to dummy data if Strapi returns nothing (e.g. during initial setup)
  const finalFeatured = featuredProducts.length > 0 ? featuredProducts : dummyProducts.filter(p => p.featured);
  const finalSale = saleProducts.length > 0 ? saleProducts : dummyProducts.filter(p => p.salePrice);

  return (
    <>
      <HomeClient featuredProducts={finalFeatured} saleProducts={finalSale} />
      <NewsletterPopup />
    </>
  );
}

