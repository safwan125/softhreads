"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SizeChart from "@/components/product/SizeChart";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface ProductDetailClientProps {
    product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");

    const sizes = ["S", "M", "L", "XL", "XXL"];
    const colors = ["Black", "White", "Navy", "Beige"];

    const { addToCart, openCart } = useCart();

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        addToCart({
            id: product.variantId || product.id, // Use actual variant ID from API
            title: product.title,
            handle: product.handle,
            image: product.image,
            price: product.price,
            quantity: 1,
            size: selectedSize,
            color: selectedColor || "Default"
        });
        openCart();
    };

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[3/4] w-full bg-secondary/20 rounded-2xl overflow-hidden shadow-neu-md">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                            <Button size="icon" variant="ghost" className="rounded-full bg-white/80 backdrop-blur-sm shadow-neu-sm hover:bg-white">
                                <Heart className="w-5 h-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="rounded-full bg-white/80 backdrop-blur-sm shadow-neu-sm hover:bg-white">
                                <Share2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    {/* Thumbnails (Mock) */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative w-20 aspect-square rounded-lg overflow-hidden border border-transparent hover:border-primary cursor-pointer shadow-neu-sm">
                                <Image src={product.image} alt="thumb" fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category || "Premium Collection"}</p>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{product.title}</h1>
                        <div className="mt-4 flex items-end gap-3">
                            <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                            {product.compareAtPrice && (
                                <span className="text-lg text-muted-foreground line-through mb-1">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                            )}
                            {product.onSale && <Badge variant="destructive" className="mb-2">SALE</Badge>}
                        </div>
                    </div>

                    <div className="h-px bg-secondary w-full" />

                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />

                    {/* Colors */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3">Color: {selectedColor || "Select"}</h3>
                        <div className="flex gap-3">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={cn(
                                        "w-10 h-10 rounded-full border-2 shadow-neu-sm transition-all focus:outline-none",
                                        selectedColor === color ? "border-primary scale-110" : "border-transparent hover:scale-105"
                                    )}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold">Size: {selectedSize || "Select"}</h3>
                            <SizeChart />
                        </div>
                        <div className="grid grid-cols-5 gap-2 w-full max-w-sm">
                            {sizes.map((size) => (
                                <Button
                                    key={size}
                                    variant={selectedSize === size ? "default" : "outline"}
                                    onClick={() => setSelectedSize(size)}
                                    className={cn(
                                        "rounded-xl shadow-neu-sm transition-all",
                                        selectedSize === size ? "bg-primary text-primary-foreground shadow-neu-pressed" : "hover:bg-secondary/50"
                                    )}
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <Button
                            onClick={handleAddToCart}
                            className="flex-1 h-14 rounded-xl text-lg font-semibold shadow-neu-md hover:shadow-neu-lg hover:-translate-y-0.5 transition-all bg-primary text-primary-foreground active:scale-95"
                        >
                            <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
                        </Button>
                        <Button variant="outline" className="flex-1 h-14 rounded-xl text-lg font-semibold shadow-neu-sm hover:bg-secondary/50">
                            Buy Now
                        </Button>
                    </div>

                    {/* Features (Icons) */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-secondary/10">
                            <span className="text-2xl">🚚</span>
                            <span className="text-xs font-medium">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-secondary/10">
                            <span className="text-2xl">↩️</span>
                            <span className="text-xs font-medium">Easy Returns</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-secondary/10">
                            <span className="text-2xl">🛡️</span>
                            <span className="text-xs font-medium">Secure Pay</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
