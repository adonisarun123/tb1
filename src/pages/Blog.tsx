import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import NewsletterSection from '../components/NewsletterSection';
import { useSupabaseBlog } from '../hooks/useSupabaseBlog';

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const { posts, loading, error } = useSupabaseBlog();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts based on search
  const filteredBlogs = useMemo(() => {
    return posts.filter((blog: any) => {
      const matchesSearch = blog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.small_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.post_body?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [posts, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBlogClick = (blog: any) => {
    if (blog.slug) {
      navigate(`/blog/${blog.slug}`);
    } else {
      // Fallback to generic blog post page with ID
      navigate(`/blog/${blog.id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Team Building Blog & Insights | Trebound</title>
        <meta 
          name="description" 
          content="Read expert insights, tips, and best practices for team building and corporate events. Stay updated with the latest trends in team development."
        />
        <meta name="keywords" content="team building blog, corporate events blog, leadership development, workplace culture, event management tips" />
        <meta name="author" content="Trebound" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Trebound" />
        <meta property="og:title" content="Team Building Blog & Insights | Trebound" />
        <meta property="og:description" content="Read expert insights, tips, and best practices for team building and corporate events. Stay updated with the latest trends in team development." />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Team Building Blog & Insights | Trebound" />
        <meta name="twitter:description" content="Read expert insights, tips, and best practices for team building and corporate events. Stay updated with the latest trends in team development." />
        
        {/* Additional SEO */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Team Building <span className="text-[#FF4C39]">Blog</span> & Insights
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Discover expert insights, practical tips, and best practices for creating exceptional 
                team experiences and building stronger workplace relationships.
              </p>

              {/* Search */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">Error loading blog posts: {error}</div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-6 py-2 rounded-lg hover:opacity-90"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="mb-8">
                  <p className="text-gray-600">
                    Showing {filteredBlogs.length} of {posts.length} articles
                  </p>
                </div>

                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms to find what you're looking for.
                    </p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="text-[#FF4C39] hover:text-[#FF4C39] font-medium"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog: any) => (
                      <article 
                        key={blog.id} 
                        onClick={() => handleBlogClick(blog)}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          {blog.main_image ? (
                            <img
                              src={blog.main_image}
                              alt={blog.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <span className="text-4xl">📝</span>
                            </div>
                          )}
                          {blog.featured && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-3 py-1 rounded-full text-sm font-medium">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                            {blog.name}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {blog.small_description || 'Read more about this topic...'}
                          </p>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <span>📅</span>
                              <span className="ml-1">{formatDate(blog.published_on)}</span>
                            </div>
                            <span className="text-[#FF4C39] font-medium">Read More →</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default BlogPage; 