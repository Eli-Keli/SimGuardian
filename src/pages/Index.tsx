
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import DashboardCard from '@/components/DashboardCard';
import FraudAlertsTable from '@/components/FraudAlertsTable';
import NotificationPanel from '@/components/NotificationPanel';
import ActionPanel from '@/components/ActionPanel';
import CommunityAlerts from '@/components/CommunityAlerts';
import { Shield, AlertTriangle, Activity, Search } from 'lucide-react';

const Index = () => {
  return (
    <PageContainer>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-7 w-7 text-primary" />
              SimGuardian Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and secure your SIM from swap attacks and scams
            </p>
          </div>
      
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search alerts..."
                className="pl-9 pr-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 w-full sm:w-[200px] lg:w-[240px]"
              />
            </div>
      
            <NotificationPanel />
          </div>
        </div>
      
        {/* Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DashboardCard className="p-4 flex items-center">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Protected Numbers</p>
              <h3 className="text-2xl font-semibold">0</h3>
            </div>
          </DashboardCard>
      
          <DashboardCard className="p-4 flex items-center">
            <div className="p-3 rounded-full bg-destructive/10 mr-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Flagged Events</p>
              <h3 className="text-2xl font-semibold">0</h3>
            </div>
          </DashboardCard>
      
          <DashboardCard className="p-4 flex items-center">
            <div className="p-3 rounded-full bg-info/10 mr-4">
              <Activity className="h-6 w-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weekly Scans</p>
              <h3 className="text-2xl font-semibold">0</h3>
            </div>
          </DashboardCard>
      
          <DashboardCard className="p-4 flex items-center">
            <div className="p-3 rounded-full bg-success/10 mr-4">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Threat Level</p>
              <h3 className="text-2xl font-semibold">Low</h3>
            </div>
          </DashboardCard>
        </div>
      
        {/* Action Panel */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <ActionPanel />
        </div>
      
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardCard title="Recent SIM Swap Alerts">
              <FraudAlertsTable />
            </DashboardCard>
          </div>
      
          <div>
            <DashboardCard title="Scam Hotspots">
              <CommunityAlerts />
            </DashboardCard>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
