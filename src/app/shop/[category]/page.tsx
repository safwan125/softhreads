import { fetchWooCommerceProducts } from '@/lib/wordpress';
import { ShopCategoryClient } from '@/components/ShopCategoryClient';



export default async function ShopCategory({ params }: { params: Promise<{ category: string }> }) {
    const resolvedParams = await params;
    const { category } = resolvedParams;

    // Filter by Gender/Category based on URL param
    // We pass the category slug directly to our WP helper
    const products = await fetchWooCommerceProducts(category, undefined, 20);

    return <ShopCategoryClient products={products} categorySlug={category} />;
}

