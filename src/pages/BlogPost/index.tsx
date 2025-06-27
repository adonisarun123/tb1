import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiClock, FiShare2 } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BlogCard from '../../components/BlogCard';
import NewsletterSection from '../../components/NewsletterSection';
import { formatDate } from '../../lib/utils';

// Interface for blog post
interface BlogPost {
  id: number;
  name: string;
  slug: string;
  small_description: string;
  post_body: string;
  main_image: string;
  thumbnail_image: string;
  published_on: string;
  author: string;
  blog_post_tags: string;
}

const BlogPost = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [similarPosts, setSimilarPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        
        // Fetch the current blog post
        const postUrl = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${blogSlug}`;
        
        const postResponse = await fetch(postUrl, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Content-Type': 'application/json'
          }
        });

        if (postResponse.ok) {
          const data = await postResponse.json();
          if (data.length > 0) {
            setBlogPost(data[0]);
            
            // After getting the post, fetch similar posts (excluding current post)
            const similarUrl = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/blog_posts?id=neq.${data[0].id}&order=published_on.desc&limit=3`;
            
            const similarResponse = await fetch(similarUrl, {
              headers: {
                'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                'Content-Type': 'application/json'
              }
            });
            
            if (similarResponse.ok) {
              const similarData = await similarResponse.json();
              setSimilarPosts(similarData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (blogSlug) {
      fetchBlogPost();
    }
  }, [blogSlug]);

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    // Strip HTML tags
    const text = content.replace(/<[^>]*>/g, '');
    // Average reading speed: 200 words per minute
    const words = text.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    return readingTime;
  };

  // Share functionality
  const handleShare = () => {
    if (navigator.share && blogPost) {
      navigator.share({
        title: blogPost.name,
        text: blogPost.small_description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20 px-4 flex justify-center items-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-[70vh] bg-gray-200 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20 px-4 flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/blog" 
              className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-all"
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const readingTime = calculateReadingTime(blogPost.post_body);

  return (
    <>
      <Helmet>
        <title>{`${blogPost.name} | Trebound Blog`}</title>
        <meta name="description" content={blogPost.small_description} />
        <meta property="og:title" content={blogPost.name} />
        <meta property="og:description" content={blogPost.small_description} />
        <meta property="og:image" content={blogPost.main_image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={blogPost.published_on} />
        <meta property="article:author" content={blogPost.author} />
        {blogPost.blog_post_tags && blogPost.blog_post_tags.split(',').map(tag => (
          <meta property="article:tag" content={tag.trim()} key={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.name} />
        <meta name="twitter:description" content={blogPost.small_description} />
        <meta name="twitter:image" content={blogPost.main_image} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section - Apple-style with full-width image */}
        <section className="relative h-screen">
          <div className="absolute inset-0">
            <img 
              src={blogPost.main_image} 
              alt={blogPost.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative pt-32 px-4 h-full flex flex-col justify-center items-center text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl font-outfit leading-tight">
              {blogPost.name}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/90 text-lg">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                <span>{formatDate(blogPost.published_on)}</span>
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" />
                <span>{readingTime} min read</span>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center hover:text-white/70 transition-colors"
              >
                <FiShare2 className="mr-2" />
                <span>Share</span>
              </button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </section>
        
        {/* Content Section - Apple-style typography and spacing */}
        <section className="py-20 px-4 lg:px-8 bg-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 font-outfit leading-relaxed">
              {blogPost.small_description}
            </p>

            {/* Main content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="blog-content font-['SF Pro Display'] text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blogPost.post_body }}
              />
            </div>
            
            {/* Author Box - Minimalist design */}
            <div className="mt-20 pt-12 border-t border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-3xl font-bold">
                  {blogPost.author.charAt(0)}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3 font-outfit">{blogPost.author}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                    Content writer at Trebound, passionate about team building and corporate culture.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Tags - Minimal pill design */}
            {blogPost.blog_post_tags && (
              <div className="mt-12">
                <div className="flex flex-wrap gap-3">
                  {blogPost.blog_post_tags.split(',').map((tag, index) => (
                    <span 
                      key={index}
                      className="px-6 py-2 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </section>
        
        {/* Similar Posts Section - Modern grid layout */}
        {similarPosts.length > 0 && (
          <section className="py-24 px-4 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
                  <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                    More to Explore
                  </span>
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto rounded-full"></div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {similarPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.name}
                    slug={post.slug}
                    description={post.small_description}
                    image={post.thumbnail_image}
                    date={post.published_on}
                  />
                ))}
              </motion.div>
            </div>
          </section>
        )}
        
        {/* Newsletter Section with refined styling */}
        <NewsletterSection />
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost; 