import ShopLayout from '../../../components/ShopLayout';

import { fetchWooCommerceProducts } from '../../../lib/woocommerce';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const categoryName = params.category.replace(/-/g, ' ');

  const allProducts = await fetchWooCommerceProducts();

  const categoryProducts = allProducts.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
  const displayProducts = categoryProducts.length > 0 ? categoryProducts : allProducts;

  return <ShopLayout initialProducts={displayProducts} title={`${categoryName} Collection`} />;
}
