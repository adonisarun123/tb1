import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { Activity } from '../supabaseClient';

interface ActivityImage {
  title: string;
  description: string;
  image: string;
  type: 'virtual' | 'outbound';
}

export const useActivityImages = () => {
  const [virtualActivities, setVirtualActivities] = useState<ActivityImage[]>([]);
  const [outboundActivities, setOutboundActivities] = useState<ActivityImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1/object/public/activities/${imagePath}`;
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch all activities
        const { data: activities, error } = await supabase
          .from('activities')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (activities) {
          // Process virtual activities
          const virtual = activities
            .filter((activity: Activity) => activity.activity_type === 'virtual')
            .map((activity: Activity) => ({
              title: activity.name,
              description: activity.tagline,
              image: getImageUrl(activity.main_image),
              type: 'virtual' as const
            }));

          // Process outbound activities
          const outbound = activities
            .filter((activity: Activity) => activity.activity_type === 'outbound')
            .map((activity: Activity) => ({
              title: activity.name,
              description: activity.tagline,
              image: getImageUrl(activity.main_image),
              type: 'outbound' as const
            }));

          setVirtualActivities(virtual);
          setOutboundActivities(outbound);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return {
    virtualActivities,
    outboundActivities,
    loading,
    error
  };
}; 