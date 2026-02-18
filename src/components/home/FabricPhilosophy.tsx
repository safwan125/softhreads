"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Droplets, Sprout, Sparkles } from "lucide-react";

const features = [
    {
        icon: <Leaf className="w-6 h-6 text-green-700" />,
        title: "TENCEL™ Modal",
        description: "Silky-smooth, derived from beechwood. Perfect for sensitive skin.",
        link: "/shop?q=modal",
        color: "bg-[#E6F4EA]" // Light Green
    },
    {
        icon: <Droplets className="w-6 h-6 text-blue-700" />,
        title: "TENCEL™ Lyocell",
        description: "Breathable and moisture-wicking from eucalyptus wood pulp.",
        link: "/shop?q=lyocell",
        color: "bg-[#EBF3F9]" // Light Blue
    },
    {
        icon: <Sprout className="w-6 h-6 text-emerald-700" />,
        title: "GOTS Organic Cotton",
        description: "Certified organic, grown without harmful pesticides.",
        link: "/shop?q=organic",
        color: "bg-[#F3EFE0]" // Beige/Tan
    },
    {
        icon: <Sparkles className="w-6 h-6 text-orange-700" />,
        title: "Supima Cotton",
        description: "Extra-long staple American cotton for lasting softness.",
        link: "/shop?q=supima",
        color: "bg-[#F5E6D3]" // Warm Beige
    }
];

export default function FabricPhilosophy() {
    return (
        <section className="py-16 md:py-24 bg-white/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                    {/* Left Content */}
                    <div className="lg:w-1/3 flex flex-col justify-center space-y-6 pt-8">
                        <span className="text-sm font-bold tracking-widest text-[#8A8A8A] uppercase">
                            Our Philosophy
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
                            We choose fabric before design.
                        </h2>
                        <p className="text-secondary text-lg leading-relaxed">
                            Every SOFTHREADS piece begins with the fabric. We source only the world's finest sustainable materials—TENCEL™ Lyocell, GOTS-certified Organic Cotton, and premium Supima Cotton—because what touches your skin matters.
                        </p>
                        <Link href="/about" className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors mt-4">
                            Learn About Our Fabrics <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>

                    {/* Right Grid (Desktop) / Scroll (Mobile) */}
                    <div className="lg:w-2/3 w-full">
                        {/* Mobile Scroll Setup: -mx-4 to go edge-to-edge, px-4 to pad start, snap-x for snapping */}
                        <div className="flex lg:grid lg:grid-cols-2 gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className={`${feature.color} min-w-[280px] lg:min-w-0 snap-center rounded-3xl p-8 flex flex-col items-start justify-between h-[300px] transition-transform hover:-translate-y-1 duration-300`}
                                >
                                    <div className="bg-white/60 p-3 rounded-2xl mb-4">
                                        {feature.icon}
                                    </div>
                                    <div className="space-y-3 mb-6">
                                        <h3 className="font-serif text-2xl text-primary">{feature.title}</h3>
                                        <p className="text-primary/70 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <Link href={feature.link} className="text-sm font-semibold text-primary/80 hover:text-primary flex items-center mt-auto">
                                        View Products <ArrowRight className="ml-2 w-3 h-3" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
