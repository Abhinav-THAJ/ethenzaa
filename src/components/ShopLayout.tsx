"use client";

import { useState } from 'react';
import SidebarFilter from './SidebarFilter';
import ProductCard from './ProductCard';
import { Filter, X } from 'lucide-react';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 capitalize">{title}</h1>
        <div className="w-20 h-1 bg-accent mx-auto"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar — only visible when toggled */}
        {isFilterOpen && (
          <SidebarFilter selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
        )}
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            {/* Filter toggle button */}
            <button
              onClick={() => setIsFilterOpen(prev => !prev)}
              className="flex items-center gap-2 text-sm font-medium text-text-main border border-gray-200 rounded-sm px-4 py-2 hover:border-primary hover:text-primary transition-colors relative"
            >
              {isFilterOpen ? <X size={16} /> : <Filter size={16} />}
              {isFilterOpen ? 'Close Filters' : 'Filters'}
              {!isFilterOpen && activeFilterCount > 0 && (
                <span className="ml-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-4">
              <select className="text-sm border border-gray-200 rounded-sm p-2 outline-none focus:border-primary text-gray-700 bg-white">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              isFilterOpen
                ? 'grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
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
