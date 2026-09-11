import { NextResponse } from 'next/server';
import { transcribeAudio } from '@/lib/voice/whisper';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const audioData = typeof body?.audioData === 'string' ? body.audioData : '';
    const language = body?.language || 'en';

    const result = await transcribeAudio(audioData, language);

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid audio payload' }, { status: 400 });
  }
}
