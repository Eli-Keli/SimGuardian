
import React from 'react';
import SidebarNav from './SidebarNav';
import { SidebarProvider } from './ui/sidebar';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SidebarNav />
        <main className="flex-1 px-6 py-6 ml-16 transition-all duration-300">
          <div className="container max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
