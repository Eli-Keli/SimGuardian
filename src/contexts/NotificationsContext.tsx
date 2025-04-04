import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type NotificationType = 'info' | 'warning' | 'alert' | 'success';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  related_to: string;
  related_id: string | null;
  is_read: boolean;
  created_at: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: user } = await supabase.auth.getUser();

      if (user?.user) {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching notifications:', error);
          return;
        }

        if (data) {
          const typedData = data as Notification[];
          setNotifications([
            {
              id: 'demo-notification',
              user_id: user.user.id,
              title: 'Welcome to SimGuardian!',
              message: `Hey ${user.user.user_metadata.fullName}, welcome to SimGuardian! Your account is now active, and you're officially in control of your mobile security. Stay protected, stay alert, and take charge of your SIM safety today!`,
              type: 'info',
              related_to: 'welcome',
              related_id: null,
              is_read: false,
              created_at: new Date().toISOString(),
            },
            {
              id: 'scam-report-notification',
              user_id: user.user.id,
              title: 'Scam Report Received',
              message: `Hello, we have received your scam report. Thank you for helping make our community safer. Your report is under review.`,
              type: 'info',
              related_to: 'scam-report',
              related_id: null,
              is_read: false,
              created_at: new Date().toISOString(),
            },
            ...typedData,
          ]);
          setUnreadCount(typedData.filter(note => !note.is_read).length + 2);
        }
      }
    };

    fetchNotifications();

    // Set up real-time subscription
    const subscription = supabase
      .channel('notifications-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
      }, (payload) => {
        const newNotification = payload.new as Notification;
        setNotifications(currentNotifications => [newNotification, ...currentNotifications]);
        setUnreadCount(count => count + 1);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      console.error('Error marking notification as read:', error);
      return;
    }

    setNotifications(currentNotifications =>
      currentNotifications.map(note =>
        note.id === id ? { ...note, is_read: true } : note
      )
    );
    
    setUnreadCount(count => Math.max(0, count - 1));
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(note => !note.is_read);
    
    if (unreadNotifications.length === 0) return;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', unreadNotifications.map(note => note.id));

    if (error) {
      console.error('Error marking all notifications as read:', error);
      return;
    }

    setNotifications(currentNotifications =>
      currentNotifications.map(note => ({ ...note, is_read: true }))
    );
    
    setUnreadCount(0);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
