'use client';

import { Mic, Volume2 } from 'lucide-react';
import { AudioVisualizer } from '@/components/chat/AudioVisualizer';

interface VoiceButtonProps {
  isListening?: boolean;
  onToggle?: () => void;
}

export function VoiceButton({ isListening = false, onToggle }: VoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        'flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all',
        isListening ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-sage text-white shadow-lg shadow-sage/20'
      ].join(' ')}
      aria-label={isListening ? 'Stop voice recording' : 'Start voice booking'}
    >
      {isListening ? <AudioVisualizer active /> : <Mic size={16} />}
      <span>{isListening ? 'Listening...' : 'Voice'}</span>
      {!isListening ? <Volume2 size={14} /> : null}
    </button>
  );
}
