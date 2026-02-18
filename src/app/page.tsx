import HeroCarousel from "@/components/home/HeroCarousel";
import ProductCard from "@/components/product/ProductCard";
import FabricPhilosophy from "@/components/home/FabricPhilosophy";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/shopify";

export const dynamic = 'force-dynamic'; // Ensure we don't cache stale data while dev

export default async function Home() {
  // Fetch real products from Shopify
  let products: any[] = [];
  try {
    products = await getProducts(8);
  } catch (e) {
    console.error("Failed to fetch products:", e);
    // Fallback to empty or error state if needed, but UI will just show empty grid
  }

  // Basic filtering (logic can be improved with collections later)
  const featuredProducts = products.slice(0, 4);
  const saleProducts = products.slice(4, 8); // Just taking next batch as sale for now

  return (
    <div className="min-h-screen bg-bg text-primary pb-20">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <HeroCarousel />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Featured Collection</h2>
          <Link href="/shop">
            <Button variant="ghost" className="hidden md:flex gap-2 text-secondary hover:text-primary">View All <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-10 text-secondary">
            <p>Loading products or no products found...</p>
            <p className="text-xs mt-2">Check console if API is failing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/shop">
            <Button variant="outline" className="gap-2 w-full rounded-xl shadow-neu-sm bg-bg text-primary border-none">View All Products</Button>
          </Link>
        </div>
      </section>

      {/* Sale Banner or Section */}
      <section className="bg-secondary/10 py-16 my-8 shadow-neu-inset rounded-3xl mx-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary font-serif">New Arrivals</h2>
              <p className="text-secondary">Fresh looks just for you.</p>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="hidden md:flex gap-2 text-secondary hover:text-primary">View More <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {saleProducts.length > 0 ? (
              saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-secondary">Check back soon for new arrivals!</p>
            )}
          </div>
        </div>
      </section>

      {/* Fabric Philosophy Section */}
      <FabricPhilosophy />

    </div>
  );
}
