type Props = {
  params: {
    id: string;
  };
};

export default function DriverTripPage({ params }: Props) {
  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">Trip {params.id}</p>
        <h1 className="mt-3 text-3xl font-black text-ink">Airport pickup</h1>

        <div className="mt-5 space-y-4 text-sm text-slate-600">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Pickup</p>
            <p className="mt-1 font-bold text-ink">Julius Nyerere Airport</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Dropoff</p>
            <p className="mt-1 font-bold text-ink">Mbezi Beach, Dar es Salaam</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Fare estimate</p>
            <p className="mt-1 font-black text-ink">TSh 85,000</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Accept window</p>
          <p className="mt-2 text-3xl font-black text-ink">15s</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white">Accept</button>
          <button className="flex-1 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-ink">Decline</button>
        </div>
      </div>
    </main>
  );
}
