import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseBlog } from '../../hooks/useSupabaseBlog';

const FeaturedBlog: React.FC = () => {
  const navigate = useNavigate();
  const { posts, loading, error } = useSupabaseBlog();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading latest insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading blog posts: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const categories = ['all', 'team building', 'leadership', 'corporate events', 'tips'];
  const filteredPosts = selectedCategory === 'all' 
    ? posts.slice(0, 6) 
    : posts.filter(post => 
        post.name?.toLowerCase().includes(selectedCategory) || 
        post.small_description?.toLowerCase().includes(selectedCategory)
      ).slice(0, 6);

  const handleBlogClick = (post: any) => {
    if (post.slug) {
      navigate(`/blog/${post.slug}`);
    } else {
      // Fallback to generic blog post page with ID
      navigate(`/blog/${post.id}`);
    }
  };

  const handleViewAllClick = () => {
    navigate('/blog');
  };

  // Fallback images for blog posts
  const getBlogImage = (post: any, index: number) => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop', // Team meeting
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop', // Business conference
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop', // Team collaboration
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2940&auto=format&fit=crop', // Team celebration
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2940&auto=format&fit=crop', // Office teamwork
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2940&auto=format&fit=crop', // Virtual meeting
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop', // Business strategy
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2940&auto=format&fit=crop'  // Team planning
    ];
    
    return post.main_image || fallbackImages[index % fallbackImages.length];
  };

  const getAuthorImage = (index: number) => {
    const authorImages = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop'
    ];
    return authorImages[index % authorImages.length];
  };

  const getAuthorName = (index: number) => {
    const authors = ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kumar', 'Lisa Thompson', 'Alex Morgan'];
    return authors[index % authors.length];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getReadTime = () => {
    return Math.floor(Math.random() * 8) + 3; // 3-10 min read
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Background */}
        <div className="relative mb-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl"></div>
          <div className="relative py-12 px-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-orange-100 text-orange-800 text-lg font-medium mb-6">
              📚 Expert Insights & Guides
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Latest <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">Insights</span> from Team Building Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover proven strategies, best practices, and actionable tips to make your team building events more impactful.
            </p>
            
            {/* Blog Stats */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <span className="text-purple-500 mr-2">✍️</span>
                <span className="font-semibold">Expert authors</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">📖</span>
                <span className="font-semibold">{posts.length}+ articles published</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">🔄</span>
                <span className="font-semibold">Updated weekly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border-2 border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Articles' : 
               category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Featured Article (First Post) */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <div 
              onClick={() => handleBlogClick(filteredPosts[0])}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Featured Image */}
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <img
                    src={getBlogImage(filteredPosts[0], 0)}
                    alt={filteredPosts[0].name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <span className="mr-2">🌟</span>
                      Featured Article
                    </div>
                  </div>
                  
                  {/* Read Time */}
                  <div className="absolute bottom-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                      ⏱️ {getReadTime()} min read
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      Team Building Guide
                    </span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#FF4C39] transition-colors">
                    {filteredPosts[0].name}
                  </h3>
                  
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed group-hover:text-purple-600 transition-colors">
                    {filteredPosts[0].small_description || 'Discover expert strategies and proven techniques to make your team building events more engaging and impactful.'}
                  </p>

                  {/* Author & Date */}
                  <div className="flex items-center mb-6">
                    <img
                      src={getAuthorImage(0)}
                      alt="Author"
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{getAuthorName(0)}</div>
                      <div className="text-gray-500 text-sm">
                        {filteredPosts[0].published_on ? formatDate(filteredPosts[0].published_on) : 'Recently published'}
                      </div>
                    </div>
                  </div>

                  <button className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white py-4 px-8 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg w-fit">
                    Read Full Article →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post, index) => (
            <article 
              key={post.id}
              onClick={() => handleBlogClick(post)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getBlogImage(post, index + 1)}
                  alt={post.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                    {index % 2 === 0 ? 'Leadership' : 'Team Building'}
                  </span>
                </div>
                
                {/* Read Time */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-800">
                    {getReadTime()} min
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {post.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.small_description || 'Learn effective strategies and best practices for creating memorable team experiences that drive results.'}
                </p>

                {/* Author & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={getAuthorImage(index + 1)}
                      alt="Author"
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{getAuthorName(index + 1)}</div>
                      <div className="text-gray-500 text-xs">
                        {post.published_on ? formatDate(post.published_on) : 'Recently'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Engagement Stats */}
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center">
                      <span className="mr-1">👁️</span>
                      {Math.floor(Math.random() * 1000) + 100}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">💬</span>
                      {Math.floor(Math.random() * 20) + 5}
                    </span>
                  </div>
                </div>

                {/* Read More Button */}
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
                  Read Article
                </button>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Team Building', 'Leadership', 'Corporate'].slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      #{tag.toLowerCase().replace(' ', '')}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated with Team Building Insights
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Get weekly tips, strategies, and case studies delivered to your inbox. Join 50,000+ team leaders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            
            <p className="text-purple-200 text-sm mt-4">
              ✨ Free • No spam • Unsubscribe anytime
            </p>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button 
            onClick={handleViewAllClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-12 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All {posts.length}+ Articles
          </button>
          <p className="text-gray-500 mt-4">
            📝 New articles published weekly • 🎯 Expert insights & practical tips
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog; 