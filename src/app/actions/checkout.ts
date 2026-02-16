"use server";

import { createCart } from "@/lib/shopify";
import { redirect } from "next/navigation";

export async function processCheckout(cartItems: any[], customerAccessToken?: string) {
    if (!cartItems || cartItems.length === 0) {
        return { error: "Cart is empty" };
    }

    try {
        // Map cart items to Shopify format
        // Note: Check if 'id' is a valid merchandise ID (gid://shopify/ProductVariant/...)
        // If it's a raw number or string like '123', we might need to prefix it, but our app likely stores full IDs or handles if mock.
        // For real integration, we assume cartItems have correct variant IDs.

        const lines = cartItems.map((item) => ({
            merchandiseId: item.id, // Ensure this is the Variant ID
            quantity: item.quantity,
        }));

        const cart = await createCart(lines, customerAccessToken);

        if (cart && cart.checkoutUrl) {
            return { url: cart.checkoutUrl };
        } else {
            return { error: "Failed to generate checkout URL" };
        }

    } catch (error: any) {
        console.error("Checkout Process Error:", error);
        console.error("Error Stack:", error.stack);
        return { error: error.message || "Something went wrong during checkout initialization." };
    }
}
