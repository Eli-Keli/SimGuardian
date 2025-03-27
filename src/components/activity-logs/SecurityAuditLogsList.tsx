
import React from 'react';
import { formatRelative } from 'date-fns';
import { getSecurityLogIcon, getSeverityColor } from '@/utils/activity-logs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';

interface SecurityAuditLogsListProps {
  logs: any[];
  isLoading: boolean;
}

export const SecurityAuditLogsList = ({ logs, isLoading }: SecurityAuditLogsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <p className="text-muted-foreground">No security audit logs found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-center">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => {
              const Icon = getSecurityLogIcon(log.event_type);
              const severityColor = getSeverityColor(log.severity);
              
              return (
                <TableRow key={log.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {formatRelative(new Date(log.created_at), new Date())}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="capitalize">
                        {log.event_type.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={severityColor}>
                      {log.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {logs.length > 10 && (
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
      )}
    </div>
  );
};
