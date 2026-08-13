import ShopLayout from '../../components/ShopLayout';
import { fetchWooCommerceProducts } from '../../lib/woocommerce';

export const dynamic = 'force-dynamic';

export default async function Products() {
  const products = await fetchWooCommerceProducts();

  return <ShopLayout initialProducts={products} title="All Collections" />;
}
