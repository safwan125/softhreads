"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SizeChart from "@/components/product/SizeChart";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface ProductDetailClientProps {
    product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart, openCart } = useCart();

    // Initialize selections with default or first available options
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

    // Set defaults on mount
    useEffect(() => {
        if (product.options && product.options.length > 0) {
            const defaults: Record<string, string> = {};
            product.options.forEach((opt: any) => {
                defaults[opt.name] = opt.values[0];
            });
            setSelectedOptions(defaults);
        }
    }, [product.options]);

    const handleOptionChange = (name: string, value: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Helper to find variant based on current options
    const getSelectedVariant = () => {
        return product.variants.find((variant: any) => {
            return variant.selectedOptions.every((opt: any) => selectedOptions[opt.name] === opt.value);
        });
    };

    const selectedVariant = getSelectedVariant();

    // Check if variant is available
    const isAvailable = selectedVariant?.availableForSale; // boolean from Shopify
    const quantityAvailable = selectedVariant?.quantityAvailable;

    // Determine button text and state
    let buttonText = "Add to Cart";
    let isButtonDisabled = false;

    if (!selectedVariant) {
        buttonText = "Unavailable";
        isButtonDisabled = true;
    } else if (!isAvailable) {
        buttonText = "Sold Out";
        isButtonDisabled = true;
    }

    const handleAddToCart = () => {
        if (!selectedVariant) return;

        addToCart({
            id: product.id,
            variantId: selectedVariant.id,
            title: product.title,
            handle: product.handle,
            image: product.image,
            price: selectedVariant.price,
            quantity: 1,
            size: selectedOptions["Size"] || "",
            color: selectedOptions["Color"] || ""
        });
        openCart();
    };

    const handleBuyNow = () => {
        if (!selectedVariant) return;

        addToCart({
            id: product.id,
            variantId: selectedVariant.id,
            title: product.title,
            handle: product.handle,
            image: product.image,
            price: selectedVariant.price,
            quantity: 1,
            size: selectedOptions["Size"] || "",
            color: selectedOptions["Color"] || ""
        });
        // For 'Buy Now', immediately open cart and user can proceed to checkout
        openCart();
    };

    // Helper to check if a specific option value is available given OTHER currently selected options
    // e.g. If Color is Black, is Size S available?
    const isOptionValueAvailable = (optionName: string, value: string) => {
        // Create a potential selection state used for checking
        // For the option we are checking, use the candidate value.
        // For other options, use the CURRENTLY selected value.

        // However, standard behavior for "Size" buttons:
        // If Color is selected, check if that Size + Color variant exists and is available.

        // Find a variant that matches this specific option value AND all other currently selected options
        const potentialVariant = product.variants.find((variant: any) => {
            const matchTargetOption = variant.selectedOptions.find((opt: any) => opt.name === optionName)?.value === value;

            // Match all other options
            const matchOtherOptions = variant.selectedOptions.every((opt: any) => {
                if (opt.name === optionName) return true; // skip the one we are checking
                return selectedOptions[opt.name] === opt.value;
            });

            return matchTargetOption && matchOtherOptions;
        });

        // Loophole: If "Color" is the first option, and we are rendering "Color" buttons, we typically assume "Size" hasn't been picked yet or we pick default.
        // But usually strikethrough logic is strictly "Does this variant exist and is it in stock?"

        return potentialVariant && potentialVariant.availableForSale;
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

                    </div>
                    {/* Thumbnails (Mock - in real app use product.images) */}
                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product.images.slice(0, 4).map((imgUrl: string, i: number) => (
                                <div key={i} className="relative w-20 aspect-square rounded-lg overflow-hidden border border-transparent hover:border-primary cursor-pointer shadow-neu-sm">
                                    <Image src={imgUrl} alt="thumb" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category || "Premium Collection"}</p>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{product.title}</h1>
                        <div className="mt-4 flex items-end gap-3">
                            <span className="text-2xl font-bold text-primary">₹{selectedVariant?.price.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}</span>
                            {product.compareAtPrice && (
                                <span className="text-lg text-muted-foreground line-through mb-1">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                            )}
                            {product.onSale && <Badge variant="destructive" className="mb-2">SALE</Badge>}
                        </div>
                    </div>

                    <div className="h-px bg-secondary w-full" />

                    <Accordion type="multiple" defaultValue={["description"]} className="w-full mt-2">
                        <AccordionItem value="description" className="border-y border-secondary/20">
                            <AccordionTrigger className="text-sm font-semibold hover:no-underline hover:text-primary/80 uppercase tracking-widest py-4">
                                Description
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                                <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="details" className="border-b border-secondary/20">
                            <AccordionTrigger className="text-sm font-semibold hover:no-underline hover:text-primary/80 uppercase tracking-widest py-4">
                                Details & Wash Care
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4 space-y-2">
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                    <li>Premium fabric construction</li>
                                    <li>Hand wash or dry clean recommended</li>
                                    <li>Do not bleach</li>
                                    <li>Iron on low heat</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Dynamic Options */}
                    {product.options && product.options.map((option: any) => (
                        <div key={option.name}>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-sm font-semibold">{option.name}: {selectedOptions[option.name]}</h3>
                                {option.name === "Size" && <SizeChart />}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {option.values.map((value: string) => {
                                    const isSelected = selectedOptions[option.name] === value;
                                    // Check availability
                                    const available = isOptionValueAvailable(option.name, value);

                                    // Specific styling for Colors usually
                                    if (option.name === "Color") {
                                        return (
                                            <button
                                                key={value}
                                                onClick={() => handleOptionChange(option.name, value)}
                                                className={cn(
                                                    "w-10 h-10 rounded-full border-2 shadow-neu-sm transition-all focus:outline-none relative",
                                                    isSelected ? "border-primary scale-110" : "border-transparent hover:scale-105",
                                                    !available && "opacity-50 cursor-not-allowed" // Optional: visual cue for OOS color
                                                )}
                                                style={{ backgroundColor: value.toLowerCase() }}
                                                title={value}
                                                disabled={!available && false} // Colors generally kept clickable to see if other sizes exist, but logic varies. user said "strike through small... disabled add to cart"
                                            />
                                        );
                                    }

                                    return (
                                        <Button
                                            key={value}
                                            variant={isSelected ? "default" : "outline"}
                                            onClick={() => handleOptionChange(option.name, value)}
                                            className={cn(
                                                "rounded-xl shadow-neu-sm transition-all min-w-[3rem]",
                                                isSelected ? "bg-primary text-primary-foreground shadow-neu-pressed" : "hover:bg-secondary/50",
                                                !available && "opacity-50 decorative-line-through decoration-slate-500" // Strikethrough for OOS
                                            )}
                                        >
                                            <span className={cn(!available && "line-through decoration-2")}>{value}</span>
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 space-y-3">
                        {/* Low Stock Warning */}
                        {isAvailable && quantityAvailable !== undefined && quantityAvailable < 10 && quantityAvailable > 0 && (
                            <p className="text-destructive text-sm font-medium animate-pulse">
                                Only {quantityAvailable} left!
                            </p>
                        )}

                        <Button
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled}
                            className="w-full h-14 rounded-xl text-lg font-semibold shadow-neu-md hover:shadow-neu-lg hover:-translate-y-0.5 transition-all bg-primary text-primary-foreground active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <ShoppingCart className="mr-2 w-5 h-5" /> {buttonText}
                        </Button>
                        <Button
                            onClick={handleBuyNow}
                            disabled={isButtonDisabled}
                            variant="outline"
                            className="w-full h-14 rounded-xl text-lg font-semibold shadow-neu-sm hover:shadow-neu-md hover:-translate-y-0.5 transition-all border-2 border-primary text-primary hover:bg-primary sm:hover:text-primary-foreground active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Buy Now
                        </Button>
                    </div>

                    {/* Features (Icons) */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-secondary/10">
                            <span className="text-2xl">🚚</span>
                            <span className="text-xs font-medium">Free Shipping</span>
                        </div>
                        <Link href="/returns" className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer">
                            <span className="text-2xl">↩️</span>
                            <span className="text-xs font-medium">14 Day Returns</span>
                        </Link>
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
