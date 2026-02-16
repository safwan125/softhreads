import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/shopify";

export const dynamic = 'force-dynamic';

export default async function SalePage() {
    // In a real app, you'd query for products with 'compareAtPrice' > 'price'
    const products = await getProducts(12);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-2 text-primary">Sale</h1>
            <p className="text-secondary mb-8">Great deals on premium styles.</p>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg text-secondary">No items on sale right now.</p>
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
