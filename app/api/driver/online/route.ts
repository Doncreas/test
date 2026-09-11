import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const online = Boolean(body?.online);

    return NextResponse.json({
      ok: true,
      online,
      driverId: body?.driverId ?? 'driver_2041',
      status: online ? 'available' : 'offline',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
