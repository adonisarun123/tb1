import { useState, useEffect } from 'react';
import { Activity } from '../types/activity';

interface UseActivitiesReturn {
  activities: Activity[] | null;
  loading: boolean;
  error: Error | null;
}

export const useActivities = (): UseActivitiesReturn => {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch('/api/activities');
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        setActivities(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
}; 