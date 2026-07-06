'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    name: 'Sarah Chen',
    role: 'Solo · Shanghai',
    quote: 'The AI suggested the perfect bureau de change stop and the ride felt effortless.',
    avatar: 'https://i.pravatar.cc/100?img=47'
  },
  {
    name: 'Markus Weber',
    role: 'Family of 5 · Berlin',
    quote: 'A roomy Hiace, warm welcome, and the driver arrived with cold water.',
    avatar: 'https://i.pravatar.cc/100?img=15'
  },
  {
    name: 'Amina Yusuf',
    role: 'Business · Lagos',
    quote: 'Corporate invoicing and predictable pricing made my airport transfer simple.',
    avatar: 'https://i.pravatar.cc/100?img=21'
  },
  {
    name: 'Lars Eriksson',
    role: 'Honeymoon · Stockholm',
    quote: 'The touches felt luxurious from the first message to the final drop-off.',
    avatar: 'https://i.pravatar.cc/100?img=33'
  },
  {
    name: 'Priya Sharma',
    role: 'Photographer · Mumbai',
    quote: 'We stopped for sunset photos and the driver handled the whole plan seamlessly.',
    avatar: 'https://i.pravatar.cc/100?img=41'
  }
];

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="min-w-[320px] rounded-[28px] border border-sage/10 bg-white/80 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full">
            <Image src={review.avatar} alt={review.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold text-ink">{review.name}</p>
            <p className="text-sm text-ink/60">{review.role}</p>
          </div>
        </div>
        <div className="rounded-full bg-[#fff2e4] p-2 text-sunset"><Quote size={16} /></div>
      </div>
      <p className="mt-5 text-sm leading-7 text-ink/75">“{review.quote}”</p>
      <div className="mt-5 text-sm font-semibold text-gold">★★★★★</div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-spacing bg-[linear-gradient(135deg,#fcf4e8_0%,#f8efe1_100%)]">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Loved by travelers</p>
          <h2 className="section-title">4.9 from 2,400+ arrivals</h2>
        </div>
        <div className="mt-10 space-y-6 overflow-hidden">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} className="flex gap-4 [animation:marquee_40s_linear_infinite]">
            {[...reviews, ...reviews].map((review, index) => (
              <ReviewCard key={`${review.name}-${index}`} review={review} />
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} className="flex gap-4 [animation:marquee_50s_linear_infinite_reverse]">
            {[...reviews].reverse().map((review, index) => (
              <div key={`${review.name}-${index}`} className="min-w-[320px] rounded-[28px] border border-ink/10 bg-ink p-6 text-white shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full">
                      <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-white/60">{review.role}</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-white/10 p-2 text-gold"><Quote size={16} /></div>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/75">“{review.quote}”</p>
                <div className="mt-5 text-sm font-semibold text-gold">★★★★★</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
