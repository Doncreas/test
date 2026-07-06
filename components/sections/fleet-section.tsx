'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Snowflake, Users, Wifi } from 'lucide-react';
import Image from 'next/image';

const fleet = [
  {
    title: 'Sedan · Comfort',
    description: 'Toyota Corolla / Vitz',
    seats: '3 seats',
    luggage: '2 bags',
    price: '25,000 TZS',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'SUV · Family',
    description: 'Toyota RAV4 / Harrier',
    seats: '4 seats',
    luggage: '4 bags',
    price: '35,000 TZS',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
    popular: true
  },
  {
    title: 'Land Cruiser V8',
    description: 'Safari & groups',
    seats: '6 seats',
    luggage: '6 bags',
    price: '55,000 TZS',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Van · Hiace',
    description: 'Mercedes Sprinter',
    seats: '8 seats',
    luggage: '8 bags',
    price: '65,000 TZS',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80'
  }
];

export function FleetSection() {
  return (
    <section id="fleet" className="section-spacing bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Our fleet</p>
          <h2 className="section-title">Pick the ride that fits your journey</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {fleet.map((item, index) => (
            <motion.article key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.08 * index }} className="overflow-hidden rounded-[32px] border border-sage/10 bg-cream shadow-sm">
              <div className="relative h-56 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-ink/70">{item.description}</p>
                  </div>
                  {item.popular ? <span className="rounded-full bg-sunset/15 px-3 py-1 text-xs font-semibold text-sunset">Popular</span> : null}
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-sm text-ink/70">
                  <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2"><Users size={14} /> {item.seats}</span>
                  <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2"><BriefcaseBusiness size={14} /> {item.luggage}</span>
                  <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2"><Snowflake size={14} /> AC</span>
                  <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2"><Wifi size={14} /> WiFi</span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-sage">From</p>
                    <p className="text-lg font-black text-ink">{item.price}</p>
                  </div>
                  <button className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-white" aria-label={`Select ${item.title}`}>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
