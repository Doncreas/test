import { NextResponse } from 'next/server';
import { calculateEarnedPoints } from '@/lib/points/ledger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      amountTzs,
      rating,
      hasPhoto,
      isCorporate,
      isBirthdayMonth,
      isMultiStop,
      isAiConcierge,
      referralCount,
      streakCount
    } = body || {};

    const points = calculateEarnedPoints({
      amountTzs: Number(amountTzs || 0),
      rating: Number(rating || 0),
      hasPhoto: Boolean(hasPhoto),
      isCorporate: Boolean(isCorporate),
      isBirthdayMonth: Boolean(isBirthdayMonth),
      isMultiStop: Boolean(isMultiStop),
      isAiConcierge: Boolean(isAiConcierge),
      referralCount: Number(referralCount || 0),
      streakCount: Number(streakCount || 0)
    });

    return NextResponse.json({
      ok: true,
      points,
      source: 'booking-activity',
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid points payload' }, { status: 400 });
  }
}
