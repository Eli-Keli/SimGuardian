
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import ReportScamForm from '@/components/ReportScamForm';
import RecentReportsSection from '@/components/RecentReportsSection';
import CommunityScamAlerts from '@/components/CommunityScamAlerts';
import ScamPreventionTips from '@/components/ScamPreventionTips';
import DashboardCard from '@/components/DashboardCard';
import { Smartphone, Shield, AlertTriangle } from 'lucide-react';

const ReportScam = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Report Scam"
        description="Report suspicious activity or scam attempts related to SIM cards or mobile services"
        icon={<AlertTriangle className="h-6 w-6 text-destructive" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in">
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title="Report a New Scam" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
              <Smartphone className="w-full h-full text-destructive" />
            </div>
            <ReportScamForm />
          </DashboardCard>

          <RecentReportsSection />
        </div>

        <div className="space-y-6">
          <CommunityScamAlerts />
          <ScamPreventionTips />
        </div>
      </div>
    </PageContainer>
  );
};

export default ReportScam;
