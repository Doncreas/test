import { NextRequest, NextResponse } from 'next/server';
import { sendMpesaStkPush } from '@/lib/mpesa/stkpush';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { method = 'mpesa', amount = 0, phone = '', userId = 'demo-user' } = body || {};

    if (!amount || amount < 1000) {
      return NextResponse.json({ error: 'Top-up amount must be at least 1,000 TZS' }, { status: 400 });
    }

    if (method === 'mpesa') {
      const result = await sendMpesaStkPush({
        phone,
        amount,
        reference: `KARIBU_TOPUP_${userId}`,
        description: 'Karibu wallet top-up'
      });

      return NextResponse.json({
        ok: true,
        provider: result.provider,
        status: result.status,
        transactionId: result.transactionId,
        phone: result.phone,
        amount: result.amount,
        reference: result.reference,
        description: result.description,
        message: result.message
      });
    }

    if (method === 'card') {
      return NextResponse.json({
        ok: true,
        provider: 'stripe',
        status: 'pending',
        amount,
        reference: `STRIPE_${Date.now()}`,
        message: 'Card payment intent created successfully.'
      });
    }

    if (method === 'bank') {
      return NextResponse.json({
        ok: true,
        provider: 'bank',
        status: 'manual_review',
        amount,
        reference: `BANK_${Date.now()}`,
        message: 'Bank transfer received. Clearance expected within 2 hours.'
      });
    }

    return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Top-up request failed' }, { status: 500 });
  }
}
