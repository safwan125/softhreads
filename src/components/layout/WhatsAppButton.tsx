"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
    const phoneNumber = "919048360561";
    const message = "Hello, I'm interested in Softhreads products!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                    size="icon"
                    className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-neu-lg hover:shadow-neu-pressed transition-all duration-300 animate-bounce-slow"
                >
                    <MessageCircle className="w-8 h-8" />
                </Button>
            </a>
        </div>
    );
}
