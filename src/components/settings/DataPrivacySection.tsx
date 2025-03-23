
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Database, Trash, UserX, FileText, LogIn } from 'lucide-react';

export const DataPrivacySection = () => {
  const activityLogs = [
    { id: 1, action: 'Logged in', ip: '192.168.1.45', device: 'iPhone 14 Pro', timestamp: '2023-08-17T10:30:00' },
    { id: 2, action: 'Changed password', ip: '192.168.1.45', device: 'iPhone 14 Pro', timestamp: '2023-08-10T15:45:00' },
    { id: 3, action: 'Reported scam', ip: '192.168.1.80', device: 'MacBook Pro', timestamp: '2023-08-05T09:15:00' },
    { id: 4, action: 'Updated notification settings', ip: '192.168.1.80', device: 'MacBook Pro', timestamp: '2023-07-29T18:20:00' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Activity Logs
          </CardTitle>
          <CardDescription>View your recent account activity and login history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex justify-between items-center p-3 rounded-md bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-2">
                  {log.action.includes('Logged in') && <LogIn className="h-4 w-4 text-muted-foreground" />}
                  {log.action.includes('Changed password') && <FileText className="h-4 w-4 text-muted-foreground" />}
                  {log.action.includes('Reported') && <Database className="h-4 w-4 text-muted-foreground" />}
                  {log.action.includes('Updated') && <FileText className="h-4 w-4 text-muted-foreground" />}
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-xs text-muted-foreground">
                      {log.device} • IP: {log.ip} • {formatDate(log.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">View Full Activity Log</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-destructive">
            <UserX className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>Permanently remove your account and all associated data</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  <br /><br />
                  <span className="font-semibold">What you will lose:</span>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>All your alert history and scam reports</li>
                    <li>Custom notification settings</li>
                    <li>Security preferences and trusted devices</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <p className="text-xs text-muted-foreground mt-2">
            Deleting your account will remove all your personal data, alert history, and custom settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
