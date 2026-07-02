"use client";

import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // MOCK RAZORPAY INTEGRATION
    setTimeout(() => {
      // Simulate Razorpay popup opening and closing
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <main className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <CheckCircle2 size={80} className="text-green-500 mb-6" />
        <h1 className="font-serif text-4xl text-primary mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-10 text-lg max-w-lg">
          Thank you for your purchase from Empireae. Your luxury items will be processed and shipped shortly.
        </p>
        <Link href="/" className="bg-primary text-white px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-btn-hover transition-colors rounded-sm">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-primary mb-4">Secure Checkout</h1>
        <div className="w-16 h-1 bg-accent mx-auto"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Payment Form */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-serif text-2xl text-accent mb-8 border-b border-gray-100 pb-4">Shipping & Details</h2>
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-sm p-3 focus:ring-primary focus:border-primary outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-sm p-3 focus:ring-primary focus:border-primary outline-none" required />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" className="w-full border border-gray-300 rounded-sm p-3 focus:ring-primary focus:border-primary outline-none" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" className="w-full border border-gray-300 rounded-sm p-3 focus:ring-primary focus:border-primary outline-none" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Complete Shipping Address</label>
              <textarea className="w-full border border-gray-300 rounded-sm p-3 focus:ring-primary focus:border-primary outline-none" rows={3} required></textarea>
            </div>
            
            <div className="mt-10 mb-6 p-4 bg-bg-secondary rounded-sm border border-gray-200">
              <h3 className="font-serif text-lg text-primary mb-2 flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png" alt="Razorpay" className="h-4"/>
                Secure Payment
              </h3>
              <p className="text-xs text-gray-500">You will be securely redirected to Razorpay to complete your purchase using UPI, Cards, NetBanking, or Wallets.</p>
            </div>
            
            <button 
              type="submit" 
              className={`w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-sm rounded-sm transition-colors ${isProcessing || cart.length === 0 ? 'opacity-70 cursor-not-allowed' : 'hover:bg-btn-hover shadow-lg'}`}
              disabled={isProcessing || cart.length === 0}
            >
              {isProcessing ? 'Connecting to Razorpay...' : `Pay ₹${cartTotal.toLocaleString('en-IN')} Securely`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-[400px] flex-shrink-0">
          <div className="bg-bg-secondary p-8 rounded-lg border border-gray-200 sticky top-32">
            <h2 className="font-serif text-2xl text-primary mb-6 border-b border-gray-300 pb-4">Order Summary</h2>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 relative flex-shrink-0 bg-white rounded overflow-hidden">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-text-main line-clamp-2">{item.name}</h4>
                        <div className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</div>
                        <div className="text-primary font-medium text-sm mt-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-300 pt-6 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{cartTotal > 999 ? 'Free' : '₹99'}</span>
                  </div>
                  <div className="flex justify-between font-serif text-xl text-primary pt-4 border-t border-gray-300 mt-4">
                    <span>Total</span>
                    <span>₹{(cartTotal + (cartTotal > 0 && cartTotal < 999 ? 99 : 0)).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
