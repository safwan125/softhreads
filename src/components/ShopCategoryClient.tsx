'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/wordpress';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft } from 'lucide-react';

interface ShopCategoryClientProps {
    products: Product[];
    categorySlug: string;
}

export function ShopCategoryClient({ products, categorySlug }: ShopCategoryClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('featured');

    const categoryName = categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) : 'Shop';

    // Get unique categories (T-Shirts, Hoodies...) from the already gender-filtered products
    const productCategories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

    let filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    // Sort products
    if (sortBy === 'price-low') {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            (a.salePrice || a.price) - (b.salePrice || b.price)
        );
    } else if (sortBy === 'price-high') {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            (b.salePrice || b.price) - (a.salePrice || a.price)
        );
    } else if (sortBy === 'name') {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Categories
            </Link>

            <div className="mb-8">
                <h1 className="text-4xl mb-2">{categoryName}'s Collection</h1>
                <p className="text-muted-foreground">Discover our complete {categoryName.toLowerCase()}'s collection</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-6 border-b border-border">
                <div className="flex-1">
                    <p className="text-sm mb-2 text-muted-foreground">Category</p>
                    <div className="flex flex-wrap gap-2">
                        {productCategories.length > 1 ? productCategories.map((cat) => (
                            <Button
                                key={cat}
                                variant={selectedCategory === cat ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat === 'all' ? 'All' : cat}
                            </Button>
                        )) : (
                            <span className="text-sm italic text-muted-foreground">No sub-categories available</span>
                        )}
                    </div>
                </div>

                <div className="w-full sm:w-48">
                    <p className="text-sm mb-2 text-muted-foreground">Sort by</p>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="name">Name: A-Z</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">No products found for this selection.</p>
                </div>
            )}

            {/* Product Count */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>
        </div>
    );
}
