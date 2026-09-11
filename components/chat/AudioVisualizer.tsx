'use client';

interface AudioVisualizerProps {
  active?: boolean;
}

export function AudioVisualizer({ active = false }: AudioVisualizerProps) {
  const bars = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <div className="flex items-end gap-1 rounded-full bg-slate-900/90 px-3 py-2">
      {bars.map((bar) => (
        <span
          key={bar}
          className={[
            'w-1 rounded-full bg-gradient-to-t from-sunset to-amber-300 transition-all duration-200',
            active ? 'animate-pulse' : 'opacity-60'
          ].join(' ')}
          style={{
            height: active ? `${(bar * 10) / 2 + 10}px` : '10px',
            animationDelay: `${bar * 60}ms`
          }}
        />
      ))}
    </div>
  );
}
