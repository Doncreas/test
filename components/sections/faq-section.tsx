'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'What if my flight is delayed?',
    answer: 'We track your flight live and hold your pickup for up to 60 minutes free of charge.'
  },
  {
    question: 'Is it cheaper than Bolt or Uber?',
    answer: 'Yes. We use fixed rates with no surge pricing and clearer airport fees.'
  },
  {
    question: 'How do I pay?',
    answer: 'Choose M-Pesa, Tigo Pesa, Airtel Money, Visa, Mastercard, PayPal, or cash.'
  },
  {
    question: 'Are the drivers safe?',
    answer: 'Every driver is background checked, GPS-tracked, and inspected every 90 days.'
  },
  {
    question: 'Can I add multiple stops?',
    answer: 'Absolutely. Our AI concierge can plan multi-stop itineraries for bureaus, hotels, and safari gates.'
  },
  {
    question: 'Do you serve outside Dar es Salaam?',
    answer: 'We cover Arusha, Moshi, Zanzibar, Kilimanjaro, Bagamoyo, and more.'
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-spacing bg-cream">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">Questions, answered calmly</h2>
        </div>
        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="rounded-[28px] border border-sage/10 bg-white p-5 shadow-sm">
                <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpenIndex(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span className="text-lg font-semibold text-ink">{faq.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-sage">
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="pt-4 text-base leading-7 text-ink/70">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
