"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
    return (
        <section className="bg-[#1A1A1A] py-20 text-center text-white">
            <div className="container mx-auto px-4 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#F2EFE9]">Join the Soft Side</h2>
                <p className="text-[#A0A0A0] mb-8 leading-relaxed">
                    Subscribe for early access to new drops, exclusive offers, and fabric stories.
                </p>

                <form className="flex flex-col gap-4 max-w-md mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 bg-[#2A2A2A] border-[#333] text-white placeholder:text-[#666] focus-visible:ring-[#8C7355] focus-visible:border-[#8C7355]"
                    />
                    <Button className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium rounded-md w-full">
                        Subscribe
                    </Button>
                </form>

                <p className="text-xs text-[#555]">
                    By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
