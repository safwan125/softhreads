import { notFound } from "next/navigation";
import { getProduct } from "@/lib/shopify";
import ProductDetailClient from "./ProductDetailClient";

// Need to define props for Server Component behavior if we want to fetch server side
// But this file has "use client" at top, which means we can't do async server fetching directly in the component body easily without structure change.
// However, in Next.js 15, we can use `use` or just fetch in a parent.
// EASIEST FIX: Keep "use client" but fetch inside a useEffect OR make it a Server Component and put the interactive parts in a client component.
// BETTER ARCHITECTURE: Make page.tsx a Server Component that fetches data, and passes it to a ProductDetailClient component.



export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const product = await getProduct(handle);

    if (!product) {
        return notFound();
    }

    return <ProductDetailClient product={product} />;
}
