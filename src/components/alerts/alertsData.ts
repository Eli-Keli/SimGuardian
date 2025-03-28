
// Sample data for the alerts table
export const alertsData = [
  { 
    id: '1',
    phoneNumber: '+254 712 345678',
    timestamp: '2025-03-27T14:30:00',
    location: 'Nairobi, Kenya',
    threatLevel: 'high' as const,
    type: 'SIM Swap Attempt',
    status: 'new' as const,
    description: 'Unusual SIM swap requested from unrecognized device'
  },
  { 
    id: '2',
    phoneNumber: '+254 722 987654',
    timestamp: '2025-03-26T13:15:00',
    location: 'Mombasa, Kenya',
    threatLevel: 'medium' as const,
    type: 'Phishing Alert',
    status: 'acknowledged' as const,
    description: 'Suspicious login attempt detected from new location'
  },
  { 
    id: '3',
    phoneNumber: '+254 733 456789',
    timestamp: '2025-03-26T12:45:00',
    location: 'Kisumu, Kenya',
    threatLevel: 'low' as const,
    type: 'Security Notification',
    status: 'resolved' as const,
    description: 'Security audit completed with minor recommendations'
  },
  { 
    id: '4',
    phoneNumber: '+254 745 789012',
    timestamp: '2025-03-26T11:20:00',
    location: 'Eldoret, Kenya',
    threatLevel: 'high' as const,
    type: 'SIM Swap Attempt',
    status: 'new' as const,
    description: 'Multiple SIM swap attempts within 24 hours'
  },
  { 
    id: '5',
    phoneNumber: '+254 710 234567',
    timestamp: '2025-03-26T10:00:00',
    location: 'Nakuru, Kenya',
    threatLevel: 'medium' as const,
    type: 'Suspicious Call',
    status: 'acknowledged' as const,
    description: 'User reported suspicious call claiming to be from support'
  },
  { 
    id: '6',
    phoneNumber: '+254 728 345678',
    timestamp: '2025-03-24T03:30:00',
    location: 'Thika, Kenya',
    threatLevel: 'low' as const,
    type: 'PIN Change',
    status: 'resolved' as const,
    description: 'Successfully verified PIN change request'
  },
  { 
    id: '7',
    phoneNumber: '+254 738 654789',
    timestamp: '2025-03-20T08:45:00',
    location: 'Naivasha, Kenya',
    threatLevel: 'high' as const,
    type: 'Account Takeover Attempt',
    status: 'new' as const,
    description: 'Multiple failed password reset attempts'
  },
  { 
    id: '8',
    phoneNumber: '+254 755 123456',
    timestamp: '2025-03-03T16:30:00',
    location: 'Machakos, Kenya',
    threatLevel: 'high' as const,
    type: 'SIM Swap Detected',
    status: 'new' as const,
    description: 'SIM swap detected and blocked automatically'
  },
  { 
    id: '9',
    phoneNumber: '+254 726 987654',
    timestamp: '2025-03-08T14:15:00',
    location: 'Nairobi, Kenya',
    threatLevel: 'medium' as const,
    type: 'Unusual Activity',
    status: 'acknowledged' as const,
    description: 'Multiple international calls to premium numbers detected'
  },
  { 
    id: '10',
    phoneNumber: '+254 737 456123',
    timestamp: '2025-03-07T11:40:00',
    location: 'Kisumu, Kenya',
    threatLevel: 'low' as const,
    type: 'Routine Check',
    status: 'resolved' as const,
    description: 'Completed routine security scan with no issues found'
  }
];
