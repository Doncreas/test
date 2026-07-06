import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { airport, flight, pickup, dropoff, passengers } = body || {};

    if (!airport || !flight || !pickup || !dropoff) {
      return NextResponse.json({ error: 'Missing booking fields' }, { status: 400 });
    }

    // Very small stubbed booking response.
    const booking = {
      id: `TAN-${Math.floor(Math.random() * 9000) + 1000}`,
      airport,
      flight,
      pickup,
      dropoff,
      passengers: passengers || 1,
      price: '35,000 TZS',
      status: 'confirmed'
    };

    return NextResponse.json({ ok: true, booking });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
