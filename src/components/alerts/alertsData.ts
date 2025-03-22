
// Sample data for the alerts table
export const alertsData = [
  { 
    id: '1',
    phoneNumber: '+1 (555) 123-4567',
    timestamp: '2023-09-15T14:30:00',
    location: 'New York, NY',
    threatLevel: 'high' as const,
    type: 'SIM Swap Attempt',
    status: 'new' as const,
    description: 'Unusual SIM swap requested from unrecognized device'
  },
  { 
    id: '2',
    phoneNumber: '+1 (555) 987-6543',
    timestamp: '2023-09-15T13:15:00',
    location: 'Miami, FL',
    threatLevel: 'medium' as const,
    type: 'Phishing Alert',
    status: 'acknowledged' as const,
    description: 'Suspicious login attempt detected from new location'
  },
  { 
    id: '3',
    phoneNumber: '+1 (555) 456-7890',
    timestamp: '2023-09-14T12:45:00',
    location: 'Chicago, IL',
    threatLevel: 'low' as const,
    type: 'Security Notification',
    status: 'resolved' as const,
    description: 'Security audit completed with minor recommendations'
  },
  { 
    id: '4',
    phoneNumber: '+1 (555) 789-0123',
    timestamp: '2023-09-14T11:20:00',
    location: 'Los Angeles, CA',
    threatLevel: 'high' as const,
    type: 'SIM Swap Attempt',
    status: 'new' as const,
    description: 'Multiple SIM swap attempts within 24 hours'
  },
  { 
    id: '5',
    phoneNumber: '+1 (555) 234-5678',
    timestamp: '2023-09-13T10:00:00',
    location: 'Dallas, TX',
    threatLevel: 'medium' as const,
    type: 'Suspicious Call',
    status: 'acknowledged' as const,
    description: 'User reported suspicious call claiming to be from support'
  },
  { 
    id: '6',
    phoneNumber: '+1 (555) 345-6789',
    timestamp: '2023-09-12T09:30:00',
    location: 'Seattle, WA',
    threatLevel: 'low' as const,
    type: 'PIN Change',
    status: 'resolved' as const,
    description: 'Successfully verified PIN change request'
  },
  { 
    id: '7',
    phoneNumber: '+1 (555) 654-7890',
    timestamp: '2023-09-10T08:45:00',
    location: 'Boston, MA',
    threatLevel: 'high' as const,
    type: 'Account Takeover Attempt',
    status: 'new' as const,
    description: 'Multiple failed password reset attempts'
  },
];
