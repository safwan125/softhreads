"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { forgotPassword } from "@/app/actions/auth";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("email", email);

        try {
            const res = await forgotPassword(null, formData);

            if (res?.success) {
                setIsSent(true);
            } else {
                alert(res?.error || "Failed to send reset email");
            }
        } catch (error) {
            console.error("Password reset error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: "url('/auth-bg.jpg')" }}
        >
            <div className="w-full max-w-md space-y-8 bg-bg/85 backdrop-blur-md p-8 rounded-2xl shadow-neu border border-secondary/20 relative">
                <Link href="/login" className="absolute top-8 left-8 text-secondary hover:text-primary transition-colors flex items-center justify-center p-1 rounded-full hover:bg-black/5">
                    <ArrowLeft className="w-5 h-5" />
                </Link>

                <div className="text-center pt-2">
                    <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Reset Password</h1>
                    <p className="mt-2 text-secondary">
                        {isSent
                            ? "Check your email for instructions"
                            : "Enter your email to receive a reset link"}
                    </p>
                </div>

                {!isSent ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
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
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl text-lg font-medium shadow-neu active:shadow-neu-inset bg-primary text-white hover:bg-primary/90 transition-all"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending Link...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </Button>
                    </form>
                ) : (
                    <div className="mt-8 space-y-6">
                        <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl text-center text-primary font-medium">
                            We've sent a password reset link to <br />
                            <span className="font-bold">{email}</span>
                        </div>
                        <Button
                            onClick={() => router.push("/login")}
                            className="w-full h-12 rounded-xl text-lg font-medium shadow-neu active:shadow-neu-inset bg-primary text-white hover:bg-primary/90 transition-all"
                        >
                            Return to Sign in
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
