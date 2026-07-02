import Image from 'next/image';
import Link from 'next/link';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import ProductActionButtons from './ProductActionButtons';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  // Mock product database
  const allProducts = [
    { id: '1', name: 'Premium Burgundy Silk Saree', price: 12999, image: '/images/ethenzaa_women.png', category: 'Women', type: 'Sarees', color: 'Burgundy', desc: 'Experience luxury with this premium burgundy silk saree, featuring intricate zari weaving and a rich border. Perfect for festive occasions and weddings.' },
    { id: '2', name: 'Contemporary Men Kurta Set', price: 8499, image: '/images/ethenzaa_men.png', category: 'Men', type: 'Ethnic Wear', color: 'Midnight Black', desc: 'A sophisticated contemporary kurta set crafted from fine cotton silk. Tailored for comfort without compromising on traditional elegance.' },
    { id: '3', name: 'Luxury Zari Woven Lehenga', price: 18999, image: '/images/ethenzaa_hero.png', category: 'Women', type: 'Dresses', color: 'Champagne Gold', desc: 'Make a statement in this luxury zari woven lehenga. The exquisite craftsmanship and champagne gold accents create a truly royal look.' },
    { id: '4', name: 'Classic Bandhgala Suit', price: 15499, image: '/images/ethenzaa_men.png', category: 'Men', type: 'Ethnic Wear', color: 'Midnight Black', desc: 'Redefine classic menswear with this impeccably tailored bandhgala suit. Features a structured silhouette and premium suiting fabric.' },
    { id: '5', name: 'Festive Kids Sherwani', price: 4999, image: '/images/ethenzaa_hero.png', category: 'Kids', type: 'Ethnic Wear', color: 'Burgundy', desc: 'Dress your little one in style with this festive sherwani set. Lightweight, comfortable, and beautifully detailed.' },
    { id: '6', name: 'Plus Size Elegant Kurti', price: 3499, image: '/images/ethenzaa_women.png', category: 'Plus Size', type: 'Kurtis', color: 'Ivory White', desc: 'An elegant and comfortable kurti designed to flatter every curve. Features subtle embroidery and a breathable fabric blend.' },
  ];

  const product = allProducts.find(p => p.id === params.id) || allProducts[0];

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[600px] w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover object-[center_20%]" 
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative h-32 bg-gray-50 rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
                <Image src={product.image} alt="" fill className="object-cover object-[center_20%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="text-sm text-primary font-medium tracking-widest uppercase mb-2">{product.category}</div>
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="text-2xl font-semibold text-primary">₹{product.price.toLocaleString('en-IN')}</div>
            <div className="flex items-center text-[#C9A86A]">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              <span className="text-gray-500 text-sm ml-2">(128 Reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.desc}
          </p>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-900">Select Size</span>
              <button className="text-sm text-primary underline hover:text-accent transition-colors">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button key={size} className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-sm hover:border-primary hover:text-primary transition-colors focus:bg-primary focus:text-white focus:border-primary">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <ProductActionButtons product={product} />

          {/* Features */}
          <div className="border-t border-gray-200 mt-10 pt-8 space-y-4">
            <div className="flex items-center gap-4 text-gray-600">
              <Truck size={20} className="text-primary" />
              <span>Free Express Shipping across India</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <ShieldCheck size={20} className="text-primary" />
              <span>100% Authentic Quality Guarantee</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <ArrowLeft size={20} className="text-primary" />
              <span>Easy 7-Day Returns & Exchanges</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
