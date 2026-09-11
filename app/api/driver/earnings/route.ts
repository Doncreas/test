import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    driverId: 'driver_2041',
    period: 'week',
    netPayoutTzs: 190000,
    grossTzs: 312000,
    costsTzs: 58000,
    tipsTzs: 28000,
    digitalTzs: 210000,
    cashTzs: 120000,
    taxEstimateTzs: 20000,
    bonusTzs: 24000,
    trips: 31,
    acceptanceRate: 94,
    rating: 4.9,
  });
}
