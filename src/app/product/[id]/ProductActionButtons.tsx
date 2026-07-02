"use client";
import { useCart, Product } from '../../../context/CartContext';
import { ShoppingBag, Heart, Share2 } from 'lucide-react';

export default function ProductActionButtons({ product }: { product: Product }) {
  const { addToCart } = useCart();
  
  return (
    <div className="flex gap-4">
      <button 
        onClick={() => addToCart(product)}
        className="flex-1 bg-primary text-white py-4 font-medium tracking-wide uppercase hover:bg-[#6c0f2b] transition-colors flex items-center justify-center gap-2 rounded-sm"
      >
        <ShoppingBag size={20} /> Add To Cart
      </button>
      <button className="w-14 h-14 border border-gray-300 rounded-sm flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors">
        <Heart size={22} />
      </button>
      <button className="w-14 h-14 border border-gray-300 rounded-sm flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors">
        <Share2 size={22} />
      </button>
    </div>
  );
}
