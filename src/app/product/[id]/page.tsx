import Link from 'next/link';
import { Star, Truck, ShieldCheck, RefreshCw, ShoppingBag, ArrowRight } from 'lucide-react';
import ProductActionButtons from './ProductActionButtons';
import ProductGallery from './ProductGallery';
import ProductCard from '../../../components/ProductCard';
import { fetchWooCommerceProduct, fetchWooCommerceProducts } from '../../../lib/woocommerce';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await fetchWooCommerceProduct(params.id);

  if (!product) {
    const allProducts = await fetchWooCommerceProducts();
    return (
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16 bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <ShoppingBag size={32} />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-3">Product Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The product you are looking for may have been updated, moved, or is temporarily unavailable.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 uppercase tracking-wider text-sm font-semibold rounded-sm hover:bg-[#6c0f2b] transition-colors"
          >
            Explore All Collections <ArrowRight size={16} />
          </Link>
        </div>

        {allProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl text-primary mb-6">Explore Our Latest Designs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.slice(0, 4).map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>
    );
  }

  // Fetch related products (excluding current)
  const allProducts = await fetchWooCommerceProducts();
  const relatedProducts = allProducts.filter((p: any) => p.id !== product.id).slice(0, 4);

  // Check attributes (Size, Fabric, etc.)
  const sizeAttribute = product.attributes?.find(
    (attr: any) => attr.name?.toLowerCase() === 'size'
  );
  const availableSizes = sizeAttribute?.options && sizeAttribute.options.length > 0
    ? sizeAttribute.options
    : null;

  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8 flex-wrap gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link 
              href={`/products/${product.category.toLowerCase().replace(/\s+/g, '-')}`} 
              className="hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Images */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs text-primary font-semibold tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-sm">
              {product.category}
            </span>
            <span className={`text-xs font-semibold uppercase tracking-wider ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</div>
            {product.oldPrice && product.oldPrice > product.price && (
              <div className="text-lg text-gray-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</div>
            )}
            {discountPercent && (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                Save {discountPercent}%
              </span>
            )}
            <div className="flex items-center text-[#C9A86A] ml-auto">
              {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
              <span className="text-gray-500 text-xs ml-1.5">(Verified Quality)</span>
            </div>
          </div>

          {product.desc && (
            <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base border-t border-b border-gray-100 py-4">
              {product.desc}
            </p>
          )}

          {/* Size or Variation Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-900 text-sm">
                {availableSizes ? 'Available Sizes' : 'Size / Fit'}
              </span>
            </div>
            {availableSizes ? (
              <div className="flex flex-wrap gap-2.5">
                {availableSizes.map((size: string) => (
                  <button 
                    key={size} 
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-sm text-sm font-medium hover:border-primary hover:text-primary transition-colors focus:bg-primary focus:text-white focus:border-primary"
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <div className="inline-block bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-sm">
                Free Size / Standard Fit
              </div>
            )}
          </div>

          <ProductActionButtons product={product} />

          {/* Features Guarantee */}
          <div className="border-t border-gray-200 mt-8 pt-6 space-y-3.5 text-sm">
            <div className="flex items-center gap-3 text-gray-600">
              <Truck size={18} className="text-primary flex-shrink-0" />
              <span>Free Express Shipping across India</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <ShieldCheck size={18} className="text-primary flex-shrink-0" />
              <span>100% Authentic Quality Handloom Craftsmanship</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <RefreshCw size={18} className="text-primary flex-shrink-0" />
              <span>Easy 7-Day Returns & Exchanges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details / Full Description */}
      {product.rawDescription && (
        <section className="mt-20 border-t border-gray-200 pt-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 text-center">
              Product Overview & Specifications
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>
            <div 
              className="prose prose-stone max-w-none text-gray-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: product.rawDescription }}
            />
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-primary mb-2">You May Also Like</h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs">Curated recommendations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
