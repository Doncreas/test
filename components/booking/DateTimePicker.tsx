'use client';

import { CalendarDays, Clock3 } from 'lucide-react';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function DateTimePicker({ value, onChange, label = 'Pickup time' }: DateTimePickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">{label}</label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
          <CalendarDays size={16} className="text-sage" />
          <input
            type="datetime-local"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </label>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700">
          <Clock3 size={16} className="text-sage" />
          <span>{new Date(value || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}
