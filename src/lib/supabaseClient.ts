import { createClient } from '@supabase/supabase-js';

// Use provided Supabase credentials with Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://yrppmcoycmydrujbesnd.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycHBtY295Y215ZHJ1amJlc25kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMDY5OTEsImV4cCI6MjA1NDY4Mjk5MX0.ZbLPKtUGitTBgor2zzr_7L-FOZ-55IL3RaWJj-7aDW0";

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };

// Type definitions for your Supabase tables
export interface Activity {
  id: number;
  name: string;
  tagline: string;
  description: string;
  main_image: string;
  activity_type: string;
  group_size: string;
  duration: string;
  slug: string;
  created_at: string;
  updated_at: string;
  activity_main_tag?: string;
  location?: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  destination_description: string;
  region: string;
  region_id?: string;
  slug: string;
  destination_main_image: string;
  destination_image: string;
  created_at: string;
  updated_at: string;
}

export interface Stay {
  id: number;
  name: string;
  slug: string;
  collection_id?: string;
  meta_title?: string;
  meta_description?: string;
  alt_text?: string;
  tagline?: string;
  stay_description?: string;
  location?: string;
  special_activities?: string;
  facilities?: string;
  stay_image?: string;
  check_in_value?: string;
  check_out_value?: string;
  total_room_value?: string;
  destination?: string;
  location_plain_text?: string;
  destination_cms_multi_reference?: string;
  images?: string[];
  price?: string;
  created_on?: string;
  updated_on?: string;
  published_on?: string;
  destination_id?: number;
  // Legacy fields for backward compatibility
  title?: string;
  description?: string;
  banner_image_url?: string;
  image_url?: string;
  destination_name?: string;
  price_per_night?: number;
  max_capacity?: number;
  destination_details?: Destination | null;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  rating?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CustomizedTraining {
  id: number;
  title: string;
  name: string;
  description: string;
  image_url: string;
  banner_image: string;
  category: string;
  duration: string;
  activity_time: string;
  max_participants: number;
  group_size: string;
  tagline: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  name: string;
  slug: string;
  collection_id: string;
  locale_id: string;
  item_id: string;
  created_on: string;
  updated_on: string;
  published_on: string;
  post_body: string;
  small_description: string;
  main_image: string;
  thumbnail_image: string;
  featured: boolean;
  color: string;
  author: string;
  blog_post_tags: string;
  date_time: string;
  canonical_tag: string;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  updated_at: string;
}

export type ActivityType = 'outbound' | 'virtual' | 'hybrid' | 'exploring';

export interface ContactSubmission {
  id: number;
  name: string;
  work_email: string;
  preferred_destination: string;
  phone: string;
  number_of_pax: number;
  more_details?: string;
  activity_type: ActivityType;
  page_url: string;
  page_heading: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  destinations_list: string;
  banner_image_url: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface TeamOutingAd {
  id: number;
  name: string;
  slug: string;
  description?: string;
  banner_image_url?: string;
  main_image_url?: string;
  tagline?: string;
  location?: string;
  group_size?: string;
  activity_time?: string;
  created_at?: string;
  updated_at?: string;
  banner_image?: string;
  main_heading?: string;
  subtext_after_heading?: string;
  cta_action?: string;
  form_button_text?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  showcase_heading?: string;
  showcase_subtext?: string;
  heading_1?: string;
  subtext_1?: string;
  heading_2?: string;
  subtext_2?: string;
  heading_3?: string;
  subtext_3?: string;
  final_cta_heading?: string;
  final_cta_subtext?: string;
  priority?: number;
}

export interface PartnerRegistration {
  id: number;
  company_name: string;
  website?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  company_type: string;
  employee_count?: string;
  years_in_business?: string;
  services_offered: string[];
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Add more type definitions as needed for other tables 