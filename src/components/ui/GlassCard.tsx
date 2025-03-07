
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'intense';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({
  intensity = 'medium',
  hoverEffect = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        intensity === 'light' && 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs border border-white/10 dark:border-slate-800/30',
        intensity === 'medium' && 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/20 dark:border-slate-800/50',
        intensity === 'intense' && 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/30 dark:border-slate-800/60',
        hoverEffect && 'transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
