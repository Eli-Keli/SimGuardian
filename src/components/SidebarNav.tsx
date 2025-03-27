import React from 'react';
import {
  HomeIcon,
  LayoutListIcon,
  AlertOctagonIcon,
  AlertTriangleIcon,
  SettingsIcon,
  Bell as BellIcon,
  LogOut,
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const SidebarNav = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
    await logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 h-full w-16 flex flex-col bg-secondary border-r border-r-border z-50">
      {/* Logo */}
      <div className="flex items-center justify-center h-16">
        <span className="font-bold text-xl">SG</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center justify-center py-3 hover:bg-muted rounded-md transition-colors",
                isActive ? "bg-muted" : "text-muted-foreground"
              )
            }
          >
            {item.icon}
            <span className="sr-only">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group flex items-center justify-center h-16 hover:bg-muted rounded-md transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar_url || ""} alt={user?.full_name || "User Avatar"} />
              <AvatarFallback>{user?.full_name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <span className="sr-only">User Menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem disabled>{user?.full_name || "User"}</DropdownMenuItem>
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
