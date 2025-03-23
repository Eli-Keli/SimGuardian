
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Smartphone } from 'lucide-react';
import { LogsTable } from '@/components/LogsTable';
import { LogsAnalytics } from '@/components/LogsAnalytics';

const SimSwapLogs = () => {
  return (
    <PageContainer>
      <PageHeader
        title="SIM Swap Logs"
        description="Monitor and track SIM swap detection events"
        icon={<Smartphone className="h-6 w-6" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <LogsAnalytics />
      </div>
      
      <div className="glassmorphism rounded-xl p-6 animate-in">
        <LogsTable />
      </div>
    </PageContainer>
  );
};

export default SimSwapLogs;
