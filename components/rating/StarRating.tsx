'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  label?: string;
  readOnly?: boolean;
}

export function StarRating({ value, onChange, label, readOnly = false }: StarRatingProps) {
  return (
    <div className="space-y-3">
      {label ? <p className="text-sm font-semibold text-ink">{label}</p> : null}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(star)}
            className="p-1 transition-transform hover:scale-110 disabled:cursor-default"
            aria-label={`Rate ${star} out of 5`}
          >
            <Star
              size={28}
              className={cn(
                'transition-colors',
                star <= value ? 'fill-[#f9b15e] text-[#f9b15e]' : 'text-slate-300'
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
