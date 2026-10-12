import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const WC_URL = process.env.NEXT_PUBLIC_WC_URL || 'https://mediumturquoise-antelope-172097.hostingersite.com/';
  const WC_KEY = process.env.WC_CONSUMER_KEY || 'ck_7bd2b0c7852b64c7374680ff72e3fd47d2d329f3';
  const WC_SECRET = process.env.WC_CONSUMER_SECRET || 'cs_bbd5bfeea3d72be10e8fbc13069a2ecf2cac2c79';

  const authString = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
  const url = `${WC_URL.replace(/\/$/, '')}/wp-json/wc/v3/products?status=publish&per_page=100`;

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
    const text = await res.text();

    return NextResponse.json({
      url,
      status,
      ok: res.ok,
      headers: Object.fromEntries(res.headers.entries()),
      bodySnippet: text.slice(0, 1000)
    });
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
      stack: err.stack
    }, { status: 500 });
  }
}
