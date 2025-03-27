
import React, { useState } from 'react';
import { Bell, BellRing, AlertTriangle, Info, Check, X } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { cn } from '@/lib/utils';
import { useNotifications, Notification } from '@/contexts/NotificationsContext';
import { format, formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification } = useNotifications();
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Format notification date
  const formatNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    const isToday = new Date().toDateString() === date.toDateString();
    
    if (isToday) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    
    return format(date, 'MMM d, yyyy h:mm a');
  };

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={16} className="text-destructive" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-warning" />;
      case 'success':
        return <Check size={16} className="text-success" />;
      case 'info':
      default:
        return <Info size={16} className="text-info" />;
    }
  };
  
  // Filter notifications by read/unread status
  const unreadNotifications = notifications.filter(n => !n.is_read);
  const readNotifications = notifications.filter(n => n.is_read);

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button 
        onClick={togglePanel}
        className="relative p-2 rounded-full hover:bg-muted/20 transition-colors"
        aria-label="Notifications"
      >
        {unreadCount > 0 ? (
          <BellRing className="h-6 w-6" />
        ) : (
          <Bell className="h-6 w-6" />
        )}
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white animate-fade-in">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm animate-fade-in lg:hidden" 
            onClick={() => setIsOpen(false)}
          />
          <div 
            className={cn(
              "absolute right-0 mt-2 w-80 sm:w-96 z-40 transition-all duration-200 animate-fade-in",
              "max-h-[80vh] overflow-hidden rounded-xl drop-shadow-lg",
            )}
          >
            <DashboardCard className="p-0 flex flex-col h-full" noBorder>
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-medium text-lg">Notifications</h3>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Info size={16} />
                        <span className="sr-only">Options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => markAllAsRead()}>
                        Mark all as read
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={18} />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="all" className="flex-1 flex flex-col">
                <div className="px-4 pt-2">
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="flex-1">
                      Unread {unreadCount > 0 && `(${unreadCount})`}
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="flex-1 overflow-hidden flex flex-col">
                  <NotificationList 
                    notifications={notifications} 
                    markAsRead={markAsRead} 
                    dismissNotification={dismissNotification}
                    formatDate={formatNotificationDate}
                    getIcon={getNotificationIcon}
                  />
                </TabsContent>
                
                <TabsContent value="unread" className="flex-1 overflow-hidden flex flex-col">
                  <NotificationList 
                    notifications={unreadNotifications} 
                    markAsRead={markAsRead} 
                    dismissNotification={dismissNotification}
                    formatDate={formatNotificationDate}
                    getIcon={getNotificationIcon}
                  />
                </TabsContent>
              </Tabs>
              
              {notifications.length > 0 && (
                <div className="p-3 mt-auto border-t border-border">
                  <Button
                    className="w-full px-4 py-2 text-xs font-medium"
                    variant="secondary"
                    onClick={() => markAllAsRead()}
                  >
                    Mark all as read
                  </Button>
                </div>
              )}
            </DashboardCard>
          </div>
        </>
      )}
    </div>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  markAsRead: (id: string) => Promise<void>;
  dismissNotification: (id: string) => Promise<void>;
  formatDate: (date: string) => string;
  getIcon: (type: string) => React.ReactNode;
}

const NotificationList = ({ 
  notifications, 
  markAsRead, 
  dismissNotification,
  formatDate,
  getIcon
}: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-muted-foreground">
        <div className="text-center">
          <Bell className="h-8 w-8 mx-auto opacity-40 mb-2" />
          <p>No notifications to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-[60vh] flex-1">
      <div className="divide-y divide-border">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={cn(
              "p-4 transition-colors hover:bg-muted/10",
              !notification.is_read && "bg-muted/10"
            )}
          >
            <div className="flex">
              <div className="flex-shrink-0 mt-0.5">
                <div className={cn(
                  "p-1.5 rounded-full",
                  notification.type === 'alert' && "bg-destructive/20 text-destructive",
                  notification.type === 'warning' && "bg-warning/20 text-warning",
                  notification.type === 'success' && "bg-success/20 text-success",
                  notification.type === 'info' && "bg-info/20 text-info"
                )}>
                  {getIcon(notification.type)}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium">
                    {notification.title}
                  </p>
                  <button 
                    onClick={() => dismissNotification(notification.id)}
                    className="ml-2 p-1 rounded-full hover:bg-muted/20 transition-colors"
                  >
                    <X size={14} />
                    <span className="sr-only">Dismiss</span>
                  </button>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground/80">
                    {formatDate(notification.created_at)}
                  </p>
                  {!notification.is_read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-primary hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
