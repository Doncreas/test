import { NextResponse } from 'next/server';
import { synthesizeSpeech } from '@/lib/voice/elevenlabs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = typeof body?.text === 'string' ? body.text : '';
    const language = body?.language || 'en';

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const result = await synthesizeSpeech(text, language);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid synthesis payload' }, { status: 400 });
  }
}
