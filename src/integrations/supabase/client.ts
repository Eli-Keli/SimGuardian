// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nfkstvmqmphnycfhhqxn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ma3N0dm1xbXBobnljZmhocXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODE4ODQsImV4cCI6MjA1ODY1Nzg4NH0.9EvMdyxoi6b7o2MCT2TrPdVsZ-V4JjPCo_Flz9XxhHA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);