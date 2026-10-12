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
  slug?: string;
  oldPrice?: number;
  regularPrice?: number;
  onSale?: boolean;
  stockStatus?: string;
  inStock?: boolean;
  categories?: string[];
};

export default function ShopLayout({ initialProducts = [], title }: { initialProducts: Product[], title: string }) {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  const handleFilterChange = (section: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[section] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      
      return { ...prev, [section]: updated };
    });
  };

  const clearAllFilters = () => setSelectedFilters({});

  // Filter logic
  let filteredProducts = initialProducts.filter(product => {
    // Check 'Category' filter
    if (selectedFilters['Category']?.length > 0) {
      const selectedCats = selectedFilters['Category'].map(c => c.toLowerCase());
      const productCats = (product.categories || [product.category]).map(c => c?.toLowerCase());
      const hasMatch = selectedCats.some(cat => productCats.includes(cat));
      if (!hasMatch) return false;
    }
    // Check 'Color' filter
    if (selectedFilters['Color']?.length > 0) {
      if (!product.color || !selectedFilters['Color'].includes(product.color)) return false;
    }
    return true;
  });

  // Sort logic
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].reverse();
  }

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  const availableCategories = Array.from(
    new Set(initialProducts.flatMap(p => p.categories || [p.category]))
  )
    .filter(Boolean)
    .filter(c => c.toLowerCase() !== 'uncategorized');

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 capitalize">{title}</h1>
        <div className="w-20 h-1 bg-accent mx-auto"></div>
      </div>
      
      {/* Sidebar — only visible when toggled */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {isFilterOpen && (
          <SidebarFilter 
            selectedFilters={selectedFilters} 
            onFilterChange={handleFilterChange} 
            availableCategories={availableCategories}
          />
        )}
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 flex-wrap gap-4">
            {/* Filter toggle button */}
            <div className="flex items-center gap-3">
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

              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-primary underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">{filteredProducts.length} Products</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-sm p-2 outline-none focus:border-primary text-gray-700 bg-white cursor-pointer"
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              isFilterOpen
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg p-8">
              <p className="text-lg font-medium text-gray-700 mb-2">No products found matching your filters.</p>
              <p className="text-sm text-gray-500 mb-6">Try clearing filters or browse all our collections.</p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="bg-primary text-white text-xs uppercase tracking-wider font-semibold px-6 py-2.5 rounded-sm hover:bg-[#6c0f2b] transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
