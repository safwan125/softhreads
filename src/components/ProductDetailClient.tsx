'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/wordpress';
import { reviews as dummyReviews, Review } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Star, Check, ShoppingCart, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { SizeGuideModal } from '@/components/SizeGuideModal';

interface ProductDetailClientProps {
    product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart } = useCart();
    // Use dummy reviews filtering by ID
    // We can show all reviews or random ones for demo if IDs mismatch.
    // For now, try to match if possible, else show some.
    const productReviews = dummyReviews.filter(r => r.productId === product.id) || dummyReviews.slice(0, 3);

    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const averageRating = productReviews.length > 0
        ? productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length
        : 0;

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }
        addToCart({
            id: product.id,
            databaseId: product.databaseId,
            name: product.name,
            price: product.price,
            image: product.image,
        }, selectedColor, selectedSize, quantity);
        toast.success('Added to cart!');
    };

    if (!product) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Shop
            </Link>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
                {/* Product Image */}
                <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden relative">
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
                </div>

                {/* Product Info */}
                <div>
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <h1 className="text-4xl mb-4">{product.name}</h1>

                    {/* Rating */}
                    {productReviews.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= averageRating
                                            ? 'fill-primary text-primary'
                                            : 'text-muted-foreground'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                ({productReviews.length} {productReviews.length === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-6">
                        {product.salePrice ? (
                            <>
                                <span className="text-3xl text-primary">₹{product.salePrice}</span>
                                <span className="text-xl text-muted-foreground line-through">₹{product.price}</span>
                                <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded">
                                    Save ₹{product.price - product.salePrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl">₹{product.price}</span>
                        )}
                    </div>

                    <p className="text-muted-foreground mb-8">{product.longDescription}</p>

                    {/* Color Selection */}
                    {product.colors && product.colors.length > 0 && (
                        <div className="mb-6">
                            <p className="mb-3">Color: <span className="text-muted-foreground">{selectedColor}</span></p>
                            <div className="flex gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name
                                            ? 'border-primary ring-2 ring-primary ring-offset-2'
                                            : 'border-border hover:border-primary'
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}



                    // ... (existing code)

                    {/* Size Selection */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <p>Size: {selectedSize && <span className="text-muted-foreground">{selectedSize}</span>}</p>
                                <SizeGuideModal />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded transition-colors ${selectedSize === size
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'border-border hover:border-primary'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="mb-8">
                        <p className="mb-3">Quantity</p>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </Button>
                            <span className="w-12 text-center">{quantity}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <Button
                        onClick={handleAddToCart}
                        className="w-full mb-4"
                        size="lg"
                        disabled={!product.inStock}
                    >
                        {product.inStock ? (
                            <>
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Add to Cart
                            </>
                        ) : (
                            'Out of Stock'
                        )}
                    </Button>

                    {/* Product Features */}
                    <div className="border-t border-border pt-6 space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Check className="w-4 h-4 text-primary" />
                            Free shipping on orders over ₹100
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Check className="w-4 h-4 text-primary" />
                            30-day return policy
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Check className="w-4 h-4 text-primary" />
                            Sustainable materials
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            {productReviews.length > 0 && (
                <div>
                    <h2 className="text-3xl mb-8">Customer Reviews</h2>
                    <div className="space-y-6">
                        {productReviews.map((review) => (
                            <div key={review.id} className="border border-border rounded-lg p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="font-medium">{review.author}</p>
                                        <p className="text-sm text-muted-foreground">{review.date}</p>
                                    </div>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= review.rating
                                                    ? 'fill-primary text-primary'
                                                    : 'text-muted-foreground'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted-foreground">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
