import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const months = Number(body?.months ?? 1);

    if (months < 1 || months > 3) {
      return NextResponse.json({ error: 'Pause duration must be between 1 and 3 months.' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      paused: true,
      months,
      resumeDate: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to pause subscription.' }, { status: 500 });
  }
}
