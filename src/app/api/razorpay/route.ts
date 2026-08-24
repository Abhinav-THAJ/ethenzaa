import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', receipt = 'receipt#1' } = await req.json();

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Razorpay keys are not configured' }, { status: 500 });
    }

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid order amount', details: 'Order amount must be greater than 0.' }, { status: 400 });
    }

    // Instantiate inside handler so it only runs at request time, not at build time
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    const errorMessage = error.error?.description || error.message || JSON.stringify(error);
    return NextResponse.json(
      { error: 'Error creating Razorpay order', details: errorMessage },
      { status: 500 }
    );
  }
}
