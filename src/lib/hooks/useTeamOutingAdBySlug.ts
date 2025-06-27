import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { TeamOutingAd } from '../supabaseClient';

export const useTeamOutingAdBySlug = (slug: string | undefined) => {
  const [teamOutingAd, setTeamOutingAd] = useState<TeamOutingAd | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamOutingAd = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('team_outing_ads')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;

        setTeamOutingAd(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setTeamOutingAd(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamOutingAd();
  }, [slug]);

  return { teamOutingAd, loading, error };
};

export default useTeamOutingAdBySlug; 