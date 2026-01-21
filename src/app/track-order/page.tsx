'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'searching' | 'found' | 'error'>('idle');

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('searching');

        // Mock Tracking Validation
        setTimeout(() => {
            if (orderId.length > 3) {
                setStatus('found');
            } else {
                setStatus('error');
            }
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <h1 className="text-4xl text-center mb-8">Track Your Order</h1>
            <p className="text-center text-muted-foreground mb-12">
                Enter your Order ID and Email to see the current status of your shipment.
            </p>

            <form onSubmit={handleTrack} className="bg-card border border-border rounded-lg p-8 shadow-sm">
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="order-id">Order ID</Label>
                        <Input
                            id="order-id"
                            placeholder="e.g. #ORD-123456"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="mt-2"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter the email used for checkout"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg">
                        {status === 'searching' ? 'Tracking...' : 'Track Order'}
                    </Button>
                </div>
            </form>

            <div className="mt-12 text-center">
                {status === 'found' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-xl font-semibold mb-2">Order found!</h3>
                        <p>Status: <span className="font-bold">Processing</span></p>
                        <p className="text-sm mt-2">Estimated Delivery: 3-5 Business Days</p>
                    </div>
                )}
                {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-lg animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-xl font-semibold mb-2">Order not found</h3>
                        <p>Please check your details and try again.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
