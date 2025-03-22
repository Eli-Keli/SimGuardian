
import React from 'react';
import { Check, Eye, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlertsTableActionsProps {
  alertStatus: 'new' | 'acknowledged' | 'resolved';
}

const AlertsTableActions = ({ alertStatus }: AlertsTableActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
        <Eye className="h-4 w-4" />
        <span className="sr-only">View Details</span>
      </Button>
      {alertStatus !== 'resolved' && (
        <>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Check className="h-4 w-4" />
            <span className="sr-only">Acknowledge</span>
          </Button>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Flag className="h-4 w-4" />
            <span className="sr-only">Report Fraud</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default AlertsTableActions;
