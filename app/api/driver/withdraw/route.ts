import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.amountTzs || !body?.method) {
      return NextResponse.json(
        { error: 'amountTzs and method are required.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      method: body.method,
      amountTzs: Number(body.amountTzs),
      status: body.method === 'mpesa' ? 'instant' : 'queued',
      reference: `wd_${Date.now()}`,
      eta: body.method === 'mpesa' ? 'instant' : 'T+1',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Withdrawal failed.' }, { status: 500 });
  }
}
