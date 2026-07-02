"use client";

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2000] flex justify-end" onClick={() => setIsCartOpen(false)}>
      <div 
        className="w-full max-w-[400px] bg-bg-primary h-full border-l border-gray-200 p-6 flex flex-col animate-[slideIn_0.3s_ease_forwards]" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
          <h2 className="font-serif text-accent text-2xl">Your Cart</h2>
          <button className="text-gray-500 hover:text-primary transition-colors" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBagIcon />
              <p className="mt-4">Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 text-primary hover:text-accent uppercase text-sm font-semibold tracking-wider"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                <div className="relative w-20 h-24 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="font-semibold text-text-main text-sm line-clamp-2 mb-1">{item.name}</h4>
                  <div className="text-primary font-medium text-sm mb-auto">₹{item.price.toLocaleString('en-IN')}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button className="px-2 py-1 text-gray-500 hover:bg-gray-50" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                      <span className="px-2 text-sm font-medium">{item.quantity}</span>
                      <button className="px-2 py-1 text-gray-500 hover:bg-gray-50" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                    </div>
                    <button className="text-red-400 hover:text-red-600 p-1" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center text-lg font-bold mb-6">
              <span>Total:</span>
              <span className="text-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <Link 
              href="/checkout" 
              className="block w-full bg-primary hover:bg-btn-hover text-white text-center py-4 uppercase tracking-widest text-sm font-bold rounded-sm transition-colors" 
              onClick={() => setIsCartOpen(false)}
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ShoppingBagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
      <path d="M3 6h18"></path>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
}
