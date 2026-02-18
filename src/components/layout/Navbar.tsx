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
                        Home
                    </Link>
                    <div className="group relative">
                        <Link href="/shop" className="text-secondary hover:text-primary transition-colors font-medium flex items-center gap-1 uppercase tracking-wider text-sm">
                            Shop
                        </Link>
                        {/* Neumorphic Dropdown */}
                        <div className="absolute top-full text-sm left-1/2 -translate-x-1/2 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-bg rounded-xl shadow-md p-4 flex flex-col gap-2 z-50">
                            <Link href="/shop" className="block px-4 py-2 hover:bg-gray-100/50 rounded-lg transition-colors text-primary font-medium uppercase tracking-wide text-xs">All Products</Link>
                            <Link href="/shop?q=men" className="block px-4 py-2 hover:bg-gray-100/50 rounded-lg transition-colors text-primary font-medium uppercase tracking-wide text-xs">Men</Link>
                            <Link href="/shop?q=women" className="block px-4 py-2 hover:bg-gray-100/50 rounded-lg transition-colors text-primary font-medium uppercase tracking-wide text-xs">Women</Link>
                        </div>
                    </div>
                    <Link href="/about" className="text-secondary hover:text-primary transition-colors font-medium uppercase tracking-wider text-sm">
                        About Us
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    {/* Search - Toggle */}
                    <div className="relative flex items-center">
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
                            className="hidden md:flex group rounded-full w-10 h-10 shadow-sm active:shadow-inner hover:bg-transparent transition-all"
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


                    {/* Account / Login */}
                    {isAuthenticated ? (
                        <Link href="/account">
                            <Button variant="ghost" size="icon" className="hidden md:flex rounded-full w-10 h-10 shadow-sm active:shadow-inner hover:bg-transparent transition-all group">
                                <User className="w-5 h-5 text-primary group-active:scale-95 transition-transform" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button variant="ghost" className="hidden md:flex rounded-full px-6 shadow-sm active:shadow-inner hover:bg-transparent transition-all text-primary font-medium">
                                Login
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden rounded-full w-10 h-10 shadow-sm active:shadow-inner bg-bg text-primary hover:bg-transparent">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-bg border-none shadow-xl">
                            <div className="sr-only">
                                {/* Accessibility: required primitives */}
                                <SheetTitle>Mobile Menu</SheetTitle>
                                <SheetDescription>Navigation links and user account access</SheetDescription>
                            </div>

                            {/* Removed shadow-neu, used shadow-xl */}
                            <div className="flex flex-col gap-6 mt-10">
                                <Link href="/" className="text-lg font-medium text-primary hover:text-accent transition-colors uppercase tracking-wider">Home</Link>
                                <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/10">
                                    <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Shop</span>
                                    <Link href="/shop?q=men" className="text-lg font-medium text-primary hover:text-accent transition-colors uppercase tracking-wider">Men</Link>
                                    <Link href="/shop?q=women" className="text-lg font-medium text-primary hover:text-accent transition-colors uppercase tracking-wider">Women</Link>
                                </div>
                                <Link href="/about" className="text-lg font-medium text-primary hover:text-accent transition-colors uppercase tracking-wider">About Us</Link>

                                {isAuthenticated ? (
                                    <Link href="/account" className="text-lg font-medium text-primary hover:text-accent transition-colors flex items-center gap-2">
                                        <User className="w-5 h-5" /> Account
                                    </Link>
                                ) : (
                                    <Link href="/login" className="text-lg font-medium text-primary hover:text-accent transition-colors flex items-center gap-2">
                                        <User className="w-5 h-5" /> Login / Sign Up
                                    </Link>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>

                </div>
            </div>
        </nav>
    );
}
