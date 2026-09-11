'use client';

import { Facebook, Instagram, Linkedin, Twitter, Globe2 } from 'lucide-react';

const companyLinks = ['About', 'Careers', 'Press', 'Contact'];
const serviceLinks = ['Airport', 'Tours', 'Corporate', 'Long-distance'];
const supportLinks = ['Help', 'Safety', 'Driver program', 'Partners'];
const legalLinks = ['Privacy', 'Terms', 'Cookies', 'Imprint'];

// These informational pages are not built yet; keep their links as placeholders until the content routes exist.
const travelerLinks = [
  { label: 'Book a Ride', href: '/book' },
  { label: 'Transaction', href: '/wallet/history' },
  { label: 'Karibu Pass', href: '/pass' },
  { label: 'Rewards Program', href: '/rewards' },
];
const businessLinks = [
  { label: 'Corporate Accounts', href: '/corporate' },
  { label: 'Become a Driver', href: '/driver/onboarding' },
  { label: 'Hotel Partners', href: '/partners/hotel' },
  { label: 'Creator Partners', href: '/partners/influencer' },
];
const trustLinks = [
  { label: 'Safety Center', href: '/safety' },
  { label: 'FAQ', href: '#faq' },
];
const payments = ['M-Pesa', 'Visa', 'Mastercard', 'Tigo', 'Airtel', 'PayPal'];

export function FooterSection() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-shell py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          <div className="xl:col-span-2">
            <div className="flex items-center gap-3 text-xl font-black">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sunset to-gold text-white">✈</div>
              <div>
                <div>TANZALIFT</div>
                <div className="text-sm font-medium text-white/60">Airport Taxi Service</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">Premium airport taxi service for international visitors arriving in Tanzania with AI-powered concierge and trusted local drivers.</p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition hover:bg-white/20" aria-label="Social link">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {companyLinks.map((link) => <li key={link}><a href="#" className="transition hover:text-white">{link}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Services</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {serviceLinks.map((link) => <li key={link}><a href="#" className="transition hover:text-white">{link}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Support</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {supportLinks.map((link) => <li key={link}><a href="#" className="transition hover:text-white">{link}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Legal</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {legalLinks.map((link) => <li key={link}><a href="#" className="transition hover:text-white">{link}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">For Travelers</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {travelerLinks.map((link) => <li key={link.href}><a href={link.href} className="transition hover:text-white">{link.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">For Business</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {businessLinks.map((link) => <li key={link.href}><a href={link.href} className="transition hover:text-white">{link.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Trust &amp; Safety</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {trustLinks.map((link) => <li key={link.href}><a href={link.href} className="transition hover:text-white">{link.label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/70 lg:flex-row lg:items-center lg:justify-between">
          <p>© 2025 TANZALIFT · Made with ♥ in Dar es Salaam</p>
          <div className="flex flex-wrap gap-3">
            {payments.map((payment) => <span key={payment} className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{payment}</span>)}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2">
            <Globe2 size={16} /> English
          </div>
        </div>
      </div>
    </footer>
  );
}
