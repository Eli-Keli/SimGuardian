
import React from 'react';
import DashboardCard from './DashboardCard';
import { AlertTriangle, BarChart3, ShieldAlert } from 'lucide-react';
import StatusBadge from './StatusBadge';

// Sample data for the alert summary
const alertData = {
  newAlerts: 15,
  acknowledgedAlerts: 8,
  resolvedAlerts: 5,
  mostCommonType: 'SIM Swap Attempt',
  threatLevel: 'medium' as 'low' | 'medium' | 'high',
};

const getOverallThreatLevel = () => {
  // Logic to determine overall threat level
  if (alertData.newAlerts > 10) return 'high';
  if (alertData.newAlerts > 5) return 'medium';
  return 'low';
};

const AlertSummary = () => {
  const threatLevel = getOverallThreatLevel();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardCard padding="md" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
          <AlertTriangle className="w-full h-full" />
        </div>
        <div className="flex flex-col h-full">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Alert Status</h3>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold mr-2">{alertData.newAlerts + alertData.acknowledgedAlerts + alertData.resolvedAlerts}</span>
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="mt-3 flex flex-col space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>New</span>
                <span className="font-medium text-destructive">{alertData.newAlerts}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Acknowledged</span>
                <span className="font-medium text-warning">{alertData.acknowledgedAlerts}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Resolved</span>
                <span className="font-medium text-success">{alertData.resolvedAlerts}</span>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard padding="md" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
          <BarChart3 className="w-full h-full" />
        </div>
        <div className="flex flex-col h-full">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Most Common Threat</h3>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-xl font-semibold mb-1">{alertData.mostCommonType}</span>
            <p className="text-sm text-muted-foreground">
              This type accounts for 65% of all recent security alerts
            </p>
            <div className="mt-3 w-full bg-muted/30 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard padding="md" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
          <ShieldAlert className="w-full h-full" />
        </div>
        <div className="flex flex-col h-full">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Overall Threat Level</h3>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="mb-3">
              <StatusBadge 
                status={threatLevel} 
                pulse={threatLevel === 'high'} 
                className="text-base px-4 py-1 font-bold"
              />
            </div>
            <div className="grid grid-cols-3 w-full gap-2 mt-2">
              <div className={`h-8 rounded-md flex items-center justify-center text-xs font-medium ${threatLevel === 'low' ? 'bg-success/20 text-success border border-success/30' : 'bg-secondary text-muted-foreground'}`}>
                Low
              </div>
              <div className={`h-8 rounded-md flex items-center justify-center text-xs font-medium ${threatLevel === 'medium' ? 'bg-warning/20 text-warning border border-warning/30' : 'bg-secondary text-muted-foreground'}`}>
                Medium
              </div>
              <div className={`h-8 rounded-md flex items-center justify-center text-xs font-medium ${threatLevel === 'high' ? 'bg-destructive/20 text-destructive border border-destructive/30' : 'bg-secondary text-muted-foreground'}`}>
                High
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default AlertSummary;
