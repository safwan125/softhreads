"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openCart, cartCount } = useCart();
    const { isAuthenticated } = useAuth();

    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    // Implement search
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
            setIsSearchOpen(false);
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
                isScrolled
                    ? "bg-bg shadow-sm py-3" // Changed from shadow-neu-sm to shadow-sm
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Softhreads Logo" className="h-10 w-auto mix-blend-multiply" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-secondary hover:text-primary transition-colors font-medium uppercase tracking-wider text-sm">
                        HOME
                    </Link>
                    <div className="group relative">
                        <Link href="/shop" className="text-secondary hover:text-primary transition-colors font-medium flex items-center gap-1 uppercase tracking-wider text-sm">
                            SHOP
                        </Link>
                        {/* Neumorphic Dropdown */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-bg rounded-xl shadow-md p-6 grid grid-cols-2 gap-6 z-50 border border-white/50">
                            <div>
                                <Link href="/shop?q=men" className="block font-bold text-primary mb-3 uppercase tracking-wider text-xs hover:text-accent transition-colors">MEN</Link>
                                <div className="flex flex-col gap-2">
                                    <Link href="/shop?q=men t-shirt" className="hover:text-primary/70 transition-colors text-xs font-medium text-secondary">T-SHIRTS</Link>
                                    <Link href="/shop?q=men shirt" className="hover:text-primary/70 transition-colors text-xs font-medium text-secondary">SHIRTS</Link>
                                    <Link href="/shop?q=men sweatshirt" className="hover:text-primary/70 transition-colors text-xs font-medium text-secondary">SWEATSHIRTS</Link>
                                </div>
                            </div>
                            <div>
                                <Link href="/shop?q=women" className="block font-bold text-primary mb-3 uppercase tracking-wider text-xs hover:text-accent transition-colors">WOMEN</Link>
                                <div className="flex flex-col gap-2">
                                    <Link href="/shop?q=women kurti set" className="hover:text-primary/70 transition-colors text-xs font-medium text-secondary">KURTI SETS</Link>
                                    <Link href="/shop?q=saree" className="hover:text-primary/70 transition-colors text-xs font-medium text-secondary">SAREES</Link>
                                    <Link href="/shop?q=women co-ords" className="hover:text-primary/70 transition-colors text-xs font-medium text-secondary">CO-ORDS</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href="/about" className="text-secondary hover:text-primary transition-colors font-medium uppercase tracking-wider text-sm">
                        ABOUT US
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                    {/* Search - Toggle */}
                    <div className="relative hidden md:flex items-center">
                        {isSearchOpen && (
                            <div className="absolute right-12 top-1/2 -translate-y-1/2 mr-2 w-48 animate-in fade-in slide-in-from-right-5">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-bg border border-secondary/20 shadow-inner rounded-full px-4 py-2 text-sm text-primary focus:outline-none"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                />
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="group rounded-full w-10 h-10 shadow-sm active:shadow-inner hover:bg-transparent transition-all"
                        >
                            <Search className="w-5 h-5 text-primary group-active:scale-95 transition-transform" />
                        </Button>
                    </div>

                    {/* Cart */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="group rounded-full w-10 h-10 shadow-sm active:shadow-inner hover:bg-transparent transition-all relative"
                        onClick={openCart}
                    >
                        <ShoppingCart className="w-5 h-5 text-primary group-active:scale-95 transition-transform" />
                        {cartCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-white text-xs rounded-full animate-in zoom-in border-2 border-bg">
                                {cartCount}
                            </Badge>
                        )}
                    </Button>

                    {/* Mobile Account / Login (Beside Menu) */}
                    <div className="md:hidden flex items-center">
                        {isAuthenticated ? (
                            <Link href="/account">
                                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-sm active:shadow-inner hover:bg-transparent transition-all group">
                                    <User className="w-5 h-5 text-primary group-active:scale-95 transition-transform" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-sm active:shadow-inner hover:bg-transparent transition-all group">
                                    <User className="w-5 h-5 text-primary group-active:scale-95 transition-transform" />
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Desktop Account / Login */}
                    <div className="hidden md:flex items-center">
                        {isAuthenticated ? (
                            <Link href="/account">
                                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-sm active:shadow-inner hover:bg-transparent transition-all group">
                                    <User className="w-5 h-5 text-primary group-active:scale-95 transition-transform" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button variant="ghost" className="rounded-full px-6 shadow-sm active:shadow-inner hover:bg-transparent transition-all text-primary font-medium">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 shadow-sm active:shadow-inner bg-bg text-primary hover:bg-transparent group">
                                    <Menu className="w-5 h-5 group-active:scale-95 transition-transform" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-bg border-none shadow-xl overflow-y-auto">
                                <div className="sr-only">
                                    {/* Accessibility: required primitives */}
                                    <SheetTitle>Mobile Menu</SheetTitle>
                                    <SheetDescription>Navigation links and user account access</SheetDescription>
                                </div>

                                <div className="flex flex-col mt-8" onClick={(e) => {
                                    // Close menu if clicking on a link
                                    if ((e.target as HTMLElement).closest('a')) {
                                        setIsMobileMenuOpen(false);
                                    }
                                }}>
                                    <div className="flex flex-col divide-y divide-secondary/20 border-b border-t border-secondary/20">
                                        <Link href="/" className="py-4 text-sm font-medium text-primary hover:text-accent transition-colors tracking-wide uppercase">
                                            HOME
                                        </Link>
                                        <Link href="/shop" className="py-4 text-sm font-medium text-primary hover:text-accent transition-colors tracking-wide uppercase">
                                            SHOP
                                        </Link>
                                        <Link href="/shop?target=new-arrivals" className="py-4 text-sm font-medium text-primary hover:text-accent transition-colors tracking-wide uppercase">
                                            NEW ARRIVALS
                                        </Link>
                                        <Link href="/collections" className="py-4 text-sm font-medium text-primary hover:text-accent transition-colors tracking-wide uppercase">
                                            COLLECTIONS
                                        </Link>
                                        <Link href="/contact" className="py-4 text-sm font-medium text-primary hover:text-accent transition-colors tracking-wide uppercase">
                                            CONTACT
                                        </Link>
                                        {isAuthenticated ? (
                                            <Link href="/account" className="py-4 text-sm font-medium text-primary hover:text-accent transition-colors tracking-wide uppercase">
                                                ACCOUNT
                                            </Link>
                                        ) : (
                                            <Link href="/login" className="py-4 text-sm font-medium text-primary hover:text-accent transition-colors tracking-wide uppercase">
                                                LOG IN / REGISTER
                                            </Link>
                                        )}
                                        <Link href="/threads-loop" className="py-4 text-sm font-medium text-[#8c9472] hover:text-[#7a8261] transition-colors tracking-wide uppercase">
                                            THREADS LOOP
                                        </Link>
                                    </div>

                                    <div className="mt-8">
                                        <span className="text-xs text-secondary mb-2 block uppercase tracking-wide">Currency</span>
                                        <div className="relative">
                                            <select className="w-full appearance-none bg-white border border-secondary/20 rounded-md py-3 px-4 text-sm text-primary focus:outline-none shadow-sm cursor-pointer">
                                                <option value="INR">🇮🇳 INR - Indian Rupee</option>
                                                <option value="USD">🇺🇸 USD - US Dollar</option>
                                                <option value="EUR">🇪🇺 EUR - Euro</option>
                                                <option value="GBP">🇬🇧 GBP - British Pound</option>
                                                <option value="AUD">🇦🇺 AUD - Australian Dollar</option>
                                                <option value="CAD">🇨🇦 CAD - Canadian Dollar</option>
                                                <option value="AED">🇦🇪 AED - United Arab Emirates Dirham</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-primary">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                    </div>
                </div>
            </div>
        </nav>
    );
}
