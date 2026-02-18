import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background pt-16 pb-8 border-t border-secondary shadow-neu-inner">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Newsletter / Contact has been moved to a separate section above the footer */}
                {/* Contact Info (Moved to be its own small column or integrated) */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg font-serif">Contact</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                        <p>Kollam, Kerala 690520</p>
                        <p className="font-medium text-foreground">+91 9048360561</p>
                        <p>support@softhreads.com</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-secondary pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground text-center md:text-left">
                <p>&copy; {new Date().getFullYear()} Softhreads. All rights reserved.</p>
                <p className="mt-2 md:mt-0 font-medium text-primary">Crafted with care for conscious comfort.</p>
            </div>
        </div>
        </footer >
    );
}
