export type LangCode = 'en' | 'sw' | 'fr' | 'de' | 'zh' | 'ar' | 'hi' | 'pt';

export interface WhisperResponse {
  text: string;
  language: LangCode;
  confidence: number;
}

export async function transcribeAudio(audioData: string, language?: LangCode): Promise<WhisperResponse> {
  const normalized = (audioData || '').trim();

  return {
    text: normalized || 'Book a ride from JRO to downtown Dar es Salaam for 3 passengers at 8 PM.',
    language: language || 'en',
    confidence: 0.97
  };
}
