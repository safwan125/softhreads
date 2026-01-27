'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { fetchWooProduct, Product } from '@/lib/wordpress';


declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Checkout() {
    const router = useRouter();
    const { cartItems, clearCart, removeOutOfStockItems } = useCart();
    const [step, setStep] = useState<'shipping' | 'payment'>('shipping');

    // Shipping form
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('India');
    const [phone, setPhone] = useState('');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // Cart Data (Fetched details)
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            if (cartItems.length === 0) return;

            const uniqueIds = Array.from(new Set(cartItems.map(item => item.productId))); // IDs are now slugs
            const fetchedProducts: Product[] = [];

            for (const id of uniqueIds) {
                // Fetch from WordPress
                try {
                    const product = await fetchWooProduct(id);
                    if (product) {
                        fetchedProducts.push(product);
                    }
                } catch (e) { console.error(e); }
            }
            setCartProducts(fetchedProducts);
            setLoading(false);
        };

        loadProducts();
    }, [cartItems]);

    const subtotal = cartItems.reduce((total, item) => {
        const product = cartProducts.find(p => p.id === item.productId);
        if (!product) return total;
        const price = product.salePrice || product.price;
        return total + (price * item.quantity);
    }, 0);

    const shipping = subtotal > 100 ? 0 : 50;
    const tax = subtotal * 0.18; // GST 18%
    const total = subtotal + shipping + tax;

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessingPayment(true);

        try {
            // 1. Create Order in Razorpay via Next.js API
            const orderRes = await fetch('/api/razorpay/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total }),
            });
            const orderData = await orderRes.json();

            if (!orderRes.ok || !orderData.id) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
                amount: orderData.amount,
                currency: "INR",
                name: "Softhreads",
                description: "Purchase from Softhreads",
                order_id: orderData.id,
                handler: async function (response: any) {
                    // 2. Verify Payment in Backend
                    try {
                        const verifyRes = await fetch('/api/razorpay/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });
                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            toast.success('Payment successful! Order placed.');
                            clearCart();
                            router.push('/order-success');
                        } else {
                            toast.error('Payment verification failed.');
                        }
                    } catch (verifyError) {
                        console.error("Verification error", verifyError);
                        toast.error('Payment verification failed.');
                    }
                    setIsProcessingPayment(false);
                },
                prefill: {
                    name: `${firstName} ${lastName}`,
                    email: email,
                    contact: phone,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response: any) {
                toast.error(response.error.description);
                setIsProcessingPayment(false);
            });
            rzp1.open();

        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
            setIsProcessingPayment(false);
        }
    };

    // Redirect to cart if empty
    useEffect(() => {
        if (cartItems.length === 0) {
            router.push('/cart');
        }
    }, [cartItems, router]);

    if (cartItems.length === 0) {
        return null;
    }

    if (loading) {
        return <div className="p-16 text-center">Loading Checkout...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <h1 className="text-4xl mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Forms */}
                <div className="lg:col-span-2">
                    {/* Progress Indicator */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step === 'shipping' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                                }`}>
                                1
                            </div>
                            <span>Shipping</span>
                        </div>
                        <div className="flex-1 h-px bg-border" />
                        <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step === 'payment' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                                }`}>
                                2
                            </div>
                            <span>Payment</span>
                        </div>
                    </div>

                    {step === 'shipping' ? (
                        <form onSubmit={handleShippingSubmit} className="bg-card border border-border rounded-lg p-6">
                            <h2 className="text-2xl mb-6">Shipping Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            type="text"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="zipCode">ZIP Code</Label>
                                        <Input
                                            id="zipCode"
                                            type="text"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                            required
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Select value={country} onValueChange={setCountry}>
                                        <SelectTrigger className="mt-2">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="India">India</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 XXXXXXXXXX"
                                        required
                                        className="mt-2"
                                    />
                                </div>

                                <Button type="submit" className="w-full mt-6">
                                    Continue to Payment
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl">Payment Information</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Powered by</span>
                                    <span className="text-sm font-semibold text-primary">Razorpay</span>
                                    <Lock className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                                <p className="text-sm text-center">
                                    <span className="text-muted-foreground">Secure payment powered by </span>
                                    <span className="font-semibold">Razorpay</span>
                                    <span className="text-muted-foreground"> - India's leading payment gateway</span>
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* Removed Card Input Forms as Razorpay Modal handles this */}

                                <div className="pt-4">
                                    <Button type="button" variant="outline" onClick={() => setStep('shipping')} className="w-full mb-3">
                                        Back to Shipping
                                    </Button>

                                    {/* Out of Stock Validation */}
                                    {cartItems.some(item => item.stockStatus === 'OUT_OF_STOCK') ? (
                                        <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4 text-sm">
                                            <p className="font-semibold mb-2">Some items in your cart are out of stock.</p>
                                            <ul className="list-disc pl-5 mb-3">
                                                {cartItems.filter(i => i.stockStatus === 'OUT_OF_STOCK').map(i => (
                                                    <li key={i.key || i.productId}>{i.name} (Out of Stock)</li>
                                                ))}
                                            </ul>
                                            <Button
                                                variant="destructive"
                                                onClick={() => removeOutOfStockItems()}
                                                className="w-full"
                                            >
                                                Remove Out of Stock Items
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button onClick={handlePaymentSubmit} className="w-full" disabled={isProcessingPayment}>
                                            {isProcessingPayment ? 'Processing...' : `Pay Now - ₹${total.toFixed(2)}`}
                                        </Button>
                                    )}
                                </div>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    You will be redirected to Razorpay securely to complete your purchase.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div>
                    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                        <h2 className="text-2xl mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            {cartItems.map((item, index) => {
                                const product = cartProducts.find(p => p.id === item.productId);
                                if (!product) return null;
                                const price = product.salePrice || product.price;

                                return (
                                    <div key={index} className="flex gap-3 pb-3 border-b border-border">
                                        <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0 relative">
                                            {product.image ? (
                                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm truncate">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {item.color} / {item.size} × {item.quantity}
                                            </p>
                                            <p className="text-sm mt-1">₹{(price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">GST (18%)</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-border pt-4">
                            <div className="flex justify-between text-lg">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

