"use client";

import { useState } from 'react';
import SidebarFilter from './SidebarFilter';
import ProductCard from './ProductCard';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  type?: string;
  color?: string;
};

export default function ShopLayout({ initialProducts, title }: { initialProducts: Product[], title: string }) {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  const handleFilterChange = (section: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[section] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      
      return { ...prev, [section]: updated };
    });
  };

  // Filter logic
  const filteredProducts = initialProducts.filter(product => {
    // Check 'Category' filter (which maps to product.type in our mock data)
    if (selectedFilters['Category']?.length > 0) {
      if (!product.type || !selectedFilters['Category'].includes(product.type)) return false;
    }
    // Check 'Color' filter
    if (selectedFilters['Color']?.length > 0) {
      if (!product.color || !selectedFilters['Color'].includes(product.color)) return false;
    }
    return true;
  });

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 capitalize">{title}</h1>
        <div className="w-20 h-1 bg-accent mx-auto"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <SidebarFilter selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-500">Showing {filteredProducts.length} Products</span>
            <select className="text-sm border border-gray-200 rounded-sm p-2 outline-none focus:border-primary text-gray-700 bg-white">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              No products found matching your filters.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
