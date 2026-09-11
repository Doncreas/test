'use client';

import { Button } from '@/components/ui/button';

interface TipScreenProps {
  tip: number;
  customTip: string;
  onTipChange: (value: number) => void;
  onCustomTipChange: (value: string) => void;
}

const presetTips = [1000, 2000, 5000];

export function TipScreen({ tip, customTip, onTipChange, onCustomTipChange }: TipScreenProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Add a tip</p>
        <h3 className="mt-2 text-xl font-bold text-ink">Show appreciation</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {presetTips.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onTipChange(preset)}
            className={[
              'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
              tip === preset
                ? 'border-sunset bg-sunset text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-sunset/50 hover:text-sunset'
            ].join(' ')}
          >
            {preset.toLocaleString()} TZS
          </button>
        ))}
      </div>

      <label className="block space-y-2 text-sm font-medium text-slate-700">
        <span>Custom tip</span>
        <input
          type="number"
          min={0}
          value={customTip}
          onChange={(event) => onCustomTipChange(event.target.value)}
          placeholder="Enter TZS"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sage"
        />
      </label>

      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
        <span className="text-sm text-slate-600">Selected tip</span>
        <span className="text-lg font-bold text-ink">
          {(Number(customTip) > 0 ? Number(customTip) : tip).toLocaleString()} TZS
        </span>
      </div>

      <Button type="button" variant="secondary" className="w-full justify-center">
        Add tip to trip
      </Button>
    </div>
  );
}
