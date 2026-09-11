'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/rating/StarRating';
import { TagSelector } from '@/components/rating/TagSelector';
import { TipScreen } from '@/components/rating/TipScreen';
import { containsProfanity, sanitizeReviewText } from '@/lib/reviews/profanity';

const reviewTags = [
  'Spoke English',
  'Spoke Swahili',
  'Spoke French',
  'Helped with luggage',
  'Knew the shortcuts',
  'AC worked well',
  'Music was good',
  'Recommended a great restaurant'
];

const passengerTags = [
  'On time',
  'Respectful',
  'Helpful',
  'Quick to respond',
  'Good communication',
  'Needs reminders'
];

export default function BookingRatingPage() {
  const [mode, setMode] = useState<'driver' | 'passenger'>('driver');
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [tip, setTip] = useState(2000);
  const [customTip, setCustomTip] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState('');

  const safeText = useMemo(() => sanitizeReviewText(text), [text]);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).slice(0, 3);
    setPhotos(files);
  };

  const handleSubmit = () => {
    if (rating < 1) {
      setError('Please select a rating before submitting.');
      return;
    }

    if (containsProfanity(safeText)) {
      setError('Please keep your review respectful and free of profanity.');
      return;
    }

    setError('');
    alert('Review submitted successfully.');
  };

  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(26,39,36,0.08)] sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Ride complete</p>
            <h1 className="mt-2 text-3xl font-black text-ink">Rate your trip</h1>
          </div>
          <div className="rounded-full border border-sage/20 bg-sage/10 px-4 py-2 text-sm font-semibold text-sage">
            Verified ride review
          </div>
        </div>

        <div className="mb-8 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
          {(['driver', 'passenger'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={[
                'rounded-full px-4 py-2 text-sm font-semibold transition-all',
                mode === option ? 'bg-sage text-white' : 'text-slate-600'
              ].join(' ')}
            >
              {option === 'driver' ? 'Rate driver' : 'Rate passenger'}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <StarRating
                value={rating}
                onChange={setRating}
                label={mode === 'driver' ? 'How was the driver?' : 'How was the passenger?'}
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sage">What stood out?</p>
              <TagSelector
                tags={mode === 'driver' ? reviewTags : passengerTags}
                selected={selectedTags}
                onToggle={toggleTag}
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <label className="block space-y-2">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Review</span>
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  maxLength={500}
                  rows={5}
                  placeholder="Share the experience. Optional, but helpful for future riders and drivers."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sage"
                />
              </label>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span>{safeText.length}/500</span>
                <span>{containsProfanity(safeText) ? 'Review blocked: please remove inappropriate language.' : 'Looks good'}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sage">Photo upload</p>
              <input
                type="file"
                accept="image/*"
                multiple
                max={3}
                onChange={handlePhotoUpload}
                className="block w-full rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-slate-600"
              />
              <p className="mt-2 text-xs text-slate-500">Up to 3 photos • 100 TATC points per photo review</p>
              {photos.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                  {photos.map((photo, index) => (
                    <span key={`${photo.name}-${index}`} className="rounded-full bg-white px-2 py-1">
                      {photo.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <TipScreen
              tip={tip}
              customTip={customTip}
              onTipChange={setTip}
              onCustomTipChange={setCustomTip}
            />

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Trip summary</p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Ride</span>
                  <span className="font-semibold">Julius Nyerere Airport → City Centre</span>
                </div>
                <div className="flex justify-between">
                  <span>Driver</span>
                  <span className="font-semibold">Amani K.</span>
                </div>
                <div className="flex justify-between">
                  <span>Car</span>
                  <span className="font-semibold">Toyota Premio</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated points</span>
                  <span className="font-semibold">{photos.length > 0 ? 100 * photos.length : 0} TATC</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {error ? <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        <div className="mt-8 flex justify-end">
          <Button type="button" onClick={handleSubmit} className="min-w-[180px] justify-center">
            Submit review
          </Button>
        </div>
      </div>
    </main>
  );
}
