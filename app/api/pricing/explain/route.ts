import { NextResponse } from 'next/server';
import { calculatePriceQuote } from '@/lib/pricing/dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const quote = calculatePriceQuote({
      pickup: body.pickup,
      dropoff: body.dropoff,
      time: body.time,
      vehicleType: body.vehicleType,
      passengerTier: body.passengerTier,
      passengerCount: body.passengerCount ?? 1,
    });

    return NextResponse.json({
      explanation: {
        priceIsLocked: true,
        fixedAirportPrice: body.pickup?.type === 'airport' || body.dropoff?.type === 'airport',
        factors: quote.factors,
        surgeMultiplier: quote.surgeMultiplier,
        finalPrice: quote.finalPrice,
        savings: quote.savings,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to explain fare.' }, { status: 500 });
  }
}
