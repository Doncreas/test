'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, Clock3, Sparkles, Plane, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const trustItems = [
  { title: 'Verified drivers', icon: ShieldCheck },
  { title: '24/7 support', icon: Clock3 },
  { title: 'Live flight tracking', icon: Plane }
];

const backgroundImages = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=80'
];

export function HeroSection() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % backgroundImages.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 10% 10%, rgba(255,122,26,0.24), transparent 35%), radial-gradient(circle at 85% 15%, rgba(0,168,197,0.24), transparent 30%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/60" />
        <AnimatePresence mode="wait">
          <motion.div
            key={backgroundImages[activeImage]}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0"
          >
            <Image src={backgroundImages[activeImage]} alt="Tanzania scenery" fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="container-shell relative section-spacing grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/90 px-4 py-2 text-sm font-medium text-sage shadow-sm backdrop-blur">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-sunset" /> AI-powered · trusted by 12,000+ travelers
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            TANZALIFT
            <span className="mt-4 block bg-gradient-to-r from-[#fef3d0] via-[#ffd17a] to-[#ff8a3d] bg-clip-text text-transparent">Your safe ride is waiting</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
            Premium airport transfers with AI concierge, meet-and-greet, and fixed pricing for every arrival in Dar es Salaam, Zanzibar, and the northern circuit.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sunset to-[#ff9447] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.3)] transition hover:-translate-y-0.5">
              <Sparkles size={16} /> Book in 60 seconds
            </a>
            <a href="/track" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/90 px-5 py-3 text-sm font-semibold text-sage transition hover:bg-sage hover:text-white">
              Track my flight
            </a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index + 0.2 }} className="rounded-2xl border border-white/20 bg-white/90 p-4 shadow-sm backdrop-blur">
                  <Icon size={18} className="text-sage" />
                  <p className="mt-3 text-sm font-semibold text-ink">{item.title}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {['A', 'M', 'P', 'S'].map((letter, index) => (
                <div key={letter} className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm font-semibold text-white ${index % 2 === 0 ? 'bg-sage' : 'bg-sunset'}`}>
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-white/90">★★★★★ 4.9/5 · 2,400+ reviews</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30, rotate: -4 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-sunset/20 blur-3xl" />
          <div className="absolute bottom-8 right-0 h-32 w-32 rounded-full bg-ocean/20 blur-3xl" />
          <div className="glass-card relative p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-white">
              <div>
                <p className="text-sm font-semibold">Live booking</p>
                <p className="text-xs text-white/70">ID #TAN-2048</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Confirmed
              </div>
            </div>
            <div className="rounded-[24px] border border-sage/10 bg-white/85 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-sage">Route</p>
                  <p className="mt-2 text-sm font-semibold text-ink">Julius Nyerere Intl · Terminal 2 · 21:40</p>
                  <p className="mt-1 text-sm text-ink/70">to Serena Hotel, Masaki</p>
                </div>
                <div className="rounded-full bg-sage/10 p-2 text-sage">
                  <BadgeCheck size={16} />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#fef8ef] p-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full">
                    <Image src="https://i.pravatar.cc/100?img=32" alt="Driver Joseph Mwamba" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Joseph Mwamba</p>
                    <p className="text-xs text-ink/70">Verified · English · Kiswahili</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-ink">35,000 TZS</p>
                  <p className="text-xs text-ink/60">Fixed price</p>
                </div>
              </div>
              <button className="mt-4 flex w-full items-center justify-center rounded-full bg-sage px-4 py-3 text-sm font-semibold text-white">
                Meet & Greet confirmed
              </button>
            </div>
          </div>
          <motion.div initial={{ y: 0 }} animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -left-6 top-20 max-w-[220px] rounded-2xl border border-sage/10 bg-white/90 p-3 shadow-lg">
            <p className="text-sm text-ink">I added a 5-minute stop at the best-rated bureau de change on your route. Confirm?</p>
          </motion.div>
          <motion.div initial={{ y: 0 }} animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-4 right-4 rounded-2xl border border-sage/10 bg-white/90 p-3 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-sage">Live flight</p>
            <p className="mt-1 text-sm font-semibold text-ink">EK 725 · on time</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
