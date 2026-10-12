import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, address, cart, cartTotal, paymentId, orderId } = await req.json();

    const WC_URL = process.env.NEXT_PUBLIC_WC_URL || 'https://mediumturquoise-antelope-172097.hostingersite.com/';
    const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || 'ck_7bd2b0c7852b64c7374680ff72e3fd47d2d329f3';
    const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || 'cs_bbd5bfeea3d72be10e8fbc13069a2ecf2cac2c79';

    if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      return NextResponse.json({ error: 'WooCommerce credentials missing' }, { status: 500 });
    }

    const authString = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

    const lineItems = cart.map((item: any) => ({
      product_id: parseInt(item.id),
      quantity: item.quantity,
    }));

    const orderData = {
      payment_method: 'razorpay',
      payment_method_title: 'Razorpay',
      set_paid: true,
      transaction_id: paymentId,
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: 'IN',
        email: email,
        phone: phone
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: 'IN',
      },
      line_items: lineItems,
      customer_note: `Razorpay Order ID: ${orderId}`
    };

    const url = `${WC_URL.replace(/\/$/, '')}/wp-json/wc/v3/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WooCommerce Order Error:', errorData);
      throw new Error(`Failed to create WooCommerce order: ${response.statusText}`);
    }

    const createdOrder = await response.json();
    return NextResponse.json({ success: true, order: createdOrder });

  } catch (error: any) {
    console.error('Error in order creation:', error);
    return NextResponse.json({ error: 'Failed to create order', details: error.message }, { status: 500 });
  }
}
