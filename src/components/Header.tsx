'use client';

import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import logo from '@/assets/4faa75a576227ff18fdd18ca05e3c2bbde63cd86.png';

import { useCart } from '@/context/CartContext';
import { SearchOverlay } from '@/components/SearchOverlay';

import { getToken } from '@/lib/auth';

export function Header() {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src={logo} alt="Softhreads" height={40} className="h-8 md:h-10 w-auto" />
              <span className="text-xl md:text-2xl tracking-tight text-foreground">softhreads</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-foreground hover:text-primary transition-colors">
                Shop
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link href={isLoggedIn ? "/profile" : "/login"} className="text-foreground hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="relative text-foreground hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {isLoggedIn && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-foreground hover:text-primary transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pt-4 pb-2 flex flex-col gap-3 border-t border-border mt-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors py-2"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors py-2"
              >
                Shop
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors py-2"
              >
                Contact
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}