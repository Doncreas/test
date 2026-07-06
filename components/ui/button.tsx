import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  className,
  variant = 'primary',
  icon,
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40';
  const variants = {
    primary: 'bg-gradient-to-r from-sunset to-[#ff9447] text-white shadow-[0_18px_40px_rgba(255,122,26,0.3)] hover:-translate-y-0.5',
    secondary: 'border border-sage/15 bg-white text-sage hover:bg-sage hover:text-white',
    ghost: 'bg-transparent text-ink hover:bg-white/80'
  };

  return (
    <button className={clsx(base, variants[variant], fullWidth && 'w-full', className)} {...props}>
      {children}
      {icon ?? <ArrowRight size={16} />}
    </button>
  );
}
