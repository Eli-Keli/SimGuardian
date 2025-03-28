
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/contexts/NotificationsContext';
import { Sidebar, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel } from './ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  ShieldAlert, 
  AlertTriangle, 
  BellRing, 
  Settings, 
  LogOut, 
  Phone, 
  Activity,
  ClipboardList,
  Layers
} from 'lucide-react';

const SidebarNav = () => {
  const location = useLocation();
  const { unreadCount } = useNotifications();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      icon: <Activity className="h-5 w-5" />,
      label: 'Dashboard',
      path: '/',
      active: isActive('/')
    },
    {
      icon: <Layers className="h-5 w-5" />,
      label: 'Overview',
      path: '/home',
      active: isActive('/home')
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'SIM Swap Logs',
      path: '/sim-swap-logs',
      active: isActive('/sim-swap-logs')
    },
    {
      icon: <ShieldAlert className="h-5 w-5" />,
      label: 'Report Scam',
      path: '/report-scam',
      active: isActive('/report-scam')
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: 'Alerts',
      path: '/alerts',
      active: isActive('/alerts'),
      badge: <Badge variant="outline" className="ml-auto bg-destructive/10 text-destructive hover:bg-destructive/20">2</Badge>
    },
    {
      icon: <BellRing className="h-5 w-5" />,
      label: 'Notifications',
      path: '/notifications',
      active: isActive('/notifications'),
      badge: unreadCount ? <Badge variant="outline" className="ml-auto bg-primary/10 text-primary hover:bg-primary/20">{unreadCount}</Badge> : null
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      path: '/settings',
      active: isActive('/settings')
    }
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-end pr-2 pt-2">
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild isActive={item.active} tooltip={item.label}>
                  <Link to={item.path} className="flex w-full items-center">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto pb-4">
        {user && (
          <Button 
            variant="ghost" 
            className="w-full justify-start px-2" 
            onClick={signOut}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>Sign out</span>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;
