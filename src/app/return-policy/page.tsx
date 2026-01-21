import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ReturnPolicy() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center">Return & Refund Policy</h1>

            <div className="space-y-8 text-muted-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Our Guarantee</h2>
                    <p>
                        We want you to love your Softhreads purchase. If you are not completely satisfied,
                        we are here to help.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Returns</h2>
                    <p className="mb-4">
                        You have <strong>30 calendar days</strong> to return an item from the date you received it.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To be eligible for a return, your item must be unused and in the same condition that you received it.</li>
                        <li>Your item must be in the original packaging.</li>
                        <li>Your item needs to have the receipt or proof of purchase.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Refunds</h2>
                    <p>
                        Once we receive your item, we will inspect it and notify you that we have received your
                        returned item. We will immediately notify you on the status of your refund after inspecting the item.
                    </p>
                    <p className="mt-2">
                        If your return is approved, we will initiate a refund to your credit card (or original method of payment).
                        You will receive the credit within a certain amount of days, depending on your card issuer's policies.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Shipping</h2>
                    <p>
                        You will be responsible for paying for your own shipping costs for returning your item.
                        Shipping costs are non-refundable. If you receive a refund, the cost of return shipping
                        will be deducted from your refund.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                    <p>
                        If you have any questions on how to return your item to us, contact us at:
                        <br />
                        <span className="text-foreground">support@softhreads.com</span>
                    </p>
                </section>

                <div className="pt-8">
                    <Link href="/">
                        <Button variant="outline">Back to Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
