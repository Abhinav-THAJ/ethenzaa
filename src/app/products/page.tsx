import ShopLayout from '../../components/ShopLayout';

export default function Products() {
  const products = [
    { id: '1', name: 'Premium Burgundy Silk Saree', price: 12999, image: '/images/ethenzaa_women.png', category: 'Women', type: 'Sarees', color: 'Burgundy' },
    { id: '2', name: 'Contemporary Men Kurta Set', price: 8499, image: '/images/ethenzaa_men.png', category: 'Men', type: 'Ethnic Wear', color: 'Midnight Black' },
    { id: '3', name: 'Luxury Zari Woven Lehenga', price: 18999, image: '/images/ethenzaa_hero.png', category: 'Women', type: 'Dresses', color: 'Champagne Gold' },
    { id: '4', name: 'Classic Bandhgala Suit', price: 15499, image: '/images/ethenzaa_men.png', category: 'Men', type: 'Ethnic Wear', color: 'Midnight Black' },
    { id: '5', name: 'Festive Kids Sherwani', price: 4999, image: '/images/ethenzaa_hero.png', category: 'Kids', type: 'Ethnic Wear', color: 'Burgundy' },
    { id: '6', name: 'Plus Size Elegant Kurti', price: 3499, image: '/images/ethenzaa_women.png', category: 'Plus Size', type: 'Kurtis', color: 'Ivory White' },
  ];

  return <ShopLayout initialProducts={products} title="All Collections" />;
}
