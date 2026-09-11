'use client';

import { useState } from 'react';

const cadenceOptions = ['weekly', 'biweekly', 'monthly'];

interface RecurrenceBuilderProps {
  onChange?: (value: { cadence: string; dayOfWeek: number; timeOfDay: string }) => void;
}

export function RecurrenceBuilder({ onChange }: RecurrenceBuilderProps) {
  const [cadence, setCadence] = useState('weekly');
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [timeOfDay, setTimeOfDay] = useState('08:00');

  const emit = (nextCadence = cadence, nextDay = dayOfWeek, nextTime = timeOfDay) => {
    onChange?.({ cadence: nextCadence, dayOfWeek: nextDay, timeOfDay: nextTime });
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Recurring ride</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Cadence</span>
          <select
            value={cadence}
            onChange={(event) => {
              const next = event.target.value;
              setCadence(next);
              emit(next, dayOfWeek, timeOfDay);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-sage"
          >
            {cadenceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Day of week</span>
          <select
            value={dayOfWeek}
            onChange={(event) => {
              const next = Number(event.target.value);
              setDayOfWeek(next);
              emit(cadence, next, timeOfDay);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-sage"
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
              <option key={day} value={index + 1}>{day}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
          <span>Time of day</span>
          <input
            type="time"
            value={timeOfDay}
            onChange={(event) => {
              const next = event.target.value;
              setTimeOfDay(next);
              emit(cadence, dayOfWeek, next);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-sage"
          />
        </label>
      </div>
    </div>
  );
}
