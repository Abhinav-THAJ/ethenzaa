export async function fetchWooCommerceProducts() {
  const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
  const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
  const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

  if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.warn("WooCommerce environment variables are not set. Returning mock products.");
    return getMockProducts();
  }

  try {
    const authString = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
    
    // Adjust endpoint based on your WooCommerce permalinks (usually /wp-json/wc/v3/products)
    const url = `${WC_URL.replace(/\/$/, '')}/wp-json/wc/v3/products?status=publish&per_page=20`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch WooCommerce products: ${response.statusText}`);
    }

    const products = await response.json();
    
    // Transform WooCommerce products to match our frontend interface
    return products.map((product: any) => {
      // Find main image
      const imageUrl = product.images && product.images.length > 0 
        ? product.images[0].src 
        : '/images/placeholder.png'; // Make sure you have a placeholder
        
      return {
        id: product.id.toString(),
        name: product.name,
        price: product.price ? parseFloat(product.price) : 0,
        image: imageUrl,
        category: product.categories && product.categories.length > 0 ? product.categories[0].name : 'Uncategorized',
        type: product.tags && product.tags.length > 0 ? product.tags[0].name : 'Apparel', // Mapping tags to type or whatever fits
        color: product.attributes?.find((attr: any) => attr.name === 'Color')?.options?.[0] || 'Default',
        desc: product.short_description ? product.short_description.replace(/(<([^>]+)>)/gi, "") : (product.description ? product.description.replace(/(<([^>]+)>)/gi, "") : ''),
      };
    });
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
    return getMockProducts();
  }
}

export async function fetchWooCommerceProduct(id: string) {
  const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
  const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
  const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

  if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    return getMockProducts().find(p => p.id === id) || null;
  }

  try {
    const authString = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
    
    const url = `${WC_URL.replace(/\/$/, '')}/wp-json/wc/v3/products/${id}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch WooCommerce product: ${response.statusText}`);
    }

    const product = await response.json();
    
    const imageUrl = product.images && product.images.length > 0 
      ? product.images[0].src 
      : '/images/placeholder.png';
      
    return {
      id: product.id.toString(),
      name: product.name,
      price: product.price ? parseFloat(product.price) : 0,
      image: imageUrl,
      images: product.images ? product.images.map((img: any) => img.src) : [imageUrl],
      category: product.categories && product.categories.length > 0 ? product.categories[0].name : 'Uncategorized',
      type: product.tags && product.tags.length > 0 ? product.tags[0].name : 'Apparel',
      color: product.attributes?.find((attr: any) => attr.name === 'Color')?.options?.[0] || 'Default',
      desc: product.short_description ? product.short_description.replace(/(<([^>]+)>)/gi, "") : (product.description ? product.description.replace(/(<([^>]+)>)/gi, "") : ''),
    };
  } catch (error) {
    console.error("Error fetching WooCommerce product:", error);
    return getMockProducts().find(p => p.id === id) || null;
  }
}

// Fallback mock data when API is not configured
function getMockProducts() {
  return [
    { id: '1', name: 'Premium Burgundy Silk Saree', price: 12999, image: '/images/ethenzaa_women.png', category: 'Women', type: 'Sarees', color: 'Burgundy', desc: 'Experience luxury with this premium burgundy silk saree, featuring intricate zari weaving and a rich border. Perfect for festive occasions and weddings.' },
    { id: '2', name: 'Contemporary Men Kurta Set', price: 8499, image: '/images/ethenzaa_men.png', category: 'Men', type: 'Ethnic Wear', color: 'Midnight Black', desc: 'A sophisticated contemporary kurta set crafted from fine cotton silk. Tailored for comfort without compromising on traditional elegance.' },
    { id: '3', name: 'Luxury Zari Woven Lehenga', price: 18999, image: '/images/ethenzaa_hero.png', category: 'Women', type: 'Dresses', color: 'Champagne Gold', desc: 'Make a statement in this luxury zari woven lehenga. The exquisite craftsmanship and champagne gold accents create a truly royal look.' },
    { id: '4', name: 'Classic Bandhgala Suit', price: 15499, image: '/images/ethenzaa_men.png', category: 'Men', type: 'Ethnic Wear', color: 'Midnight Black', desc: 'Redefine classic menswear with this impeccably tailored bandhgala suit. Features a structured silhouette and premium suiting fabric.' },
    { id: '5', name: 'Festive Kids Sherwani', price: 4999, image: '/images/ethenzaa_hero.png', category: 'Kids', type: 'Ethnic Wear', color: 'Burgundy', desc: 'Dress your little one in style with this festive sherwani set. Lightweight, comfortable, and beautifully detailed.' },
    { id: '6', name: 'Plus Size Elegant Kurti', price: 3499, image: '/images/ethenzaa_women.png', category: 'Plus Size', type: 'Kurtis', color: 'Ivory White', desc: 'An elegant and comfortable kurti designed to flatter every curve. Features subtle embroidery and a breathable fabric blend.' },
  ];
}
