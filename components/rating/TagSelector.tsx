'use client';

interface TagSelectorProps {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}

export function TagSelector({ tags, selected, onToggle }: TagSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const active = selected.includes(tag);

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={[
              'rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200',
              active
                ? 'border-sage bg-sage text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:border-sage/50 hover:text-sage'
            ].join(' ')}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
