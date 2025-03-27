
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Shield, AlertTriangle, Clock, Smartphone, Activity, UserCheck } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, subDays } from 'date-fns';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { RecentActivityList } from '@/components/dashboard/RecentActivityList';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Get device count
  const { data: devices = [] } = useQuery({
    queryKey: ['userDevices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('*');
        
      if (error) throw error;
      return data || [];
    },
  });
  
  // Get recent alerts
  const { data: alerts = [] } = useQuery({
    queryKey: ['recentAlerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_audit_logs')
        .select('*')
        .eq('severity', 'high')
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      return data || [];
    },
  });
  
  // Get last login
  const { data: lastLogin } = useQuery({
    queryKey: ['lastLogin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('action_type', 'login')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });
  
  // Get recent activity logs for the chart
  const { data: activityLogs = [] } = useQuery({
    queryKey: ['activityLogsChart'],
    queryFn: async () => {
      const startDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .gte('created_at', startDate)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      return data || [];
    },
  });
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your SimGuardian activity and security status"
        icon={<Activity />}
      />
      
      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard className="p-4 flex items-center">
          <div className="p-3 rounded-full bg-primary/10 mr-4">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Protected Devices</p>
            <h3 className="text-2xl font-semibold">{devices.length}</h3>
          </div>
        </DashboardCard>
        
        <DashboardCard className="p-4 flex items-center">
          <div className="p-3 rounded-full bg-amber-500/10 mr-4">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Recent Alerts</p>
            <h3 className="text-2xl font-semibold">{alerts.length}</h3>
          </div>
        </DashboardCard>
        
        <DashboardCard className="p-4 flex items-center">
          <div className="p-3 rounded-full bg-info/10 mr-4">
            <Clock className="h-6 w-6 text-info" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Login</p>
            <h3 className="text-sm font-semibold">
              {lastLogin 
                ? formatDistanceToNow(new Date(lastLogin.created_at), { addSuffix: true }) 
                : 'N/A'}
            </h3>
          </div>
        </DashboardCard>
        
        <DashboardCard className="p-4 flex items-center">
          <div className="p-3 rounded-full bg-success/10 mr-4">
            <Shield className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Security Status</p>
            <h3 className="text-2xl font-semibold">
              {alerts.length > 0 ? 'Attention Needed' : 'Good'}
            </h3>
          </div>
        </DashboardCard>
      </div>
      
      {/* Activity Chart & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Activity</CardTitle>
            <CardDescription>Your activity over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityChart data={activityLogs} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your most recent actions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <RecentActivityList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
