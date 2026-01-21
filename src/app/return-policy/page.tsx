export default function ReturnPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl mb-12 text-center">Return & Refund Policy</h1>

            <div className="prose prose-lg dark:prose-invert mx-auto space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Our Guarantee</h2>
                    <p className="text-muted-foreground">
                        At Softhreads, we want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, we offer a hassle-free 30-day return policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Eligibility for Returns</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Items must be unused, unwashed, and in original condition.</li>
                        <li>All original tags and packaging must be intact.</li>
                        <li>Returns must be initiated within 30 days of delivery.</li>
                        <li>Clearance items are final sale and cannot be returned.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">How to Initiate a Return</h2>
                    <p className="text-muted-foreground mb-4">
                        To start a return, please visit our <a href="/contact" className="text-primary hover:underline">Contact Page</a> or email support@softhreads.com with your Order ID.
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                        <li>Prepare your package with the original invoice.</li>
                        <li>We will schedule a pickup within 24-48 hours.</li>
                        <li>Once received, we inspect the item(s).</li>
                        <li>Refunds are processed within 5-7 business days to your original payment method.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
                    <p className="text-muted-foreground">
                        Need a different size? The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
                    </p>
                </section>
            </div>
        </div>
    );
}
