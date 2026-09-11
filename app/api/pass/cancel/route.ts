import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    ok: true,
    status: 'cancelled',
    effectiveDate: new Date().toISOString(),
    refundPolicy: 'No refund for used trial period.',
  });
}
