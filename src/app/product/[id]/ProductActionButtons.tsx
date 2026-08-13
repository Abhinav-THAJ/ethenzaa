"use client";
import { useCart, Product } from '../../../context/CartContext';
import { ShoppingBag, Heart, Share2, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductActionButtons({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const router = useRouter();

  const handleAction = () => {
    addToCart(product);
    setIsCartOpen(false);
    router.push('/checkout');
  };
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <button 
          onClick={handleAction}
          className="flex-1 bg-white border-2 border-primary text-primary py-3.5 font-medium tracking-wide uppercase hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 rounded-sm"
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
      <button 
        onClick={handleAction}
        className="w-full bg-primary text-white py-4 font-medium tracking-wide uppercase hover:bg-[#6c0f2b] transition-colors flex items-center justify-center gap-2 rounded-sm"
      >
        <CreditCard size={20} /> Buy It Now
      </button>
    </div>
  );
}
