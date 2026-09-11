import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const response = typeof body?.response === 'string' ? body.response.trim().slice(0, 250) : '';

    if (!response) {
      return NextResponse.json({ error: 'Response text is required' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      reviewId: params.id,
      response,
      respondedAt: new Date().toISOString(),
      canRespondAgain: false
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid response payload' }, { status: 400 });
  }
}
