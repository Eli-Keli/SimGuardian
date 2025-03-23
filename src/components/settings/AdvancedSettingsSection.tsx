
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sliders, Layout, Code, Copy, Key } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const AdvancedSettingsSection = () => {
  const [showRecentReports, setShowRecentReports] = useState(true);
  const [showCommunityAlerts, setShowCommunityAlerts] = useState(true);
  const [showScamMap, setShowScamMap] = useState(true);
  const [layoutType, setLayoutType] = useState('compact');
  const [apiKey, setApiKey] = useState('sk_live_simguardian_01a2b3c4d5e6f7g8h9i0');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5 text-primary" />
            Dashboard Layout
          </CardTitle>
          <CardDescription>Customize which widgets and sections appear on your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="recent-reports">Recent Reports Section</Label>
            <Switch 
              id="recent-reports" 
              checked={showRecentReports}
              onCheckedChange={setShowRecentReports}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="community-alerts">Community Alerts Widget</Label>
            <Switch 
              id="community-alerts" 
              checked={showCommunityAlerts}
              onCheckedChange={setShowCommunityAlerts}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="scam-map">Scam Activity Map</Label>
            <Switch 
              id="scam-map" 
              checked={showScamMap}
              onCheckedChange={setShowScamMap}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Layout Density</Label>
            <ToggleGroup 
              type="single" 
              value={layoutType} 
              onValueChange={(value) => value && setLayoutType(value)}
              className="justify-start"
            >
              <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
              <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
              <ToggleGroupItem value="spacious">Spacious</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            API Access
          </CardTitle>
          <CardDescription>Manage your API credentials for integrating with other tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Your API Key</Label>
            <div className="flex">
              <Input 
                id="api-key" 
                value={apiKey} 
                readOnly 
                type="password"
                className="rounded-r-none"
              />
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-l-none"
                onClick={() => {
                  navigator.clipboard.writeText(apiKey);
                  // Toast would go here
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Never share your API key. It provides full access to your SimGuardian account.
            </p>
          </div>
          
          <div className="pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Regenerate API Key</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Regenerate API Key</DialogTitle>
                  <DialogDescription>
                    This will invalidate your current API key and generate a new one. Any integrations using your old key will stop working.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" className="mt-2 sm:mt-0">Cancel</Button>
                  <Button variant="destructive">Regenerate Key</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
