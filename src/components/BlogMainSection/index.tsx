import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BlogCard from '../BlogCard';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

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
  author: string;
}

const BlogMainSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 12;

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Fetch blog posts from Supabase
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);

        // Build the URLs with query parameters
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/blog_posts`;
        
        // Fetch total count
        const countResponse = await fetch(
          `${url}?select=id&order=published_on.desc`, {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Content-Type': 'application/json',
              'Range-Unit': 'items',
              'Prefer': 'count=exact'
            }
          }
        );
        
        const totalCount = parseInt(countResponse.headers.get('content-range')?.split('/')[1] || '0');
        setTotalPosts(totalCount);

        // Calculate offset
        const offset = (currentPage - 1) * postsPerPage;
        
        // Fetch posts for current page
        const postsUrl = `${url}?select=id,name,slug,small_description,thumbnail_image,published_on,author&order=published_on.desc&limit=${postsPerPage}&offset=${offset}`;
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
          setBlogPosts([]);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [currentPage]);

  // Create loading skeletons
  const renderSkeletons = () => {
    return Array(12).fill(0).map((_, index) => (
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

  // Handle page changes
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section 
      id="blog-main-section"
      ref={ref} 
      className="pt-8 pb-20 px-4 lg:px-8 overflow-hidden bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header section with the exact style provided */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2">
                Our Blog
              </span>
              <h2 className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Explore the Latest Insights.
              </h2>
            </div>
            <p className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6">
              Discover valuable content and industry trends with our expertly crafted articles. Stay informed and inspired.
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

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center items-center gap-6"
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-6 py-3 border border-[#979797] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#FF4C39] transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-6 py-3 border border-[#979797] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#FF4C39] transition-colors"
            >
              <span>Next</span>
              <FiArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogMainSection; 