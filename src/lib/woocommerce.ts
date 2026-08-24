export async function fetchWooCommerceProducts() {
  const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
  const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
  const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

  if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.warn("WooCommerce environment variables are not set.");
    return [];
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
    return [];
  }
}

export async function fetchWooCommerceProduct(id: string) {
  const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
  const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
  const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

  if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    return null;
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
      console.warn(`WooCommerce product ${id} not found (${response.status})`);
      return null;
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
    return null;
  }
}


