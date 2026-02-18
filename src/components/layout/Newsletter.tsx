"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus("success");
        setEmail("");

        // Reset success message after 3 seconds
        setTimeout(() => setStatus("idle"), 5000);
    };

    return (
        <section className="bg-[#1A1A1A] py-20 text-center text-white">
            <div className="container mx-auto px-4 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#F2EFE9]">Join Softhreads</h2>
                <p className="text-[#A0A0A0] mb-8 leading-relaxed">
                    Subscribe for early access to new drops, exclusive offers, and fabric stories.
                </p>

                {status === "success" ? (
                    <div className="bg-[#8C7355]/20 border border-[#8C7355] text-[#F2EFE9] p-4 rounded-md mb-6 animate-in fade-in slide-in-from-bottom-2">
                        <p className="font-medium">Welcome to the soft side! You're subscribed.</p>
                    </div>
                ) : (
                    <form className="flex flex-col gap-4 max-w-md mx-auto mb-6" onSubmit={handleSubscribe}>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="h-12 bg-[#2A2A2A] border-[#333] text-white placeholder:text-[#666] focus-visible:ring-[#8C7355] focus-visible:border-[#8C7355]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === "loading"}
                        />
                        <Button
                            type="submit"
                            disabled={status === "loading"}
                            className="h-12 bg-[#8C7355] hover:bg-[#7A634A] text-white text-base font-medium rounded-md w-full disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? "Subscribing..." : "Subscribe"}
                        </Button>
                    </form>
                )}

                <p className="text-xs text-[#555]">
                    By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
