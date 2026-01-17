import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">This is a placeholder page.</p>
            <Link href="/">
                <Button>Back to Home</Button>
            </Link>
        </div>
    );
}
