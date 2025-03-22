
import React from 'react';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import { Lock, CheckCircle, Flag } from 'lucide-react';

// Sample data for the fraud alerts table
const fraudAlertsData = [
  { 
    id: '1',
    phoneNumber: '+1 (555) 123-4567',
    date: '2023-08-15T14:30:00',
    status: 'safe' as const,
    location: 'New York, NY'
  },
  { 
    id: '2',
    phoneNumber: '+1 (555) 987-6543',
    date: '2023-08-15T13:15:00',
    status: 'flagged' as const,
    location: 'Miami, FL'
  },
  { 
    id: '3',
    phoneNumber: '+1 (555) 456-7890',
    date: '2023-08-15T12:45:00',
    status: 'pending' as const,
    location: 'Chicago, IL'
  },
  { 
    id: '4',
    phoneNumber: '+1 (555) 789-0123',
    date: '2023-08-15T11:20:00',
    status: 'flagged' as const,
    location: 'Los Angeles, CA'
  },
  { 
    id: '5',
    phoneNumber: '+1 (555) 234-5678',
    date: '2023-08-15T10:00:00',
    status: 'safe' as const,
    location: 'Dallas, TX'
  },
];

const FraudAlertsTable = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border/50">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Location
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {fraudAlertsData.map((alert) => (
            <tr 
              key={alert.id} 
              className={cn(
                "transition-colors hover:bg-muted/10",
                alert.status === 'flagged' && "bg-destructive/5"
              )}
            >
              <td className="px-4 py-3.5 whitespace-nowrap text-sm font-medium">
                {alert.phoneNumber}
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap text-sm text-muted-foreground">
                {formatDate(alert.date)}
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap text-sm text-muted-foreground">
                {alert.location}
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap">
                <StatusBadge 
                  status={alert.status} 
                  pulse={alert.status === 'flagged'} 
                />
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap text-sm">
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-secondary-foreground"
                    title="Lock SIM"
                  >
                    <Lock size={16} />
                  </button>
                  <button 
                    className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-secondary-foreground"
                    title="Confirm Swap"
                  >
                    <CheckCircle size={16} />
                  </button>
                  <button 
                    className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-secondary-foreground"
                    title="Report Fraud"
                  >
                    <Flag size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FraudAlertsTable;
