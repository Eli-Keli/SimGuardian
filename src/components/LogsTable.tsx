
import React from 'react';
import { Eye, Lock, Flag } from 'lucide-react';
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

// Sample data for the logs table
const logsData = [
  { 
    id: '1',
    phoneNumber: '+254 712 345678',
    date: '2023-09-15T14:30:00',
    status: 'flagged' as const,
    location: 'Nairobi, Kenya',
    deviceInfo: 'iPhone 13, iOS 16.5',
    ipAddress: '192.168.1.1',
    carrier: 'Safaricom'
  },
  { 
    id: '2',
    phoneNumber: '+254 722 987654',
    date: '2023-09-14T13:15:00',
    status: 'safe' as const,
    location: 'Mombasa, Kenya',
    deviceInfo: 'Samsung Galaxy S21, Android 13',
    ipAddress: '192.168.1.2',
    carrier: 'Airtel'
  },
  { 
    id: '3',
    phoneNumber: '+254 733 456789',
    date: '2023-09-14T12:45:00',
    status: 'pending' as const,
    location: 'Kisumu, Kenya',
    deviceInfo: 'Google Pixel 6, Android 13',
    ipAddress: '192.168.1.3',
    carrier: 'Telkom'
  },
  { 
    id: '4',
    phoneNumber: '+254 745 789012',
    date: '2023-09-13T11:20:00',
    status: 'safe' as const,
    location: 'Eldoret, Kenya',
    deviceInfo: 'iPhone 12, iOS 16.4',
    ipAddress: '192.168.1.4',
    carrier: 'Safaricom'
  },
  { 
    id: '5',
    phoneNumber: '+254 710 234567',
    date: '2023-09-12T10:00:00',
    status: 'flagged' as const,
    location: 'Nakuru, Kenya',
    deviceInfo: 'OnePlus 9, OxygenOS 13',
    ipAddress: '192.168.1.5',
    carrier: 'Airtel'
  },
  { 
    id: '6',
    phoneNumber: '+254 728 345678',
    date: '2023-09-11T09:30:00',
    status: 'safe' as const,
    location: 'Thika, Kenya',
    deviceInfo: 'Samsung Galaxy S22, Android 13',
    ipAddress: '192.168.1.6',
    carrier: 'Telkom'
  },
  { 
    id: '7',
    phoneNumber: '+254 738 456789',
    date: '2023-09-10T08:45:00',
    status: 'pending' as const,
    location: 'Naivasha, Kenya',
    deviceInfo: 'iPhone 14, iOS 16.5',
    ipAddress: '192.168.1.7',
    carrier: 'Safaricom'
  },
];

interface LogsTableProps {
  searchQuery: string;
  dateRange: string;
  statusFilter: string;
  locationFilter: string;
}

const LogsTable = ({ searchQuery, dateRange, statusFilter, locationFilter }: LogsTableProps) => {
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

  // Filter logs based on the search query and filters
  const filteredLogs = logsData.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    const matchesLocation = locationFilter === 'all' || 
      log.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    // Date range filtering would require more complex logic with actual dates
    // This is simplified for demo purposes
    const matchesDateRange = dateRange === 'all';
    
    return matchesSearch && matchesStatus && matchesLocation && matchesDateRange;
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Phone Number</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow 
                  key={log.id}
                  className={cn(
                    log.status === 'flagged' && "bg-destructive/5"
                  )}
                >
                  <TableCell className="font-medium">{log.phoneNumber}</TableCell>
                  <TableCell>{formatDate(log.date)}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>{log.carrier}</TableCell>
                  <TableCell>
                    <StatusBadge 
                      status={log.status} 
                      pulse={log.status === 'flagged'} 
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Lock className="h-4 w-4" />
                        <span className="sr-only">Lock SIM</span>
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Flag className="h-4 w-4" />
                        <span className="sr-only">Report Fraud</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
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

export default LogsTable;
