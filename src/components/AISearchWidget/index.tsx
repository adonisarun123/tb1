import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSend, FiX, FiArrowRight, FiStar, FiUsers, FiMapPin, FiHome, FiActivity, FiBook, FiFileText, FiBriefcase, FiExternalLink, FiFilter, FiTrendingUp, FiMic, FiMicOff, FiClock } from 'react-icons/fi';
import { searchAll, SearchResult, SearchResultItem } from '../../api/search';
import { useNavigate } from 'react-router-dom';

interface AISearchWidgetProps {
  onSearchQueryChange?: (query: string) => void;
}

const AISearchWidget: React.FC<AISearchWidgetProps> = ({ onSearchQueryChange }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'activities' | 'venues' | 'destinations'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'popularity'>('relevance');
  const [openInNewTab, setOpenInNewTab] = useState(false);
  
  // Voice Search States
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
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

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsVoiceSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript.trim()) {
          setQuery(finalTranscript.trim());
          setIsExpanded(true);
          // Call the onSearchQueryChange callback
          onSearchQueryChange?.(finalTranscript.trim());
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        // Auto-search after voice input
        if (query.trim()) {
          setTimeout(() => {
            handleSearch();
          }, 500);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setVoiceError(`Voice recognition error: ${event.error}`);
      };

      recognitionRef.current = recognition;
    }
  }, [query, onSearchQueryChange]);

  const startVoiceSearch = () => {
    if (!isVoiceSupported || !recognitionRef.current) {
      setVoiceError('Voice search is not supported in your browser');
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      setVoiceError('Could not start voice recognition');
    }
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setShowResults(true);
    
    try {
      const searchResults = await searchAll(query);
      setResults(searchResults);
      setActiveTab('all'); // Reset to show all results
      
      // Call the onSearchQueryChange callback when search is performed
      onSearchQueryChange?.(query);
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

  // Update search query when input changes
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    // Debounce the callback to avoid too frequent updates
    if (newQuery.trim().length > 3) {
      onSearchQueryChange?.(newQuery.trim());
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
    onSearchQueryChange?.(suggestion);
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
        style={{ pointerEvents: 'auto' }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"></div>
          <div className="relative bg-white backdrop-blur-lg rounded-2xl shadow-2xl border-2 border-white/50 hover:border-white/70 transition-all duration-300" style={{ pointerEvents: 'auto' }}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center p-3 sm:p-4 gap-3 sm:gap-0">
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0 mr-3 sm:mr-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-xl flex items-center justify-center">
                    <FiSearch className="text-white text-lg sm:text-xl" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0" style={{ pointerEvents: 'auto' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsExpanded(true)}
                    onClick={() => setIsExpanded(true)}
                    placeholder="Ask me about activities, venues... or click the mic to speak"
                    className="w-full text-base sm:text-lg text-black placeholder-gray-600 bg-transparent border-none outline-none font-bold cursor-text"
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2" style={{ pointerEvents: 'auto' }}>
                {/* Voice Search Button */}
                {isVoiceSupported && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isListening) {
                        stopVoiceSearch();
                      } else {
                        startVoiceSearch();
                      }
                    }}
                    className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white hover:scale-105 hover:shadow-lg transition-all duration-200 relative z-50 ${
                      isListening 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse shadow-red-200' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                    }`}
                    title={isListening ? 'Stop listening' : 'Start voice search'}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {isListening ? (
                      <FiMicOff className="text-base sm:text-lg" />
                    ) : (
                      <FiMic className="text-base sm:text-lg" />
                    )}
                  </button>
                )}

                {/* Search Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSearch();
                  }}
                  disabled={!query.trim() || isSearching}
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-xl flex items-center justify-center text-white hover:scale-105 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none relative z-50"
                  title={isSearching ? "Searching..." : "Search"}
                  style={{ pointerEvents: 'auto' }}
                >
                  {isSearching ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FiSend className="text-base sm:text-lg" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Voice Feedback */}
            {isListening && (
              <div className="px-3 sm:px-4 pb-2">
                <div className="flex items-center justify-center space-x-2 text-blue-900 bg-blue-100 border border-blue-300 rounded-lg py-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold">Listening... Speak now</span>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}

            {/* Voice Error */}
            {voiceError && (
              <div className="px-3 sm:px-4 pb-2">
                <div className="flex items-center justify-center space-x-2 text-red-900 bg-red-100 border border-red-300 rounded-lg py-3 px-3">
                  <span className="text-sm font-bold">{voiceError}</span>
                  <button 
                    onClick={() => setVoiceError(null)}
                    className="text-red-700 hover:text-red-900 ml-2 font-bold"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Mobile-optimized secondary info */}
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-700 gap-2 sm:gap-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs border border-blue-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    AI-Enhanced
                  </span>
                  {isVoiceSupported && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-100 text-purple-800 font-bold text-xs border border-purple-200">
                      <FiMic className="w-3 h-3 mr-1.5" />
                      Voice Enabled
                    </span>
                  )}
                  <span className="hidden sm:inline text-gray-900 font-bold">Intelligent search across all content</span>
                </div>
                
                {/* New Tab Toggle */}
                <label className="flex items-center cursor-pointer" style={{ pointerEvents: 'auto' }}>
                  <input
                    type="checkbox"
                    checked={openInNewTab}
                    onChange={(e) => setOpenInNewTab(e.target.checked)}
                    className="sr-only"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <div 
                    className={`relative inline-flex items-center h-4 sm:h-5 rounded-full w-7 sm:w-9 transition-colors cursor-pointer ${openInNewTab ? 'bg-blue-500' : 'bg-gray-300'}`}
                    onClick={() => setOpenInNewTab(!openInNewTab)}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <span className={`inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 transform bg-white rounded-full transition-transform ${openInNewTab ? 'translate-x-3.5 sm:translate-x-5' : 'translate-x-0.5 sm:translate-x-1'}`} />
                  </div>
                  <span className="ml-2 text-xs cursor-pointer" onClick={() => setOpenInNewTab(!openInNewTab)}>New tab</span>
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
            <div className="bg-white backdrop-blur-lg rounded-xl p-5 shadow-xl border-2 border-white/30">
              <div className="flex items-center mb-4">
                <FiTrendingUp className="text-blue-700 mr-2" />
                <h3 className="text-base font-black text-gray-900">Popular Searches</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {popularQueries.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left p-4 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-gray-900 hover:text-blue-800 flex items-start group border border-transparent hover:border-blue-200"
                  >
                    <FiArrowRight className="mr-3 text-gray-600 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                    <span className="text-sm leading-relaxed font-semibold">{suggestion}</span>
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
                    <label htmlFor="sort-select" className="sr-only">Sort results by</label>
                    <select
                      id="sort-select"
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
                {/* Quick Summary Bar */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Found {getTotalResultsCount()} perfect matches for "{query}"
                        </h3>
                        <p className="text-sm text-gray-600">
                          {getTabCount('venues')} venues, {getTabCount('activities')} activities{getTabCount('destinations') > 0 && `, ${getTabCount('destinations')} destinations`} near Bangalore
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const contactSection = document.getElementById('contact-section');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          navigate('/contact');
                        }
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Get Expert Help
                    </button>
                  </div>
                </div>

                {/* Results Tabs - Moved to top for better UX */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-100">
                  {(['all', 'activities', 'venues', 'destinations'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                        activeTab === tab
                          ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {tab === 'all' ? 'All Results' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {tab !== 'all' && (
                        <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                          {getTabCount(tab)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Enhanced Results Grid - Now prominently displayed */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {getDisplayItems().map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    >
                      {/* Card Header with Image Placeholder */}
                      <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700">
                            {getItemTypeLabel(item.type)}
                          </span>
                        </div>
                        {item.rating && (
                          <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                            <FiStar className="w-3 h-3 text-yellow-500 mr-1" />
                            <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center">
                          <div className="text-4xl opacity-20">
                            {getItemIcon(item.type)}
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4">
                        <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2 leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                          {item.description}
                        </p>
                        
                        {/* Key Details */}
                        <div className="space-y-2 mb-4">
                          {item.location && (
                            <div className="flex items-center text-sm text-gray-500">
                              <FiMapPin className="w-4 h-4 mr-2 text-blue-500" />
                              <span>{item.location}</span>
                            </div>
                          )}
                          {item.duration && (
                            <div className="flex items-center text-sm text-gray-500">
                              <FiClock className="w-4 h-4 mr-2 text-green-500" />
                              <span>{item.duration}</span>
                            </div>
                          )}
                          {item.capacity && (
                            <div className="flex items-center text-sm text-gray-500">
                              <FiUsers className="w-4 h-4 mr-2 text-purple-500" />
                              <span>{item.capacity}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Area */}
                        <div className="flex items-center justify-between">
                          {item.price ? (
                            <span className="font-bold text-lg text-[#FF4C39]">
                              {item.price}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500 font-medium">
                              Contact for pricing
                            </span>
                          )}
                          <div className="flex items-center space-x-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                              View Details
                            </button>
                            <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Concise AI Summary - After the cards */}
                {getDisplayItems().length > 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-700 leading-relaxed">
                          <strong>AI Summary:</strong> {results.answer.split('.')[0]}. 
                          <button 
                            onClick={() => {
                              // Toggle full summary
                              const summaryElement = document.getElementById('full-ai-summary');
                              if (summaryElement) {
                                summaryElement.style.display = summaryElement.style.display === 'none' ? 'block' : 'none';
                              }
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium ml-1"
                          >
                            See more details →
                          </button>
                        </div>
                        <div id="full-ai-summary" style={{ display: 'none' }} className="mt-2 text-sm text-gray-600 leading-relaxed">
                          {results.answer}
                        </div>
                        
                        {results.suggestions.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-600 mb-2">Related searches:</p>
                            <div className="flex flex-wrap gap-2">
                              {results.suggestions.slice(0, 3).map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="px-2 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {getDisplayItems().length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiSearch className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search terms or browse our popular categories above.</p>
                    
                    {/* Enhanced CTA for No Results */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 max-w-lg mx-auto">
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <FiBriefcase className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Let us help you find the perfect activity!</h4>
                      <p className="text-sm text-gray-600 mb-4">Our experts can recommend activities based on your specific requirements.</p>
                      <button
                        onClick={() => {
                          const contactSection = document.getElementById('contact-section');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            navigate('/contact');
                          }
                        }}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium text-sm hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <span>Get Personalized Help</span>
                        <FiArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Smart Consultation CTA */}
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 rounded-2xl p-6 border border-blue-100">
                    <div className="text-center max-w-2xl mx-auto">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <FiBriefcase className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Need Personalized Recommendations?
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Can't find exactly what you're looking for? Our team building experts will create a custom experience tailored to your team's needs, budget, and goals.
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Free Consultation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Custom Solutions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Expert Guidance</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          // Navigate to consultation form or scroll to contact section
                          const contactSection = document.getElementById('contact-section');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            // If no contact section, navigate to contact page
                            navigate('/contact');
                          }
                        }}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <FiBriefcase className="w-5 h-5" />
                        <span>Get Smart Consultation</span>
                        <FiArrowRight className="w-5 h-5" />
                      </button>
                      
                      <p className="text-xs text-gray-500 mt-3">
                        🚀 Usually responds within 2 hours • 350+ successful team experiences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchWidget; 