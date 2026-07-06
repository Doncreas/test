'use client';

import { useState } from 'react';
import { Menu, Plane, X } from 'lucide-react';

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'AI Concierge', href: '#ai-concierge' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sage/10 bg-cream/80 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-sunset text-white shadow-glow">
            <Plane size={18} />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-ink">TANZALIFT</p>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-sage/70">Airport Taxi Service</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-ink/70 transition hover:text-sage">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="/login" className="rounded-full border border-sage/15 px-5 py-2.5 text-sm font-semibold text-sage transition hover:bg-white">
            Sign in
          </a>
          <a href="/book" className="rounded-full bg-gradient-to-r from-sunset to-[#ff9447] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.3)]">
            Book a ride
          </a>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-sage/10 bg-white/80 text-sage lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-sage/10 bg-white/95 px-4 py-4 lg:hidden">
          <div className="container-shell flex flex-col gap-3">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="rounded-2xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <a href="/login" className="rounded-full border border-sage/15 px-4 py-3 text-center text-sm font-semibold text-sage" onClick={() => setOpen(false)}>
                Sign in
              </a>
              <a href="/book" className="rounded-full bg-gradient-to-r from-sunset to-[#ff9447] px-4 py-3 text-center text-sm font-semibold text-white" onClick={() => setOpen(false)}>
                Book a ride
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
