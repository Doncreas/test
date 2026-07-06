'use client';

import { motion } from 'framer-motion';
import { Check, Crown } from 'lucide-react';

const tiers = [
  {
    name: 'One-way',
    price: 'From 25,000 TZS',
    description: 'Fast arrival pickup, live flight tracking, no surge pricing',
    features: ['Fixed airport pickup', 'Meet & greet', 'Free cancellation up to 1h'],
    cta: 'Book one ride'
  },
  {
    name: 'Round trip',
    price: 'Save 15% on return',
    description: 'Best for families and multi-stop itineraries',
    features: ['Priority dispatch', 'Flexible return timing', 'AI itinerary planning'],
    cta: 'Book round trip',
    featured: true
  },
  {
    name: 'Corporate',
    price: 'Custom · monthly invoicing',
    description: 'Dedicated support for hotels, teams, and events',
    features: ['Invoice-ready receipts', 'Priority drivers', 'Tailored account manager'],
    cta: 'Contact sales'
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="section-spacing bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Simple pricing</p>
          <h2 className="section-title">No surge. No meters. Just fair, fixed prices.</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.08 * index }} className={`rounded-[32px] border p-8 shadow-sm ${tier.featured ? 'scale-[1.02] border-sage/10 bg-gradient-to-br from-ink via-sage to-[#1d5b45] text-white shadow-glow' : 'border-sage/10 bg-cream text-ink'}`}>
              {tier.featured ? <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold"><Crown size={16} /> Most popular</div> : null}
              <h3 className="text-2xl font-black">{tier.name}</h3>
              <p className={`mt-3 text-sm leading-7 ${tier.featured ? 'text-white/75' : 'text-ink/70'}`}>{tier.description}</p>
              <div className="mt-6 text-3xl font-black">{tier.price}</div>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full ${tier.featured ? 'bg-white/15' : 'bg-sage/10 text-sage'}`}><Check size={14} /></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-full px-5 py-3 text-sm font-semibold ${tier.featured ? 'bg-white text-sage' : 'bg-sage text-white'}`}>{tier.cta}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
