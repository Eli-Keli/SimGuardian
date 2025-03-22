
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const PageHeader = ({ title, description, icon }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        {icon && <div className="text-primary">{icon}</div>}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
