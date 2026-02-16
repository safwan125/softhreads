export default function ReturnsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8 text-primary">Returns & Exchanges</h1>

            <div className="space-y-8 bg-bg p-8 rounded-2xl shadow-neu">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Our Policy</h2>
                    <p className="text-secondary leading-relaxed">
                        We want you to love your purchase. If you are not completely satisfied, you may return items within 30 days of delivery for a full refund or exchange. Items must be unworn, unwashed, and in their original condition with tags attached.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">How to Return</h2>
                    <ul className="list-disc list-inside space-y-2 text-secondary ml-4">
                        <li>Visit our Returns Portal to initiate a return.</li>
                        <li>Print the prepaid shipping label provided.</li>
                        <li>Pack your items securely and attach the label.</li>
                        <li>Drop off the package at any authorized shipping location.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
                    <p className="text-secondary leading-relaxed">
                        Once we receive your return, please allow 5-7 business days for processing. Refunds will be issued to the original payment method. You will receive an email confirmation once your refund has been processed.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
                    <p className="text-secondary leading-relaxed">
                        Need a different size or color? The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
                    </p>
                </section>
            </div>
        </div>
    );
}
