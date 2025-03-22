
import React from 'react';
import DashboardCard from './DashboardCard';
import { Map, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';

const AlertsMapView = () => {
  return (
    <DashboardCard className="min-h-[400px] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
        <div className="text-center p-6">
          <Map className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Map View Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            A real-time map of scam hotspots will be displayed here. The map will show high-risk areas in red, 
            medium-risk in yellow, and safe zones in green.
          </p>
        </div>
      </div>

      {/* This is just a placeholder for what the map would look like */}
      <div className="p-4 absolute bottom-4 right-4 bg-card/70 backdrop-blur-sm rounded-lg border border-border z-10">
        <h4 className="text-xs font-medium mb-2">Scam Activity Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-destructive" />
            <span className="text-xs">High Risk Area</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-warning" />
            <span className="text-xs">Medium Risk Area</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-success" />
            <span className="text-xs">Low Risk Area</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default AlertsMapView;
