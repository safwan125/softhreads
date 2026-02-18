"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const slides = [
    {
        id: 1,
        title: "Summer Collection 2026",
        subtitle: "Experience comfort like never before.",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&auto=format&fit=crop&q=80",
        cta: "Shop Women",
        link: "/shop/women"
    },
    {
        id: 2,
        title: "Men's Urban Essentials",
        subtitle: "Redefine your street style with our new arrivals.",
        image: "https://images.unsplash.com/photo-1488161628813-99425205ad54?w=1600&auto=format&fit=crop&q=80",
        cta: "Shop Men",
        link: "/shop/men"
    },
    {
        id: 3,
        title: "Limited Edition Drops",
        subtitle: "Exclusive designs. Premium fabrics.",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=80",
        cta: "Shop All",
        link: "/shop"
    }
];

export default function HeroCarousel() {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
            className="w-full shadow-neu rounded-2xl overflow-hidden bg-bg"
        >
            <CarouselContent>
                {slides.map((slide) => (
                    <CarouselItem key={slide.id} className="relative aspect-[3/4] md:aspect-[21/9]">
                        {/* Mobile: Taller aspect ratio for better impact */}
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Clean Overlay - No Glass/Blur */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/30">
                            <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-md animate-in slide-in-from-bottom-5 duration-700 fade-in">
                                {slide.title}
                            </h2>
                            <p className="text-base md:text-xl font-medium mb-8 max-w-xs md:max-w-lg text-white/90 drop-shadow-sm animate-in slide-in-from-bottom-5 duration-700 delay-200 fade-in">
                                {slide.subtitle}
                            </p>
                            <Button size="lg" asChild className="rounded-full px-8 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl border-none animate-in zoom-in-50 duration-500 delay-500 cursor-pointer">
                                {/* Use asChild to avoid hydration issues with nesting if strictly needed, but Button usually handles generic props. 
                                    Actually, the slide has a 'link'. We should wrap the button or make it a Link.
                                */}
                                <a href={slide.link}>{slide.cta}</a>
                            </Button>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/80 text-primary border-none hover:bg-white shadow-md" />
            <CarouselNext className="right-4 bg-white/80 text-primary border-none hover:bg-white shadow-md" />
        </Carousel>
    );
}
