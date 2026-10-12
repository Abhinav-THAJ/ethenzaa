import { NextResponse } from 'next/server';
import { fetchWooCommerceProducts } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await fetchWooCommerceProducts();
    return NextResponse.json({ success: true, count: products.length, products });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
