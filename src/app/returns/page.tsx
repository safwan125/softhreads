export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-bg">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary tracking-tight">Returns & Exchanges</h1>
                    <p className="text-secondary text-lg max-w-2xl mx-auto">
                        We want you to be completely happy with your purchase. If something isn't right, we're here to help.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Return Policy Card */}
                    <div className="bg-bg p-8 rounded-2xl shadow-neu border border-secondary/20 md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">Standard Return Policy</h2>
                        <div className="space-y-4 text-secondary leading-relaxed">
                            <p>
                                You have <strong>30 days</strong> from the date of delivery to return your item(s).
                            </p>
                            <p>
                                To be eligible for a return, your item must be unused, unworn, and in the same condition that you received it. It must also be in the original packaging with all tags attached.
                            </p>
                        </div>
                    </div>

                    {/* Process Card */}
                    <div className="bg-bg p-8 rounded-2xl shadow-neu border border-secondary/20">
                        <h2 className="text-xl font-semibold mb-4 text-primary">How to Return</h2>
                        <ol className="list-decimal list-inside space-y-3 text-secondary">
                            <li>Visit our Returns Portal.</li>
                            <li>Enter your Order ID and Email.</li>
                            <li>Select the items you wish to return.</li>
                            <li>Print the prepaid shipping label.</li>
                            <li>Drop off at the nearest shipping center.</li>
                        </ol>
                    </div>

                    {/* Refunds Card */}
                    <div className="bg-bg p-8 rounded-2xl shadow-neu border border-secondary/20">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Refunds</h2>
                        <p className="text-secondary leading-relaxed">
                            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item.
                            If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within 5-7 business days.
                        </p>
                    </div>

                    {/* Exchanges Card */}
                    <div className="bg-bg p-8 rounded-2xl shadow-neu border border-secondary/20 md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Exchanges</h2>
                        <p className="text-secondary leading-relaxed mb-4">
                            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
                        </p>
                        <p className="text-secondary leading-relaxed">
                            If you received a defective or damaged item, please contact us immediately at <a href="mailto:support@softhreads.com" className="text-accent underline">support@softhreads.com</a> with details and photos of the product.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-secondary mb-4">Still have questions?</p>
                    <a href="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-primary-foreground font-medium shadow-neu hover:bg-primary/90 transition-all">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
