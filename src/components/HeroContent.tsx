"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroContent() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6 max-w-3xl">
        Discover Fashion<br/> <span className="text-accent">That Defines You</span>
      </h1>
      <p className="text-lg md:text-xl font-light mb-10 max-w-2xl text-gray-200">
        Premium Ethnic & Contemporary Wear Designed For Style, Comfort, And Confidence.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link href="/products" className="bg-primary hover:bg-btn-hover text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-all">Shop Now</Link>
        <Link href="/products/new-arrivals" className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-black text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-all">New Arrivals</Link>
      </div>
    </motion.div>
  );
}
