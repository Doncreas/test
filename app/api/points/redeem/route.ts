import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const points = Number(body?.points || 0);
    const rewardType = body?.rewardType || 'ride-discount';

    if (!Number.isFinite(points) || points <= 0) {
      return NextResponse.json({ error: 'Points must be a positive number' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      rewardType,
      pointsSpent: points,
      status: 'queued',
      redemptionValueTzs: points / 1000 * 1000,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid redemption request' }, { status: 400 });
  }
}
