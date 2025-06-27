import { useState, useEffect } from 'react';
import { supabase, Stay } from '../lib/supabaseClient';

interface UseStaysReturn {
  stays: Stay[];
  loading: boolean;
  error: string | null;
}

export const useSupabaseStays = (limit?: number): UseStaysReturn => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('stays')
          .select('*')
          .order('created_on', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching stays:', error);
          setError(error.message);
        } else {
          setStays(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStays();
  }, [limit]);

  return { stays, loading, error };
};

export default useSupabaseStays; 