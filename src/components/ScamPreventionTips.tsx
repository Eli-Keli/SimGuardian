
import React from 'react';
import DashboardCard from './DashboardCard';
import { Shield, Check } from 'lucide-react';

const scamPreventionTips = [
  "Never share your OTP or verification codes with anyone, even if they claim to be from your carrier.",
  "If you receive a suspicious call, hang up and call your carrier directly using the number on their official website.",
  "Use a PIN or password for your carrier account that is different from your other passwords.",
  "Enable two-factor authentication for your email accounts that are linked to your phone services.",
  "Be skeptical of unexpected calls or messages claiming to be from your carrier, especially those creating urgency.",
  "Regularly check your account for any unauthorized changes or suspicious activity."
];

const ScamPreventionTips = () => {
  return (
    <DashboardCard title="Prevention Tips" className="animate-in">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Shield className="h-5 w-5" />
          <h3 className="font-medium">How to Stay Safe From SIM Swap Scams</h3>
        </div>
        
        <ul className="space-y-2.5">
          {scamPreventionTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{tip}</span>
            </li>
          ))}
        </ul>
        
        <div className="border border-border/50 rounded-lg p-3 bg-muted/20 mt-4">
          <p className="text-xs text-muted-foreground italic">
            "If you suspect you've been a victim of a SIM swap, immediately contact your carrier and change passwords for your important accounts, especially financial services."
          </p>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ScamPreventionTips;
