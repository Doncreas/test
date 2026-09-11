import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body?.amount ?? 0);

    if (!Number.isFinite(amount) || amount < 0) {
      return NextResponse.json({ error: 'Tip amount must be a valid number' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      amount,
      currency: 'TZS',
      status: 'queued',
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid tip payload' }, { status: 400 });
  }
}
