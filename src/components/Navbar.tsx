"use client";

import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Heart, Search, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // For mobile accordion

  useEffect(() => setMounted(true), []);

  const categories = [
    { name: 'Women', path: '/products/women' },
    { name: 'Men', path: '/products/men' },
    { name: 'Kids', path: '/products/kids' },
    { name: 'Plus Size', path: '/products/plus-size' },
  ];

  const collections = [
    { name: 'New Arrivals', path: '/products/new-arrivals' },
    { name: 'Best Sellers', path: '/products/best-sellers' },
    { name: 'Offers', path: '/products/offers' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-bg-primary/95 backdrop-blur-md border-b border-gray-200 z-[1000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center h-full w-40 justify-center">
              <Link href="/" className="flex items-center justify-center">
                <img src="/images/eth.png" alt="Ethenzaa Logo" className="h-20 w-auto object-contain scale-[2] -translate-y-1.5" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/" className="text-text-main hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide">
                Home
              </Link>
              
              {/* Category Dropdown */}
              <div className="relative group h-20 flex items-center">
                <button className="text-text-main group-hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide flex items-center gap-1">
                  Categories <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-20 left-0 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    {categories.map((cat) => (
                      <Link key={cat.name} href={cat.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-bg-secondary hover:text-primary transition-colors">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Collections Dropdown */}
              <div className="relative group h-20 flex items-center">
                <button className="text-text-main group-hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide flex items-center gap-1">
                  Collections <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-20 left-0 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    {collections.map((col) => (
                      <Link key={col.name} href={col.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-bg-secondary hover:text-primary transition-colors">
                        {col.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/about" className="text-text-main hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide">
                About Us
              </Link>
              <Link href="/contact" className="text-text-main hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide">
                Contact
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button className="text-text-main hover:text-primary transition-colors hidden sm:block">
                <Search size={20} />
              </button>
              <button className="text-text-main hover:text-primary transition-colors hidden sm:block">
                <User size={20} />
              </button>
              <button className="text-text-main hover:text-primary transition-colors hidden sm:block">
                <Heart size={20} />
              </button>
              <button 
                className="text-text-main hover:text-primary transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden text-text-main"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-bg-primary border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-base font-medium text-text-main hover:text-primary hover:bg-bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              
              <div>
                <button 
                  className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-text-main hover:text-primary hover:bg-bg-secondary"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  Categories <ChevronDown size={18} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryOpen && (
                  <div className="pl-6 space-y-1 bg-gray-50 py-2">
                    {categories.map((cat) => (
                      <Link key={cat.name} href={cat.path} className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-200 mt-2">
                <span className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Collections</span>
                {collections.map((col) => (
                  <Link key={col.name} href={col.path} className="block px-3 py-2 text-base font-medium text-text-main hover:text-primary hover:bg-bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                    {col.name}
                  </Link>
                ))}
              </div>

              <Link href="/about" className="block px-3 py-2 text-base font-medium text-text-main hover:text-primary hover:bg-bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link href="/contact" className="block px-3 py-2 text-base font-medium text-text-main hover:text-primary hover:bg-bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  );
}
