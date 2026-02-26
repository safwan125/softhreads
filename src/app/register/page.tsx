"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const names = name.split(" ");
        const firstName = names[0];
        const lastName = names.length > 1 ? names.slice(1).join(" ") : "Customer";

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);

        try {
            const { registerUser } = await import("@/app/actions/auth");
            const res = await registerUser(null, formData);

            if (res?.success && res.token && res.expiresAt) {
                login(res.token, res.expiresAt);
                router.push("/account");
            } else {
                alert(res?.error || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: "url('/auth-bg.jpg')" }}
        >
            <div className="w-full max-w-md space-y-8 bg-bg/85 backdrop-blur-md p-8 rounded-2xl shadow-neu border border-secondary/20">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Create an account</h1>
                    <p className="mt-2 text-secondary">Join Softhreads today</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="h-14 rounded-2xl bg-[#4A4036] text-white placeholder:text-white/80 border-none focus:ring-2 focus:ring-white/20 font-medium text-lg placeholder:font-normal"
                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-14 rounded-2xl bg-[#4A4036] text-white placeholder:text-white/80 border-none focus:ring-2 focus:ring-white/20 font-medium text-lg placeholder:font-normal"
                            />
                        </div>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-14 rounded-2xl bg-[#4A4036] text-white placeholder:text-white/80 border-none focus:ring-2 focus:ring-white/20 font-medium text-lg placeholder:font-normal pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors flex items-center justify-center p-1"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div className="flex justify-end mt-1">
                            <Link href="/forgot-password" className="text-sm font-medium text-accent hover:underline">
                                Forgot your password?
                            </Link>
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
                                Creating account...
                            </>
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                </form>
                <div className="text-center text-sm">
                    <span className="text-secondary text-base">Already have an account? </span>
                    <Link href="/login" className="font-medium text-accent hover:underline text-base">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
