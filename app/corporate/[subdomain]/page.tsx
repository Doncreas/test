type Props = {
  params: {
    subdomain: string;
  };
};

export default function WhiteLabelCorporatePage({ params }: Props) {
  const companyName = params.subdomain
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">White-label travel portal</p>
        <h1 className="mt-4 text-4xl font-black text-ink">{companyName} Business Travel</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          A dedicated booking portal for your staff with approval workflows, manager oversight, and same-day airport and clinic rides.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Employee rides</p>
            <p className="mt-3 text-2xl font-black text-ink">1,248</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Avg. trip time</p>
            <p className="mt-3 text-2xl font-black text-ink">19 min</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Daily approvals</p>
            <p className="mt-3 text-2xl font-black text-ink">34</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Budget left</p>
            <p className="mt-3 text-2xl font-black text-ink">TSh 480k</p>
          </div>
        </div>
      </div>
    </main>
  );
}
