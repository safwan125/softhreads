import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Shop() {
    const categories = [
        {
            id: 'men',
            title: 'Men',
            description: 'Discover our men\'s collection',
            image: 'https://images.unsplash.com/photo-1642886512785-b5fee9faad7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc2ODI3NzYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            link: '/shop/men',
        },
        {
            id: 'women',
            title: 'Women',
            description: 'Explore our women\'s collection',
            image: 'https://images.unsplash.com/photo-1620777887680-2f19493935a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbnMlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzY4Mjc3NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            link: '/shop/women',
        },
        {
            id: 'kids',
            title: 'Kids',
            description: 'Browse our kids\' collection',
            image: 'https://images.unsplash.com/photo-1713460701364-940099d3e370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZmFzaGlvbiUyMGNoaWxkcmVufGVufDF8fHx8MTc2ODI3NzYwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            link: '/shop/kids',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl mb-4">Shop by Category</h1>
                <p className="text-muted-foreground text-lg">Choose your collection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={category.link}
                        className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                        {/* Image Container */}
                        <div className="relative h-[400px] overflow-hidden">
                            <Image
                                src={category.image}
                                alt={category.title}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Animated Border Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 border-2 border-primary/50 rounded-lg animate-pulse" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-background transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h2 className="text-3xl mb-2 group-hover:text-4xl transition-all duration-300">
                                {category.title}
                            </h2>
                            <p className="text-sm opacity-90 mb-4">{category.description}</p>

                            {/* Arrow that appears on hover */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                <span className="text-sm">Shop Now</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Active Click Effect */}
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
