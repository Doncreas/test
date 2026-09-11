import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, viewerName, viewerPhone } = body || {};

    if (!bookingId || !viewerName || !viewerPhone) {
      return NextResponse.json({ error: 'Missing share details' }, { status: 400 });
    }

    const trackingToken = `share-${bookingId}-${Math.random().toString(36).slice(2, 10)}`;

    return NextResponse.json({
      ok: true,
      share: {
        id: crypto.randomUUID(),
        bookingId,
        viewerName,
        viewerPhone,
        trackingToken,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
        link: `https://karibu.tz/track/public/${trackingToken}`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid share payload' }, { status: 400 });
  }
}
