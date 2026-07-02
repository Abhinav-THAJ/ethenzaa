"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQs() {
  const faqs = [
    { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, UPI, Net Banking, and select mobile wallets through our secure Razorpay payment gateway." },
    { q: "Do you ship internationally?", a: "Currently, we offer Pan India shipping. We are working on expanding our delivery network internationally soon." },
    { q: "How can I track my order?", a: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order status in your Account dashboard." },
    { q: "What is your return policy?", a: "We offer a 14-day hassle-free return and exchange policy for most items. Please refer to our Return & Refund Policy for detailed information." },
    { q: "How do I know my size?", a: "We provide a detailed size chart on every product page. If you are between sizes, we recommend sizing up for comfort." }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <main className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">Frequently Asked Questions</h1>
        <div className="w-20 h-1 bg-accent mx-auto"></div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <button 
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span className="font-serif text-lg text-primary">{faq.q}</span>
              <ChevronDown className={`text-accent transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-6 py-4 text-gray-600 border-t border-gray-100">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
