"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            // Import dynamically to avoid server-action-in-client-component issues if not handled by bundler perfectly, 
            // but Next.js handles imports of server actions fine.
            const { loginUser } = await import("@/app/actions/auth");
            const res = await loginUser(null, formData);

            if (res?.success && res.token && res.expiresAt) {
                login(res.token, res.expiresAt);
                router.push("/account");
            } else {
                alert(res?.error || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-bg">
            <div className="w-full max-w-md space-y-8 bg-bg p-8 rounded-2xl shadow-neu border border-secondary/20">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome back</h1>
                    <p className="mt-2 text-secondary">Sign in to your account</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-14 rounded-xl bg-bg border border-secondary/20 shadow-neu-inset focus:ring-1 focus:ring-accent font-medium text-lg placeholder:font-normal"
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-14 rounded-xl bg-bg border border-secondary/20 shadow-neu-inset focus:ring-1 focus:ring-accent font-medium text-lg placeholder:font-normal"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 rounded-xl text-lg font-medium shadow-neu active:shadow-neu-inset bg-primary text-white hover:bg-primary/90 transition-all"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </form>
                <div className="text-center text-sm">
                    <span className="text-secondary text-base">Don't have an account? </span>
                    <Link href="/register" className="font-medium text-accent hover:underline text-base">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
