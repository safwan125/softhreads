"use server";

import { getCustomer } from "@/lib/shopify";

export async function getUserProfile(accessToken: string) {
    try {
        const customer = await getCustomer(accessToken);
        return customer;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return null;
    }
}
