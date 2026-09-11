import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import {
  CarFront,
  ChevronRight,
  CircleDollarSign,
  Gift,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

const quickActions = [
  { label: 'Book a ride', detail: 'Reserve your next transfer', href: '/book', icon: CarFront },
  { label: 'Wallet', detail: 'Manage your travel funds', href: '/wallet', icon: WalletCards },
  { label: 'Rewards', detail: 'View points and benefits', href: '/rewards', icon: Gift },
  { label: 'Safety Center', detail: 'Review your safety tools', href: '/safety', icon: ShieldCheck },
  { label: 'Karibu Pass', detail: 'Explore ride memberships', href: '/pass', icon: CircleDollarSign },
];

type DashboardBooking = {
  id: string;
  pickup: string;
  dropoff: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  vehicleType: string;
  priceTzs: number;
  createdAt: string;
  updatedAt: string;
};

function formatTzs(value: number) {
  return `TSh ${value.toLocaleString('en-TZ')}`;
}

async function getDashboardData() {
  const requestHeaders = headers();
  const host = requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') || 'http';
  const cookie = requestHeaders.get('cookie') || '';

  if (!host) {
    throw new Error('Request host is unavailable');
  }

  const requestOptions = {
    headers: { cookie },
    cache: 'no-store' as const,
  };

  const [walletResponse, pointsResponse, bookingsResponse] = await Promise.all([
    fetch(`${protocol}://${host}/api/wallet/me`, requestOptions),
    fetch(`${protocol}://${host}/api/points/me`, requestOptions),
    fetch(`${protocol}://${host}/api/bookings/me`, requestOptions),
  ]);

  if (!walletResponse.ok || !pointsResponse.ok || !bookingsResponse.ok) {
    throw new Error('Dashboard data could not be loaded');
  }

  const [{ wallet }, { points }, { bookings }] = await Promise.all([
    walletResponse.json(),
    pointsResponse.json(),
    bookingsResponse.json(),
  ]) as [
    { wallet: { balanceTzs: number } },
    { points: { balance: number; tier: string; lifetimeEarned: number } },
    { bookings: DashboardBooking[] },
  ];

  return { wallet, points, bookings };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const { wallet, points, bookings } = await getDashboardData();
  const activeBooking = bookings.find((booking) => ['pending', 'confirmed', 'in_progress'].includes(booking.status));
  const statCards = [
    { label: 'Wallet balance', value: formatTzs(wallet.balanceTzs), detail: 'Available for your next ride.', icon: WalletCards },
    { label: 'Points balance', value: `${points.balance.toLocaleString()} pts`, detail: `${points.lifetimeEarned.toLocaleString()} points earned lifetime.`, icon: Gift },
    { label: 'Active booking', value: activeBooking ? activeBooking.status.replace('_', ' ') : 'No active ride', detail: activeBooking ? `${activeBooking.pickup} to ${activeBooking.dropoff}` : 'Your next confirmed trip will appear here.', icon: MapPin },
    { label: 'Points tier', value: points.tier, detail: 'Based on your current points balance.', icon: Sparkles },
  ];
  const firstName = user.name?.trim().split(/\s+/)[0] || 'there';
  const roleLabel = user.role.replace('_', ' ');

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm transition hover:bg-white">
          Home
        </Link>
        <header className="rounded-[32px] bg-ink p-6 text-white shadow-[0_24px_80px_rgba(10,31,28,0.15)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Your TANZALIFT home base</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Good to see you, {firstName}</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">Your account is signed in and ready for your next Tanzania journey.</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
              <Sparkles size={14} /> Loyalty tier pending
            </span>
          </div>
          <p className="mt-6 text-xs capitalize text-white/50">Signed in as {roleLabel}</p>
        </header>

        <section aria-labelledby="account-overview">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Account overview</p>
              <h2 id="account-overview" className="mt-2 text-2xl font-black text-ink">Your travel snapshot</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map(({ label, value, detail, icon: Icon }) => (
              <div key={label} className="rounded-[24px] border border-sage/10 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-sage/70">{label}</p>
                  <Icon size={18} className="text-sage" aria-hidden="true" />
                </div>
                <p className="mt-5 text-xl font-black text-ink">{value}</p>
                <p className="mt-2 text-xs leading-5 text-ink/55">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="quick-actions">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Quick actions</p>
            <h2 id="quick-actions" className="mt-2 text-2xl font-black text-ink">Keep moving</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map(({ label, detail, href, icon: Icon }) => (
              <Link key={href} href={href} className="group rounded-[24px] border border-sage/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sage/30 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-2xl bg-sage/10 p-3 text-sage"><Icon size={20} aria-hidden="true" /></span>
                  <ChevronRight size={18} className="text-ink/30 transition group-hover:translate-x-1 group-hover:text-sage" aria-hidden="true" />
                </div>
                <p className="mt-5 text-lg font-black text-ink">{label}</p>
                <p className="mt-1 text-sm text-ink/60">{detail}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="recent-activity" className="rounded-[32px] border border-sage/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Recent activity</p>
              <h2 id="recent-activity" className="mt-2 text-2xl font-black text-ink">Your recent rides</h2>
            </div>
            <Link href={activeBooking ? `/track/${activeBooking.id}` : '/book'} className="inline-flex w-fit items-center gap-2 rounded-full bg-sunset px-4 py-2.5 text-sm font-semibold text-white">
              {activeBooking ? 'Track active ride' : 'Book your first ride'} <ChevronRight size={16} />
            </Link>
          </div>
          {bookings.length === 0 ? (
            <div className="mt-6 rounded-[24px] border border-dashed border-sage/20 bg-cream p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage"><HeartPulse size={22} aria-hidden="true" /></div>
              <h3 className="mt-4 text-lg font-black text-ink">No bookings to show yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/60">Book your first TANZALIFT ride and your recent activity will appear here.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex flex-col gap-3 rounded-[24px] border border-sage/10 bg-cream p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-ink">{booking.pickup} to {booking.dropoff}</p>
                    <p className="mt-1 text-xs capitalize text-ink/55">{booking.status.replace('_', ' ')} · {formatTzs(booking.priceTzs)}</p>
                  </div>
                  {booking.status === 'completed' ? (
                    <Link href={`/bookings/${booking.id}/rate`} className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/20 bg-white px-4 py-2 text-sm font-semibold text-sage">Rate this ride <ChevronRight size={15} /></Link>
                  ) : activeBooking?.id === booking.id ? (
                    <Link href={`/track/${booking.id}`} className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/20 bg-white px-4 py-2 text-sm font-semibold text-sage">Track ride <ChevronRight size={15} /></Link>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
