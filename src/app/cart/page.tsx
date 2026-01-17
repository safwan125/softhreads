'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, CartItem } from '@/context/CartContext';

export default function Cart() {
    const { cartItems, updateQuantity, removeItem } = useCart();

    const subtotal = cartItems.reduce((total, item) => {
        // Use price from item (which comes from the product at add-to-cart time)
        // Note: In a real app we might want to re-fetch to check for price changes, but for now this is fine.
        return total + (item.price * item.quantity);
    }, 0);

    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link href="/shop">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item, index) => {
                        return (
                            <div key={index} className="bg-card border border-border rounded-lg p-4">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0 relative">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <div>
                                                <Link href={`/product/${item.productId}`} className="hover:text-primary">
                                                    <h3>{item.name}</h3>
                                                </Link>
                                                <p className="text-sm text-muted-foreground">
                                                    Color: {item.color} | Size: {item.size}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <p className="text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Order Summary */}
                <div>
                    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                        <h2 className="text-2xl mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Tax</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            {shipping === 0 && (
                                <p className="text-sm text-primary">
                                    🎉 You qualify for free shipping!
                                </p>
                            )}
                            {shipping > 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Add ₹{(100 - subtotal).toFixed(2)} more for free shipping
                                </p>
                            )}
                        </div>

                        <div className="border-t border-border pt-4 mb-6">
                            <div className="flex justify-between text-lg">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link href="/checkout" className="block">
                            <Button className="w-full" size="lg">
                                Proceed to Checkout
                            </Button>
                        </Link>

                        <Link href="/shop" className="block mt-4">
                            <Button variant="outline" className="w-full">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
