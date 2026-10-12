"use client";

import Image from 'next/image';
import { useCart, Product } from '../context/CartContext';
import { ShoppingBag, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  badge?: string;
  oldPrice?: number;
  stockStatus?: string;
}

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product, badge, oldPrice, stockStatus }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const productUrl = `/product/${product.slug || product.id}`;
  const effectiveOldPrice = oldPrice ?? product.oldPrice;
  const isSale = product.onSale || (effectiveOldPrice && effectiveOldPrice > product.price);
  const discountPercent = effectiveOldPrice && effectiveOldPrice > product.price
    ? Math.round(((effectiveOldPrice - product.price) / effectiveOldPrice) * 100)
    : null;

  const displayBadge = badge || (isSale ? (discountPercent ? `${discountPercent}% OFF` : 'SALE') : null);
  const isOutOfStock = stockStatus === 'outofstock' || product.inStock === false;

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-accent flex flex-col h-full">
      {displayBadge && (
        <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-sm shadow-md tracking-wider">
          {displayBadge}
        </div>
      )}
      
      {/* Quick actions on hover */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
        <button 
          aria-label="Add to wishlist"
          className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-primary transition-colors flex items-center justify-center"
        >
          <Heart size={18} />
        </button>
        <Link 
          href={productUrl}
          aria-label="View product"
          className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-primary transition-colors flex items-center justify-center"
        >
          <Eye size={18} />
        </Link>
      </div>

      <div className="relative h-[380px] sm:h-[400px] overflow-hidden w-full bg-gray-50 flex-shrink-0">
        <Link href={productUrl} className="relative block w-full h-full">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110" 
          />
        </Link>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
          {isOutOfStock ? (
            <div className="w-full bg-gray-200 text-gray-600 py-3 text-xs font-semibold uppercase tracking-wider text-center rounded-sm">
              Out of Stock
            </div>
          ) : (
            <button 
              className="w-full bg-white text-text-main py-3 text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 pointer-events-auto rounded-sm shadow"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
                router.push('/checkout');
              }}
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
          )}
        </div>
      </div>
      
      <div className="p-5 text-center flex flex-col flex-1 justify-between">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">{product.category}</div>
          <Link href={productUrl}>
            <h3 className="font-serif text-base sm:text-lg text-text-main mb-2 line-clamp-2 hover:text-primary transition-colors font-medium">
              {product.name}
            </h3>
          </Link>
        </div>
        <div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-primary font-semibold text-lg">₹{product.price.toLocaleString('en-IN')}</span>
            {effectiveOldPrice && effectiveOldPrice > product.price && (
              <span className="text-gray-400 line-through text-sm">₹{effectiveOldPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          {isOutOfStock && <div className="text-xs text-red-500 mt-2 font-medium">Out of Stock</div>}
        </div>
      </div>
    </div>
  );
}
