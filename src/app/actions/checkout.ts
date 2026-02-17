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
            // FIX: If Shopify is using the custom domain for checkoutUrl (e.g. softhreads.com/cart/...), 
            // it will 404 because Vercel hosts that domain.
            // We must force it to use the myshopify.com domain for checkout.
            let finalUrl = cart.checkoutUrl;
            if (finalUrl.includes("softhreads.com")) {
                finalUrl = finalUrl.replace("softhreads.com", "softhreads-2759.myshopify.com");
            }
            // Handle www as well just in case
            if (finalUrl.includes("www.softhreads.com")) {
                finalUrl = finalUrl.replace("www.softhreads.com", "softhreads-2759.myshopify.com");
            }

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
