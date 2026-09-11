'use client';

import { useState } from 'react';
import { Menu, Plane, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDown, LogOut, UserRound } from 'lucide-react';

const airportLinks = [
  { label: 'DAR Airport', href: '/airports/dar' },
  { label: 'JRO Airport', href: '/airports/jro' },
  { label: 'ZNZ Airport', href: '/airports/znz' },
  { label: 'MWZ Airport', href: '/airports/mwz' },
];

const aboutLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
];

const moreLinks = [
  { label: 'AI Concierge', href: '#ai-concierge' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [airportsOpen, setAirportsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const isAuthenticated = status === 'authenticated';
  const userName = session?.user?.name || session?.user?.email || 'Account';
  const userRole = session?.user?.role?.replace('_', ' ') || 'rider';

  async function handleSignOut() {
    await signOut({ redirectTo: '/' });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sage/10 bg-cream/80 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label="TANZALIFT home">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-sunset text-white shadow-glow">
            <Plane size={18} />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-ink">TANZALIFT</p>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-sage/70">Airport Taxi Service</p>
          </div>
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          <a href="/" className="text-sm font-semibold text-ink/70 transition hover:text-sage">
            Home
          </a>
          <div className="relative">
            <button type="button" className="inline-flex items-center gap-1 text-sm font-semibold text-ink/70 transition hover:text-sage" onClick={() => setAirportsOpen((value) => !value)} aria-expanded={airportsOpen}>
              Airports <ChevronDown size={15} />
            </button>
            {airportsOpen ? (
              <div className="absolute left-0 top-full mt-3 w-48 rounded-2xl border border-sage/10 bg-white p-2 shadow-[0_18px_50px_rgba(10,31,28,0.14)]">
                {airportLinks.map((link) => <a key={link.href} href={link.href} className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream">{link.label}</a>)}
              </div>
            ) : null}
          </div>
          <a href="/safari" className="text-sm font-semibold text-ink/70 transition hover:text-sage">Safari</a>
          <a href="/partners/hotel" className="text-sm font-semibold text-ink/70 transition hover:text-sage">Partners</a>
          <div className="relative">
            <button type="button" className="inline-flex items-center gap-1 text-sm font-semibold text-ink/70 transition hover:text-sage" onClick={() => setAboutOpen((value) => !value)} aria-expanded={aboutOpen}>
              About <ChevronDown size={15} />
            </button>
            {aboutOpen ? (
              <div className="absolute left-0 top-full mt-3 w-44 rounded-2xl border border-sage/10 bg-white p-2 shadow-[0_18px_50px_rgba(10,31,28,0.14)]">
                {aboutLinks.map((link) => <a key={link.href} href={link.href} className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream">{link.label}</a>)}
              </div>
            ) : null}
          </div>
          <div className="relative">
            <button type="button" className="inline-flex items-center gap-1 text-sm font-semibold text-ink/70 transition hover:text-sage" onClick={() => setMoreOpen((value) => !value)} aria-expanded={moreOpen}>
              More <ChevronDown size={15} />
            </button>
            {moreOpen ? (
              <div className="absolute left-0 top-full mt-3 w-44 rounded-2xl border border-sage/10 bg-white p-2 shadow-[0_18px_50px_rgba(10,31,28,0.14)]">
                {moreLinks.map((link) => <a key={link.href} href={link.href} className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream">{link.label}</a>)}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2.5 text-sm font-semibold text-sage transition hover:bg-white"
                onClick={() => setAccountOpen((value) => !value)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
              >
                <UserRound size={16} />
                <span className="max-w-32 truncate">{userName}</span>
                <ChevronDown size={15} />
              </button>
              {accountOpen ? (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-sage/10 bg-white p-2 shadow-[0_18px_50px_rgba(10,31,28,0.14)]" role="menu">
                  <div className="border-b border-sage/10 px-3 pb-2 pt-1">
                    <p className="truncate text-sm font-bold text-ink">{userName}</p>
                    <p className="mt-0.5 text-xs capitalize text-ink/50">{userRole}</p>
                  </div>
                  <a href="/dashboard" className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream" role="menuitem" onClick={() => setAccountOpen(false)}>
                    Dashboard
                  </a>
                  <a href="/wallet" className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream" role="menuitem" onClick={() => setAccountOpen(false)}>
                    Wallet
                  </a>
                  <a href="/rewards" className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream" role="menuitem" onClick={() => setAccountOpen(false)}>
                    Rewards
                  </a>
                  <a href="/safety" className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream" role="menuitem" onClick={() => setAccountOpen(false)}>
                    Safety Center
                  </a>
                  <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-red-50" role="menuitem" onClick={handleSignOut}>
                    <LogOut size={15} /> Log Out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <a href="/login" className="rounded-full border border-sage/15 px-5 py-2.5 text-sm font-semibold text-sage transition hover:bg-white">
              Sign in
            </a>
          )}
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
            <a href="/" className="rounded-2xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream" onClick={() => setOpen(false)}>
              Home
            </a>
            <a href="/safari" className="rounded-2xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream" onClick={() => setOpen(false)}>Safari</a>
            <a href="/partners/hotel" className="rounded-2xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream" onClick={() => setOpen(false)}>Partners</a>
            <details className="rounded-2xl bg-cream/60 px-3 py-2">
              <summary className="cursor-pointer list-none text-sm font-semibold text-ink/80">Airports</summary>
              <div className="mt-2 space-y-1 border-l border-sage/15 pl-3">
                {airportLinks.map((link) => <a key={link.href} href={link.href} className="block py-1 text-sm font-medium text-ink/65" onClick={() => setOpen(false)}>{link.label}</a>)}
              </div>
            </details>
            <details className="rounded-2xl bg-cream/60 px-3 py-2">
              <summary className="cursor-pointer list-none text-sm font-semibold text-ink/80">About</summary>
              <div className="mt-2 space-y-1 border-l border-sage/15 pl-3">
                {aboutLinks.map((link) => <a key={link.href} href={link.href} className="block py-1 text-sm font-medium text-ink/65" onClick={() => setOpen(false)}>{link.label}</a>)}
              </div>
            </details>
            <details className="rounded-2xl bg-cream/60 px-3 py-2">
              <summary className="cursor-pointer list-none text-sm font-semibold text-ink/80">More</summary>
              <div className="mt-2 space-y-1 border-l border-sage/15 pl-3">
                {moreLinks.map((link) => <a key={link.href} href={link.href} className="block py-1 text-sm font-medium text-ink/65" onClick={() => setOpen(false)}>{link.label}</a>)}
              </div>
            </details>
            <div className="mt-2 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <a href="/dashboard" className="rounded-full border border-sage/15 px-4 py-3 text-center text-sm font-semibold text-sage" onClick={() => setOpen(false)}>
                    <span className="block">{userName}&apos;s dashboard</span>
                    <span className="mt-1 block text-xs capitalize text-sage/60">{userRole}</span>
                  </a>
                  <a href="/wallet" className="rounded-full border border-sage/15 px-4 py-3 text-center text-sm font-semibold text-sage" onClick={() => setOpen(false)}>
                    Wallet
                  </a>
                  <a href="/rewards" className="rounded-full border border-sage/15 px-4 py-3 text-center text-sm font-semibold text-sage" onClick={() => setOpen(false)}>
                    Rewards
                  </a>
                  <a href="/safety" className="rounded-full border border-sage/15 px-4 py-3 text-center text-sm font-semibold text-sage" onClick={() => setOpen(false)}>
                    Safety Center
                  </a>
                  <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-3 text-sm font-semibold text-red-700" onClick={handleSignOut}>
                    <LogOut size={16} /> Log Out
                  </button>
                </>
              ) : (
                <a href="/login" className="rounded-full border border-sage/15 px-4 py-3 text-center text-sm font-semibold text-sage" onClick={() => setOpen(false)}>
                  Sign in
                </a>
              )}
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
