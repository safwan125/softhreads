import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background pt-16 pb-8 border-t border-secondary shadow-neu-inner">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tighter">SOFTHREADS</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Premium clothing for the modern individual. Designed with comfort and style in mind.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-neu-sm hover:text-primary"><Instagram className="w-5 h-5" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-neu-sm hover:text-primary"><Facebook className="w-5 h-5" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-neu-sm hover:text-primary"><Twitter className="w-5 h-5" /></Button>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Shop</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li><Link href="/shop/men" className="hover:text-primary transition-colors">Men's Collection</Link></li>
                            <li><Link href="/shop/women" className="hover:text-primary transition-colors">Women's Collection</Link></li>
                            <li><Link href="/shop/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop/sale" className="hover:text-primary transition-colors">Sale</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Support</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li><Link href="/account" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Exchange</Link></li>
                            <li><Link href="/legal/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Stay in the loop</h4>
                        <p className="text-muted-foreground text-sm">Subscribe to get special offers, free giveaways, and deals.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="bg-background shadow-neu-pressed border-none focus-visible:ring-1" />
                            <Button className="shadow-neu-sm active:shadow-neu-pressed bg-primary text-primary-foreground hover:bg-primary/90">Join</Button>
                        </div>
                        <div className="pt-4 text-sm text-muted-foreground">
                            <p>050, Chamavila Kizhakkathil,</p>
                            <p>Kampalady, Poruvazhy P.O,</p>
                            <p>Kollam, Kerala 690520</p>
                            <p className="pt-2 font-medium text-foreground">+91 9048360561</p>
                            <p>support@softhreads.com</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-secondary pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Softhreads. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        {/* Payment Icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
