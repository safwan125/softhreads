
import { MetadataRoute } from "next";
import { getProducts } from "@/lib/shopify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://softhreads.com";

    // Static routes
    const routes = [
        "",
        "/shop",
        "/shop/men",
        "/shop/women",
        "/about",
        "/contact",
        "/legal/privacy",
        "/legal/terms",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
    }));

    // Dynamic routes (Products)
    let products: any[] = [];
    try {
        products = await getProducts(100);
    } catch (error) {
        console.error("Sitemap generation error:", error);
    }

    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/product/${product.handle}`,
        lastModified: new Date().toISOString(),
    }));

    return [...routes, ...productRoutes];
}
