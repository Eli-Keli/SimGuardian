
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'safe' | 'flagged' | 'alert' | 'pending';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  pulse?: boolean;
}

const StatusBadge = ({ status, className, pulse = false }: StatusBadgeProps) => {
  const statusConfig = {
    safe: {
      bg: 'bg-success/20',
      text: 'text-success',
      label: 'Safe',
      borderColor: 'border-success/30',
    },
    flagged: {
      bg: 'bg-destructive/20',
      text: 'text-destructive',
      label: 'Flagged',
      borderColor: 'border-destructive/30',
    },
    alert: {
      bg: 'bg-warning/20',
      text: 'text-warning',
      label: 'Alert',
      borderColor: 'border-warning/30',
    },
    pending: {
      bg: 'bg-info/20',
      text: 'text-info',
      label: 'Pending',
      borderColor: 'border-info/30',
    },
  };

  const config = statusConfig[status];

  return (
    <div 
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium',
        config.bg,
        config.text,
        config.borderColor,
        pulse && 'animate-pulse-subtle',
        className
      )}
    >
      <span 
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'safe' ? 'bg-success' : 
          status === 'flagged' ? 'bg-destructive' : 
          status === 'alert' ? 'bg-warning' : 'bg-info'
        )} 
      />
      {config.label}
    </div>
  );
};

export default StatusBadge;
