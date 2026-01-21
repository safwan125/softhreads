import { fetchWooProduct } from '@/lib/wordpress';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import Link from 'next/link';



export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams; // This 'id' is actually the slug now

    const product = await fetchWooProduct(id);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl mb-4">Product Not Found</h1>
                <Link href="/shop" className="text-primary hover:underline">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return <ProductDetailClient product={product} />;
}

