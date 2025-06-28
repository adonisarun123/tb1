import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSend, FiX, FiArrowRight, FiStar, FiUsers, FiMapPin, FiHome, FiActivity, FiBook, FiFileText, FiBriefcase, FiExternalLink, FiFilter, FiTrendingUp } from 'react-icons/fi';
import { searchAll, SearchResult, SearchResultItem } from '../../api/search';
import { useNavigate } from 'react-router-dom';

const AISearchWidget: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'activities' | 'venues' | 'destinations'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'popularity'>('relevance');
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const popularQueries = [
    'Best virtual team building activities for remote teams',
    'Corporate team outing venues near Bangalore',
    'Outdoor adventure team building games',
    'Indoor team building activities for conferences',
    'Team building resorts with spa facilities',
    'Cooking team building workshops',
    'Sports team building activities',
    'Creative team building workshops'
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setShowResults(true);
    
    try {
      const searchResults = await searchAll(query);
      setResults(searchResults);
      setActiveTab('all'); // Reset to show all results
    } catch (error) {
      console.error('Search failed:', error);
      setResults({
        answer: "I'm sorry, something went wrong with the search. Please try again or contact support if the issue persists.",
        activities: [],
        venues: [],
        destinations: [],
        suggestions: [],
        vectorSearchUsed: false,
        searchConfidence: 0,
        totalResults: 0,
        searchTime: 0
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleItemClick = (item: SearchResultItem, forceNewTab = false) => {
    let url = '';
    
    if (item.type === 'activity') {
      url = `/team-building-activity/${item.slug}`;
    } else if (item.type === 'venue') {
      url = `/stay/${item.slug}`;
    } else if (item.type === 'destination') {
      url = `/destinations/${item.slug}`;
    } else if (item.type === 'blog') {
      url = `/blog/${item.slug}`;
    } else if (item.type === 'landing_page') {
      url = `/team-building/${item.slug}`;
    } else if (item.type === 'corporate_teambuilding') {
      url = `/corporate-teambuilding/${item.slug}`;
    }

    if (openInNewTab || forceNewTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsExpanded(true);
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'activity': return <FiActivity className="text-blue-500" />;
      case 'venue': return <FiHome className="text-green-500" />;
      case 'destination': return <FiMapPin className="text-purple-500" />;
      case 'blog': return <FiBook className="text-orange-500" />;
      case 'landing_page': return <FiFileText className="text-indigo-500" />;
      case 'corporate_teambuilding': return <FiBriefcase className="text-red-500" />;
      default: return <FiActivity className="text-gray-500" />;
    }
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'activity': return 'Activity';
      case 'venue': return 'Venue';
      case 'destination': return 'Destination';
      case 'blog': return 'Blog Post';
      case 'landing_page': return 'Team Building';
      case 'corporate_teambuilding': return 'Corporate';
      default: return 'Item';
    }
  };

  const sortItems = (items: SearchResultItem[]) => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          const ratingA = parseFloat(a.rating || '0');
          const ratingB = parseFloat(b.rating || '0');
          return ratingB - ratingA;
        case 'popularity':
          // Use relevance score as popularity indicator
          return (b.relevanceScore || 0) - (a.relevanceScore || 0);
        case 'relevance':
        default:
          return (b.relevanceScore || 0) - (a.relevanceScore || 0);
      }
    });
  };

  const getDisplayItems = () => {
    if (!results) return [];
    
    let items: SearchResultItem[] = [];
    
    switch (activeTab) {
      case 'activities': 
        items = results.activities;
        break;
      case 'venues': 
        items = results.venues;
        break;
      case 'destinations': 
        items = results.destinations;
        break;
      default: 
        // Combine all results for 'all' tab with better distribution
        items = [
          ...results.activities.slice(0, 3),
          ...results.venues.slice(0, 2),
          ...results.destinations.slice(0, 2)
        ];
    }
    
    return sortItems(items);
  };

  const getTabCount = (type: 'activities' | 'venues' | 'destinations') => {
    if (!results) return 0;
    return results[type].length;
  };

  const getTotalResultsCount = () => {
    if (!results) return 0;
    return results.activities.length + results.venues.length + results.destinations.length;
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      {/* Search Input */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center p-3 sm:p-4 gap-3 sm:gap-0">
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0 mr-3 sm:mr-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-xl flex items-center justify-center">
                    <FiSearch className="text-white text-lg sm:text-xl" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsExpanded(true)}
                    placeholder="Ask me about activities, venues..."
                    className="w-full text-base sm:text-lg text-gray-800 placeholder-gray-500 bg-transparent border-none outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                disabled={!query.trim() || isSearching}
                className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 sm:ml-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FiSend className="text-base sm:text-lg" />
                )}
              </button>
            </div>
            
            {/* Mobile-optimized secondary info */}
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 gap-2 sm:gap-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium text-xs">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    AI-Enhanced
                  </span>
                  <span className="hidden sm:inline">Intelligent search across all content</span>
                </div>
                
                {/* New Tab Toggle */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={openInNewTab}
                    onChange={(e) => setOpenInNewTab(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex items-center h-4 sm:h-5 rounded-full w-7 sm:w-9 transition-colors ${openInNewTab ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <span className={`inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 transform bg-white rounded-full transition-transform ${openInNewTab ? 'translate-x-3.5 sm:translate-x-5' : 'translate-x-0.5 sm:translate-x-1'}`} />
                  </div>
                  <span className="ml-2 text-xs">New tab</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Popular Queries */}
      <AnimatePresence>
        {isExpanded && !showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/20">
              <div className="flex items-center mb-3">
                <FiTrendingUp className="text-blue-500 mr-2" />
                <h3 className="text-sm font-semibold text-gray-700">Popular Searches</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {popularQueries.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-gray-700 hover:text-blue-600 flex items-start group"
                  >
                    <FiArrowRight className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <AnimatePresence>
        {showResults && results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-6"
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Enhanced Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-800">Search Results</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
                    {getTotalResultsCount()} found
                  </span>
                  {results.searchTime && (
                    <span className="text-xs text-gray-500">
                      ({(results.searchTime / 1000).toFixed(2)}s)
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {/* Sort Options */}
                  <div className="flex items-center space-x-2">
                    <FiFilter className="text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'relevance' | 'rating' | 'popularity')}
                      className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="rating">Rating</option>
                      <option value="popularity">Popularity</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setIsExpanded(false);
                      setQuery('');
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Enhanced AI Answer */}
                <div className="mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">AI</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                        <p className="text-gray-800 leading-relaxed mb-2">{results.answer}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                            {Math.round(results.searchConfidence * 100)}% confidence
                          </span>
                          {results.vectorSearchUsed && (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                              Vector search enabled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Results Tabs */}
                <div className="mb-6">
                  <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'all'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      All Results ({getTotalResultsCount()})
                    </button>
                    <button
                      onClick={() => setActiveTab('activities')}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'activities'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Activities ({getTabCount('activities')})
                    </button>
                    <button
                      onClick={() => setActiveTab('venues')}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'venues'
                          ? 'bg-white text-green-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Venues ({getTabCount('venues')})
                    </button>
                    <button
                      onClick={() => setActiveTab('destinations')}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'destinations'
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Destinations ({getTabCount('destinations')})
                    </button>
                  </div>
                </div>

                {/* Enhanced Results Grid */}
                {getDisplayItems().length > 0 && (
                  <div className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {getDisplayItems().slice(0, 9).map((item, index) => (
                        <motion.div
                          key={`${item.type}-${item.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer group relative"
                        >
                          <div 
                            onClick={() => handleItemClick(item)}
                            className="flex flex-col h-full"
                          >
                            <div className="flex items-start space-x-3 mb-3">
                              <img
                                src={item.image || 'https://via.placeholder.com/60x60'}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  {getItemIcon(item.type)}
                                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    {getItemTypeLabel(item.type)}
                                  </span>
                                </div>
                                <h5 className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                                  {item.name}
                                </h5>
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1">{item.description}</p>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-2">
                                {item.rating && (
                                  <div className="flex items-center">
                                    <FiStar className="mr-1 text-yellow-400" />
                                    {item.rating}
                                  </div>
                                )}
                                {item.capacity && (
                                  <div className="flex items-center">
                                    <FiUsers className="mr-1" />
                                    {item.capacity.split(' ')[0]}
                                  </div>
                                )}
                              </div>
                              {item.relevanceScore && item.relevanceScore > 5 && (
                                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                                  High Match
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* New Tab Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemClick(item, true);
                            }}
                            className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Open in new tab"
                          >
                            <FiExternalLink className="text-gray-600 text-xs" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Suggestions */}
                {results.suggestions && results.suggestions.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                      <FiTrendingUp className="mr-2 text-blue-500" />
                      Explore Related Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-600 rounded-full text-sm transition-all duration-200 border border-gray-200 hover:border-blue-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchWidget; 