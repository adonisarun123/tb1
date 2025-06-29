import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiStar, 
  FiUsers, 
  FiMapPin, 
  FiClock, 
  FiTrendingUp, 
  FiHeart,
  FiExternalLink,
  FiRefreshCw,
  FiTarget,
  FiLayers,
  FiZap
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

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
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  userProfile,
  currentActivityId,
  limit = 8,
  showPersonalizationReasons = true
}) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'trending' | 'personalized' | 'similar' | 'popular'>('all');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Mock recommendations data (removed price field)
  const mockRecommendations: AIRecommendation[] = [
    {
      activityId: 'virtual-escape-room',
      name: 'Virtual Escape Room Challenge',
      description: 'Immersive online puzzle-solving experience that builds teamwork and critical thinking skills through engaging challenges.',
      image: '/images/Virtual Escape Room.webp',
      rating: 4.8,
      duration: '90 minutes',
      capacity: '8-50 people',
      location: 'Virtual',
      confidence: 0.95,
      reason: 'Perfect for remote teams with your preference for problem-solving activities',
      personalizationFactors: ['company_size', 'remote_preference', 'engagement_level'],
      category: 'personalized',
      tags: ['Virtual', 'Problem Solving', 'Team Collaboration']
    },
    {
      activityId: 'cooking-workshop',
      name: 'Corporate Cooking Workshop',
      description: 'Interactive culinary team building where teams cook together and learn collaboration while creating delicious meals.',
      image: '/images/Cook it up.webp',
      rating: 4.7,
      duration: '3 hours',
      capacity: '15-40 people',
      location: 'Bangalore',
      confidence: 0.88,
      reason: 'Great for medium teams and builds creativity while fostering communication',
      personalizationFactors: ['group_size', 'location_preference', 'creative_activities'],
      category: 'trending',
      tags: ['Culinary', 'Creativity', 'Indoor']
    },
    {
      activityId: 'outdoor-treasure-hunt',
      name: 'Outdoor Treasure Hunt',
      description: 'Exciting outdoor adventure combining strategy, teamwork, and physical activity in beautiful natural settings.',
      image: '/images/outdoor.jpg',
      rating: 4.6,
      duration: '2-3 hours',
      capacity: '10-100 people',
      location: 'Bangalore',
      confidence: 0.82,
      reason: 'Ideal for large groups and promotes active collaboration in outdoor settings',
      personalizationFactors: ['outdoor_preference', 'large_groups', 'adventure'],
      category: 'popular',
      tags: ['Outdoor', 'Adventure', 'Strategy']
    },
    {
      activityId: 'murder-mystery',
      name: 'Virtual Murder Mystery',
      description: 'Engaging mystery-solving game that develops analytical thinking and team communication through immersive storytelling.',
      image: '/images/Virtual Murder Mystery.png',
      rating: 4.9,
      duration: '2 hours',
      capacity: '8-30 people',
      location: 'Virtual',
      confidence: 0.91,
      reason: 'Highly engaging for analytical teams with strong communication focus',
      personalizationFactors: ['analytical_thinking', 'communication_focus', 'virtual_friendly'],
      category: 'similar',
      tags: ['Virtual', 'Mystery', 'Analytical']
    }
  ];

  useEffect(() => {
    generateRecommendations();
  }, [userProfile, currentActivityId]);

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would call the AI service
    let filteredRecommendations = mockRecommendations;
    
    // Apply user profile filtering
    if (userProfile) {
      filteredRecommendations = mockRecommendations.map(rec => ({
        ...rec,
        confidence: calculatePersonalizedConfidence(rec, userProfile)
      })).sort((a, b) => b.confidence - a.confidence);
    }
    
    setRecommendations(filteredRecommendations.slice(0, limit));
    setLoading(false);
  };

  const calculatePersonalizedConfidence = (recommendation: AIRecommendation, profile: UserProfile): number => {
    let confidence = recommendation.confidence;
    
    // Boost confidence based on user preferences
    if (profile.location && recommendation.location.toLowerCase().includes(profile.location.toLowerCase())) {
      confidence += 0.1;
    }
    
    // Industry matching
    if (profile.industry === 'technology' && recommendation.tags.includes('Virtual')) {
      confidence += 0.15;
    }
    
    // Company size matching
    const groupSize = parseInt(recommendation.capacity.split('-')[1]);
    const expectedSize = profile.companySize === 'large' ? 50 : 25;
    if (groupSize >= expectedSize) {
      confidence += 0.1;
    }
    
    return Math.min(confidence, 1.0);
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h2>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF4C39]"></div>
        </div>
        
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
            Personalized suggestions based on your preferences and company profile
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
                
                {/* Confidence Score */}
                <div className="absolute top-3 right-3">
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
                    <div className="absolute top-8 right-0 bg-black text-white text-xs rounded-lg p-3 w-48 z-10 shadow-xl">
                      <p className="font-medium mb-1">AI Confidence Score</p>
                      <p>{recommendation.reason}</p>
                    </div>
                  )}
                </div>

                {/* Heart Icon */}
                <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
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
                      {(4.7 + Math.random() * 0.3).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {recommendation.confidence}% Match
                    </div>
                  </div>
                </div>

                {/* CTA Button - Always at bottom */}
                <div className="mt-auto mb-6">
                  <Link
                    to={`/activities/${recommendation.activityId}`}
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