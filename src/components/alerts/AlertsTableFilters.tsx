
import React from 'react';

interface AlertsTableFiltersProps {
  filterStatus: string;
  filterSeverity: string;
  filterDate: string;
  onFilterChange: (filterType: 'status' | 'severity' | 'date', value: string) => void;
}

const AlertsTableFilters = ({ 
  filterStatus, 
  filterSeverity, 
  filterDate, 
  onFilterChange 
}: AlertsTableFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <select 
        className="bg-secondary text-secondary-foreground text-sm rounded-md border border-border/50 px-2 py-1"
        value={filterStatus}
        onChange={(e) => onFilterChange('status', e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="new">New</option>
        <option value="acknowledged">Acknowledged</option>
        <option value="resolved">Resolved</option>
      </select>
      <select 
        className="bg-secondary text-secondary-foreground text-sm rounded-md border border-border/50 px-2 py-1"
        value={filterSeverity}
        onChange={(e) => onFilterChange('severity', e.target.value)}
      >
        <option value="all">All Severity</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select 
        className="bg-secondary text-secondary-foreground text-sm rounded-md border border-border/50 px-2 py-1"
        value={filterDate}
        onChange={(e) => onFilterChange('date', e.target.value)}
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>
  );
};

export default AlertsTableFilters;
