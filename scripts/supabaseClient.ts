import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env and .env.local
dotenv.config(); // Load .env first
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true }); // Override with .env.local if it exists

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Create supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Export a flag to check if Supabase is available
export const isSupabaseAvailable = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseAvailable) {
  console.warn('⚠️  Supabase environment variables not found. Sitemap will only include static routes.');
} 