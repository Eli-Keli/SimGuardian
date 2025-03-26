
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Settings as SettingsIcon, UserCog, Smartphone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountSecuritySection } from '@/components/settings/AccountSecuritySection';
import { NotificationPreferencesSection } from '@/components/settings/NotificationPreferencesSection';
import { RegionalPreferencesSection } from '@/components/settings/RegionalPreferencesSection';
import { DataPrivacySection } from '@/components/settings/DataPrivacySection';
import { AdvancedSettingsSection } from '@/components/settings/AdvancedSettingsSection';
import { HelpSupportSection } from '@/components/settings/HelpSupportSection';
import { ProfileManagementSection } from '@/components/settings/ProfileManagementSection';
import { DeviceManagementSection } from '@/components/settings/DeviceManagementSection';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
        icon={<SettingsIcon />}
      />

      <div className="glassmorphism rounded-xl p-6 animate-in">
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="w-full bg-secondary/50 p-1 grid grid-cols-2 md:grid-cols-8 gap-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="account-security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="data-privacy">Privacy</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="help-support">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileManagementSection />
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <DeviceManagementSection />
          </TabsContent>

          <TabsContent value="account-security" className="space-y-6">
            <AccountSecuritySection />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationPreferencesSection />
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <RegionalPreferencesSection />
          </TabsContent>

          <TabsContent value="data-privacy" className="space-y-6">
            <DataPrivacySection />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <AdvancedSettingsSection />
          </TabsContent>

          <TabsContent value="help-support" className="space-y-6">
            <HelpSupportSection />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Settings;
