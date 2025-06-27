import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BlogCard from '../BlogCard';
import { FiArrowRight } from 'react-icons/fi';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Interface for blog posts
interface BlogPost {
  id: number;
  name: string;
  slug: string;
  small_description: string;
  thumbnail_image: string;
  published_on: string;
}

const ViewMoreButton = () => (
  <div className="relative h-[45px] group w-[180px]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    <button className="absolute inset-0 w-full h-full px-6 flex items-center justify-center gap-2 border border-[#979797] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
      <span className="text-base font-medium font-['DM Sans'] text-[#979797] group-hover:text-white transition-colors duration-300">
        View More
      </span>
      <FiArrowRight className="w-4 h-4 text-[#979797] group-hover:text-white transition-colors duration-300" />
    </button>
  </div>
);

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Fetch blog posts from Supabase
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);

        // Build the URL with query parameters
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/blog_posts`;
        const postsUrl = `${url}?select=id,name,slug,small_description,thumbnail_image,published_on&order=published_on.desc&limit=3`;

        // Fetch posts
        const postsResponse = await fetch(postsUrl, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Content-Type': 'application/json'
          }
        });

        if (postsResponse.ok) {
          const data = await postsResponse.json();
          setBlogPosts(data);
        } else {
          console.error('Failed to fetch blog posts');
          // Use sample posts as fallback
          setBlogPosts(samplePosts.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Use sample posts as fallback
        setBlogPosts(samplePosts.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Sample blog posts for development or fallback
  const samplePosts: BlogPost[] = [
    {
      id: 1,
      name: "Hidden Gems of Europe",
      slug: "hidden-gems-of-europe",
      small_description: "Explore lesser-known European destinations that offer charm, culture, and unforgettable experiences.",
      thumbnail_image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2066&auto=format&fit=crop",
      published_on: "2023-06-24",
    },
    {
      id: 2,
      name: "12 Top Team Building PowerPoint Topics",
      slug: "12-top-team-building-powerpoint-topics",
      small_description: "Engage your team with these powerful presentation ideas designed to strengthen bonds and improve collaboration.",
      thumbnail_image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      published_on: "2023-04-22",
    },
    {
      id: 3,
      name: "How to Plan a Successful Corporate Retreat in 2023",
      slug: "how-to-plan-a-successful-corporate-retreat-in-2023",
      small_description: "A comprehensive guide to organizing a memorable and effective corporate retreat that delivers real business value.",
      thumbnail_image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
      published_on: "2023-03-10",
    }
  ];

  // Create loading skeletons
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="bg-gray-200 h-48 rounded-t-xl"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-1/4 mt-6"></div>
        </div>
                </div>
    ));
  };

  return (
    <section 
      id="blog-section"
      ref={ref} 
      className="pt-8 pb-20 px-4 lg:px-8 overflow-hidden bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2">
                Latest Insights
              </span>
              <h2 className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Explore the Blog.
              </h2>
            </div>
            <p className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6">
              Stay updated with the latest trends, insights, and success stories in team building and corporate events
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {loading ? (
            renderSkeletons()
          ) : (
            blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.name}
                slug={post.slug}
                description={post.small_description}
                image={post.thumbnail_image}
                date={post.published_on}
                variants={fadeInUp}
              />
            ))
          )}
        </motion.div>

        {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
          >
          <a href="/blog">
              <ViewMoreButton />
            </a>
          </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
