import { NextResponse } from 'next/server';
import { calculatePriceQuote } from '@/lib/pricing/dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.pickup || !body?.dropoff || !body?.time || !body?.vehicleType || !body?.passengerTier) {
      return NextResponse.json(
        { error: 'pickup, dropoff, time, vehicleType and passengerTier are required.' },
        { status: 400 }
      );
    }

    const quote = calculatePriceQuote({
      pickup: body.pickup,
      dropoff: body.dropoff,
      time: body.time,
      vehicleType: body.vehicleType,
      passengerTier: body.passengerTier,
      passengerCount: body.passengerCount ?? 1,
    });

    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to calculate fare.' }, { status: 500 });
  }
}
