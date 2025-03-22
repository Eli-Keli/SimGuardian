
import React from 'react';
import { Shield, CheckCircle, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  variant: 'primary' | 'success' | 'danger';
}

const ActionButton = ({ icon, label, description, onClick, variant }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-full flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200",
        "border hover:shadow-lg",
        variant === 'primary' && "bg-secondary border-primary/20 hover:border-primary/40",
        variant === 'success' && "bg-success/10 border-success/20 hover:border-success/40",
        variant === 'danger' && "bg-destructive/10 border-destructive/20 hover:border-destructive/40",
      )}
    >
      <div 
        className={cn(
          "p-3 rounded-full mb-3",
          variant === 'primary' && "bg-primary/20 text-primary",
          variant === 'success' && "bg-success/20 text-success",
          variant === 'danger' && "bg-destructive/20 text-destructive",
        )}
      >
        {icon}
      </div>
      <h3 className="text-sm font-medium mb-1">{label}</h3>
      <p className="text-xs text-muted-foreground text-center">{description}</p>
    </button>
  );
};

const ActionPanel = () => {
  const handleLockSim = () => {
    // Implement lock SIM functionality
    console.log('Lock SIM clicked');
  };

  const handleConfirmSwap = () => {
    // Implement confirm swap functionality
    console.log('Confirm Swap clicked');
  };

  const handleReportFraud = () => {
    // Implement report fraud functionality
    console.log('Report Fraud clicked');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ActionButton
        icon={<Shield size={24} />}
        label="Lock SIM (Emergency)"
        description="Immediately lock your SIM card to prevent unauthorized access"
        onClick={handleLockSim}
        variant="primary"
      />
      <ActionButton
        icon={<CheckCircle size={24} />}
        label="Confirm SIM Swap"
        description="Verify and approve a legitimate SIM swap request"
        onClick={handleConfirmSwap}
        variant="success"
      />
      <ActionButton
        icon={<Flag size={24} />}
        label="Report Fraud"
        description="Report suspicious activity or unauthorized SIM swap attempts"
        onClick={handleReportFraud}
        variant="danger"
      />
    </div>
  );
};

export default ActionPanel;
