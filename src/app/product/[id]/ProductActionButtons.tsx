"use client";
import { useCart, Product } from '../../../context/CartContext';
import { ShoppingBag, Heart, Share2, CreditCard } from 'lucide-react';
import Script from 'next/script';
import { useState } from 'react';

export default function ProductActionButtons({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuyNow = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(String(product.price)) || 0,
          receipt: `rcpt_${product.id}`,
        })
      });
      
      const order = await response.json();
      
      if (order.error) {
        throw new Error(order.error);
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Orchid Designs",
        description: `Purchase of ${product.name}`,
        order_id: order.id,
        handler: function (response: any) {
            alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
            // In a real app, you would verify the payment signature here
        },
        theme: {
            color: "#800020" // Primary brand color
        }
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
              alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Failed to initialize payment. Please make sure Razorpay keys are set.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <button 
            onClick={() => addToCart(product)}
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
          onClick={handleBuyNow}
          disabled={isProcessing}
          className="w-full bg-primary text-white py-4 font-medium tracking-wide uppercase hover:bg-[#6c0f2b] transition-colors flex items-center justify-center gap-2 rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <CreditCard size={20} /> {isProcessing ? 'Processing...' : 'Buy It Now'}
        </button>
      </div>
    </>
  );
}
