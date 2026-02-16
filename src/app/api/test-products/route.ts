import { NextResponse } from "next/server";
import { getProducts } from "@/lib/shopify";

export async function GET() {
    try {
        const products = await getProducts(5);
        return NextResponse.json({ success: true, count: products.length, products });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 });
    }
}
