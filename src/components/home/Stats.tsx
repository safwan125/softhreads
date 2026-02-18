"use client";

export default function Stats() {
    return (
        <section className="py-12 bg-[#F9F8F6] border-t border-secondary/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 text-center">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-serif text-primary mb-2">998</h3>
                        <p className="text-secondary text-sm md:text-base">Happy Customers</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-serif text-primary mb-2">4.5</h3>
                        <p className="text-secondary text-sm md:text-base">Average Rating</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
