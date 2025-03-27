
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Bell, BellRing, AlertTriangle, Info, Check, X, Search } from 'lucide-react';
import { useNotifications, Notification } from '@/contexts/NotificationsContext';
import { format, formatDistanceToNow } from 'date-fns';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const ITEMS_PER_PAGE = 10;

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || notification.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Pagination logic
  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );
  
  // Date formatting
  const formatNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy h:mm a');
  };
  
  // Get relative time
  const getRelativeTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  
  // Get notification icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success':
        return <Check className="h-4 w-4 text-success" />;
      case 'info':
      default:
        return <Info className="h-4 w-4 text-info" />;
    }
  };
  
  // Get notification type badge
  const getNotificationTypeBadge = (type: string) => {
    return (
      <div className={cn(
        "px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5",
        type === 'alert' && "bg-destructive/10 text-destructive",
        type === 'warning' && "bg-warning/10 text-warning",
        type === 'success' && "bg-success/10 text-success", 
        type === 'info' && "bg-info/10 text-info"
      )}>
        {getNotificationIcon(type)}
        <span>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
    );
  };
  
  return (
    <PageContainer>
      <PageHeader
        title="Notifications"
        subtitle="View and manage your notifications"
        icon={<Bell className="h-6 w-6" />}
      />
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Your Notifications</CardTitle>
              <CardDescription>
                Track alerts, updates, and important information
              </CardDescription>
            </div>
            
            <Button onClick={() => markAllAsRead()}>
              Mark all as read
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="alert">Alert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table">
              {paginatedNotifications.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead>Notification</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedNotifications.map(notification => (
                        <TableRow 
                          key={notification.id}
                          className={!notification.is_read ? "bg-muted/5" : undefined}
                        >
                          <TableCell>
                            {getNotificationTypeBadge(notification.type)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="text-muted-foreground">
                                {getRelativeTime(notification.created_at)}
                              </div>
                              <div className="text-xs text-muted-foreground/70">
                                {formatNotificationDate(notification.created_at)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {!notification.is_read && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark read
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 border rounded-lg">
                  <div className="text-center">
                    <Bell className="h-10 w-10 mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="font-medium mb-1">No notifications found</h3>
                    <p className="text-muted-foreground text-sm">
                      {searchQuery || filterType !== 'all'
                        ? "Try changing your search or filter criteria"
                        : "You don't have any notifications yet"}
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cards">
              {paginatedNotifications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedNotifications.map(notification => (
                    <Card key={notification.id} className={cn(
                      "overflow-hidden",
                      !notification.is_read && "border-primary/30"
                    )}>
                      <CardHeader className={cn(
                        "pb-2 flex flex-row justify-between items-start",
                        notification.type === 'alert' && "bg-destructive/5",
                        notification.type === 'warning' && "bg-warning/5",
                        notification.type === 'success' && "bg-success/5",
                        notification.type === 'info' && "bg-info/5"
                      )}>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "p-1.5 rounded-full",
                            notification.type === 'alert' && "bg-destructive/20 text-destructive",
                            notification.type === 'warning' && "bg-warning/20 text-warning",
                            notification.type === 'success' && "bg-success/20 text-success",
                            notification.type === 'info' && "bg-info/20 text-info"
                          )}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <CardTitle className="text-base">{notification.title}</CardTitle>
                        </div>
                        
                        {!notification.is_read && (
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm mb-4">{notification.message}</p>
                        <div className="text-xs text-muted-foreground">
                          {getRelativeTime(notification.created_at)}
                        </div>
                      </CardContent>
                      {!notification.is_read && (
                        <CardFooter className="pt-0 pb-4">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => markAsRead(notification.id)}
                            className="w-full"
                          >
                            Mark as read
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 border rounded-lg">
                  <div className="text-center">
                    <Bell className="h-10 w-10 mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="font-medium mb-1">No notifications found</h3>
                    <p className="text-muted-foreground text-sm">
                      {searchQuery || filterType !== 'all'
                        ? "Try changing your search or filter criteria"
                        : "You don't have any notifications yet"}
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        
        {totalPages > 1 && (
          <CardFooter>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>
    </PageContainer>
  );
};

export default NotificationsPage;
