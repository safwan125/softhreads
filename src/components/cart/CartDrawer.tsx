"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { processCheckout } from "@/app/actions/checkout";

export default function CartDrawer() {
    const { isOpen, closeCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const [isPending, startTransition] = useTransition();

    const handleCheckout = () => {
        startTransition(async () => {
            const token = localStorage.getItem("shopify_customer_token") || undefined;
            const result = await processCheckout(cartItems, token);

            if (result?.url) {
                window.location.href = result.url;
            } else {
                console.error("Checkout failed:", result?.error);
                alert(`Checkout Failed: ${result?.error || "Unknown error"}`);
            }
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={closeCart}>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-bg border-none shadow-neu">
                <SheetHeader className="px-6 py-4 bg-bg border-b border-secondary/10 z-10 flex flex-row items-center justify-between">
                    <SheetTitle className="flex items-center gap-2 text-primary m-0">
                        <ShoppingBag className="w-5 h-5" /> Your Cart
                        <span className="text-secondary text-sm font-normal">
                            ({cartItems.length} items)
                        </span>
                    </SheetTitle>
                    <button
                        onClick={closeCart}
                        className="p-2 -mr-2 text-secondary hover:text-primary transition-colors focus:outline-none rounded-full hover:bg-black/5"
                        aria-label="Close cart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <SheetDescription className="sr-only">
                        Review your selected items and proceed to checkout.
                    </SheetDescription>
                </SheetHeader>

                {cartItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                        <div className="w-24 h-24 bg-bg rounded-full shadow-neu flex items-center justify-center">
                            <ShoppingBag className="w-10 h-10 text-secondary" />
                        </div>
                        <h3 className="text-xl font-semibold text-primary">Your cart is empty</h3>
                        <p className="text-secondary">Looks like you haven't added anything to your cart yet.</p>
                        <Button onClick={closeCart} className="mt-4 rounded-xl shadow-neu active:shadow-neu-inset bg-bg text-primary hover:text-accent transition-all">
                            Start Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                            {cartItems.map((item) => (
                                <div key={`${item.variantId || item.id}-${item.size}-${item.color}`} className="flex gap-4">
                                    <div className="relative w-24 aspect-[3/4] rounded-xl overflow-hidden shadow-neu-inset bg-gray-100 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h4 className="font-medium line-clamp-2 leading-tight text-primary">{item.title}</h4>
                                            <div className="text-sm text-secondary mt-1 flex gap-2">
                                                {item.size && <span>Size: {item.size}</span>}
                                                {item.color && (
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: item.color }} />
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            {/* Quantity Control - Neumorphic */}
                                            <div className="flex items-center bg-bg rounded-lg shadow-neu-inset p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.variantId || item.id, item.quantity - 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-md hover:text-accent transition-colors disabled:opacity-30"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium text-primary">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.variantId || item.id, item.quantity + 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-md hover:text-accent transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.variantId || item.id)}
                                                    className="text-xs text-red-500 hover:text-red-600 mt-1 flex items-center gap-1 font-medium"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-bg shadow-neu top-shadow space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-secondary">Subtotal</span>
                                    <span className="font-medium text-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-secondary">Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                                    <span className="text-primary">Total</span>
                                    <span className="text-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                            <Button
                                className="w-full h-12 rounded-xl text-lg shadow-neu active:shadow-neu-inset bg-accent text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                onClick={handleCheckout}
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Checkout Now"
                                )}
                            </Button>
                            <p className="text-xs text-center text-secondary">
                                Shipping & taxes calculated at checkout
                            </p>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
