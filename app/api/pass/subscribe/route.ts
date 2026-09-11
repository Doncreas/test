import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.tier) {
      return NextResponse.json({ error: 'tier is required.' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      tier: body.tier,
      status: 'active',
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      priceTzs: body.priceTzs ?? 24900,
      annualDiscount: body.annual ? true : false,
      familySeats: body.familySeats ?? 2,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Subscription failed.' }, { status: 500 });
  }
}
