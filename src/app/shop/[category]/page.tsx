import { fetchAPI, transformProduct } from '@/lib/strapi';
import { ShopCategoryClient } from '@/components/ShopCategoryClient';
import { products as dummyProducts } from '@/data/products';

export const dynamic = 'force-dynamic';

export default async function ShopCategory({ params }: { params: Promise<{ category: string }> }) {
    const resolvedParams = await params;
    const { category } = resolvedParams;

    // Filter by Gender (Men, Women, Kids) based on URL param
    // Strapi filter needs exact match on 'gender' enum (Men, Women, Kids, Unisex)
    // Map param to Title Case
    const genderFilter = category.charAt(0).toUpperCase() + category.slice(1);

    const strapiRes = await fetchAPI("/products", {
        filters: { gender: { $eq: genderFilter } },
        populate: "*"
    });

    let products = strapiRes?.data?.map(transformProduct) || [];

    // Fallback logic for dummy data if Strapi is empty (or failed)
    // NOTE: Dummy data doesn't have gender field, so this fallback might return ALL dummy products
    // We can simulate gender support if we had it, but here we just return them all or none.
    if (products.length === 0) {
        // Just empty, or show dummy if you really want to verify UI
        // products = dummyProducts; // Uncomment to show all dummy products as fallback
    }

    return <ShopCategoryClient products={products} categorySlug={category} />;
}

