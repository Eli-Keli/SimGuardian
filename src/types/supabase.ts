
import { Database } from '@/integrations/supabase/types';

// Re-export the Database type
export type { Database };

// Define our own profile type
export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone_number: string | null;
  created_at: string | null;
  updated_at: string | null;
};

// Add any other custom types here
