
import React from 'react';
import { ShieldCheck, ShieldAlert, Clock } from 'lucide-react';
import DashboardCard from './DashboardCard';

const LogsAnalytics = () => {
  // Sample analytics data
  const analyticsData = {
    totalSwaps: 1247,
    flaggedCases: 23,
    verifiedSwaps: 1089,
    pendingReview: 135
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard padding="md" className="text-center">
        <div className="flex flex-col items-center">
          <div className="mb-2 text-primary">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-bold">{analyticsData.totalSwaps}</h3>
          <p className="text-sm text-muted-foreground">Total SIM Swaps</p>
        </div>
      </DashboardCard>
      
      <DashboardCard padding="md" className="text-center">
        <div className="flex flex-col items-center">
          <div className="mb-2 text-destructive">
            <ShieldAlert size={32} />
          </div>
          <h3 className="text-2xl font-bold">{analyticsData.flaggedCases}</h3>
          <p className="text-sm text-muted-foreground">Flagged Cases</p>
        </div>
      </DashboardCard>
      
      <DashboardCard padding="md" className="text-center">
        <div className="flex flex-col items-center">
          <div className="mb-2 text-success">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-bold">{analyticsData.verifiedSwaps}</h3>
          <p className="text-sm text-muted-foreground">Verified Swaps</p>
        </div>
      </DashboardCard>
      
      <DashboardCard padding="md" className="text-center">
        <div className="flex flex-col items-center">
          <div className="mb-2 text-info">
            <Clock size={32} />
          </div>
          <h3 className="text-2xl font-bold">{analyticsData.pendingReview}</h3>
          <p className="text-sm text-muted-foreground">Pending Review</p>
        </div>
      </DashboardCard>
    </div>
  );
};

export default LogsAnalytics;
