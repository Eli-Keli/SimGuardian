
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, Check, Eye, Flag } from 'lucide-react';
import { Button } from './ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const AlertsQuickActions = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>High Priority Alerts</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col sm:flex-row gap-3">
          <span className="text-sm flex-1">
            3 high-threat alerts require your immediate attention. 
            Take action now to secure affected accounts.
          </span>
          <div className="flex gap-2 sm:justify-end">
            <Button size="sm" variant="secondary" className="gap-1">
              <Check size={14} />
              <span>Acknowledge All</span>
            </Button>
            <Button size="sm" variant="destructive" className="gap-1">
              <Flag size={14} />
              <span>Report Fraud</span>
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <QuickActionButton 
          icon={<Check className="h-5 w-5" />}
          label="Acknowledge Alert"
          description="Mark selected alert as acknowledged"
          onClick={() => console.log('Acknowledge clicked')}
          variant="success"
        />
        <QuickActionButton 
          icon={<Flag className="h-5 w-5" />}
          label="Report as Fraud"
          description="Flag selected alert as fraudulent activity"
          onClick={() => console.log('Report as fraud clicked')}
          variant="danger"
        />
        <QuickActionButton 
          icon={<Eye className="h-5 w-5" />}
          label="View Full Details"
          description="See complete information about the alert"
          onClick={() => console.log('View details clicked')}
          variant="primary"
        />
      </div>
    </div>
  );
};

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  variant: 'primary' | 'success' | 'danger';
}

const QuickActionButton = ({ icon, label, description, onClick, variant }: QuickActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
        "border hover:shadow-lg text-left",
        variant === 'primary' && "bg-secondary border-primary/20 hover:border-primary/40",
        variant === 'success' && "bg-success/10 border-success/20 hover:border-success/40",
        variant === 'danger' && "bg-destructive/10 border-destructive/20 hover:border-destructive/40",
      )}
    >
      <div 
        className={cn(
          "p-2 rounded-full flex-shrink-0",
          variant === 'primary' && "bg-primary/20 text-primary",
          variant === 'success' && "bg-success/20 text-success",
          variant === 'danger' && "bg-destructive/20 text-destructive",
        )}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium">{label}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};

export default AlertsQuickActions;
