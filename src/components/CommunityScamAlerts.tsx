
import React from 'react';
import DashboardCard from './DashboardCard';
import { MapPin, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data for community scam alerts
const scamAlerts = [
  {
    id: '1',
    location: 'Nairobi',
    scamType: 'SIM Swap',
    threatLevel: 'high',
    description: 'Multiple SIM swap attempts targeting Safaricom customers',
    count: 12
  },
  {
    id: '2',
    location: 'Mombasa',
    scamType: 'Phishing',
    threatLevel: 'medium',
    description: 'Phishing texts claiming to be from Airtel support',
    count: 8
  },
  {
    id: '3',
    location: 'Kisumu',
    scamType: 'Fake Support',
    threatLevel: 'high',
    description: 'Callers impersonating Telkom support staff',
    count: 10
  },
  {
    id: '4',
    location: 'Eldoret',
    scamType: 'Identity Theft',
    threatLevel: 'low',
    description: 'Fraudulent account creation attempts using stolen IDs',
    count: 4
  }
];

// Most affected locations
const affectedLocations = [
  { location: 'Nairobi', count: 24 },
  { location: 'Mombasa', count: 18 },
  { location: 'Kisumu', count: 15 },
  { location: 'Eldoret', count: 12 },
  { location: 'Nakuru', count: 10 }
];

const CommunityScamAlerts = () => {
  return (
    <DashboardCard title="Community Scam Alerts" className="animate-in">
      <div className="space-y-5">
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 text-destructive" />
            Recent High-Risk Alerts
          </h4>
          
          <div className="space-y-3">
            {scamAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="p-3 rounded-lg bg-secondary/40 border border-border/50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-muted-foreground" />
                    <span>{alert.location}</span>
                  </div>
                  
                  <div 
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-xs font-medium",
                      alert.threatLevel === 'high' ? "bg-destructive/20 text-destructive" : 
                      alert.threatLevel === 'medium' ? "bg-warning/20 text-warning" : 
                      "bg-info/20 text-info"
                    )}
                  >
                    {alert.threatLevel === 'high' ? '🔴 High Risk' : 
                     alert.threatLevel === 'medium' ? '🟡 Medium Risk' : 
                     '🟢 Low Risk'}
                  </div>
                </div>
                
                <p className="mt-1 text-xs text-muted-foreground">
                  {alert.description}
                </p>
                
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp size={12} className={
                    alert.threatLevel === 'high' ? "text-destructive" : 
                    alert.threatLevel === 'medium' ? "text-warning" : 
                    "text-info"
                  } />
                  <span>{alert.count} reports in the last 24 hours</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-destructive" />
            Most Affected Locations
          </h4>
          
          <div className="space-y-2">
            {affectedLocations.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.location}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-destructive"
                      style={{ width: `${(item.count / affectedLocations[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default CommunityScamAlerts;
