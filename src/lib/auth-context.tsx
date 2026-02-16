"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCustomer } from "@/lib/shopify";

type Order = {
    id: string;
    orderNumber: number;
    processedAt: string;
    financialStatus: string;
    fulfillmentStatus: string;
    totalPrice: { amount: string; currencyCode: string };
    lineItems: { edges: { node: { title: string; quantity: number } }[] };
};

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    orders?: { edges: { node: Order }[] };
};

interface AuthContextType {
    user: User | null;
    firstName: string | null; // Helper for UI
    login: (token: string, expiresAt: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("shopify_customer_token");
            const expiresAt = localStorage.getItem("shopify_customer_token_expires");

            if (token && expiresAt && new Date(expiresAt) > new Date()) {
                try {
                    // Fetch user details
                    // We can't call getCustomer directly here if it contains sensitive server tokens?
                    // Wait, getCustomer is in shopify.ts which uses process.env.
                    // Client cannot call it directly if it uses Admin/Private env vars.
                    // Public Storefront token IS safe for client usage, but our getCustomer impl uses storefrontFetch which uses Env vars.
                    // So we need a Server Action wrapper to fetch user details.

                    // Actually, let's just make a server action wrapper for getUserProfile
                    await refreshUserProfile(token);
                } catch (error) {
                    console.error("Session expired or invalid", error);
                    logout();
                }
            } else {
                localStorage.removeItem("shopify_customer_token");
                localStorage.removeItem("shopify_customer_token_expires");
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const refreshUserProfile = async (token: string) => {
        // We need a way to fetch user profile safely.
        // Importing getCustomer directly here is risky if it bundles server secrets.
        // We'll trust the caller (login page) to handle the initial fetch or use a separate server action.
        // For now, let's create a server action in a separate file (or we can't... we need to update auth.ts first).

        // TEMPORARY: We will fetch via a new server action `getUserProfile`.
        // I will assume it exists and add it to `auth.ts` in next step.
        const { getUserProfile } = await import("@/app/actions/auth-profile");
        const userData = await getUserProfile(token);
        if (userData) {
            setUser(userData);
        } else {
            throw new Error("Invalid token");
        }
    };

    const login = (token: string, expiresAt: string) => {
        localStorage.setItem("shopify_customer_token", token);
        localStorage.setItem("shopify_customer_token_expires", expiresAt);
        refreshUserProfile(token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("shopify_customer_token");
        localStorage.removeItem("shopify_customer_token_expires");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{
            user,
            firstName: user?.firstName || null,
            login,
            logout,
            isAuthenticated: !!user,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
