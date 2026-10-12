import ShopLayout from '../../../components/ShopLayout';

import { fetchWooCommerceProducts } from '../../../lib/woocommerce';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const categoryParam = params.category.toLowerCase();
  const categoryName = categoryParam.replace(/-/g, ' ');

  const allProducts = await fetchWooCommerceProducts();

  let displayProducts = [];
  if (categoryParam === 'new-arrivals') {
    displayProducts = allProducts.slice(0, 8);
  } else if (categoryParam === 'best-sellers') {
    displayProducts = [...allProducts].reverse().slice(0, 8);
  } else if (categoryParam === 'offers') {
    displayProducts = allProducts.filter((p: any) => p.onSale);
    if (displayProducts.length === 0) displayProducts = allProducts;
  } else {
    const categoryProducts = allProducts.filter((p: any) =>
      p.category?.toLowerCase() === categoryName ||
      p.categories?.some((c: string) => c.toLowerCase() === categoryName)
    );
    displayProducts = categoryProducts.length > 0 ? categoryProducts : allProducts;
  }

  return <ShopLayout initialProducts={displayProducts} title={`${categoryName} Collection`} />;
}
