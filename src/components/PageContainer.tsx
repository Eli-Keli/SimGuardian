
import React from 'react';
import SidebarNav from './SidebarNav';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 px-6 py-6 ml-16 md:ml-64 transition-all duration-300">
        <div className="container max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
