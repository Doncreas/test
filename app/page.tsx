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

export default function HomePage() {
  return (
    <main id="top" className="overflow-x-hidden bg-cream">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <ConciergeSection />
      <FleetSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
      <ChatWidget />
    </main>
  );
}
