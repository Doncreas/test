export interface TTSResponse {
  audioUrl: string;
  language: string;
}

export async function synthesizeSpeech(text: string, language = 'en'): Promise<TTSResponse> {
  return {
    audioUrl: `https://example.com/audio/${encodeURIComponent(text.slice(0, 20))}.mp3`,
    language
  };
}
