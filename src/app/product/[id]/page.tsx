import { fetchAPI, transformProduct } from '@/lib/strapi';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { products as dummyProducts } from '@/data/products';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Fetch from Strapi by documentId or matching id filter
    // Try to fetch by documentId first (standard V5 way)
    // If id is '1', '2' etc (dummy IDs), it won't resolve as documentId (which are hashes)
    // So we try generic fetch? 
    // fetchAPI("/products/" + id)

    let product = null;

    try {
        const strapiRes = await fetchAPI(`/products/${id}`, { populate: "*" });
        if (strapiRes?.data) {
            product = transformProduct(strapiRes.data);
        }
    } catch (e) {
        // Fallback or ignore
    }

    if (!product) {
        // Try filtering by 'id' attribute if it exists (legacy id)
        // This is useful if we migrated data keeping old IDs in a custom field or just 'id' field in Strapi SQL
        // But 'id' in Strapi v5 is integer. 'documentId' is string.
        // params.id is string.
        // If params.id is '1', then /products/1 might work if '1' is integer ID?
        // Strapi V5 REST API: GET /api/products/:documentId
        // To get by ID: GET /api/products?filters[id][$eq]=1
        //    const fallbackRes = await fetchAPI("/products", { filters: { id: { $eq: id } }, populate: "*" });
        //    if (fallbackRes?.data && fallbackRes.data.length > 0) {
        //        product = transformProduct(fallbackRes.data[0]);
        //    }
    }

    // Fallback to dummy data
    if (!product) {
        product = dummyProducts.find(p => p.id === id) || null;
    }

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

