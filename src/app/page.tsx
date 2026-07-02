"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones, Star, Heart } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: "Women's Collection", image: '/images/ethenzaa_women.png', link: '/products/women' },
    { name: "Men's Collection", image: '/images/ethenzaa_men.png', link: '/products/men' },
    { name: "Kids Collection", image: '/images/ethenzaa_hero.png', link: '/products/kids' },
    { name: "Plus Size", image: '/images/ethenzaa_women.png', link: '/products/plus-size' },
  ];

  const dummyProducts = [
    { id: '1', name: 'Premium Burgundy Silk Saree', price: 12999, image: '/images/ethenzaa_women.png', category: 'Women' },
    { id: '2', name: 'Contemporary Men Kurta Set', price: 8499, image: '/images/ethenzaa_men.png', category: 'Men' },
    { id: '3', name: 'Luxury Zari Woven Lehenga', price: 18999, image: '/images/ethenzaa_hero.png', category: 'Women' },
    { id: '4', name: 'Classic Bandhgala Suit', price: 15499, image: '/images/ethenzaa_men.png', category: 'Men' },
  ];

  const features = [
    { icon: <ShieldCheck size={32} />, title: 'Premium Quality', desc: 'Highest grade fabrics' },
    { icon: <Truck size={32} />, title: 'Fast Delivery', desc: 'Pan India shipping' },
    { icon: <RefreshCw size={32} />, title: 'Easy Returns', desc: '14-day hassle free' },
    { icon: <Headphones size={32} />, title: '24/7 Support', desc: 'Always here to help' },
  ];

  return (
    <main className="w-full">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image src="/images/ethenzaa_hero.png" alt="Ethenzaa Hero" fill className="object-cover object-[center_35%]" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6 max-w-3xl">
              Discover Fashion<br/> <span className="text-accent">That Defines You</span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-10 max-w-2xl text-gray-200">
              Premium Ethnic & Contemporary Wear Designed For Style, Comfort, And Confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products/women" className="bg-primary hover:bg-btn-hover text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-all">Shop Women</Link>
              <Link href="/products/new-arrivals" className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-black text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-all">New Arrivals</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: BRAND INTRODUCTION */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h2 className="font-serif text-4xl text-primary mb-6">Welcome to Empireae</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Weaving Style. Inspiring Confidence. As a premium fashion and lifestyle brand, we specialize in bringing you the finest ethnic and contemporary wear. Discover affordable luxury crafted with high-quality fabrics, embracing modern trends while ensuring utmost customer satisfaction.
          </p>
          <Image src="/images/ethenzaa_women.png" alt="Brand Intro" width={800} height={400} className="w-full h-[400px] object-cover rounded-sm shadow-xl" />
        </div>
      </section>

      {/* SECTION 3: FEATURED CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-primary mb-4">Shop By Category</h2>
            <p className="text-gray-500 uppercase tracking-widest text-sm">Curated selections for every occasion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link href={cat.link} key={idx} className="group relative h-[400px] overflow-hidden block">
                <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white font-serif text-2xl mb-2">{cat.name}</h3>
                  <span className="text-accent flex items-center gap-2 text-sm uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: NEW ARRIVALS */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl text-primary mb-2">New Arrivals</h2>
              <p className="text-gray-500 uppercase tracking-widest text-sm">Fresh off the runway</p>
            </div>
            <Link href="/products/new-arrivals" className="hidden md:flex items-center gap-2 text-primary hover:text-accent font-semibold uppercase tracking-wider text-sm transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dummyProducts.map(p => <ProductCard key={p.id} product={p} badge="NEW" />)}
          </div>
        </div>
      </section>

      {/* SECTION 5: BEST SELLERS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-primary mb-4">Best Sellers</h2>
            <p className="text-gray-500 uppercase tracking-widest text-sm">Our most loved masterpieces</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dummyProducts.slice().reverse().map(p => <ProductCard key={p.id} product={p} badge="BESTSELLER" />)}
          </div>
        </div>
      </section>

      {/* SECTION 6: SPECIAL OFFERS */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/ethenzaa_hero.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">Exclusive Fashion Deals</h2>
          <p className="text-xl text-accent mb-10 font-light">Discover Limited-Time Offers On Our Most Loved Collections.</p>
          <Link href="/products/offers" className="inline-block bg-white text-primary hover:bg-accent hover:text-white px-10 py-4 uppercase tracking-widest text-sm font-bold transition-colors">
            Claim Offer Now
          </Link>
        </div>
      </section>

      {/* SECTION 7: WHY SHOP WITH US */}
      <section className="py-20 bg-bg-secondary border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-accent mb-4">{feature.icon}</div>
                <h4 className="font-serif text-lg text-primary mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CUSTOMER TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl text-primary mb-16">The ETHENZAA Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-bg-primary p-10 rounded-sm border border-gray-100">
                <div className="flex justify-center text-accent mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="italic text-gray-600 mb-8">"The quality of the fabric is exceptional. I felt truly luxurious wearing the ETHENZAA collection at my recent event. The craftsmanship is world-class."</p>
                <div className="font-semibold text-primary uppercase text-sm tracking-wider">- Luxury Client</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: INSTAGRAM FEED */}
      <section className="py-10">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl text-primary mb-2">Follow Us @ethenzaaloomfashion</h2>
          <a href="#" className="text-accent hover:text-primary transition-colors text-sm uppercase tracking-widest font-semibold">Join our community</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[1,2,3,4].map(i => (
            <div key={i} className="relative aspect-square overflow-hidden group cursor-pointer">
              <Image src={`/images/ethenzaa_${i % 2 === 0 ? 'women' : 'men'}.png`} alt="Insta" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart className="text-white" size={32} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10 & 11: NEWSLETTER & FINAL CTA */}
      <section className="py-32 bg-[#111] text-center border-b-4 border-accent">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Elevate Your Wardrobe Today</h2>
          <p className="text-gray-400 mb-10 text-lg">Stay Ahead Of Fashion Trends. Subscribe to receive exclusive access to new collections and early sale previews.</p>
          
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4 mb-12">
            <input type="email" placeholder="Enter your email address" className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-4 outline-none focus:border-accent transition-colors" required />
            <button type="submit" className="bg-accent hover:bg-white hover:text-black text-white px-8 py-4 font-bold uppercase tracking-wider transition-colors">Subscribe</button>
          </form>

          <Link href="/products" className="inline-block border-2 border-primary text-white hover:bg-primary px-12 py-4 uppercase tracking-widest text-sm font-bold transition-all">
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
