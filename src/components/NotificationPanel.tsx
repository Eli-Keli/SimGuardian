
import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, X } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { cn } from '@/lib/utils';

// Sample notifications data
const notificationsData = [
  {
    id: '1',
    type: 'alert',
    title: 'SIM Swap Attempt Detected',
    message: 'Unusual activity detected on +1 (555) 987-6543. SIM swap attempted from unknown location.',
    time: '5 minutes ago',
    unread: true,
  },
  {
    id: '2',
    type: 'info',
    title: 'Security Scan Complete',
    message: 'Weekly security scan completed. No issues found.',
    time: '2 hours ago',
    unread: false,
  },
  {
    id: '3',
    type: 'alert',
    title: 'Phishing Campaign Detected',
    message: 'New phishing campaign targeting customers. Messages claim to be from support.',
    time: '1 day ago',
    unread: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'System Update',
    message: 'Security system updated to version 2.4.5. New features available.',
    time: '3 days ago',
    unread: false,
  },
];

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, unread: false } 
        : notification
    ));
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button 
        onClick={togglePanel}
        className="relative p-2 rounded-full hover:bg-muted/20 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6" />
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
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-muted/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="overflow-y-auto max-h-[60vh]">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-border">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-4 transition-colors hover:bg-muted/10",
                          notification.unread && "bg-muted/10"
                        )}
                      >
                        <div className="flex">
                          <div className="flex-shrink-0 mt-0.5">
                            {notification.type === 'alert' ? (
                              <div className="p-1.5 rounded-full bg-destructive/20 text-destructive">
                                <AlertTriangle size={16} />
                              </div>
                            ) : (
                              <div className="p-1.5 rounded-full bg-info/20 text-info">
                                <Info size={16} />
                              </div>
                            )}
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
                              </button>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <div className="mt-1 flex items-center justify-between">
                              <p className="text-xs text-muted-foreground/80">
                                {notification.time}
                              </p>
                              {notification.unread && (
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
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-3 mt-auto border-t border-border">
                  <button 
                    className="w-full px-4 py-2 text-xs font-medium text-center rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </DashboardCard>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPanel;
