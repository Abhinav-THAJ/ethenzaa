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

const DEFAULT_WC_URL = 'https://mediumturquoise-antelope-172097.hostingersite.com/';
const DEFAULT_WC_KEY = 'ck_7bd2b0c7852b64c7374680ff72e3fd47d2d329f3';
const DEFAULT_WC_SECRET = 'cs_bbd5bfeea3d72be10e8fbc13069a2ecf2cac2c79';

export function getValidWcCredentials() {
  const envKey = process.env.WC_CONSUMER_KEY;
  const envSecret = process.env.WC_CONSUMER_SECRET;
  const envUrl = process.env.NEXT_PUBLIC_WC_URL;

  // If Vercel env has an outdated/revoked key (like ck_1abcb0a...), ignore it and use the active key
  const isInvalidEnvKey = !envKey || envKey.startsWith('ck_1abcb0a') || envKey.length < 30;

  return {
    url: envUrl || DEFAULT_WC_URL,
    key: isInvalidEnvKey ? DEFAULT_WC_KEY : envKey,
    secret: (isInvalidEnvKey || !envSecret) ? DEFAULT_WC_SECRET : envSecret,
  };
}

export async function fetchWooCommerceProducts() {
  const { url: WC_URL, key: WC_CONSUMER_KEY, secret: WC_CONSUMER_SECRET } = getValidWcCredentials();

  if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.warn("WooCommerce environment variables are not set.");
    return [];
  }

  try {
    const authString = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
    
    // Fetch up to 100 published products. Include both query params and basic auth because Hostinger LiteSpeed CDN strips Authorization headers on cloud/proxy requests
    const queryAuth = `consumer_key=${encodeURIComponent(WC_CONSUMER_KEY)}&consumer_secret=${encodeURIComponent(WC_CONSUMER_SECRET)}`;
    const url = `${WC_URL.replace(/\/$/, '')}/wp-json/wc/v3/products?status=publish&per_page=100&${queryAuth}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Ethenzaa/1.0',
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
  const { url: WC_URL, key: WC_CONSUMER_KEY, secret: WC_CONSUMER_SECRET } = getValidWcCredentials();

  if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !idOrSlug) {
    return null;
  }

  try {
    const authString = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
    const baseUrl = WC_URL.replace(/\/$/, '');
    const cleanParam = decodeURIComponent(idOrSlug).trim();
    const queryAuth = `consumer_key=${encodeURIComponent(WC_CONSUMER_KEY)}&consumer_secret=${encodeURIComponent(WC_CONSUMER_SECRET)}`;

    const reqHeaders = {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Ethenzaa/1.0',
    };

    // 1. If param is numeric, try direct ID endpoint
    if (/^\d+$/.test(cleanParam)) {
      const idUrl = `${baseUrl}/wp-json/wc/v3/products/${cleanParam}?${queryAuth}`;
      const response = await fetch(idUrl, {
        headers: reqHeaders,
        next: { revalidate: 10 }
      });

      if (response.ok) {
        const product = await response.json();
        return transformProduct(product);
      }
    }

    // 2. Query by slug
    const slugUrl = `${baseUrl}/wp-json/wc/v3/products?slug=${encodeURIComponent(cleanParam)}&${queryAuth}`;
    const slugResponse = await fetch(slugUrl, {
      headers: reqHeaders,
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


