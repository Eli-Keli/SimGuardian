
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

export const NotificationPreferencesSection = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState('all');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notification Methods
          </CardTitle>
          <CardDescription>Choose how you want to receive security alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <Switch 
              id="email-notifications" 
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
            </div>
            <Switch 
              id="sms-notifications" 
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="push-notifications">Push Notifications</Label>
            </div>
            <Switch 
              id="push-notifications" 
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Alert Thresholds
          </CardTitle>
          <CardDescription>Set the minimum risk level for receiving alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={alertThreshold} 
            onValueChange={setAlertThreshold}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-alerts" />
              <Label htmlFor="all-alerts" className="flex-1">All Alerts (Low, Medium & High)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium-high" id="medium-high" />
              <Label htmlFor="medium-high" className="flex-1">Medium & High Risk Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high-only" id="high-only" />
              <Label htmlFor="high-only" className="flex-1">High Risk Only</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};
