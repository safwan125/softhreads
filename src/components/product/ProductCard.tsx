"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
    product: {
        id: string;
        title: string;
        handle: string;
        price: number;
        compareAtPrice?: number | null;
        image: string;
        variantId?: string;
        onSale?: boolean;
        // Mock data compat
        description?: string;
        currency?: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, openCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if clicked on button
        e.stopPropagation();

        addToCart({
            id: product.variantId || product.id, // Use variant ID if available
            title: product.title,
            handle: product.handle,
            image: product.image,
            price: product.price,
            quantity: 1,
            size: "Default", // Default for now
            color: "Default"
        });
        openCart();
    };

    return (
        <div className="group relative bg-bg rounded-neu shadow-neu hover:shadow-neu-sm transition-all duration-300 p-4 flex flex-col h-full border border-white/20">
            {/* Sale Badge */}
            {product.onSale && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                    SALE
                </div>
            )}

            {/* Image Container */}
            <Link href={`/product/${product.handle}`} className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl mb-4 bg-gray-100 shadow-neu-inset">
                <Image
                    src={product.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            <div className="flex flex-col flex-grow space-y-1 mt-2">
                <Link href={`/product/${product.handle}`}>
                    <h3 className="font-serif text-3xl font-bold tracking-tight text-primary truncate hover:text-accent transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-base font-normal text-secondary">
                            From ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.compareAtPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                                ₹{product.compareAtPrice.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>

                    {/* Add Button - Neumorphic */}
                    <button
                        onClick={handleAddToCart}
                        className="w-10 h-10 rounded-full bg-bg shadow-neu flex items-center justify-center text-primary active:shadow-neu-inset active:scale-95 transition-all hover:text-accent group/btn z-20"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
