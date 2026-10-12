import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const envUrl = process.env.NEXT_PUBLIC_WC_URL;
  const envKey = process.env.WC_CONSUMER_KEY;
  const envSecret = process.env.WC_CONSUMER_SECRET;

  const WC_URL = 'https://mediumturquoise-antelope-172097.hostingersite.com/';
  const WC_KEY = 'ck_7bd2b0c7852b64c7374680ff72e3fd47d2d329f3';
  const WC_SECRET = 'cs_bbd5bfeea3d72be10e8fbc13069a2ecf2cac2c79';

  const queryAuth = `consumer_key=${encodeURIComponent(WC_KEY)}&consumer_secret=${encodeURIComponent(WC_SECRET)}`;
  const url = `${WC_URL.replace(/\/$/, '')}/wp-json/wc/v3/products?status=publish&per_page=100&${queryAuth}`;
  const authString = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');

  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Ethenzaa/1.0',
      },
      cache: 'no-store'
    });

    const status = res.status;
    const ok = res.ok;
    const data = await res.json();

    return NextResponse.json({
      success: ok,
      status,
      envKeyExists: !!envKey,
      envKeyStart: envKey ? envKey.slice(0, 10) : 'none',
      envKeyLen: envKey ? envKey.length : 0,
      count: Array.isArray(data) ? data.length : 0,
      isArr: Array.isArray(data),
      sample: Array.isArray(data) ? data.slice(0, 2).map((p: any) => ({ id: p.id, name: p.name })) : data
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });
  }
}
