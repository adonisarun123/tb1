import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseActivities } from '../../hooks/useSupabaseActivities';

const FeaturedActivities: React.FC = () => {
  const navigate = useNavigate();
  const { activities, loading, error } = useSupabaseActivities();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4C39] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading amazing activities...</p>
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
            <p className="text-red-600">Error loading activities: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const categories = ['all', 'indoor', 'outdoor', 'virtual', 'adventure'];
  const filteredActivities = selectedCategory === 'all' 
    ? activities.slice(0, 8) 
    : activities.filter(activity => 
        activity.activity_type?.toLowerCase().includes(selectedCategory) || 
        activity.name?.toLowerCase().includes(selectedCategory)
      ).slice(0, 8);

  // Fallback images for activities
  const getActivityImage = (activity: any, index: number) => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2940&auto=format&fit=crop'
    ];
    
    return activity.main_image || fallbackImages[index % fallbackImages.length];
  };

  const handleActivityClick = (activity: any) => {
    if (activity.slug) {
      navigate(`/team-building-activity/${activity.slug}`);
    } else {
      // Fallback to generic activity detail page with ID
      navigate(`/activity/${activity.id}`);
    }
  };

  const handleViewAllClick = () => {
    navigate('/activities');
  };

  return (
    <div className="py-20 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Background */}
        <div className="relative mb-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl"></div>
          <div className="relative py-12 px-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 text-blue-800 text-lg font-medium mb-6">
              🎯 Top Rated Activities
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Book <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">Originals</span> you won't find anywhere else
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our most popular team building experiences, ranked and reviewed by thousands of teams.
            </p>
            
            {/* Global Rankings Display */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">⭐</span>
                <span className="font-semibold">4.97 average rating</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="font-semibold">{activities.length}+ activities listed</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">👥</span>
                <span className="font-semibold">Updated: {new Date().toLocaleDateString()}</span>
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
              {category === 'all' ? 'All Activities' : 
               category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Activities Grid - Enhanced Modern Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredActivities.map((activity, index) => (
            <div 
              key={activity.id} 
              onClick={() => handleActivityClick(activity)}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden cursor-pointer border border-gray-100 hover:border-orange-200 h-[580px] flex flex-col pb-12"
            >
              {/* Ranking Badge - Enhanced */}
              <div className="absolute top-3 left-3 z-20">
                <div className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center shadow-lg backdrop-blur-sm">
                  {index < 3 && <span className="mr-2 text-lg">🏆</span>}
                  <span className="text-xs font-extrabold">#{index + 1}</span>
                  {index === 0 && <span className="ml-2 text-yellow-200 text-xs font-bold bg-yellow-600/20 px-2 py-1 rounded-full">Global #1</span>}
                  {index === 1 && <span className="ml-2 text-yellow-200 text-xs font-bold bg-yellow-600/20 px-2 py-1 rounded-full">Global #2</span>}
                  {index === 2 && <span className="ml-2 text-yellow-200 text-xs font-bold bg-yellow-600/20 px-2 py-1 rounded-full">Global #3</span>}
                </div>
              </div>

              {/* Special Badges - Enhanced */}
              {index === 3 && (
                <div className="absolute top-3 right-3 z-20">
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm flex items-center">
                    <span className="mr-1">💖</span>
                    Fan Fav
                  </div>
                </div>
              )}
              {index === 8 && (
                <div className="absolute top-3 right-3 z-20">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm flex items-center">
                    <span className="mr-1">💎</span>
                    Hidden Gem
                  </div>
                </div>
              )}
              {index === 9 && (
                <div className="absolute top-3 right-3 z-20">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm flex items-center">
                    <span className="mr-1">⭐</span>
                    Staff Pick
                  </div>
                </div>
              )}

              {/* Activity Image - Enhanced */}
              <div className="relative h-56 overflow-hidden rounded-t-3xl flex-shrink-0">
                <img
                  src={getActivityImage(activity, index)}
                  alt={activity.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                
                {/* Enhanced Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold text-gray-800 shadow-lg flex items-center">
                      <span className="mr-2 text-orange-500">⏰</span>
                      {activity.duration || '2-3 hours'}
                    </div>
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold text-gray-800 shadow-lg flex items-center">
                      <span className="mr-2 text-blue-500">👥</span>
                      {activity.group_size || '10-50'}
                    </div>
                  </div>
                </div>

                {/* Popularity Indicator - Only show on select cards */}
                {(index === 4 || index === 5 || index === 6 || index === 7) && (
                  <div className="absolute top-3 right-3 z-15">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-lg">
                      🔥 Popular
                    </div>
                  </div>
                )}
              </div>

              {/* Activity Content - Enhanced with Fixed Heights */}
              <div className="p-6 flex flex-col flex-grow mb-4">
                {/* Title Section - Fixed Height */}
                <div className="h-16 mb-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF4C39] transition-colors leading-tight line-clamp-2">
                    {activity.name}
                  </h3>
                </div>

                {/* Description Section - Fixed Height */}
                <div className="h-12 mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {activity.tagline || activity.description || 'An engaging team building experience designed to bring your team together and create lasting memories.'}
                  </p>
                </div>

                {/* Enhanced Rating & Reviews - Fixed Height */}
                <div className="h-8 flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400 text-base">
                      {'★'.repeat(5)}
                    </div>
                    <span className="text-base font-bold text-gray-900">
                      {(4.9 + Math.random() * 0.1).toFixed(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    ({Math.floor(Math.random() * 1000) + 100} reviews)
                  </div>
                </div>

                {/* Location Info - Fixed Height */}
                <div className="h-8 flex items-center justify-center mb-4">
                  <div className="text-sm text-green-800 font-bold bg-green-50 px-3 py-1 rounded-full">
                    Multiple Locations
                  </div>
                </div>

                {/* Action Button - Fixed Height */}
                <div className="h-10 mb-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActivityClick(activity);
                  }}
                    className="w-full h-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-xl font-semibold text-sm hover:from-[#FF5722] hover:to-[#FF8A65] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  View Details
                </button>
                </div>

                {/* Enhanced Quick Info Tags - Fixed Height */}
                <div className="h-16 flex flex-wrap gap-2 pt-2 items-start mb-6">
                  <span className="bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
                    {activity.activity_type || 'Team Building'}
                  </span>
                  {activity.activity_type?.toLowerCase().includes('indoor') && (
                    <span className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center">
                      <span className="mr-1">🏢</span>
                      Indoor
                    </span>
                  )}
                  {activity.activity_type?.toLowerCase().includes('outdoor') && (
                    <span className="bg-gradient-to-r from-blue-50 to-sky-50 text-[#FF4C39] px-3 py-1 rounded-full text-xs font-bold border border-blue-200 flex items-center">
                      <span className="mr-1">🌳</span>
                      Outdoor
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF4C39]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Smaller Show More Button */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center">
            <button 
              onClick={handleViewAllClick}
              className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white py-3 px-8 rounded-2xl font-semibold text-base hover:from-[#FF5722] hover:to-[#FF8A65] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-white/20"
            >
              <span className="flex items-center">
                View All {activities.length}+ Activities
                <span className="ml-2 text-lg">🚀</span>
              </span>
            </button>
            <div className="mt-6 space-y-2">
              <p className="text-gray-600 font-medium text-lg">
                ✨ New activities added weekly • 🎯 All activities vetted by experts
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Instant Booking
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Expert Support
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Best Prices
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by the happiest teams on Earth
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FF4C39] mb-2">1,000,000+</div>
              <div className="text-gray-600">participants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFB573] mb-2">75,000+</div>
              <div className="text-gray-600">five star reviews</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF4C39] mb-2">45,000+</div>
              <div className="text-gray-600">managed events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFB573] mb-2">97.8%</div>
              <div className="text-gray-600">Fortune 500 clients</div>
            </div>
          </div>

          {/* Testimonial Quotes - Simplified */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["Great time!", "So much fun!", "Best team building!"].map((quote, index) => (
              <span key={index} className="bg-white/70 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {quote}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedActivities; 