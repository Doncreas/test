'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Compass, MapPinned, Sparkles, Building2, Plane, HeartHandshake } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    title: 'Airport transfers',
    description: 'DAR · JRO · ZNZ · MWZ · IRI',
    image: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80',
    span: 'col-span-1 lg:col-span-2 lg:row-span-2',
    icon: Plane,
    badge: 'Most popular'
  },
  {
    title: 'City & safari tours',
    description: 'Curated by local experts',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    span: 'col-span-1',
    icon: Compass
  },
  {
    title: 'Long-distance trips',
    description: 'Arusha · Moshi · Dodoma · Bagamoyo',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80',
    span: 'col-span-1',
    icon: MapPinned
  },
  {
    title: 'Corporate travel',
    description: 'Monthly invoicing, priority dispatch',
    image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80',
    span: 'col-span-1',
    icon: Building2
  },
  {
    title: 'Wedding & events',
    description: 'Decorated fleets and multiple cars',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    span: 'col-span-1 lg:col-span-2',
    icon: HeartHandshake
  },
  {
    title: 'Hotel partnerships',
    description: 'White-label concierge for hotels',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    span: 'col-span-1',
    icon: Sparkles
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="section-spacing bg-cream">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Services</p>
          <h2 className="section-title">Whatever brought you to Tanzania, we’ll get you there</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.08 * index }} className={`group relative overflow-hidden rounded-[32px] border border-sage/10 bg-white shadow-sm ${service.span}`}>
                <Image src={service.image} alt={service.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent" />
                <div className="relative flex h-full min-h-[280px] flex-col justify-between p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                      <Icon size={20} />
                    </div>
                    {service.badge ? <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">{service.badge}</span> : null}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">{service.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{service.description}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      Explore <ArrowRight size={16} className="transition duration-300 group-hover:rotate-45" />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
