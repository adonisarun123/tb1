import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSupabaseActivities } from '../../hooks/useSupabaseActivities';

const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { activities, loading, error } = useSupabaseActivities();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedGroupSize, setSelectedGroupSize] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Define size ranges for better UX
  const sizeRanges = [
    { label: 'Small Teams (1-10)', value: 'small', min: 1, max: 10 },
    { label: 'Medium Teams (11-25)', value: 'medium', min: 11, max: 25 },
    { label: 'Large Teams (26-50)', value: 'large', min: 26, max: 50 },
    { label: 'Extra Large (50+)', value: 'xlarge', min: 51, max: 1000 }
  ];

  // Enhanced function to extract group size info from various string formats
  const parseGroupSize = (groupSize: string): { min: number; max: number } => {
    if (!groupSize) return { min: 0, max: 0 };
    
    const sizeStr = groupSize.toLowerCase().trim();
    
    // Handle specific text-based sizes
    if (sizeStr.includes('small') || sizeStr.includes('3-8') || sizeStr.includes('4-8')) {
      return { min: 3, max: 8 };
    }
    if (sizeStr.includes('medium') || sizeStr.includes('8-15')) {
      return { min: 8, max: 15 };
    }
    if (sizeStr.includes('large') || sizeStr.includes('15-30')) {
      return { min: 15, max: 30 };
    }
    if (sizeStr.includes('any size') || sizeStr.includes('unlimited') || sizeStr.includes('flexible')) {
      return { min: 1, max: 1000 };
    }
    
    // Extract numbers from the string
    const numbers = sizeStr.match(/\d+/g);
    if (!numbers) return { min: 0, max: 0 };
    
    const nums = numbers.map(n => parseInt(n));
    
    // Handle range formats like "10-20", "5 to 15", etc.
    if (nums.length >= 2) {
      return { min: Math.min(...nums), max: Math.max(...nums) };
    }
    
    // Handle single number formats
    if (nums.length === 1) {
      const num = nums[0];
      // If it says "up to X" or similar, treat as 1 to X
      if (sizeStr.includes('up to') || sizeStr.includes('maximum') || sizeStr.includes('max')) {
        return { min: 1, max: num };
      }
      // If it says "minimum" or "at least", treat as X to unlimited
      if (sizeStr.includes('minimum') || sizeStr.includes('min') || sizeStr.includes('at least')) {
        return { min: num, max: 1000 };
      }
      // For exact numbers, give some flexibility (±2)
      return { min: Math.max(1, num - 2), max: num + 10 };
    }
    
    return { min: 0, max: 0 };
  };

  // Helper function to check if activity matches selected size range
  const matchesSizeRange = (activity: any, selectedSize: string): boolean => {
    if (!selectedSize) return true;
    
    const sizeRange = sizeRanges.find(range => range.value === selectedSize);
    if (!sizeRange) return true;
    
    const activitySizeRange = parseGroupSize(activity.group_size);
    
    // If we couldn't parse the activity size, include it in all ranges
    if (activitySizeRange.min === 0 && activitySizeRange.max === 0) return true;
    
    // Check if there's any overlap between the activity size range and selected range
    const hasOverlap = (
      activitySizeRange.min <= sizeRange.max && 
      activitySizeRange.max >= sizeRange.min
    );
    
    return hasOverlap;
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

  // Keep all categories collapsed initially for better UX
  React.useEffect(() => {
    // Start with all categories collapsed
    setExpandedCategories(new Set());
  }, []);

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

  const getCategoryDescription = (category: string) => {
    const descriptions: { [key: string]: string } = {
      'Virtual': 'Connect remote teams with interactive online experiences that break down digital barriers and foster genuine connections across distances.',
      'Indoor / Outdoor Activities': 'Versatile experiences that adapt to any environment, combining the best of indoor creativity with outdoor adventure and exploration.',
      'Outbound': 'Adventure-based challenges that push boundaries, build resilience, and create unforgettable memories in natural settings.',
      'Team Building': 'Professionally designed activities focused on enhancing communication, collaboration, and trust among team members.',
      'Other': 'Unique and specialized experiences tailored to specific team needs and organizational objectives.'
    };
    return descriptions[category] || 'Engaging team building experiences designed to strengthen workplace relationships and boost productivity.';
  };



  // Simplified activity types for filter
  const activityTypes = [
    'Virtual',
    'Indoor / Outdoor Activities', 
    'Outbound',
    'Team Building'
  ];

  const handleActivityClick = (activity: any) => {
    if (activity.slug) {
      navigate(`/team-building-activity/${activity.slug}`);
    } else {
      navigate(`/activity/${activity.id}`);
    }
  };

  // Get activity image with fallback
  const getActivityImage = (activity: any) => {

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

  const renderMaterialActivityCard = (activity: any, index: number, _categoryIndex: number) => (
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



  return (
    <>
      <Helmet>
        <title>Team Building Activities & Corporate Events | Trebound - Boost Team Performance</title>
        <meta 
          name="description" 
          content="Transform your team with 1000+ engaging team building activities. Virtual, outdoor, and indoor experiences designed to enhance collaboration, communication, and productivity. Book your corporate team event today!"
        />
        <meta name="keywords" content="team building activities, corporate events, team building games, virtual team building, outdoor team activities, indoor team building, employee engagement, corporate training, team bonding, leadership development" />
        <meta property="og:title" content="Team Building Activities & Corporate Events | Trebound" />
        <meta property="og:description" content="Transform your team with 1000+ engaging team building activities. Boost collaboration, communication, and productivity with our expertly designed experiences." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Team Building Activities & Corporate Events | Trebound" />
        <meta name="twitter:description" content="Transform your team with 1000+ engaging team building activities. Boost collaboration, communication, and productivity." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Team with <span className="text-[#FF4C39]">Engaging Activities</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
                Unlock your team's potential with our expertly curated collection of 1000+ team building activities. 
                From virtual experiences that connect remote teams to thrilling outdoor adventures, we create 
                meaningful experiences that boost collaboration, enhance communication, and drive results.
              </p>
              
              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
                <div className="flex items-center bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span className="font-medium text-gray-700">Boost Team Collaboration</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span className="font-medium text-gray-700">Enhance Communication</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span className="font-medium text-gray-700">Build Trust & Relationships</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span className="font-medium text-gray-700">Increase Productivity</span>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 relative">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Search activities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 p-3 border border-gray-200 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            // Search functionality is handled by the onChange above
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          // Search functionality is handled by the state
                        }}
                        className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-6 py-3 rounded-r-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        🔍
                      </button>
                    </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informative Content Section */}
        <div className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Discover Your Perfect Team Building Experience
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Click on any category below to explore curated activities designed by team building experts. 
                Each activity includes detailed information, group size recommendations, and booking options.
              </p>
            </div>
            
            {/* Category Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="font-bold text-gray-900 mb-2">Virtual Activities</h3>
                <p className="text-sm text-gray-600">Perfect for remote teams and hybrid workforces</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl">
                <div className="text-4xl mb-3">🏢</div>
                <h3 className="font-bold text-gray-900 mb-2">Indoor/Outdoor</h3>
                <p className="text-sm text-gray-600">Flexible activities for any venue or weather</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                <div className="text-4xl mb-3">🌲</div>
                <h3 className="font-bold text-gray-900 mb-2">Outbound Adventures</h3>
                <p className="text-sm text-gray-600">Thrilling outdoor challenges and adventures</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-bold text-gray-900 mb-2">Team Building Games</h3>
                <p className="text-sm text-gray-600">Interactive games that build stronger bonds</p>
              </div>
            </div>
            
            {/* Stats and Social Proof */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#FF4C39] mb-1">1000+</div>
                  <div className="text-sm text-gray-600">Activities Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FF4C39] mb-1">50K+</div>
                  <div className="text-sm text-gray-600">Teams Engaged</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FF4C39] mb-1">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FF4C39] mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Expert Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Content */}
        <div className="py-16 bg-gray-50">
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
                <div className="mb-8">
                  <p className="text-gray-600">
                    Showing {filteredActivities.length} of {activities.length} activities
                  </p>
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
                ) : (
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
                              <div className="text-6xl flex-shrink-0">
                                {getActivityIcon(category)}
                              </div>
                              <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                  {category}
                                </h2>
                                <p className="text-gray-600 text-base md:text-lg mb-3">
                                  {categoryActivities.length} activities available
                                </p>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl">
                                  {getCategoryDescription(category)}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-center space-y-2 ml-4">
                              <div className={`text-2xl transform transition-transform duration-300 ${
                                expandedCategories.has(category) ? 'rotate-180' : ''
                              }`}>
                                ▼
                              </div>
                              <span className="text-xs text-gray-500 hidden lg:block">
                                {expandedCategories.has(category) ? 'Collapse' : 'Explore'}
                              </span>
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
              <Link 
                to="/expert-consultation"
                className="bg-white text-[#FF4C39] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg text-center"
              >
                📞 Get Expert Consultation
              </Link>
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