import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Stats {
  totalActivities: number;
  totalStays: number;
  totalBlogPosts: number;
  totalCompanies: number;
}

const StatsSection: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalActivities: 350,
    totalStays: 25,
    totalBlogPosts: 100,
    totalCompanies: 550
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from multiple tables
        const [activitiesResult, staysResult, blogResult] = await Promise.all([
          supabase.from('activities').select('id', { count: 'exact', head: true }),
          supabase.from('stays').select('id', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('id', { count: 'exact', head: true })
        ]);

        setStats({
          totalActivities: activitiesResult.count || 350,
          totalStays: staysResult.count || 25,
          totalBlogPosts: blogResult.count || 100,
          totalCompanies: 550 // Static for now, can be made dynamic if you have a companies table
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <div className="text-3xl font-bold text-[#FF4C39] mb-2">
          {loading ? '...' : `${formatNumber(stats.totalActivities)}+`}
        </div>
        <div className="text-gray-600">Unique Experiences</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-[#FF4C39] mb-2">
          4.9/5
        </div>
        <div className="text-gray-600">Average Rating</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-[#FF4C39] mb-2">
          {loading ? '...' : `${formatNumber(stats.totalCompanies)}+`}
        </div>
        <div className="text-gray-600">Companies Trust Us</div>
      </div>
    </div>
  );
};

export default StatsSection; 