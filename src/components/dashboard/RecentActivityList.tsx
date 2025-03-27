
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatRelative } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { getLogIcon } from '@/utils/activity-logs';

export const RecentActivityList = () => {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['recentActivity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">No recent activity logged</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {activities.map((activity) => {
        const Icon = getLogIcon(activity.action_type);
        return (
          <li key={activity.id} className="p-4 hover:bg-muted/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">
                  {formatRelative(new Date(activity.created_at), new Date())}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
