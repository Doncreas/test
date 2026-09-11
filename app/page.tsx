import Link from 'next/link';
import { HeroSection } from '@/components/sections/hero-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ConciergeSection } from '@/components/sections/concierge-section';
import { FleetSection } from '@/components/sections/fleet-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { FaqSection } from '@/components/sections/faq-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FooterSection } from '@/components/sections/footer-section';
import { Navbar } from '@/components/ui/navbar';
import { ChatWidget } from '@/components/ui/chat-widget';
import { TierCard } from '@/components/pass/TierCard';

export default function HomePage() {
  return (
    <main id="top" className="overflow-x-hidden bg-cream">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <ConciergeSection />
      <FleetSection />
      <section id="karibu-pass" className="section-spacing bg-white">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Karibu Pass</p>
            <h2 className="section-title">Ride more, pay less.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink/65">
              Choose the membership that fits your travel rhythm, from everyday savings to airport concierge support.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <TierCard tier="free" />
            <TierCard tier="pass" />
            <TierCard tier="passplus" selected />
            <TierCard tier="black" isBlack />
          </div>
          <div className="mt-8 text-center">
            <Link href="/pass" className="inline-flex rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.25)]">
              Explore Karibu Pass
            </Link>
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
      <ChatWidget />
    </main>
  );
}
