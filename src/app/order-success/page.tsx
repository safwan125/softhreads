import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <div className="flex justify-center mb-6">
                <CheckCircle className="w-24 h-24 text-primary" />
            </div>
            <h1 className="text-4xl mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-8">
                Thank you for your purchase. We've sent a confirmation email to your inbox.
            </p>
            <Link href="/">
                <Button size="lg">Return Home</Button>
            </Link>
        </div>
    );
}
