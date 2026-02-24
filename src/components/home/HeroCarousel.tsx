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
        title: "Maxi Gown",
        subtitle: "Premium Navy Embroidered Modest Maxi Gown. Delicate floral embroidery, gathered yoke design, full sleeves.",
        image: "https://cdn.shopify.com/s/files/1/0811/2373/7848/files/IMG_1249_09dfd08a-ccea-4e55-9c94-6d68f9846de4.png?v=1771424224",
        cta: "Shop Now",
        link: "/product/maxi-gown"
    },
    {
        id: 2,
        title: "Banarasi Saree",
        subtitle: "Exquisite Banarasi Saree perfect for festive occasions and celebrations.",
        image: "https://cdn.shopify.com/s/files/1/0811/2373/7848/files/dd5a141c-f7ee-416a-b1cb-31d94bb49709.jpg?v=1771448028",
        cta: "Shop Now",
        link: "/product/urban-denim-jacket"
    },
    {
        id: 3,
        title: "Luxury Cotton Kurta Set",
        subtitle: "Premium pink embroidered kurta set with matching dupatta. Elegant floral detailing, breathable fabric & perfect for festive and formal wear.",
        image: "https://cdn.shopify.com/s/files/1/0811/2373/7848/files/IMG_1166.png?v=1771424456",
        cta: "Shop Now",
        link: "/product/summer-breeze-dress"
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
                            <Button size="lg" asChild className="rounded-full px-8 py-6 text-lg bg-white text-primary hover:bg-gray-100 shadow-xl border-none animate-in zoom-in-50 duration-500 delay-500 cursor-pointer">
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
