'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/strapi';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface HomeClientProps {
    featuredProducts: Product[];
    saleProducts: Product[];
}

export function HomeClient({ featuredProducts, saleProducts }: HomeClientProps) {
    return (
        <div>
            {/* Hero Carousel */}
            <section className="mb-16">
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent>
                        {featuredProducts.slice(0, 3).map((product) => (
                            <CarouselItem key={product.id}>
                                <div className="relative h-[500px] bg-muted">
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            priority
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-background z-10">
                                        <div className="container mx-auto">
                                            <p className="text-sm mb-2 opacity-90">Featured Collection</p>
                                            <h2 className="text-3xl md:text-5xl mb-4">{product.name}</h2>
                                            <p className="text-lg mb-6 max-w-xl opacity-90">{product.longDescription}</p>
                                            <Link
                                                href={`/product/${product.id}`}
                                                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded hover:bg-background/90 transition-colors"
                                            >
                                                Shop Now
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </section>

            <div className="container mx-auto px-4">
                {/* Sale Section */}
                {saleProducts.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl mb-2">Limited Time Sale</h2>
                                <p className="text-muted-foreground">Don't miss out on these amazing deals</p>
                            </div>
                            <Link
                                href="/shop"
                                className="hidden md:flex items-center gap-2 text-primary hover:underline"
                            >
                                View All
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {saleProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Featured Products */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl mb-2">Featured Products</h2>
                            <p className="text-muted-foreground">Carefully curated for you</p>
                        </div>
                        <Link
                            href="/shop"
                            className="hidden md:flex items-center gap-2 text-primary hover:underline"
                        >
                            Shop All
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* About Section */}
                <section className="mb-16 bg-card border border-border rounded-lg p-8 md:p-16 text-center">
                    <h2 className="text-3xl mb-4">About softhreads</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        We believe in creating clothing that stands the test of time. Our pieces are designed with
                        sustainability, comfort, and style in mind. Each item is crafted from premium materials
                        and made to be a staple in your wardrobe for years to come.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded hover:bg-primary/90 transition-colors"
                    >
                        Explore Our Collection
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </section>

                {/* Categories Grid */}
                <section className="mb-16">
                    <h2 className="text-3xl mb-8 text-center">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['T-Shirts', 'Hoodies', 'Jeans', 'Outerwear'].map((category) => (
                            <Link
                                key={category}
                                href="/shop"
                                className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow group"
                            >
                                <h3 className="group-hover:text-primary transition-colors">{category}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
