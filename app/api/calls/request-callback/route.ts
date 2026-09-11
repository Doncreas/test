import { NextResponse } from 'next/server';
import { requestCallBack } from '@/lib/calls/twilio';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const phoneNumber = typeof body?.phoneNumber === 'string' ? body.phoneNumber : '';
    const language = typeof body?.language === 'string' ? body.language : 'en';
    const reason = typeof body?.reason === 'string' ? body.reason : 'General concierge support';

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const result = await requestCallBack({ phoneNumber, language, reason });
    return NextResponse.json({
      ok: result.ok,
      sid: result.sid,
      phoneNumber: result.phoneNumber,
      language: result.language,
      reason: result.reason,
      etaSeconds: result.etaSeconds,
      createdAt: result.createdAt
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid callback request' }, { status: 400 });
  }
}
