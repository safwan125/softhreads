'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { X, Mail } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Check if already subscribed or dismissed
        const hasInteracted = localStorage.getItem('softhreads_newsletter_interacted');

        if (!hasInteracted) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000); // Show after 3 seconds

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('softhreads_newsletter_interacted', 'true');
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Simulate API call
        toast.success('Thank you for subscribing!');

        // Save state so it doesn't show again
        localStorage.setItem('softhreads_newsletter_interacted', 'true');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden gap-0">
                <div className="relative h-32 bg-primary/10 flex items-center justify-center">
                    <Mail className="h-12 w-12 text-primary" />
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 p-2 rounded-full hover:bg-black/10 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4 opacity-70" />
                    </button>
                </div>
                <div className="p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl text-center">Join the Family</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            Subscribe to our newsletter and get 10% off your first order. Be the first to know about new drops.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubscribe} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-10"
                            />
                        </div>
                        <DialogFooter className="sm:justify-center">
                            <Button type="submit" className="w-full">
                                Subscribe Now
                            </Button>
                        </DialogFooter>
                    </form>
                    <p className="text-xs text-muted-foreground text-center mt-4 cursor-pointer hover:underline" onClick={handleClose}>
                        No thanks, I prefer paying full price
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
