
import React from 'react';
import { Check, Eye, Flag, AlertTriangle, ShieldAlert, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { alertsData } from './alerts/alertsData';

interface AlertsTableProps {
  filterStatus: string;
  filterSeverity: string;
  filterDate: string;
  sortBy: string;
}

const AlertsTable = ({ filterStatus, filterSeverity, filterDate, sortBy }: AlertsTableProps) => {
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

  // Filter alerts based on the filters
  const filteredAlerts = alertsData.filter(alert => {
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || alert.threatLevel === filterSeverity;
    
    // Date filtering would require more complex logic with actual dates
    // This is simplified for demo purposes
    const matchesDate = filterDate === 'all';
    
    return matchesStatus && matchesSeverity && matchesDate;
  });

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

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Phone Number</TableHead>
              <TableHead>Alert Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Threat Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
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
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                      {alert.status !== 'resolved' && (
                        <>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Acknowledge</span>
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Flag className="h-4 w-4" />
                            <span className="sr-only">Report Fraud</span>
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AlertsTable;
