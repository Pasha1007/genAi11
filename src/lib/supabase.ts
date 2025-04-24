import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://ykvbstbpeybtobeebcnm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdmJzdGJwZXlidG9iZWViY25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTQ0ODU2OCwiZXhwIjoyMDYxMDI0NTY4fQ.D7r5jtETTI72pDoeGtL0JIwUv9T5cCKkehVSAvSKAfM';

// Initialize Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);