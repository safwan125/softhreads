import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/wordpress';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
        <div className="aspect-[3/4] overflow-hidden bg-muted relative">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={533}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
          <h3 className="mb-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{product.description}</p>
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-primary">₹{product.salePrice}</span>
                <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  Sale
                </span>
              </>
            ) : (
              <span className="text-foreground">₹{product.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
