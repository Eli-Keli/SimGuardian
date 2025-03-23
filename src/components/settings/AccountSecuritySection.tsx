
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Lock, Shield, Smartphone } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const AccountSecuritySection = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const passwordForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const trustedDevices = [
    { id: 1, name: 'iPhone 14 Pro', lastUsed: '2 hours ago', browser: 'Safari', os: 'iOS 16.5' },
    { id: 2, name: 'MacBook Pro', lastUsed: 'Just now', browser: 'Chrome', os: 'macOS 12.6' },
    { id: 3, name: 'Windows PC', lastUsed: '3 days ago', browser: 'Firefox', os: 'Windows 11' },
  ];

  const onPasswordSubmit = (data: any) => {
    console.log('Password change requested:', data);
    // Implementation would handle password change logic
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>Secure your account with an additional verification step</CardDescription>
          </div>
          <Switch 
            checked={twoFactorEnabled} 
            onCheckedChange={setTwoFactorEnabled} 
            aria-label="Toggle 2FA"
          />
        </CardHeader>
        <CardContent>
          {twoFactorEnabled ? (
            <div className="text-sm text-success">
              2FA is enabled. Your account is better protected.
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              We recommend enabling 2FA for enhanced security against SIM swap attacks.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Password Settings
          </CardTitle>
          <CardDescription>Change your password regularly for better security</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Change Password</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                  Make sure your new password is at least 12 characters long with letters, numbers, and symbols.
                </DialogDescription>
              </DialogHeader>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Update Password</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Trusted Devices
          </CardTitle>
          <CardDescription>Devices that are currently logged into your account</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {trustedDevices.map((device) => (
              <li key={device.id} className="flex justify-between items-center p-3 rounded-md bg-secondary/30 border border-border/50">
                <div>
                  <div className="font-medium">{device.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {device.browser} • {device.os} • Last used: {device.lastUsed}
                  </div>
                </div>
                <Button variant="outline" size="sm">Remove</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
