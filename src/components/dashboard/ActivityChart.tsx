
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfDay, endOfDay, eachDayOfInterval, subDays } from 'date-fns';

interface ActivityChartProps {
  data: any[];
}

export const ActivityChart = ({ data }: ActivityChartProps) => {
  const chartData = useMemo(() => {
    // Create a date range for the last 30 days
    const dateRange = eachDayOfInterval({
      start: subDays(new Date(), 29),
      end: new Date(),
    });
    
    // Map each day to a data point
    return dateRange.map(date => {
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);
      
      // Count activities for this day
      const deviceCount = data.filter(log => 
        log.action_type === 'device_added' && 
        new Date(log.created_at) >= dayStart && 
        new Date(log.created_at) <= dayEnd
      ).length;
      
      const simReportCount = data.filter(log => 
        log.action_type === 'sim_reported' && 
        new Date(log.created_at) >= dayStart && 
        new Date(log.created_at) <= dayEnd
      ).length;
      
      const securityCount = data.filter(log => 
        log.action_type === 'settings_changed' && 
        new Date(log.created_at) >= dayStart && 
        new Date(log.created_at) <= dayEnd
      ).length;
      
      return {
        date: format(date, 'MMM dd'),
        rawDate: date,
        devices: deviceCount,
        simReports: simReportCount,
        security: securityCount,
      };
    });
  }, [data]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorDevices" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSecurity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2f3b4e" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value}
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'rgb(30 41 59)', 
              borderColor: 'rgba(71, 85, 105, 0.5)',
              borderRadius: '8px',
              color: 'white'
            }}
            labelStyle={{ marginBottom: '5px', fontWeight: 'bold' }}
            formatter={(value, name) => {
              const displayName = {
                devices: 'Devices Added',
                simReports: 'SIM Reports',
                security: 'Security Changes'
              }[name] || name;
              return [value, displayName];
            }}
          />
          <Area 
            type="monotone" 
            dataKey="devices" 
            stroke="#2563eb" 
            fillOpacity={1} 
            fill="url(#colorDevices)" 
          />
          <Area 
            type="monotone" 
            dataKey="simReports" 
            stroke="#e11d48" 
            fillOpacity={1} 
            fill="url(#colorSim)" 
          />
          <Area 
            type="monotone" 
            dataKey="security" 
            stroke="#16a34a" 
            fillOpacity={1} 
            fill="url(#colorSecurity)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
