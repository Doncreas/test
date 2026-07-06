'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Compass, Sparkles, Wallet } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Book in 60 seconds',
    description: 'Tell our AI your flight, group size, and language.',
    icon: Sparkles
  },
  {
    number: '02',
    title: 'Meet at the gate',
    description: 'Your driver waits inside arrivals with a sign, your name, and cold water.',
    icon: BadgeCheck
  },
  {
    number: '03',
    title: 'Ride in comfort',
    description: 'Fixed price, M-Pesa or card, free cancellation up to 1 hour before.',
    icon: Wallet
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-spacing bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title">From the runway to your hotel, in three calm steps</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.1 * index }} className="relative rounded-[32px] border border-sage/10 bg-cream p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-sage">{step.number}</span>
                  <div className="rounded-2xl bg-gradient-to-br from-sage to-ocean p-3 text-white">
                    <Icon size={20} />
                  </div>
                </div>
                <h3 className="mt-6 text-2xl font-black text-ink">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink/70">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
