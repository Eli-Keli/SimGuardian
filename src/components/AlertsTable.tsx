
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

// Sample data for the alerts table
const alertsData = [
  { 
    id: '1',
    phoneNumber: '+254 712 345678',
    timestamp: '2023-09-15T14:30:00',
    location: 'Nairobi, Kenya',
    threatLevel: 'high' as const,
    type: 'SIM Swap Attempt',
    status: 'new' as const,
    description: 'Unusual SIM swap requested from unrecognized device'
  },
  { 
    id: '2',
    phoneNumber: '+254 722 987654',
    timestamp: '2023-09-15T13:15:00',
    location: 'Mombasa, Kenya',
    threatLevel: 'medium' as const,
    type: 'Phishing Alert',
    status: 'acknowledged' as const,
    description: 'Suspicious login attempt detected from new location'
  },
  { 
    id: '3',
    phoneNumber: '+254 733 456789',
    timestamp: '2023-09-14T12:45:00',
    location: 'Kisumu, Kenya',
    threatLevel: 'low' as const,
    type: 'Security Notification',
    status: 'resolved' as const,
    description: 'Security audit completed with minor recommendations'
  },
  { 
    id: '4',
    phoneNumber: '+254 745 789012',
    timestamp: '2023-09-14T11:20:00',
    location: 'Eldoret, Kenya',
    threatLevel: 'high' as const,
    type: 'SIM Swap Attempt',
    status: 'new' as const,
    description: 'Multiple SIM swap attempts within 24 hours'
  },
  { 
    id: '5',
    phoneNumber: '+254 710 234567',
    timestamp: '2023-09-13T10:00:00',
    location: 'Nakuru, Kenya',
    threatLevel: 'medium' as const,
    type: 'Suspicious Call',
    status: 'acknowledged' as const,
    description: 'User reported suspicious call claiming to be from support'
  },
  { 
    id: '6',
    phoneNumber: '+254 728 345678',
    timestamp: '2023-09-12T09:30:00',
    location: 'Thika, Kenya',
    threatLevel: 'low' as const,
    type: 'PIN Change',
    status: 'resolved' as const,
    description: 'Successfully verified PIN change request'
  },
  { 
    id: '7',
    phoneNumber: '+254 738 654789',
    timestamp: '2023-09-10T08:45:00',
    location: 'Naivasha, Kenya',
    threatLevel: 'high' as const,
    type: 'Account Takeover Attempt',
    status: 'new' as const,
    description: 'Multiple failed password reset attempts'
  },
];

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
