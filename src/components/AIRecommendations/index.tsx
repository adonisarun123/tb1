import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiZap, 
  FiStar, 
  FiHeart, 
  FiRefreshCw,
  FiTrendingUp,
  FiTarget,
  FiLayers
} from 'react-icons/fi';
import { generateAIResponse } from '../../lib/openaiClient';
import { supabase, Activity, Stay, Destination } from '../../lib/supabaseClient';

interface AIRecommendation {
  activityId: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  duration: string;
  capacity: string;
  location: string;
  confidence: number;
  reason: string;
  personalizationFactors: string[];
  category: 'trending' | 'personalized' | 'similar' | 'popular';
  tags: string[];
  type: 'activity' | 'venue' | 'destination';
  slug: string;
}

interface UserProfile {
  companySize: string;
  industry: string;
  location: string;
  preferences: string[];
  browsingHistory: string[];
}

interface AIRecommendationsProps {
  userProfile?: UserProfile;
  currentActivityId?: string;
  limit?: number;
  showPersonalizationReasons?: boolean;
  searchQuery?: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  userProfile,
  currentActivityId,
  limit = 8,
  showPersonalizationReasons: _showPersonalizationReasons = true,
  searchQuery
}) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'personalized' | 'trending' | 'similar' | 'popular'>('all');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Cache for website data
  const [websiteData, setWebsiteData] = useState<{
    activities: Activity[];
    stays: Stay[];
    destinations: Destination[];
  }>({ activities: [], stays: [], destinations: [] });

  useEffect(() => {
    fetchWebsiteData();
  }, []);

  useEffect(() => {
    if (websiteData.activities.length > 0 || websiteData.stays.length > 0) {
      generateRecommendations();
    }
  }, [userProfile, currentActivityId, searchQuery, websiteData]);

  const fetchWebsiteData = async () => {
    try {
      // Fetch real data from Supabase
      const [activitiesRes, staysRes, destinationsRes] = await Promise.all([
        supabase.from('activities').select('*').limit(50),
        supabase.from('stays').select('*').limit(30),
        supabase.from('destinations').select('*').limit(20)
      ]);

      setWebsiteData({
        activities: activitiesRes.data || [],
        stays: staysRes.data || [],
        destinations: destinationsRes.data || []
      });
    } catch (error) {
      console.error('Error fetching website data:', error);
    }
  };

  const generateRecommendations = async () => {
    setLoading(true);
    
    try {
      // Build comprehensive context from real website data
      const activitiesContext = websiteData.activities.map(activity => 
        `Activity: ${activity.name} - ${activity.tagline} - ${activity.description} - Type: ${activity.activity_type} - Duration: ${activity.duration} - Group: ${activity.group_size} - Slug: ${activity.slug}`
      ).join('\n');

      const venuesContext = websiteData.stays.map(stay => 
        `Venue: ${stay.name} - ${stay.tagline || ''} - ${stay.stay_description || ''} - Location: ${stay.location || ''} - Facilities: ${stay.facilities || ''} - Slug: ${stay.slug}`
      ).join('\n');

      const destinationsContext = websiteData.destinations.map(dest => 
        `Destination: ${dest.name} - ${dest.description} - Region: ${dest.region} - Slug: ${dest.slug}`
      ).join('\n');

      const context = `TREBOUND WEBSITE DATA:

ACTIVITIES (${websiteData.activities.length} available):
${activitiesContext}

VENUES (${websiteData.stays.length} available):
${venuesContext}

DESTINATIONS (${websiteData.destinations.length} available):
${destinationsContext}

USER CONTEXT:
${userProfile ? `Company size: ${userProfile.companySize}, Industry: ${userProfile.industry}, Location: ${userProfile.location}` : 'No specific user profile'}

SEARCH QUERY: "${searchQuery || 'general team building recommendations'}"`;

      // Generate AI-powered recommendations using real data
      const aiPrompt = `Based ONLY on the actual Trebound website data provided above, recommend the 8 most relevant items for the search query "${searchQuery || 'team building'}".

CRITICAL REQUIREMENTS:
1. ONLY use activities, venues, and destinations that actually exist in the provided data
2. Use the exact names, descriptions, and slugs from the data
3. Match items that are most relevant to the search query
4. Provide a mix of activities, venues, and destinations where appropriate
5. Assign realistic confidence scores based on relevance

Return a JSON array with this exact format:
[
  {
    "name": "Exact name from data",
    "description": "Brief engaging description based on actual data",
    "duration": "Duration from data or reasonable estimate",
    "capacity": "Group size from data or reasonable estimate", 
    "location": "Location from data or 'Various'",
    "confidence": 0.85,
    "reason": "Why this matches the search query (max 80 chars)",
    "category": "personalized|trending|similar|popular",
    "tags": ["tag1", "tag2"],
    "type": "activity|venue|destination",
    "slug": "exact-slug-from-data"
  }
]

Focus on items that best match "${searchQuery || 'team building'}" and provide high-quality, relevant recommendations from ONLY the actual website data.`;

      let aiResponse: string;
      let aiRecommendations: any[] = [];
      
      try {
        aiResponse = await generateAIResponse(aiPrompt, context);
        
        // Parse AI response
        const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          aiRecommendations = JSON.parse(jsonMatch[0]);
        }
      } catch (aiError) {
        console.warn('AI service unavailable, using data-driven recommendations:', aiError);
        // Skip AI recommendations and go directly to fallback
        aiRecommendations = [];
      }

      // Validate and process AI recommendations
      const processedRecommendations: AIRecommendation[] = aiRecommendations
        .filter(rec => rec.name && rec.slug) // Only include valid recommendations
        .map((rec, index) => {
          // Find the actual item in our data to get accurate info
          let actualItem: Activity | Stay | Destination | null = null;
          let itemType: 'activity' | 'venue' | 'destination' = 'activity';

                     // Search in activities
           const foundActivity = websiteData.activities.find(a => 
             a.slug === rec.slug || a.name.toLowerCase() === rec.name.toLowerCase()
           );
           if (foundActivity) {
             actualItem = foundActivity;
             itemType = 'activity';
           }

           // Search in stays if not found
           if (!actualItem) {
             const foundStay = websiteData.stays.find(s => 
               s.slug === rec.slug || s.name.toLowerCase() === rec.name.toLowerCase()
             );
             if (foundStay) {
               actualItem = foundStay;
               itemType = 'venue';
             }
           }

           // Search in destinations if not found
           if (!actualItem) {
             const foundDestination = websiteData.destinations.find(d => 
               d.slug === rec.slug || d.name.toLowerCase() === rec.name.toLowerCase()
             );
             if (foundDestination) {
               actualItem = foundDestination;
               itemType = 'destination';
             }
           }

          // Use actual item data if found, otherwise use AI suggestion as fallback
          const item = actualItem || rec;
          
          return {
            activityId: `${itemType}-${rec.slug || index}`,
            name: item.name || rec.name,
            description: rec.description || (itemType === 'activity' ? (item as Activity).tagline : 
                                            itemType === 'venue' ? (item as Stay).tagline || (item as Stay).stay_description : 
                                            (item as Destination).description) || 'Team building experience',
            image: getActivityImage(item.name, rec.tags, itemType),
            rating: 4.5 + Math.random() * 0.5,
            duration: rec.duration || (itemType === 'activity' ? (item as Activity).duration : '2-3 hours') || '2-3 hours',
            capacity: rec.capacity || (itemType === 'activity' ? (item as Activity).group_size : '10-30 people') || '10-30 people',
            location: rec.location || (itemType === 'venue' ? (item as Stay).location : 
                                      itemType === 'destination' ? (item as Destination).region : 'Various') || 'Various',
            confidence: rec.confidence || 0.8,
            reason: rec.reason || 'Great match for your team',
            personalizationFactors: ['real_data', 'ai_matched'],
            category: rec.category || 'personalized',
            tags: rec.tags || ['team-building'],
            type: itemType,
            slug: rec.slug || item.slug || `item-${index}`
          };
        });

      // If AI failed or returned insufficient results, use top items from actual data
      if (processedRecommendations.length < 4) {
        const fallbackRecommendations = generateFallbackFromRealData(searchQuery);
        setRecommendations([...processedRecommendations, ...fallbackRecommendations].slice(0, limit));
      } else {
        setRecommendations(processedRecommendations.slice(0, limit));
      }

    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      // Use fallback recommendations from real data
      const fallbackRecommendations = generateFallbackFromRealData(searchQuery);
      setRecommendations(fallbackRecommendations);
    }
    
    setLoading(false);
  };

  const generateFallbackFromRealData = (query?: string): AIRecommendation[] => {
    const queryLower = query?.toLowerCase() || '';
    let selectedItems: AIRecommendation[] = [];

    // Select activities based on search query
    const relevantActivities = websiteData.activities.filter(activity => {
      const searchableText = `${activity.name} ${activity.tagline} ${activity.description} ${activity.activity_type}`.toLowerCase();
      return !query || searchableText.includes(queryLower) || 
             queryLower.includes('virtual') && activity.activity_type?.toLowerCase().includes('virtual') ||
             queryLower.includes('outdoor') && activity.activity_type?.toLowerCase().includes('outdoor') ||
             queryLower.includes('team') && searchableText.includes('team');
    }).slice(0, 5);

    selectedItems = selectedItems.concat(relevantActivities.map((activity, index) => ({
      activityId: `activity-${activity.id}`,
      name: activity.name,
      description: activity.tagline || activity.description.substring(0, 100) + '...',
      image: getActivityImage(activity.name, [activity.activity_type || ''], 'activity'),
      rating: 4.5 + Math.random() * 0.5,
      duration: activity.duration || '2-3 hours',
      capacity: activity.group_size || '10-30 people',
      location: activity.location || 'Various',
      confidence: 0.8 + (index === 0 ? 0.1 : 0),
      reason: query ? `Relevant to "${query}"` : 'Popular team building activity',
      personalizationFactors: ['real_data'],
      category: index < 2 ? 'personalized' : (index < 4 ? 'trending' : 'popular'),
      tags: [activity.activity_type || 'team-building'],
      type: 'activity' as const,
      slug: activity.slug
    })));

    // Add some venues if space permits
    if (selectedItems.length < limit - 2) {
      const relevantStays = websiteData.stays.filter(stay => {
        const searchableText = `${stay.name} ${stay.tagline || ''} ${stay.location || ''}`.toLowerCase();
        return !query || searchableText.includes(queryLower);
      }).slice(0, 2);

      selectedItems = selectedItems.concat(relevantStays.map((stay, index) => ({
        activityId: `venue-${stay.id}`,
        name: stay.name,
        description: stay.tagline || stay.stay_description?.substring(0, 100) + '...' || 'Premium venue for team outings',
        image: stay.stay_image || '/images/Corporate team 1.jpg',
        rating: 4.6 + Math.random() * 0.4,
        duration: 'Full day',
        capacity: '20-100 people',
        location: stay.location || 'Premium Location',
        confidence: 0.75 + (index === 0 ? 0.1 : 0),
        reason: 'Great venue for team events',
        personalizationFactors: ['real_data'],
        category: 'similar' as const,
        tags: ['venue', 'accommodation'],
        type: 'venue' as const,
        slug: stay.slug
      })));
    }

    return selectedItems.slice(0, limit);
  };

  const getActivityImage = (activityName: string, tags: string[], type: string): string => {
    const name = activityName.toLowerCase();
    const tagString = tags?.join(' ').toLowerCase() || '';
    
    if (type === 'venue') {
      return '/images/Corporate team 1.jpg';
    }
    
    if (type === 'destination') {
      return '/images/bangalore.jpg';
    }
    
    // Activity images based on content
    if (name.includes('virtual') || name.includes('online') || tagString.includes('virtual')) {
      return '/images/virtual activity.jpg';
    }
    if (name.includes('escape') || name.includes('mystery')) {
      return '/images/indoor activity.jpg';
    }
    if (name.includes('outdoor') || name.includes('adventure') || tagString.includes('outdoor')) {
      return '/images/outdoor.jpg';
    }
    if (name.includes('cooking') || name.includes('culinary')) {
      return '/images/team.jpg';
    }
    if (name.includes('game') || name.includes('quiz') || name.includes('trivia')) {
      return '/images/games.jpg';
    }
    
    // Default images
    const defaultImages = [
      '/images/team.jpg',
      '/images/Corporate team 1.jpg',
      '/images/Corporate team 2.webp',
      '/images/activity1.jpg',
      '/images/activity2.jpg'
    ];
    
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  };

  const getFilteredRecommendations = () => {
    if (activeCategory === 'all') return recommendations;
    return recommendations.filter(rec => rec.category === activeCategory);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trending': return <FiTrendingUp size={14} />;
      case 'personalized': return <FiTarget size={14} />;
      case 'similar': return <FiLayers size={14} />;
      case 'popular': return <FiStar size={14} />;
      default: return <FiZap size={14} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trending': return 'text-green-600 bg-green-100';
      case 'personalized': return 'text-blue-600 bg-blue-100';
      case 'similar': return 'text-purple-600 bg-purple-100';
      case 'popular': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-blue-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getItemUrl = (recommendation: AIRecommendation) => {
    switch (recommendation.type) {
      case 'activity':
        return `/team-building-activity/${recommendation.slug}`;
      case 'venue':
        return `/stay/${recommendation.slug}`;
      case 'destination':
        return `/destinations/${recommendation.slug}`;
      default:
        return `/activities/${recommendation.slug}`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <FiZap className="text-[#FF4C39]" />
            <span>AI-Powered Recommendations</span>
          </h2>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF4C39]"></div>
        </div>
        {searchQuery && (
          <p className="text-gray-600">
            Finding real activities and venues for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse h-[480px]">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Category Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <FiZap className="text-[#FF4C39]" />
            <span>AI-Powered Recommendations</span>
          </h2>
          <p className="text-gray-600 mt-1">
            {searchQuery 
              ? `Real activities and venues for: "${searchQuery}"`
              : "Curated from our 350+ team building experiences"
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={generateRecommendations}
            className="flex items-center space-x-2 px-4 py-2 bg-[#FF4C39] text-white rounded-lg hover:bg-[#FF6B5A] transition-colors"
          >
            <FiRefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'personalized', 'trending', 'similar', 'popular'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeCategory === category
                ? 'bg-[#FF4C39] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getCategoryIcon(category)}
            <span className="capitalize">{category}</span>
            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
              {category === 'all' ? recommendations.length : recommendations.filter(rec => rec.category === category).length}
            </span>
          </button>
        ))}
      </div>

      {/* Recommendations Grid - Fixed Heights */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {getFilteredRecommendations().map((recommendation, index) => (
            <motion.div
              key={recommendation.activityId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group h-[520px] flex flex-col pb-12"
            >
              {/* Image and Category Badge */}
              <div className="relative h-48 overflow-hidden flex-shrink-0 rounded-t-xl">
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(recommendation.category)}`}>
                    {getCategoryIcon(recommendation.category)}
                    <span className="capitalize">{recommendation.category}</span>
                  </span>
                </div>
                
                {/* Type Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700 capitalize">
                    {recommendation.type}
                  </span>
                </div>

                {/* Confidence Score */}
                <div className="absolute bottom-3 right-3">
                  <div 
                    className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold cursor-help shadow-sm"
                    onMouseEnter={() => setShowTooltip(recommendation.activityId)}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <span className={getConfidenceColor(recommendation.confidence)}>
                      {Math.round(recommendation.confidence * 100)}% match
                    </span>
                  </div>
                  
                  {/* Tooltip */}
                  {showTooltip === recommendation.activityId && (
                    <div className="absolute bottom-8 right-0 bg-black text-white text-xs rounded-lg p-3 w-48 z-10 shadow-xl">
                      <p className="font-medium mb-1">AI Confidence Score</p>
                      <p>{recommendation.reason}</p>
                    </div>
                  )}
                </div>

                {/* Heart Icon */}
                <button className="absolute bottom-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <FiHeart size={16} className="text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Content - Flexible Height */}
              <div className="p-5 space-y-4 flex-1 flex flex-col mb-4">
                {/* Title and Description - Fixed Heights */}
                <div className="space-y-3">
                  {/* Title with fixed height */}
                  <div className="h-14 flex items-start">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#FF4C39] transition-colors leading-tight line-clamp-2">
                      {recommendation.name}
                    </h3>
                  </div>
                  
                  {/* Description with fixed height */}
                  <div className="h-16">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {recommendation.description}
                    </p>
                  </div>
                </div>

                {/* Rating & Confidence - Fixed Height */}
                <div className="h-10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400 text-base">
                      {'★'.repeat(5)}
                    </div>
                    <span className="text-base font-semibold text-gray-900">
                      {recommendation.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {Math.round(recommendation.confidence * 100)}% Match
                    </div>
                  </div>
                </div>

                {/* CTA Button - Always at bottom */}
                <div className="mt-auto mb-6">
                  <Link
                    to={getItemUrl(recommendation)}
                    className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-lg font-semibold text-sm py-3 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Explore Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {getFilteredRecommendations().length === 0 && (
        <div className="text-center py-12">
          <FiZap size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or refresh to get new suggestions.
          </p>
          <button
            onClick={generateRecommendations}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FF4C39] text-white rounded-lg hover:bg-[#FF6B5A] transition-colors"
          >
            <FiRefreshCw size={16} />
            <span>Generate New Recommendations</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations; 