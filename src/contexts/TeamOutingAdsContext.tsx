import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Region } from '../lib/supabaseClient';
import { QuoteModalProvider } from './QuoteModalContext';

export interface TeamOutingAd {
  id: number;
  name: string;
  slug: string;
  banner_image: string;
  main_heading: string;
  subtext_after_heading: string;
  region_id: string;
  priority: number;
  location?: string;
  description?: string;
  showcase_heading?: string;
  showcase_subtext?: string;
  final_cta_heading?: string;
  final_cta_subtext?: string;
  cta_action?: string;
  cta_heading?: string;
  cta_subtext?: string;
  form_button_text?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  heading_1?: string;
  heading_2?: string;
  heading_3?: string;
  subtext_1?: string;
  subtext_2?: string;
  subtext_3?: string;
  created_at: string;
  updated_at: string;
}

interface TeamOutingAdsContextType {
  teamOutingAds: TeamOutingAd[];
  loading: boolean;
}

interface RegionsContextType {
  regions: Region[];
  loading: boolean;
}

const TeamOutingAdsContext = createContext<TeamOutingAdsContextType | undefined>(undefined);
const RegionsContext = createContext<RegionsContextType | undefined>(undefined);

export const useTeamOutingAds = () => {
  const context = useContext(TeamOutingAdsContext);
  if (!context) {
    throw new Error('useTeamOutingAds must be used within a TeamOutingAdsProvider');
  }
  return context;
};

export const useRegions = () => {
  const context = useContext(RegionsContext);
  if (!context) {
    throw new Error('useRegions must be used within a RegionsProvider');
  }
  return context;
};

export const TeamOutingAdsProvider = ({ children }: { children: React.ReactNode }) => {
  const [teamOutingAds, setTeamOutingAds] = useState<TeamOutingAd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamOutingAds = async () => {
      try {
        const { data, error } = await supabase
          .from('team_outing_ads')
          .select('*');

        if (error) throw error;
        setTeamOutingAds(data || []);
      } catch (error) {
        console.error('Error fetching team outing ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamOutingAds();
  }, []);

  return (
    <TeamOutingAdsContext.Provider value={{ teamOutingAds, loading }}>
      {children}
    </TeamOutingAdsContext.Provider>
  );
};

export const RegionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { data, error } = await supabase
          .from('regions')
          .select('*')
          .order('name');

        if (error) throw error;
        setRegions(data || []);
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return (
    <RegionsContext.Provider value={{ regions, loading }}>
      {children}
    </RegionsContext.Provider>
  );
};

export const CombinedProvider = ({ children }: { children: React.ReactNode }) => (
  <TeamOutingAdsProvider>
    <RegionsProvider>
      <QuoteModalProvider>
        {children}
      </QuoteModalProvider>
    </RegionsProvider>
  </TeamOutingAdsProvider>
); 