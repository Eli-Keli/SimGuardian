
import { 
  Clock, 
  LogIn, 
  Settings, 
  Shield, 
  Smartphone, 
  UserPlus, 
  AlertTriangle,
  KeyRound,
  Lock,
  BarChart4,
  LucideIcon
} from 'lucide-react';

// Activity log types
export enum ActivityLogType {
  LOGIN = 'login',
  DEVICE_ADDED = 'device_added',
  SIM_REPORTED = 'sim_reported',
  SETTINGS_CHANGED = 'settings_changed',
  PROFILE_UPDATED = 'profile_updated'
}

// Security log types
export enum SecurityLogType {
  FAILED_LOGIN = 'failed_login',
  UNAUTHORIZED_SIM_CHANGE = 'unauthorized_sim_change',
  SETTINGS_MODIFIED = 'settings_modified',
  PASSWORD_CHANGED = 'password_changed',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity'
}

// Get icon for activity logs
export const getLogIcon = (type: string): LucideIcon => {
  switch (type) {
    case ActivityLogType.LOGIN:
      return LogIn;
    case ActivityLogType.DEVICE_ADDED:
      return Smartphone;
    case ActivityLogType.SIM_REPORTED:
      return Shield;
    case ActivityLogType.SETTINGS_CHANGED:
      return Settings;
    case ActivityLogType.PROFILE_UPDATED:
      return UserPlus;
    default:
      return Clock;
  }
};

// Get icon for security logs
export const getSecurityLogIcon = (type: string): LucideIcon => {
  switch (type) {
    case SecurityLogType.FAILED_LOGIN:
      return AlertTriangle;
    case SecurityLogType.UNAUTHORIZED_SIM_CHANGE:
      return Shield;
    case SecurityLogType.SETTINGS_MODIFIED:
      return Settings;
    case SecurityLogType.PASSWORD_CHANGED:
      return KeyRound;
    case SecurityLogType.SUSPICIOUS_ACTIVITY:
      return Lock;
    default:
      return BarChart4;
  }
};

// Get severity badge color
export const getSeverityColor = (severity: string): string => {
  switch (severity.toLowerCase()) {
    case 'low':
      return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
    case 'high':
      return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
    case 'critical':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
    default:
      return '';
  }
};

// Filter logs by type
export const filterLogsByType = (logType: string, selectedTypes: string[]): boolean => {
  if (!selectedTypes.length) return true;
  return selectedTypes.includes(logType);
};

// Filter logs by date range
export const filterLogsByDate = (
  logDate: string, 
  dateRange: { from: Date | undefined; to: Date | undefined }
): boolean => {
  const { from, to } = dateRange;
  const date = new Date(logDate);
  
  if (!from && !to) return true;
  
  if (from && to) {
    // Set the "to" date to the end of the day for inclusive filtering
    const endOfDay = new Date(to);
    endOfDay.setHours(23, 59, 59, 999);
    return date >= from && date <= endOfDay;
  }
  
  if (from) return date >= from;
  if (to) {
    const endOfDay = new Date(to);
    endOfDay.setHours(23, 59, 59, 999);
    return date <= endOfDay;
  }
  
  return true;
};
