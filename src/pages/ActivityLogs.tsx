
import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ClipboardList, AlertTriangle, Filter, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserActivityLogsList } from '@/components/activity-logs/UserActivityLogsList';
import { SecurityAuditLogsList } from '@/components/activity-logs/SecurityAuditLogsList';
import { ActivityLogsFilter } from '@/components/activity-logs/ActivityLogsFilter';
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ActivityLogType, SecurityLogType, filterLogsByDate, filterLogsByType } from '@/utils/activity-logs';

const ActivityLogs = () => {
  // State for filtering
  const [activeTab, setActiveTab] = useState<string>('activity');
  const [selectedLogTypes, setSelectedLogTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  
  // Fetch user activity logs
  const { data: activityLogs = [], isLoading: isLoadingActivity } = useQuery({
    queryKey: ['activityLogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    }
  });
  
  // Fetch security audit logs
  const { data: securityLogs = [], isLoading: isLoadingAudit } = useQuery({
    queryKey: ['securityLogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_audit_logs')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    }
  });
  
  // Apply filters to logs
  const filteredActivityLogs = activityLogs
    .filter(log => filterLogsByType(log.action_type, selectedLogTypes))
    .filter(log => filterLogsByDate(log.created_at, dateRange));
    
  const filteredSecurityLogs = securityLogs
    .filter(log => filterLogsByType(log.event_type, selectedLogTypes))
    .filter(log => filterLogsByDate(log.created_at, dateRange));
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Logs"
        description="Track your account activity and security events"
        icon={<ClipboardList />}
      />
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <Tabs 
          defaultValue="activity" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <DateRangePicker
            date={dateRange}
            onDateChange={setDateRange}
          />
          
          <ActivityLogsFilter
            selectedTypes={selectedLogTypes}
            onSelectTypes={setSelectedLogTypes}
            logTypes={
              activeTab === 'activity' 
                ? Object.values(ActivityLogType) 
                : Object.values(SecurityLogType)
            }
          />
        </div>
      </div>
      
      <TabsContent value="activity" className="mt-0">
        <UserActivityLogsList 
          logs={filteredActivityLogs} 
          isLoading={isLoadingActivity} 
        />
      </TabsContent>
      
      <TabsContent value="security" className="mt-0">
        <SecurityAuditLogsList 
          logs={filteredSecurityLogs} 
          isLoading={isLoadingAudit} 
        />
      </TabsContent>
    </div>
  );
};

export default ActivityLogs;
