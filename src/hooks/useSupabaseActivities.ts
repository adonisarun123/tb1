import { useState, useEffect } from 'react';
import { supabase, Activity } from '../lib/supabaseClient';

interface UseActivitiesReturn {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}

export const useSupabaseActivities = (limit?: number): UseActivitiesReturn => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('activities')
          .select('*')
          .order('created_at', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching activities:', error);
          setError(error.message);
        } else {
          setActivities(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [limit]);

  return { activities, loading, error };
};

export default useSupabaseActivities; 