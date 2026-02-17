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
            // FIX: Robustly replace domain using URL object to handle www/non-www correctly.
            // We want to force the internal myshopify domain to bypass Vercel's routing for checkout.
            let finalUrl = cart.checkoutUrl;
            try {
                const urlObj = new URL(finalUrl);
                if (urlObj.hostname.includes("softhreads.com")) {
                    urlObj.hostname = "softhreads-2759.myshopify.com";
                    finalUrl = urlObj.toString();
                }
            } catch (e) {
                console.error("Error parsing checkout URL:", e);
                // Fallback to original if parsing fails, though unlikely
            }

            console.log("FINAL REDIRECT URL:", finalUrl);

            return { url: finalUrl };
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
