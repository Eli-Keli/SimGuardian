
import React, { useState } from 'react';
import { Calendar, Download, Search, Shield, Flag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DashboardCard from '@/components/DashboardCard';
import LogsTable from '@/components/LogsTable';
import ActionPanel from '@/components/ActionPanel';
import LogsAnalytics from '@/components/LogsAnalytics';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';

const SimSwapLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  return (
    <PageContainer>
      <PageHeader 
        title="SIM Swap Logs"
        description="View and analyze all SIM swap activity across your network"
        icon={<Shield size={20} className="text-primary" />}
      />

      {/* Quick Actions */}
      <div className="mb-8">
        <DashboardCard padding="md" title="Quick Actions">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button className="flex items-center gap-2">
              <Shield size={18} />
              <span>Lock SIM (Emergency)</span>
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <Flag size={18} />
              <span>Report New SIM Swap Fraud</span>
            </Button>
          </div>
        </DashboardCard>
      </div>

      {/* Analytics Section */}
      <div className="mb-8">
        <LogsAnalytics />
      </div>

      {/* Search & Filters */}
      <div className="mb-6">
        <DashboardCard padding="md">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search Phone Number</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9" 
                  placeholder="Search by phone number" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div>
                <label className="text-sm font-medium mb-2 block">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="safe">Safe</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="nairobi">Nairobi</SelectItem>
                    <SelectItem value="mombasa">Mombasa</SelectItem>
                    <SelectItem value="kisumu">Kisumu</SelectItem>
                    <SelectItem value="nakuru">Nakuru</SelectItem>
                    <SelectItem value="naivasha">Naivasha</SelectItem>
                    <SelectItem value="eldoret">Eldoret</SelectItem>
                    <SelectItem value="thika">Thika</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="secondary" className="flex items-center gap-2">
              <Download size={16} />
              <span>Export Logs</span>
            </Button>
          </div>
        </DashboardCard>
      </div>

      {/* Logs Table */}
      <DashboardCard padding="md" className="mb-6">
        <LogsTable 
          searchQuery={searchQuery}
          dateRange={dateRange}
          statusFilter={statusFilter}
          locationFilter={locationFilter}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default SimSwapLogs;
