import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function validateRequiredEnv(keys: string[]): void {
  const missing = keys.filter((key) => !process.env[key] || process.env[key]!.trim() === '');

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. Check your backend .env file.`
    );
  }
}

const supabaseUrl = getRequiredEnv('SUPABASE_URL');
const supabaseServiceKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY');
const supabaseSchema = process.env.SUPABASE_SCHEMA || 'public';

// Create Supabase client with service role key for admin operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: supabaseSchema
  }
});

export default supabase;
