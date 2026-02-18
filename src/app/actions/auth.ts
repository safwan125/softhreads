"use server";

import { createCustomer, createCustomerAccessToken, recoverCustomerPassword } from "@/lib/shopify";

export async function loginUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const tokenData = await createCustomerAccessToken(email, password);
        return { success: true, token: tokenData.accessToken, expiresAt: tokenData.expiresAt };
    } catch (error: any) {
        return { error: error.message || "Invalid credentials" };
    }
}

export async function registerUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (!email || !password || !firstName || !lastName) {
        return { error: "All fields are required" };
    }

    try {
        await createCustomer(email, password, firstName, lastName);
        // Auto login after registration
        const tokenData = await createCustomerAccessToken(email, password);
        return { success: true, token: tokenData.accessToken, expiresAt: tokenData.expiresAt };
    } catch (error: any) {
        return { error: error.message || "Registration failed" };
    }
}

export async function forgotPassword(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) {
        return { error: "Email is required" };
    }

    try {
        await recoverCustomerPassword(email);
        return { success: true, message: "If an account exists, an email was sent." };
    } catch (error: any) {
        return { error: error.message || "Failed to send reset email" };
    }
}

export async function getUserProfile(token: string) {
    if (!token) return null;

    try {
        const { getCustomer } = await import("@/lib/shopify");
        const customer = await getCustomer(token);
        return customer;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return null;
    }
}
