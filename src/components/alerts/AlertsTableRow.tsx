
import React from 'react';
import { Check, Eye, Flag, ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatusBadge from '../StatusBadge';
import { TableCell, TableRow } from '@/components/ui/table';
import AlertsTableActions from './AlertsTableActions';

export type AlertType = {
  id: string;
  phoneNumber: string;
  timestamp: string;
  location: string;
  threatLevel: 'high' | 'medium' | 'low';
  type: string;
  status: 'new' | 'acknowledged' | 'resolved';
  description: string;
};

interface AlertsTableRowProps {
  alert: AlertType;
}

const AlertsTableRow = ({ alert }: AlertsTableRowProps) => {
  // Get alert icon based on type
  const getAlertIcon = (type: string, threatLevel: 'low' | 'medium' | 'high') => {
    const iconClassName = cn(
      "mr-2",
      threatLevel === 'high' ? "text-destructive" : 
      threatLevel === 'medium' ? "text-warning" : "text-info"
    );
    
    if (type.includes('SIM Swap')) return <ShieldAlert className={iconClassName} size={16} />;
    if (type.includes('Phishing')) return <AlertTriangle className={iconClassName} size={16} />;
    return <Info className={iconClassName} size={16} />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TableRow 
      key={alert.id}
      className={cn(
        alert.threatLevel === 'high' && "bg-destructive/5",
        alert.status === 'resolved' && "opacity-70"
      )}
    >
      <TableCell className="font-medium">{alert.phoneNumber}</TableCell>
      <TableCell>
        <div className="flex items-center">
          {getAlertIcon(alert.type, alert.threatLevel)}
          <span>{alert.type}</span>
        </div>
      </TableCell>
      <TableCell>{formatDate(alert.timestamp)}</TableCell>
      <TableCell>{alert.location}</TableCell>
      <TableCell>
        <StatusBadge 
          status={alert.threatLevel} 
          pulse={alert.threatLevel === 'high'} 
        />
      </TableCell>
      <TableCell>
        <div className={cn(
          "px-2.5 py-0.5 rounded-full text-xs inline-flex items-center gap-1",
          alert.status === 'new' ? "bg-destructive/20 text-destructive" :
          alert.status === 'acknowledged' ? "bg-warning/20 text-warning" :
          "bg-success/20 text-success"
        )}>
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            alert.status === 'new' ? "bg-destructive" :
            alert.status === 'acknowledged' ? "bg-warning" :
            "bg-success"
          )} />
          {alert.status === 'new' ? 'New' : 
           alert.status === 'acknowledged' ? 'Acknowledged' : 
           'Resolved'}
        </div>
      </TableCell>
      <TableCell>
        <AlertsTableActions alertStatus={alert.status} />
      </TableCell>
    </TableRow>
  );
};

export default AlertsTableRow;
