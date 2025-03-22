
import React from 'react';
import { MapPin, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data for community alerts
const communityData = [
  {
    id: '1',
    location: 'Nairobi, Kenya',
    count: 12,
    trend: 'up',
    description: 'Banking scam calls pretending to be from local banks'
  },
  {
    id: '2',
    location: 'Mombasa, Kenya',
    count: 8,
    trend: 'up',
    description: 'SIM swap attempts targeting mobile network customers'
  },
  {
    id: '3',
    location: 'Kisumu, Kenya',
    count: 6,
    trend: 'down',
    description: 'Phishing texts claiming to be from online shopping platforms'
  },
  {
    id: '4',
    location: 'Nakuru, Kenya',
    count: 5,
    trend: 'stable',
    description: 'Vishing calls impersonating government officials'
  },
  {
    id: '5',
    location: 'Eldoret, Kenya',
    count: 4,
    trend: 'up',
    description: 'WhatsApp account takeover attempts'
  }
];

const CommunityAlerts = () => {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary" />
          <h3 className="text-sm font-medium">Community Alerts</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {communityData.reduce((sum, item) => sum + item.count, 0)} reports in last 24h
        </span>
      </div>
      
      <div className="space-y-3 overflow-y-auto max-h-[15rem]">
        {communityData.map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-lg bg-secondary/40 border border-border/50 hover:border-border/80 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center text-sm font-medium gap-1.5">
                <MapPin size={14} className="text-muted-foreground" />
                {item.location}
              </div>
              <div 
                className={cn(
                  "flex items-center gap-1 text-xs",
                  item.trend === 'up' ? 'text-destructive' : 
                  item.trend === 'down' ? 'text-success' : 
                  'text-muted-foreground'
                )}
              >
                {item.trend === 'up' && <TrendingUp size={12} />}
                <span>{item.count} reports</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityAlerts;
