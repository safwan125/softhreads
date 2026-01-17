'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Message sent successfully! We'll get back to you soon.");
        setLoading(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Have a question about our products or need help with an order?
                    We're here to help.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Contact Info */}
                <div className="space-y-8">
                    <Card className="border-none shadow-none bg-muted/30">
                        <CardHeader>
                            <CardTitle className="text-2xl">Contact Information</CardTitle>
                            <CardDescription>
                                Reach out to us through any of these channels.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium mb-1">Email</h3>
                                    <p className="text-muted-foreground">hello@softhreads.com</p>
                                    <p className="text-muted-foreground">support@softhreads.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium mb-1">Phone</h3>
                                    <p className="text-muted-foreground">+91 98765 43210</p>
                                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am - 6pm IST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium mb-1">Office</h3>
                                    <p className="text-muted-foreground">
                                        123 Fashion Street, Bandra West<br />
                                        Mumbai, Maharashtra 400050<br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Map Placeholder (or image) */}
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            {/* Replace with actual map iframe if available */}
                            <span className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Find us on Google Maps
                            </span>
                        </div>
                        {/* Optional: Add an actual decorative image or map screenshot here */}
                    </div>
                </div>

                {/* Contact Form */}
                <Card className="border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Send us a Message</CardTitle>
                        <CardDescription>
                            Fill out the form below and we'll get back to you within 24 hours.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <Input id="name" placeholder="John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="john@example.com" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                <Input id="subject" placeholder="Order Inquiry / Product Question" required />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <Textarea
                                    id="message"
                                    placeholder="How can we help you?"
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
