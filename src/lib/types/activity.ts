export interface Activity {
  id: number;
  name: string;
  slug: string;
  tagline?: string;
  short_description?: string;
  description?: string;
  main_image?: string;
  activity_type: string;
  group_size?: string;
  duration?: string;
  rating?: number;
  created_at?: string;
  updated_at?: string;
} 