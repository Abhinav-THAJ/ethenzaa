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

export default function ProductCard({ product, badge, oldPrice, stockStatus }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-accent">
      {badge && (
        <div className="absolute top-4 left-4 z-10 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-sm shadow-md">
          {badge}
        </div>
      )}
      
      {/* Quick actions on hover */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
        <button className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-primary transition-colors flex items-center justify-center">
          <Heart size={18} />
        </button>
        <Link href={`/product/${product.id}`} className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-primary transition-colors flex items-center justify-center">
          <Eye size={18} />
        </Link>
      </div>

      <div className="relative h-[400px] overflow-hidden w-full bg-gray-50">
        <Link href={`/product/${product.id}`}>
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110" 
          />
        </Link>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
          <button 
            className="w-full bg-white text-text-main py-3 text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
        </div>
      </div>
      
      <div className="p-5 text-center">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">{product.category}</div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-lg text-text-main mb-2 line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-center gap-3">
          <span className="text-primary font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
          {oldPrice && <span className="text-gray-400 line-through text-sm">₹{oldPrice.toLocaleString('en-IN')}</span>}
        </div>
        {stockStatus && <div className="text-xs text-red-500 mt-3 font-medium">{stockStatus}</div>}
      </div>
    </div>
  );
}
