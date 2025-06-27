import { useState, useEffect } from 'react';
import { supabase, BlogPost } from '../lib/supabaseClient';

interface UseBlogReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

export const useSupabaseBlog = (limit?: number): UseBlogReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('blog_posts')
          .select('*')
          .order('published_on', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching blog posts:', error);
          setError(error.message);
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  return { posts, loading, error };
};

export default useSupabaseBlog; 