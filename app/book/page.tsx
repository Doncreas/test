"use client";

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BriefcaseBusiness, CalendarDays, MapPin, Plane, Snowflake, UserRound, Sparkles, Users, Wifi } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

type VehicleType = 'sedan' | 'suv' | 'land-cruiser' | 'van';

type VehicleOption = {
  type: VehicleType;
  name: string;
  model: string;
  capacity: string;
  luggage: string;
  price: number;
  image: string;
};

const vehicleOptions: VehicleOption[] = [
  { type: 'sedan', name: 'Sedan', model: 'Comfort', capacity: '3 seats', luggage: '2 bags', price: 25000, image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80' },
  { type: 'suv', name: 'SUV', model: 'Family', capacity: '4 seats', luggage: '4 bags', price: 35000, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80' },
  { type: 'land-cruiser', name: 'Land Cruiser', model: 'Safari', capacity: '6 seats', luggage: '6 bags', price: 55000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80' },
  { type: 'van', name: 'Van', model: 'Hiace', capacity: '8 seats', luggage: '8 bags', price: 65000, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80' },
];

function BookPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [airport, setAirport] = useState('Julius Nyerere Intl (DAR)');
  const [flight, setFlight] = useState('EK 725');
  const [pickup, setPickup] = useState('Terminal 2');
  const [dropoff, setDropoff] = useState('Serena Hotel, Masaki');
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const vehicle = searchParams.get('vehicle');
    if (vehicleOptions.some((option) => option.type === vehicle)) {
      setSelectedVehicle(vehicle as VehicleType);
    }
  }, [searchParams]);

  const selectedVehicleOption = vehicleOptions.find((vehicle) => vehicle.type === selectedVehicle);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedVehicle) {
      setMessage('Please choose a vehicle before confirming your ride.');
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ airport, flight, pickup, dropoff, passengers, vehicleType: selectedVehicle })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push(`/track/${data.booking.id}`);
      } else {
        setMessage(data.error || 'Booking failed');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] border border-sage/10 bg-white p-8 shadow-[0_24px_80px_rgba(10,31,28,0.08)] sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/10 bg-cream px-3 py-2 text-sm font-semibold text-sage">
              <Sparkles size={16} /> AI-assisted booking
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-ink sm:text-5xl">Book your airport ride in under a minute</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">Tell us your flight, group size, and destination. We’ll confirm your driver, meet-and-greet, and fixed price instantly.</p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div className="rounded-[24px] border border-sage/10 bg-cream p-4">
                <div className="flex items-center gap-3 text-sage">
                  <Plane size={18} />
                  <p className="font-semibold">Arrival details</p>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-ink/70">
                    Airport
                    <select value={airport} onChange={(e) => setAirport(e.target.value)} className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none">
                      <option>Julius Nyerere Intl (DAR)</option>
                      <option>Kilimanjaro Intl (JRO)</option>
                      <option>Abeid Karume Intl (ZNZ)</option>
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-ink/70">
                    Flight number
                    <input value={flight} onChange={(e) => setFlight(e.target.value)} className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none" placeholder="EK 725" />
                  </label>
                </div>
              </div>

              <div className="rounded-[24px] border border-sage/10 bg-cream p-4">
                <div className="flex items-center gap-3 text-sage">
                  <MapPin size={18} />
                  <p className="font-semibold">Destination</p>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-ink/70">
                    Pickup
                    <input
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none"
                      placeholder="Terminal 2"
                    />
                  </label>
                  <label className="block text-sm font-medium text-ink/70">
                    Drop-off
                    <input
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none"
                      placeholder="Serena Hotel, Masaki"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-[24px] border border-sage/10 bg-cream p-4">
                <div className="flex items-center gap-3 text-sage">
                  <UserRound size={18} />
                  <p className="font-semibold">Travelers</p>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-ink/70">
                    Passengers
                    <input
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none"
                      type="number"
                    />
                  </label>
                  <label className="block text-sm font-medium text-ink/70">
                    Luggage
                    <input
                      value={luggage}
                      onChange={(e) => setLuggage(Number(e.target.value))}
                      className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none"
                      type="number"
                    />
                  </label>
                </div>
              </div>

              <fieldset className="rounded-[24px] border border-sage/10 bg-cream p-4">
                <legend className="px-1 text-sm font-semibold text-sage">Choose your vehicle</legend>
                <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {vehicleOptions.map((vehicle) => {
                    const isSelected = selectedVehicle === vehicle.type;

                    return (
                      <button
                        key={vehicle.type}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setSelectedVehicle(vehicle.type);
                          setMessage(null);
                        }}
                        className={`rounded-3xl border p-3 text-left transition-all ${
                          isSelected
                            ? 'border-sunset bg-white shadow-[0_12px_30px_rgba(255,122,26,0.18)] ring-2 ring-sunset/20'
                            : 'border-sage/10 bg-white/70 hover:border-sage/30 hover:bg-white'
                        }`}
                      >
                        <div className="relative h-32 overflow-hidden rounded-2xl bg-sage/10">
                          <Image src={vehicle.image} alt={`${vehicle.name} ${vehicle.model}`} fill sizes="(max-width: 1024px) 50vw, 220px" className="object-cover" />
                          {vehicle.type === 'suv' ? <span className="absolute right-2 top-2 rounded-full bg-sunset px-2 py-1 text-[10px] font-bold text-white">Popular</span> : null}
                        </div>
                        <span className="mt-2 block text-sm font-black text-ink">{vehicle.name}</span>
                        <span className="block text-xs font-semibold text-sage">{vehicle.model}</span>
                        <div className="mt-2 flex flex-wrap gap-1 text-[10px] font-semibold text-ink/65">
                          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2 py-1"><Users size={11} /> {vehicle.capacity}</span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2 py-1"><BriefcaseBusiness size={11} /> {vehicle.luggage}</span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2 py-1"><Snowflake size={11} /> AC</span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2 py-1"><Wifi size={11} /> WiFi</span>
                        </div>
                        <span className="mt-2 block text-sm font-bold text-sunset">{vehicle.price.toLocaleString()} TZS</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8">
                <button disabled={loading || !selectedVehicle} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sunset to-[#ff9447] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.3)] disabled:cursor-not-allowed disabled:opacity-50">
                  {loading ? 'Booking…' : 'Confirm my ride'}
                </button>
                {message ? <p className="mt-3 text-sm text-ink/70">{message}</p> : null}
              </div>
            </form>
          </div>

          <div className="rounded-[36px] border border-sage/10 bg-ink p-8 text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)] sm:p-10">
            <div className="flex items-center gap-3 text-sage">
              <CalendarDays size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Your trip summary</p>
            </div>
            <h2 className="mt-5 text-3xl font-black">Premium meet & greet ready</h2>
            <div className="mt-8 space-y-4 rounded-[24px] border border-white/10 bg-white/10 p-5">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Driver</span>
                <span className="font-semibold text-white">Joseph Mwamba</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Vehicle</span>
                <span className="font-semibold text-white">{selectedVehicleOption ? `${selectedVehicleOption.name} · ${selectedVehicleOption.model}` : 'Choose a vehicle'}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Price</span>
                <span className="font-semibold text-white">{selectedVehicleOption ? `${selectedVehicleOption.price.toLocaleString()} TZS` : 'Select a vehicle'}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Arrival wait</span>
                <span className="font-semibold text-white">Up to 60 mins</span>
              </div>
            </div>
            <div className="mt-8 rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-5 text-sm leading-7 text-emerald-100">
              Your booking is protected with live flight tracking, verified drivers, and free cancellation up to one hour before pickup.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function BookPageFallback() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-pulse space-y-8">
        <div className="h-10 w-32 rounded-full bg-sage/10" />
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="h-[720px] rounded-[36px] bg-white shadow-[0_24px_80px_rgba(10,31,28,0.08)]" />
          <div className="h-[420px] rounded-[36px] bg-ink/90" />
        </div>
      </div>
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<BookPageFallback />}>
      <BookPageContent />
    </Suspense>
  );
}
