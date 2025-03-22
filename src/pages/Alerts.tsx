
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import AlertSummary from '@/components/AlertSummary';
import AlertsTable from '@/components/AlertsTable';
import AlertsQuickActions from '@/components/AlertsQuickActions';
import AlertsMapView from '@/components/AlertsMapView';
import { Bell, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Alerts = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [viewMode, setViewMode] = useState('list');

  return (
    <PageContainer>
      <PageHeader
        title="Security Alerts"
        description="Monitor and manage real-time scam and SIM swap security alerts"
        icon={<Bell className="h-6 w-6 text-destructive" />}
      />

      <div className="space-y-6 animate-in">
        {/* Alert Summary Section */}
        <AlertSummary />
        
        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter By:</span>
            <select 
              className="bg-secondary text-secondary-foreground text-sm rounded-md border border-border/50 px-2 py-1"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>
            <select 
              className="bg-secondary text-secondary-foreground text-sm rounded-md border border-border/50 px-2 py-1"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="all">All Severity</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select 
              className="bg-secondary text-secondary-foreground text-sm rounded-md border border-border/50 px-2 py-1"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          
          <Tabs defaultValue="list" className="w-auto" onValueChange={setViewMode}>
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Quick Actions Panel */}
        <AlertsQuickActions />
        
        {/* Content based on view mode */}
        {viewMode === 'list' ? (
          <AlertsTable 
            filterStatus={filterStatus}
            filterSeverity={filterSeverity}
            filterDate={filterDate}
            sortBy={sortBy}
          />
        ) : (
          <AlertsMapView />
        )}
      </div>
    </PageContainer>
  );
};

export default Alerts;
