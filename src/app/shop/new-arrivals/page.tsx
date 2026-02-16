import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/shopify";

export const dynamic = 'force-dynamic';

export default async function NewArrivalsPage() {
    // In a real app, you'd pass a sortKey: 'CREATED_AT' or similar
    const products = await getProducts(12);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-2 text-primary">New Arrivals</h1>
            <p className="text-secondary mb-8">Check out the latest additions to our collection.</p>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg text-secondary">Loading new products...</p>
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
