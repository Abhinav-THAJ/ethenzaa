function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(html: string): string {
  if (!html) return '';
  return decodeHtmlEntities(
    html
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function transformProduct(product: any) {
  const images = product.images && product.images.length > 0
    ? product.images.map((img: any) => img.src)
    : ['/images/placeholder.png'];

  const mainImage = images[0] || '/images/placeholder.png';

  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : undefined;
  const currentPrice = product.price
    ? parseFloat(product.price)
    : (regularPrice || 0);

  const onSale = product.on_sale || (regularPrice !== undefined && currentPrice < regularPrice);

  const categories = product.categories && product.categories.length > 0
    ? product.categories.map((c: any) => decodeHtmlEntities(c.name))
    : ['Uncategorized'];

  const primaryCategory = categories[0] || 'Uncategorized';

  const shortDescClean = stripHtml(product.short_description || '');
  const fullDescClean = stripHtml(product.description || '');
  const cleanSummary = shortDescClean || fullDescClean;

  const colorAttr = product.attributes?.find((attr: any) =>
    attr.name?.toLowerCase() === 'color' || attr.name?.toLowerCase() === 'colour'
  );
  const color = colorAttr?.options?.[0] || 'Default';

  return {
    id: product.id.toString(),
    slug: product.slug,
    name: decodeHtmlEntities(product.name),
    price: currentPrice,
    oldPrice: onSale ? regularPrice : undefined,
    regularPrice: regularPrice,
    salePrice: onSale ? currentPrice : undefined,
    onSale,
    stockStatus: product.stock_status || 'instock',
    inStock: product.stock_status !== 'outofstock',
    image: mainImage,
    images: images,
    category: primaryCategory,
    categories: categories,
    type: product.tags && product.tags.length > 0 ? decodeHtmlEntities(product.tags[0].name) : 'Apparel',
    tags: product.tags?.map((t: any) => decodeHtmlEntities(t.name)) || [],
    color: color,
    attributes: product.attributes || [],
    desc: cleanSummary,
    rawDescription: product.description || product.short_description || '',
    shortDescription: product.short_description || '',
  };
}

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
    
    // Fetch up to 100 published products with no-store cache so additions in WordPress reflect immediately
    const url = `${WC_URL.replace(/\/$/, '')}/wp-json/wc/v3/products?status=publish&per_page=100`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 10 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch WooCommerce products: ${response.status} ${response.statusText}`);
    }

    const products = await response.json();
    if (!Array.isArray(products)) {
      console.warn("WooCommerce response is not an array:", products);
      return [];
    }

    return products.map(transformProduct);
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error;
    }
    console.error("Error fetching WooCommerce products:", error);
    return [];
  }
}

export async function fetchWooCommerceProduct(idOrSlug: string) {
  const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
  const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
  const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

  if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !idOrSlug) {
    return null;
  }

  try {
    const authString = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
    const baseUrl = WC_URL.replace(/\/$/, '');
    const cleanParam = decodeURIComponent(idOrSlug).trim();

    // 1. If param is numeric, try direct ID endpoint
    if (/^\d+$/.test(cleanParam)) {
      const idUrl = `${baseUrl}/wp-json/wc/v3/products/${cleanParam}`;
      const response = await fetch(idUrl, {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 10 }
      });

      if (response.ok) {
        const product = await response.json();
        return transformProduct(product);
      }
    }

    // 2. Query by slug
    const slugUrl = `${baseUrl}/wp-json/wc/v3/products?slug=${encodeURIComponent(cleanParam)}`;
    const slugResponse = await fetch(slugUrl, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 10 }
    });

    if (slugResponse.ok) {
      const list = await slugResponse.json();
      if (Array.isArray(list) && list.length > 0) {
        return transformProduct(list[0]);
      }
    }

    // 3. Fallback: fetch active products and match by ID or slug
    const allProducts = await fetchWooCommerceProducts();
    const found = allProducts.find(
      (p: any) => p.id === cleanParam || p.slug === cleanParam || p.slug?.toLowerCase() === cleanParam.toLowerCase()
    );

    return found || null;
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error;
    }
    console.error(`Error fetching WooCommerce product (${idOrSlug}):`, error);
    return null;
  }
}


