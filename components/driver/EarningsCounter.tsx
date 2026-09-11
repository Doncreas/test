'use client';

import { useEffect, useState } from 'react';

export function EarningsCounter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayValue(Math.floor(value * progress));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [value, duration]);

  return <span className="text-4xl font-black text-ink">TSh {displayValue.toLocaleString()}</span>;
}
