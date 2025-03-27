
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useNotifications } from '@/contexts/NotificationsContext';
import { formatDistance } from 'date-fns';

// Components for notification settings
const NotificationPreferences = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <h3 className="text-lg font-medium">Notification Channels</h3>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailEnabled}
              onCheckedChange={setEmailEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications on your device
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive important alerts via SMS (charges may apply)
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={smsEnabled}
              onCheckedChange={setSmsEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for notification history
const NotificationHistory = () => {
  const { notifications, markAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    return <Bell className="h-4 w-4" />;
  };

  const getTimeSince = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Bell className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <h3 className="text-lg font-medium mb-1">No notifications yet</h3>
        <p className="text-muted-foreground max-w-md">
          When you receive notifications, they will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 border rounded-lg transition-colors ${
            notification.is_read ? 'bg-background' : 'bg-secondary/50'
          }`}
          onClick={() => markAsRead(notification.id)}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full bg-${notification.type}/10`}>
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{notification.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {getTimeSince(notification.created_at)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Notifications = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Notifications" 
        icon={<Bell className="h-6 w-6" />}
      />

      <Tabs defaultValue="history">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="history">Notification History</TabsTrigger>
          <TabsTrigger value="preferences">Notification Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                View and manage your recent notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationHistory />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationPreferences />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
