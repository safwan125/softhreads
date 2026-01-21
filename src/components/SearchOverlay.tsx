'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchWooCommerceProducts, Product } from '@/lib/wordpress';
// ... import qs removed as likely unused? check later.

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Debounced Search
    useEffect(() => {
        const searchProducts = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                // Search using WordPress
                const products = await fetchWooCommerceProducts(undefined, undefined, 20, query);
                setResults(products);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(searchProducts, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
            {/* Blur Backdrop - darker/more solid */}
            <div
                className="absolute inset-0 bg-background/95 backdrop-blur-md transition-all duration-300"
                onClick={onClose}
            />

            {/* Content Container */}
            <div className="relative w-full max-w-3xl z-10 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">

                {/* Header with Close Button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                    >
                        <X className="w-8 h-8" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>

                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search products..."
                        className="w-full h-20 pl-16 pr-8 text-3xl md:text-4xl bg-transparent border-b-2 border-border focus:border-primary outline-none placeholder:text-muted-foreground/30 transition-all font-light"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {loading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    )}
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    onClick={onClose}
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                                >
                                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                                        {product.image ? (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg leading-tight group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            ₹{product.price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : query.trim() && !loading ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p className="text-xl">No products found for "{query}"</p>
                            <p className="text-sm mt-2">Try checking for typos or using different keywords.</p>
                        </div>
                    ) : null}

                    {!query.trim() && (
                        <div className="text-center py-12 text-muted-foreground opacity-50">
                            <p>Type to start searching...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
