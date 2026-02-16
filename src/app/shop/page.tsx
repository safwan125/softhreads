import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/shopify";

export const dynamic = 'force-dynamic';

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = q || "";
    const products = await getProducts(20, query);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-primary">
                {query ? `Search Results for "${query}"` : "All Products"}
            </h1>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg text-secondary">No products found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
