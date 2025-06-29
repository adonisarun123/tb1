import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSupabaseActivities } from '../../hooks/useSupabaseActivities';

const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { activities, loading, error } = useSupabaseActivities();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedGroupSize, setSelectedGroupSize] = useState('');
  const [viewMode, setViewMode] = useState<'categories' | 'grid'>('categories');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Define size ranges for better UX
  const sizeRanges = [
    { label: 'Small Teams (1-10)', value: 'small', min: 1, max: 10 },
    { label: 'Medium Teams (11-25)', value: 'medium', min: 11, max: 25 },
    { label: 'Large Teams (26-50)', value: 'large', min: 26, max: 50 },
    { label: 'Extra Large (50+)', value: 'xlarge', min: 51, max: 1000 }
  ];

  // Helper function to extract number from group size string
  const extractGroupSizeNumber = (groupSize: string): number => {
    if (!groupSize) return 0;
    const match = groupSize.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Helper function to check if activity matches selected size range
  const matchesSizeRange = (activity: any, selectedSize: string): boolean => {
    if (!selectedSize) return true;
    
    const sizeRange = sizeRanges.find(range => range.value === selectedSize);
    if (!sizeRange) return true;
    
    const activitySize = extractGroupSizeNumber(activity.group_size);
    if (activitySize === 0) return true; // Include activities without size info
    
    return activitySize >= sizeRange.min && activitySize <= sizeRange.max;
  };

  // Filter activities based on search and filters
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.tagline?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !selectedType || activity.activity_type?.toLowerCase() === selectedType.toLowerCase();
      
      const matchesGroupSize = matchesSizeRange(activity, selectedGroupSize);

      return matchesSearch && matchesType && matchesGroupSize;
    });
  }, [activities, searchTerm, selectedType, selectedGroupSize]);

  // Categorize activities by type
  const categorizedActivities = useMemo(() => {
    const categories: { [key: string]: any[] } = {};
    
    // Define specific activities for Indoor/Outdoor category
    const indoorOutdoorActivities = [
      'Movie Making Team Building',
      'Grafittee Challenge',
      'Lost Dutchman\'s Goldmine',
      'Pandora\'s Box',
      'Drone Challenge',
      'Newspaper Canvas Race',
      'IceWalk',
      'Ball and Ring',
      'Rollerboard',
      'Balloon Over and Under',
      'The Great Egg Drop Challenge',
      'Sneak a Peek',
      'Treasure Hunt',
      'Water Volleyball',
      'Remoto Car Challenge',
      'Multi Ball Ring',
      'Jumbo Cricket',
      'Hacker Trackdown',
      'Fire Walk',
      'Snake Trust',
      'Acid Bridge',
      'Blindfold Tent Pitching',
      'Tic Tac Toe',
      'Pyramid Building',
      'Pipeline',
      'Kontiki Boat Building Challenge',
      'Junkyard Sales',
      'Key Punch',
      'Glass Walk Challenge',
      'Gigsaw Challenge',
      'F1 Challenge',
      'Double Dragon',
      'The 20-20 Challenge'
    ];

    // Define specific activities for Virtual category
    const virtualActivities = [
      'Virtual Murder Mystery'
    ];
    
    filteredActivities.forEach(activity => {
      let type = activity.activity_type || 'Other';
      
      // Check if activity should be in Indoor/Outdoor Activities by name
      if (indoorOutdoorActivities.some(name => 
        activity.name.toLowerCase().includes(name.toLowerCase()) || 
        name.toLowerCase().includes(activity.name.toLowerCase())
      )) {
        type = 'Indoor / Outdoor Activities';
      }
      // Check if activity should be in Virtual Activities by name
      else if (virtualActivities.some(name => 
        activity.name.toLowerCase().includes(name.toLowerCase()) || 
        name.toLowerCase().includes(activity.name.toLowerCase())
      )) {
        type = 'Virtual';
      }
      // Merge Indoor and Outdoor into a single category (existing logic)
      else if (type.toLowerCase() === 'indoor' || type.toLowerCase() === 'outdoor') {
        type = 'Indoor / Outdoor Activities';
      }
      
      if (!categories[type]) {
        categories[type] = [];
      }
      categories[type].push(activity);
    });
    
    return categories;
  }, [filteredActivities]);

  // Toggle accordion category
  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Expand all categories initially
  React.useEffect(() => {
    const allCategories = Object.keys(categorizedActivities);
    setExpandedCategories(new Set(allCategories));
  }, [categorizedActivities]);

  const getActivityIcon = (activityType: string) => {
    switch (activityType?.toLowerCase()) {
      case 'virtual':
        return '💻';
      case 'outbound':
        return '🏔️';
      case 'indoor':
      case 'outdoor':
      case 'indoor / outdoor activities':
        return '🏢🌳';
      case 'team building':
        return '🎯';
      default:
        return '🎮';
    }
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Virtual': 'from-blue-50 to-blue-100 border-blue-200',
      'Indoor / Outdoor Activities': 'from-emerald-50 to-teal-100 border-emerald-200',
      'Outbound': 'from-orange-50 to-orange-100 border-orange-200',
      'Team Building': 'from-pink-50 to-pink-100 border-pink-200',
      'Other': 'from-gray-50 to-gray-100 border-gray-200'
    };
    return colorMap[category] || 'from-gray-50 to-gray-100 border-gray-200';
  };

  const getCategoryAccentColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Virtual': 'text-blue-600',
      'Indoor / Outdoor Activities': 'text-emerald-600',
      'Outbound': 'text-orange-600',
      'Team Building': 'text-pink-600',
      'Other': 'text-gray-600'
    };
    return colorMap[category] || 'text-gray-600';
  };

  // Get unique activity types for filter
  const activityTypes = [...new Set(activities.map(a => a.activity_type).filter(Boolean))];

  const handleActivityClick = (activity: any) => {
    if (activity.slug) {
      navigate(`/team-building-activity/${activity.slug}`);
    } else {
      navigate(`/activity/${activity.id}`);
    }
  };

  // Get activity image with fallback
  const getActivityImage = (activity: any) => {
    // Debug: Log activity image data (remove this in production)
    if (activity.id === activities[0]?.id) {
      console.log('Activity image data:', {
        name: activity.name,
        main_image: activity.main_image,
        featured_image: activity.featured_image,
        image_url: activity.image_url,
        images: activity.images
      });
    }

    // Priority order for image sources from database
    if (activity.main_image && activity.main_image.trim()) {
      return activity.main_image;
    }
    if (activity.featured_image && activity.featured_image.trim()) {
      return activity.featured_image;
    }
    if (activity.image_url && activity.image_url.trim()) {
      return activity.image_url;
    }
    if (activity.images && activity.images.length > 0) {
      return activity.images[0];
    }
    
    // Enhanced fallback system with better default images
    const categoryImages: { [key: string]: string } = {
      'Virtual': 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Indoor / Outdoor Activities': 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Outbound': 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Team Building': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Other': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };
    
    // Use category-specific fallback based on activity type
    const fallbackImage = categoryImages[activity.activity_type] || categoryImages['Other'];
    
    return fallbackImage;
  };

  // Helper function to get proper alt text for images
  const getImageAltText = (activity: any) => {
    return `${activity.name} - Team Building Activity`;
  };

  const renderMaterialActivityCard = (activity: any, index: number, categoryIndex: number) => (
    <div 
      key={activity.id} 
      onClick={() => handleActivityClick(activity)}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
      style={{
        animationDelay: `${(index % 3) * 0.1}s`
      }}
    >
      {/* Material Design Image Container */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img 
          src={getActivityImage(activity)}
          alt={getImageAltText(activity)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Activity Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg">
            <span className="mr-1.5 text-sm">{getActivityIcon(activity.activity_type)}</span>
            {activity.activity_type || 'Activity'}
          </span>
        </div>

        {/* Duration Badge */}
        {activity.duration && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-sm shadow-lg">
              ⏰ {activity.duration}
            </span>
          </div>
        )}
      </div>

      {/* Material Design Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300">
          {activity.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 line-clamp-3 leading-relaxed">
          {activity.tagline || activity.description || 'An engaging team building activity designed to strengthen bonds and improve collaboration.'}
        </p>

        {/* Metrics Row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <span className="text-emerald-600 font-semibold text-sm">👥</span>
            <span className="text-sm font-medium text-gray-700">
              {activity.group_size || 'Any Size'}
            </span>
          </div>
          
          {activity.location && (
            <div className="flex items-center space-x-1">
              <span className="text-blue-600 text-sm">📍</span>
              <span className="text-xs text-gray-500 truncate max-w-24">
                {activity.location}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-3 group-hover:from-emerald-100 group-hover:to-blue-100 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Learn More
              </span>
              <span className="text-emerald-600 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGridActivityCard = (activity: any, index: number) => (
    <div 
      key={activity.id} 
      onClick={() => handleActivityClick(activity)}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img 
          src={getActivityImage(activity)}
          alt={getImageAltText(activity)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800">
            <span className="mr-1 text-sm">{getActivityIcon(activity.activity_type)}</span>
            {activity.activity_type || 'Activity'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {activity.name}
        </h3>
        <p className="text-gray-600 line-clamp-2 text-sm">
          {activity.tagline || activity.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-700">
            👥 {activity.group_size || 'Any Size'}
          </span>
          <span className="text-emerald-600 group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Team Building Activities | Trebound</title>
        <meta 
          name="description" 
          content="Discover our comprehensive collection of team building activities. From virtual games to outdoor adventures, find the perfect experience for your team."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Team Building <span className="text-[#FF4C39]">Activities</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Discover our comprehensive collection of engaging activities designed to strengthen team bonds, 
                improve collaboration, and create lasting memories.
              </p>

              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      {activityTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <select
                      value={selectedGroupSize}
                      onChange={(e) => setSelectedGroupSize(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Any Size</option>
                      {sizeRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <select
                      value={viewMode}
                      onChange={(e) => setViewMode(e.target.value as 'categories' | 'grid')}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="categories">By Categories</option>
                      <option value="grid">All Activities</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-md animate-pulse">
                    <div className="h-56 bg-gray-200"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">Error loading activities: {error}</div>
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
                <div className="mb-8 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing {filteredActivities.length} of {activities.length} activities
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setViewMode('categories')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        viewMode === 'categories' 
                          ? 'bg-[#FF4C39] text-white' 
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      📂 Categories
                    </button>
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-[#FF4C39] text-white' 
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      ⊞ All Activities
                    </button>
                  </div>
                </div>

                {filteredActivities.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedType('');
                        setSelectedGroupSize('');
                      }}
                      className="text-[#FF4C39] hover:text-[#FF4C39] font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : viewMode === 'categories' ? (
                  // Accordion Categories View
                  <div className="space-y-6">
                    {Object.entries(categorizedActivities).map(([category, categoryActivities], categoryIndex) => (
                      <div key={category} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                        {/* Accordion Header */}
                        <button
                          onClick={() => toggleCategory(category)}
                          className={`w-full p-8 text-left bg-gradient-to-r ${getCategoryColor(category)} hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <div className="text-6xl">
                                {getActivityIcon(category)}
                              </div>
                              <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                  {category}
                                </h2>
                                <p className="text-gray-600 text-lg">
                                  {categoryActivities.length} activities available
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-sm text-gray-500 hidden md:block">
                                Perfect for {category.toLowerCase().replace(' activities', '')} team experiences
                              </div>
                              <div className={`text-2xl transform transition-transform duration-300 ${
                                expandedCategories.has(category) ? 'rotate-180' : ''
                              }`}>
                                ▼
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Accordion Content */}
                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          expandedCategories.has(category) 
                            ? 'max-h-none opacity-100' 
                            : 'max-h-0 opacity-0'
                        }`}>
                          <div className="p-8 pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {categoryActivities.map((activity, index) => 
                                renderMaterialActivityCard(activity, index, categoryIndex)
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Grid View
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredActivities.map((activity, index) => 
                      renderGridActivityCard(activity, index)
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Team?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let our experts help you choose the perfect activities for your team's needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#FF4C39] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg">
                📞 Get Expert Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#FF4C39] transition-colors text-lg">
                📋 Download Activity Guide
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default ActivitiesPage; 