import ShopLayout from '../../components/ShopLayout';
import { fetchWooCommerceProducts } from '../../lib/woocommerce';

export default async function Products() {
  const products = await fetchWooCommerceProducts();

  return <ShopLayout initialProducts={products} title="All Collections" />;
}
