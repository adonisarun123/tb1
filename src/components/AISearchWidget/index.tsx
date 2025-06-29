import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSend, FiX, FiArrowRight, FiStar, FiUsers, FiMapPin, FiHome, FiActivity, FiBook, FiFileText, FiBriefcase, FiExternalLink, FiFilter, FiTrendingUp, FiMic, FiMicOff, FiClock } from 'react-icons/fi';
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
  }, [query]);

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
                    placeholder="Ask me about activities, venues... or click the mic to speak"
                    className="w-full text-base sm:text-lg text-gray-800 placeholder-gray-500 bg-transparent border-none outline-none"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Voice Search Button */}
                {isVoiceSupported && (
                  <button
                    onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                    className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-all duration-200 ${
                      isListening 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                    }`}
                    title={isListening ? 'Stop listening' : 'Start voice search'}
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
                  onClick={handleSearch}
                  disabled={!query.trim() || isSearching}
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Listening... Speak now</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}

            {/* Voice Error */}
            {voiceError && (
              <div className="px-3 sm:px-4 pb-2">
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <span className="text-sm">{voiceError}</span>
                  <button 
                    onClick={() => setVoiceError(null)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Mobile-optimized secondary info */}
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 gap-2 sm:gap-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium text-xs">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    AI-Enhanced
                  </span>
                  {isVoiceSupported && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-medium text-xs">
                      <FiMic className="w-3 h-3 mr-1" />
                      Voice Enabled
                    </span>
                  )}
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
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                        <p className="text-gray-700 leading-relaxed">{results.answer}</p>
                      </div>
                      
                      {results.suggestions.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-600">You might also be interested in:</p>
                          <div className="flex flex-wrap gap-2">
                            {results.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
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

                {/* Results Tabs */}
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

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getDisplayItems().map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getItemIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {getItemTypeLabel(item.type)}
                            </span>
                            {item.rating && (
                              <div className="flex items-center text-xs text-gray-500">
                                <FiStar className="w-3 h-3 text-yellow-400 mr-1" />
                                {item.rating}
                              </div>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-3">
                              {item.location && (
                                <span className="flex items-center">
                                  <FiMapPin className="w-3 h-3 mr-1" />
                                  {item.location}
                                </span>
                              )}
                              {item.duration && (
                                <span className="flex items-center">
                                  <FiClock className="w-3 h-3 mr-1" />
                                  {item.duration}
                                </span>
                              )}
                              {item.capacity && (
                                <span className="flex items-center">
                                  <FiUsers className="w-3 h-3 mr-1" />
                                  {item.capacity}
                                </span>
                              )}
                            </div>
                            {item.price && (
                              <span className="font-medium text-[#FF4C39]">
                                {item.price}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {getDisplayItems().length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiSearch className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or browse our popular categories above.</p>
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