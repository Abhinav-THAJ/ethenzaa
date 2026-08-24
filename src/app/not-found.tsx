import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-28">
        <div className="max-w-xl w-full text-center space-y-8 p-12 bg-white shadow-2xl rounded-2xl border border-gray-100 transform transition-all duration-500 hover:scale-[1.02]">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="bg-primary/5 p-6 rounded-full inline-block relative border border-primary/20">
              <ShoppingBag size={64} className="text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform rotate-12">
              404
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="font-serif text-5xl md:text-6xl text-gray-900 font-bold tracking-tight">
              Out of Stock
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
              We couldn't find the page you're looking for. It might have been moved or removed entirely.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-all duration-300 rounded-sm font-medium tracking-wide flex items-center justify-center gap-2 group"
            >
              Go to Home
            </Link>
            <Link 
              href="/products"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white hover:bg-opacity-90 transition-all duration-300 rounded-sm font-medium tracking-wide flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Continue Shopping
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
