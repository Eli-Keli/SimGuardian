
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import AlertSummary from '@/components/AlertSummary';
import AlertsTable from '@/components/alerts/AlertsTable';
import AlertsQuickActions from '@/components/AlertsQuickActions';
import AlertsMapView from '@/components/AlertsMapView';
import { Bell, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlertsTableFilters from '@/components/alerts/AlertsTableFilters';

const Alerts = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [viewMode, setViewMode] = useState('list');

  const handleFilterChange = (filterType: 'status' | 'severity' | 'date', value: string) => {
    if (filterType === 'status') setFilterStatus(value);
    else if (filterType === 'severity') setFilterSeverity(value);
    else if (filterType === 'date') setFilterDate(value);
  };

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
            <AlertsTableFilters 
              filterStatus={filterStatus}
              filterSeverity={filterSeverity}
              filterDate={filterDate}
              onFilterChange={handleFilterChange}
            />
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
