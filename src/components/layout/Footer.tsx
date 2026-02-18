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
                        <h3 className="text-2xl font-bold tracking-tighter font-serif">SOFTHREADS</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Premium clothing for the modern individual. Designed with comfort and style in mind.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-neu-sm hover:text-primary"><Instagram className="w-5 h-5" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-neu-sm hover:text-primary"><Facebook className="w-5 h-5" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-neu-sm hover:text-primary relative overflow-hidden group">
                                <span className="absolute inset-0 bg-[#25D366] opacity-0 group-hover:opacity-10 transition-opacity"></span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366" className="w-6 h-6">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471.148-.67.445-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    {/* Shop Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg font-serif">Shop</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li><Link href="/shop/men" className="hover:text-primary transition-colors">Men's Collection</Link></li>
                            <li><Link href="/shop/women" className="hover:text-primary transition-colors">Women's Collection</Link></li>
                            <li><Link href="/shop/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop/sale" className="hover:text-primary transition-colors">Sale</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg font-serif">Support</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            <li><Link href="/account" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Exchange</Link></li>
                            <li><Link href="/legal/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
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
        </footer>
    );
}
