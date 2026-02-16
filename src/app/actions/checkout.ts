"use server";

import { createCart } from "@/lib/shopify";
import { redirect } from "next/navigation";

export async function processCheckout(cartItems: any[], customerAccessToken?: string) {
    if (!cartItems || cartItems.length === 0) {
        return { error: "Cart is empty" };
    }

    try {
        console.log("Processing Checkout for items:", JSON.stringify(cartItems, null, 2));

        // Map cart items to Shopify format
        const lines = cartItems.map((item) => ({
            merchandiseId: item.id, // Ensure this is the Variant ID
            quantity: item.quantity,
        }));

        console.log("Formatted Lines for Shopify:", JSON.stringify(lines, null, 2));

        const cart = await createCart(lines, customerAccessToken);
        console.log("Cart Response:", JSON.stringify(cart, null, 2));

        if (cart && cart.checkoutUrl) {
            return { url: cart.checkoutUrl };
        } else {
            console.error("Cart created but no URL found:", cart);
            return { error: "Failed to generate checkout URL" };
        }

    } catch (error: any) {
        console.error("Checkout Process Error:", error);
        console.error("Error Stack:", error.stack);
        return { error: error.message || "Something went wrong during checkout initialization." };
    }
}
