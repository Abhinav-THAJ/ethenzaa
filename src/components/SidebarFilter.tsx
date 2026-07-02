"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

type SidebarFilterProps = {
  selectedFilters?: { [key: string]: string[] };
  onFilterChange?: (section: string, option: string) => void;
};

export default function SidebarFilter({ selectedFilters = {}, onFilterChange }: SidebarFilterProps) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    'Category': true,
    'Size': true,
    'Color': true,
    'Price Range': true,
    'Availability': true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filterSections = [
    {
      title: 'Category',
      options: ['Sarees', 'Kurtis', 'Co-ord Sets', 'Dresses', 'Shirts', 'Ethnic Wear']
    },
    {
      title: 'Size',
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom Fit']
    },
    {
      title: 'Color',
      options: ['Burgundy', 'Champagne Gold', 'Ivory White', 'Midnight Black', 'Emerald Green', 'Royal Blue']
    },
    {
      title: 'Price Range',
      options: ['Under ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹20,000', 'Above ₹20,000']
    },
    {
      title: 'Availability',
      options: ['In Stock', 'Pre-Order', 'Out of Stock']
    }
  ];

  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <div className="flex items-center gap-3 font-semibold tracking-widest uppercase text-sm mb-6 pb-4 border-b border-gray-100 lg:hidden">
        <Filter size={18} />
        Filters
      </div>
      <div className="bg-[#FAF8F5] p-6 rounded-sm border border-gray-100">
        <h2 className="font-serif text-2xl text-primary mb-6 hidden lg:block">Filters</h2>
        
        <div className="space-y-2">
          {filterSections.map((section, idx) => (
            <div key={idx} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex justify-between items-center py-4 text-left text-sm font-medium text-text-main hover:text-primary transition-colors"
              >
                {section.title}
                {openSections[section.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {openSections[section.title] && (
                <div className="pb-4 space-y-3">
                  {section.options.map((option, optIdx) => {
                    const isChecked = selectedFilters[section.title]?.includes(option);
                    return (
                      <label key={optIdx} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox"
                            checked={isChecked || false}
                            onChange={() => onFilterChange && onFilterChange(section.title, option)}
                            className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                          />
                          <svg 
                            className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className={`text-sm transition-colors ${isChecked ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-primary'}`}>
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
