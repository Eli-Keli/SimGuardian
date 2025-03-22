
import React from 'react';
import DashboardCard from './DashboardCard';
import StatusBadge from './StatusBadge';
import { Clock, Phone } from 'lucide-react';

// Sample data for recent reports
const recentReports = [
  {
    id: '1',
    phoneNumber: '+1 (555) 123-4567',
    scamType: 'SIM Swap',
    date: '2023-08-17T10:30:00',
    status: 'flagged',
    description: 'Someone called pretending to be from my carrier and asked for my account PIN.'
  },
  {
    id: '2',
    phoneNumber: '+1 (555) 987-6543',
    scamType: 'Phishing',
    date: '2023-08-16T15:45:00',
    status: 'pending',
    description: 'Received a text message with a link claiming my account was locked.'
  },
  {
    id: '3',
    phoneNumber: '+1 (555) 456-7890',
    scamType: 'Fake Support Call',
    date: '2023-08-15T09:15:00',
    status: 'safe',
    description: 'Caller claimed to be tech support and asked for remote access to my device.'
  }
];

const RecentReportsSection = () => {
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
    <DashboardCard title="Recent Reports" className="animate-in">
      <div className="space-y-4">
        {recentReports.map((report) => (
          <div 
            key={report.id} 
            className="p-4 rounded-lg bg-secondary/40 border border-border/50 hover:border-border/80 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{report.phoneNumber}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">
                  {report.scamType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatDate(report.date)}
                </span>
                <StatusBadge 
                  status={report.status as any}
                  className="ml-2"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {report.description}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default RecentReportsSection;
