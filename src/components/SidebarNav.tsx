
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Smartphone, 
  Bell, 
  Flag, 
  Settings, 
  Menu, 
  X, 
  Shield,
  LogOut,
  LogIn
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  requiresAuth?: boolean;
}

const SidebarNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/', requiresAuth: true },
    { icon: Smartphone, label: 'SIM Swap Logs', href: '/sim-swap-logs', requiresAuth: true },
    { icon: Flag, label: 'Report Scam', href: '/report-scam', requiresAuth: true },
    { icon: Bell, label: 'Alerts', href: '/alerts', requiresAuth: true },
    { icon: Settings, label: 'Settings', href: '/settings', requiresAuth: true },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Filter nav items based on auth status
  const filteredNavItems = navItems.filter(item => !item.requiresAuth || user);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm animate-fade-in" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {isMobile && !mobileOpen ? (
          <Menu size={18} />
        ) : !isMobile && collapsed ? (
          <Menu size={18} />
        ) : (
          <X size={18} />
        )}
      </button>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-full transition-all duration-300 ease-in-out",
          "bg-sidebar border-r border-sidebar-border shadow-xl",
          isMobile ? (mobileOpen ? "w-64 translate-x-0" : "-translate-x-full w-64") : 
          (collapsed ? "w-16" : "w-64"),
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={cn(
            "flex items-center h-16 px-4 border-b border-sidebar-border",
            collapsed && !isMobile && "justify-center"
          )}>
            <Shield size={28} className="text-primary mr-2" />
            {(!collapsed || isMobile) && (
              <span className="font-semibold text-lg">SimGuardian</span>
            )}
          </div>

          {/* Nav items */}
          <nav className="mt-4 flex-1 px-3 overflow-y-auto">
            <ul className="space-y-1">
              {filteredNavItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className={cn(
                        "sidebar-item",
                        isActive && "sidebar-item-active",
                        !isActive && "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5",
                        isActive ? "text-primary" : "text-sidebar-foreground/70"
                      )} />
                      {(!collapsed || isMobile) && (
                        <span>{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="mt-auto p-3 border-t border-sidebar-border">
            {user ? (
              <button
                onClick={handleLogout}
                className={cn(
                  "sidebar-item w-full text-left text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <LogOut className="h-5 w-5" />
                {(!collapsed || isMobile) && (
                  <span>Sign Out</span>
                )}
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className={cn(
                  "sidebar-item w-full text-left text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <LogIn className="h-5 w-5" />
                {(!collapsed || isMobile) && (
                  <span>Sign In</span>
                )}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNav;
