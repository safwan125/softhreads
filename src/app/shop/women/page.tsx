import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/shopify";

export const dynamic = 'force-dynamic';

export default async function WomenShop() {
    // Fetch products matching "Women" (searches title, tags, etc.)
    const womenProducts = await getProducts(50, "Women");

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Women's Collection</h1>
                <p className="text-muted-foreground mt-2">Discover elegance and comfort in our women's range.</p>
            </div>
            {womenProducts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-secondary">No products found for Women.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {womenProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
