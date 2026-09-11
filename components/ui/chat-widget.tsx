'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, SendHorizonal, Sparkles, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { VoiceButton } from '@/components/chat/VoiceButton';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="mb-4 w-[340px] rounded-[28px] border border-white/60 bg-white/80 p-4 shadow-[0_20px_70px_rgba(10,31,28,0.16)] backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-white">
              <div>
                <p className="text-sm font-semibold">Asha · AI Concierge</p>
                <p className="text-xs text-white/70">Online · 0.3s response</p>
              </div>
              <div className="rounded-full bg-emerald-500/20 p-2">
                <Sparkles size={16} />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="max-w-[85%] rounded-2xl bg-[#f5e8d5] p-3 text-ink">Habari! I can book your ride and track your flight.</div>
              <div className="ml-auto max-w-[85%] rounded-2xl bg-sage p-3 text-white">Book a ride from JRO for 3am.</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <VoiceButton isListening={listening} onToggle={() => setListening((v) => !v)} />
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                <Volume2 size={14} />
                Talk to human
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-full border border-sage/10 bg-cream p-2">
              <input className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" placeholder="Tell me your flight and route" />
              <button className="rounded-full bg-sunset p-2 text-white" aria-label="Send message">
                <SendHorizonal size={16} />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <span>Accessibility: voice enabled</span>
              <span>High contrast mode</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sunset to-orange-400 text-white shadow-[0_20px_50px_rgba(255,122,26,0.35)]"
        aria-label="Open chat"
      >
        <MessageCircle size={22} />
      </motion.button>
    </div>
  );
}
