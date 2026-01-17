import qs from "qs";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface StrapiProduct {
    id: number;
    documentId: string;
    name: string;
    description: string;
    longDescription: any; // Block rich text
    price: number;
    salePrice?: number;
    gender: string;
    category: string;
    colors: any;
    sizes: any;
    inStock: boolean;
    isFeatured: boolean;
    images: any[];
}

export interface Product {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    category: string;
    description: string;
    longDescription: string;
    image: string;
    colors: { name: string; hex: string }[];
    sizes: string[];
    inStock: boolean;
    featured?: boolean;
}

export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
    // Merge default and user options
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-store' as const,
        ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
    const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ""}`;

    // Trigger API call
    try {
        const response = await fetch(requestUrl, mergedOptions);
        if (!response.ok) {
            console.error("API Error:", response.statusText, requestUrl);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }
    return `${STRAPI_URL}${url}`;
}

export function transformProduct(strapiData: any): Product {
    // Handle specific Strapi v5 response format
    // Map Strapi Product to Frontend Product

    const imageUrl = strapiData.images && strapiData.images.length > 0
        ? getStrapiMedia(strapiData.images[0].url)
        : "/placeholder.png";

    // Flatten rich text to string if valid, otherwise empty
    // Simplified: assuming longDescription is text or basic blocks for now
    // Actually our schema said "richtext", simplified to string for frontend type 
    const longDesc = typeof strapiData.longDescription === 'string' ? strapiData.longDescription : "No description available";

    return {
        id: strapiData.documentId || strapiData.id.toString(), // Use documentId for v5
        name: strapiData.name,
        price: Number(strapiData.price),
        salePrice: strapiData.salePrice ? Number(strapiData.salePrice) : undefined,
        category: strapiData.category,
        description: strapiData.description || "",
        longDescription: longDesc,
        image: imageUrl || "",
        colors: strapiData.colors || [],
        sizes: strapiData.sizes || [],
        inStock: strapiData.inStock ?? true,
        featured: strapiData.isFeatured
    };
}
