import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/shopify";

export const dynamic = 'force-dynamic';

export default async function MenShop() {
    // Fetch products matching "Men"
    const menProducts = await getProducts(50, "Men");

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Men's Collection</h1>
                <p className="text-muted-foreground mt-2">Elevate your style with our premium men's clothing.</p>
            </div>
            {menProducts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-secondary">No products found for Men.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {menProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
