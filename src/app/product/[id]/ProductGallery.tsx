'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images = [], productName }: ProductGalleryProps) {
  // Deduplicate images if WordPress returns repeated attachments
  const uniqueImages = Array.from(new Set(images.filter(Boolean)));
  const fallback = '/images/placeholder.png';
  const initial = uniqueImages[0] || fallback;

  const [mainImage, setMainImage] = useState(initial);

  useEffect(() => {
    setMainImage(uniqueImages[0] || fallback);
  }, [images]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-[480px] sm:h-[580px] w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
        <Image 
          src={mainImage} 
          alt={productName} 
          fill 
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-[center_20%] transition-opacity duration-300" 
        />
      </div>

      {/* Thumbnail Gallery */}
      {uniqueImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {uniqueImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`} 
              type="button"
              className={`relative h-24 sm:h-28 bg-gray-50 rounded-md overflow-hidden cursor-pointer border-2 transition-all p-0 focus:outline-none ${
                mainImage === img ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
              }`}
              onClick={() => setMainImage(img)}
            >
              <Image 
                src={img} 
                alt={`${productName} thumbnail ${idx + 1}`} 
                fill 
                sizes="120px"
                className="object-cover object-[center_20%]" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
