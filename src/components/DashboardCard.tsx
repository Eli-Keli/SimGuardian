
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  noBorder?: boolean;
  glowEffect?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const DashboardCard = ({
  title,
  className,
  children,
  noBorder = false,
  glowEffect = false,
  padding = 'md',
}: DashboardCardProps) => {
  const paddingClass = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={cn(
        'glassmorphism rounded-xl',
        !noBorder && 'border border-border/50',
        paddingClass[padding],
        glowEffect && 'neon-glow',
        'card-hover',
        className
      )}
    >
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default DashboardCard;
