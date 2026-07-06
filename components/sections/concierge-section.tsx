'use client';

import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, MessageCircleMore } from 'lucide-react';

const languages = ['English', 'Kiswahili', 'Français', 'Deutsch', '中文', 'العربية'];
const bullets = ['Voice and text support', 'Itinerary-aware routing', 'Smart stop suggestions', 'Multi-language concierge'];

export function ConciergeSection() {
  return (
    <section id="ai-concierge" className="section-spacing bg-ink text-white">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80"><Sparkles size={16} /> AI Concierge</p>
          <h2 className="section-title text-white">Talk to your ride in your language</h2>
          <p className="mt-6 text-lg leading-8 text-white/70">Our multilingual AI understands voice and text, books your ride, suggests stops, and adapts to your itinerary.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {languages.map((language) => (
              <span key={language} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/80">{language}</span>
            ))}
          </div>
          <ul className="mt-8 space-y-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-white/80">
                <CheckCircle2 size={18} className="text-sage" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} className="relative mx-auto w-full max-w-[520px]">
          <div className="rounded-[34px] border border-white/10 bg-white/10 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex items-center justify-between rounded-[24px] bg-white/10 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">Asha · AI Concierge</p>
                <p className="text-xs text-white/60">Online · 0.3s response</p>
              </div>
              <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-400">
                <MessageCircleMore size={16} />
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl bg-white/10 p-3 text-white/90">User: I land at 10pm from Dubai with 4 people, need a big car.</div>
              <div className="rounded-2xl bg-[#1f4f3f] p-3 text-white">AI: Habari! Flight EK 725 tracked. I’ve reserved a Toyota Land Cruiser V8...</div>
              <div className="rounded-2xl bg-white/10 p-3 text-white/90">User: Can we stop for cash on the way?</div>
              <div className="rounded-2xl bg-[#1f4f3f] p-3 text-white">AI: Of course. I’ll route you through the best-rated bureau de change in Masaki.</div>
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-3 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/70" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:0.3s]" />
              </div>
              <p className="text-sm text-white/70">Try: I need a van at JRO tomorrow at 3am…</p>
            </div>
          </div>
          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur">⚡ 0.3s response</div>
        </motion.div>
      </div>
    </section>
  );
}
