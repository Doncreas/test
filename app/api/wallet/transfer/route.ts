import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fromUserId, toUserId, amountTzs, note } = body || {};

    if (!fromUserId || !toUserId || !amountTzs || amountTzs < 100) {
      return NextResponse.json({ error: 'Missing or invalid transfer data' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      transfer: {
        id: `P2P_${Date.now()}`,
        fromUserId,
        toUserId,
        amountTzs,
        note: note || 'Karibu wallet transfer',
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Transfer failed' }, { status: 500 });
  }
}
