"use client";

import { Star } from "lucide-react";

const reviews = [
    {
        text: "Finally found a brand that understands quality. The TENCEL fabric is a game-changer for Mumbai's humidity.",
        author: "Priya S.",
        type: "Verified Buyer"
    },
    {
        text: "I've replaced my entire wardrobe with SOFTHREADS essentials. Fit is perfect and no shrinkage at all.",
        author: "Rahul K.",
        type: "Verified Buyer"
    }
];

export default function Reviews() {
    return (
        <section className="py-16 bg-[#F9F8F6]"> {/* Slightly warmer/lighter beige */}
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#8A8A8A] uppercase block mb-3">
                        What Our Community Says
                    </span>
                    <h2 className="text-4xl font-serif text-primary">Reviews & Stories</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="bg-white p-8 md:p-10 rounded-sm shadow-sm flex flex-col justify-between min-h-[250px]">
                            <div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-[#8C7355] text-[#8C7355]" />
                                    ))}
                                </div>
                                <p className="text-lg text-primary/80 leading-relaxed font-normal">
                                    "{review.text}"
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-8">
                                <div className="w-10 h-10 rounded-full bg-[#E5E0D8] flex items-center justify-center text-primary font-serif">
                                    {review.author[0]}
                                </div>
                                <div>
                                    <p className="font-semibold text-primary">{review.author}</p>
                                    <p className="text-xs text-secondary uppercase tracking-wider">{review.type}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
