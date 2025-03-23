
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Flag } from 'lucide-react';
import { ReportScamForm } from '@/components/ReportScamForm';
import { ScamPreventionTips } from '@/components/ScamPreventionTips';
import { RecentReportsSection } from '@/components/RecentReportsSection';

const ReportScam = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Report Scam"
        description="Report suspected scam activity to protect yourself and others"
        icon={<Flag className="h-6 w-6" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glassmorphism rounded-xl p-6 animate-in">
            <ReportScamForm />
          </div>
        </div>
        <div className="space-y-6">
          <ScamPreventionTips />
          <RecentReportsSection />
        </div>
      </div>
    </PageContainer>
  );
};

export default ReportScam;
