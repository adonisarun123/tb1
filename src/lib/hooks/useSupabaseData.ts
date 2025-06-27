import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { Activity, Destination, Stay, CustomizedTraining, BlogPost, ContactSubmission, Region } from '../supabaseClient';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setActivities(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchActivities();

    // Set up real-time subscription
    const subscription = supabase
      .channel('activities_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'activities' },
        (payload) => {
          console.log('Change received!', payload);
          fetchActivities(); // Refresh data when changes occur
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { activities, loading, error };
};

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        console.log('Fetching destinations...');
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          console.error('Error fetching destinations:', error);
          throw error;
        }
        
        console.log('Destinations data received:', data);
        setDestinations(data || []);
      } catch (err) {
        console.error('Error in useDestinations hook:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchDestinations();

    // Set up real-time subscription
    const subscription = supabase
      .channel('destinations_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'destinations' },
        (payload) => {
          console.log('Destinations change received!', payload);
          fetchDestinations(); // Refresh data when changes occur
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { destinations, loading, error };
};

export const useStays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        console.log('Fetching stays...');
        const { data, error } = await supabase
          .from('stays')
          .select('*')
          .order('created_on', { ascending: false });

        if (error) {
          console.error('Error fetching stays:', error);
          throw error;
        }
        
        console.log('Stays data received:', data);
        setStays(data || []);
      } catch (err) {
        console.error('Error in useStays hook:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStays();

    // Set up real-time subscription
    const subscription = supabase
      .channel('stays_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'stays' },
        (payload) => {
          console.log('Stays change received!', payload);
          fetchStays(); // Refresh data when changes occur
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { stays, loading, error };
};

export const useCustomizedTrainings = () => {
  const [trainings, setTrainings] = useState<CustomizedTraining[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const { data, error } = await supabase
          .from('customized_trainings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTrainings(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchTrainings();

    // Set up real-time subscription
    const subscription = supabase
      .channel('trainings_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'customized_trainings' },
        (payload) => {
          console.log('Change received!', payload);
          fetchTrainings(); // Refresh data when changes occur
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { trainings, loading, error };
};

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_on', { ascending: false });

        if (error) throw error;
        setBlogPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return { blogPosts, loading, error };
};

export const useNewsletterSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const subscribe = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Check if email already exists
      const { data: existingSubscription } = await supabase
        .from('newsletter_subscriptions')
        .select('id, is_active')
        .eq('email', email)
        .single();

      if (existingSubscription) {
        if (existingSubscription.is_active) {
          setError('This email is already subscribed to our newsletter.');
          return;
        }

        // Reactivate subscription if it was inactive
        const { error: updateError } = await supabase
          .from('newsletter_subscriptions')
          .update({ is_active: true })
          .eq('id', existingSubscription.id);

        if (updateError) throw updateError;
      } else {
        // Create new subscription
        const { error: insertError } = await supabase
          .from('newsletter_subscriptions')
          .insert([{ email }]);

        if (insertError) throw insertError;
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while subscribing');
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, error, success };
};

import { webhookService } from '../webhookService';

export const useContactSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      console.log('Submitting data:', data);
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

      // Send to n8n webhook first (non-blocking)
      try {
        const webhookData = webhookService.prepareContactData({
          name: data.name,
          work_email: data.work_email,
          phone: data.phone,
          preferred_destination: data.preferred_destination,
          number_of_pax: data.number_of_pax,
          more_details: data.more_details,
          activity_type: data.activity_type
        });
        
        // Send to webhook without waiting for response (fire and forget)
        webhookService.sendToWebhook(webhookData).catch(error => {
          console.error('N8N webhook failed (non-blocking):', error);
        });
      } catch (webhookError) {
        console.error('Error preparing webhook data (non-blocking):', webhookError);
      }

      // Use direct fetch API to bypass potential Supabase client issues
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/contact_submissions`,
        {
          method: 'POST',
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(data)
        }
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      setSuccess(true);
      console.log('Form submitted successfully!');
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form');
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, success };
};

export const useRegions = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { data, error } = await supabase
          .from('regions')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        setRegions(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchRegions();

    // Set up real-time subscription
    const subscription = supabase
      .channel('regions_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'regions' },
        (payload) => {
          console.log('Change received!', payload);
          fetchRegions(); // Refresh data when changes occur
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { regions, loading, error };
};

export const useDestinationBySlug = (slug?: string) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if slug is not available
    if (!slug) {
      setDestination(null);
      setLoading(false);
      return;
    }

    const fetchDestination = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setDestination(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setDestination(null);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchDestination();

    // Set up real-time subscription
    const subscription = supabase
      .channel('destination_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'destinations', filter: `slug=eq.${slug}` },
        (payload) => {
          console.log('Change received!', payload);
          fetchDestination(); // Refresh data when changes occur
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [slug]);

  return { destination, loading, error };
};

export const useStaysByDestinationId = (destinationName?: string) => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        if (!destinationName) {
          setStays([]);
          return;
        }

        const { data, error } = await supabase
          .from('stays')
          .select('*')
          .eq('destination', destinationName)
          .order('created_on', { ascending: false });

        if (error) throw error;
        setStays(data || []);
      } catch (err) {
        console.error('Error fetching stays:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStays();

    // Set up real-time subscription
    const subscription = supabase
      .channel('stays_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'stays' },
        (payload) => {
          console.log('Stays change received!', payload);
          fetchStays(); // Refresh data when changes occur
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [destinationName]);

  return { stays, loading, error };
};

export const useStayBySlug = (slug?: string) => {
  const [stay, setStay] = useState<(Stay & { destination_details?: Destination | null }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if slug is not available
    if (!slug) {
      setStay(null);
      setLoading(false);
      return;
    }

    const fetchStay = async () => {
      try {
        setLoading(true);
        // First get the stay
        const { data: stayData, error: stayError } = await supabase
          .from('stays')
          .select('*')
          .eq('slug', slug)
          .single();

        if (stayError) throw stayError;
        
        // If stay has a destination_id, fetch the destination details
        let destinationData = null;
        if (stayData.destination_id) {
          const { data: destData, error: destError } = await supabase
            .from('destinations')
            .select('*')
            .eq('id', stayData.destination_id)
            .single();
            
          if (!destError) {
            destinationData = destData;
          }
        }
        
        // Combine the data
        setStay({
          ...stayData,
          destination_details: destinationData
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setStay(null);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStay();

    // Set up real-time subscription
    const subscription = supabase
      .channel('stay_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'stays', filter: `slug=eq.${slug}` },
        (payload) => {
          console.log('Change received!', payload);
          fetchStay(); // Refresh data when changes occur
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [slug]);

  return { stay, loading, error };
};