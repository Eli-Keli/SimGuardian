
import React from 'react';
import {
  HomeIcon,
  LayoutListIcon,
  AlertOctagonIcon,
  AlertTriangleIcon,
  SettingsIcon,
  Bell as BellIcon,
  LogOut,
  Menu,
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';

const SidebarNav = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { state, toggleSidebar } = useSidebar();
  const isExpanded = state === 'expanded';

  const navItems = [
    {
      label: 'Dashboard',
      icon: <HomeIcon className="h-5 w-5" />,
      href: '/',
    },
    {
      label: 'SIM Swap Logs',
      icon: <LayoutListIcon className="h-5 w-5" />,
      href: '/sim-swap-logs',
    },
    {
      label: 'Report Scam',
      icon: <AlertOctagonIcon className="h-5 w-5" />,
      href: '/report-scam',
    },
    {
      label: 'Alerts',
      icon: <AlertTriangleIcon className="h-5 w-5" />,
      href: '/alerts',
    },
    {
      label: 'Notifications',
      icon: <BellIcon className="h-5 w-5" />,
      href: '/notifications',
    },
    {
      label: 'Settings',
      icon: <SettingsIcon className="h-5 w-5" />,
      href: '/settings',
    },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const sidebarWidth = isExpanded ? 'w-64' : 'w-16';

  return (
    <div 
      className={`fixed top-0 left-0 h-full ${sidebarWidth} flex flex-col bg-secondary border-r border-r-border z-50 transition-all duration-300`}
    >
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between h-16 px-4">
        <span className={cn("font-bold text-xl", !isExpanded && "sr-only")}>SG</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="h-8 w-8"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center py-3 px-4 hover:bg-muted rounded-md transition-colors",
                isActive ? "bg-muted" : "text-muted-foreground",
                !isExpanded && "justify-center px-0"
              )
            }
          >
            {item.icon}
            {isExpanded && <span className="ml-3">{item.label}</span>}
            <span className={cn("sr-only", isExpanded && "sr-only")}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={cn(
            "group flex items-center h-16 hover:bg-muted rounded-md transition-colors px-4",
            !isExpanded && "justify-center px-0"
          )}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image || ""} alt={user?.name || "User Avatar"} />
              <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            {isExpanded && <span className="ml-3">{user?.name || "User"}</span>}
            <span className="sr-only">User Menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem disabled>{user?.name || "User"}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarNav;
