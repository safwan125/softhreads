import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram } from "lucide-react";

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
                            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-neu-sm hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0 .5-.5l.14-.3a4.38 4.38 0 0 1 8.32 0l.14.3a.5.5 0 0 0 .5.5v1a.5.5 0 0 0 1 0" opacity="0" />
                                    {/* Using simple path for WhatsApp-like phone or bubble */}
                                    <path d="M17.5 14.85c-.47-.24-2.76-1.36-3.19-1.51-.43-.16-.74.24-1.05.62-.32.38-.63.46-1.1.24a13.34 13.34 0 0 1-3.95-2.43 14.65 14.65 0 0 1-1.68-2.09c-.17-.28-.02-.43.21-.66.21-.21.47-.55.7-.83.24-.28.32-.47.47-.79.16-.31.08-.59-.04-.83-.11-.24-1.04-2.52-1.43-3.45-.37-.9-.76-.78-1.04-.79-.27-.01-.58-.01-.89-.01-.31 0-.82.12-1.25.59-.43.47-1.64 1.6-1.64 3.9s1.68 4.54 1.91 4.85c.24.31 3.3 5.04 8 7.07 2.8 1.18 3.36.96 4.57.85 1.22-.11 2.76-1.13 3.15-2.22.39-1.09.39-2.02.27-2.22-.12-.21-.43-.33-.9-.57z" />
                                </svg>
                            </Button>
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
                            <p>Kollam, Kerala 690520</p>
                            <p className="pt-2 font-medium text-foreground">+91 9048360561</p>
                            <p>support@softhreads.com</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-secondary pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} Softhreads. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 font-medium text-primary">Crafted with care for conscious comfort.</p>
                </div>
            </div>
        </footer>
    );
}
