'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, PhoneCall, ScanLine } from 'lucide-react';
import Image from 'next/image';

export function CtaSection() {
  return (
    <section className="section-spacing bg-[linear-gradient(135deg,#0f4c3a_0%,#0a1f1c_100%)]">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/10 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.2)] sm:p-10 lg:p-14">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Download the experience</p>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Book your ride in 60 seconds</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">No downloads, no sign-up walls. Just open the chat, type your flight, and you’re set.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white">App Store</a>
              <a href="#" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white">Google Play</a>
              <a href="https://wa.me/255755123456" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-sage"><MessageCircle size={16} /> WhatsApp</a>
              <a href="tel:+255755123456" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white"><PhoneCall size={16} /> Call us</a>
            </div>
          </div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute right-6 top-6 hidden w-40 rounded-[24px] border border-white/15 bg-white/90 p-4 shadow-xl lg:block">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Scan to chat</p>
              <ScanLine size={16} className="text-sage" />
            </div>
            <div className="mt-3 flex aspect-square items-center justify-center rounded-2xl bg-cream p-3">
              <Image src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=300&q=80" alt="QR code" width={120} height={120} className="rounded-xl object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
