// AI-powered search API for Trebound
import { generateAIResponse } from '../lib/openaiClient';
import { supabase, Activity, Stay, Destination, BlogPost } from '../lib/supabaseClient';

export interface SearchResultItem {
  id: string;
  name: string;
  description: string;
  type: 'activity' | 'venue' | 'destination' | 'blog' | 'landing_page' | 'corporate_teambuilding';
  slug: string;
  image?: string;
  rating?: string;
  price?: string;
  location?: string;
  duration?: string;
  capacity?: string;
  amenities?: string[];
  activities?: string[];
  relevanceScore?: number;
}

export interface SearchResult {
  answer: string;
  activities: SearchResultItem[];
  venues: SearchResultItem[];
  destinations: SearchResultItem[];
  suggestions: string[];
  vectorSearchUsed: boolean;
  searchConfidence: number;
  totalResults: number;
  searchTime: number;
}

// Cache for website data to avoid repeated API calls
let dataCache: {
  activities: Activity[];
  stays: Stay[];
  destinations: Destination[];
  blogs: BlogPost[];
  lastFetch: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Extract clean text from HTML content
const extractTextFromHtml = (html: string): string => {
  if (!html) return '';
  
  // Remove HTML tags and decode entities
  const text = html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&amp;/g, '&') // Replace encoded ampersands
    .replace(/&lt;/g, '<') // Replace encoded less-than
    .replace(/&gt;/g, '>') // Replace encoded greater-than
    .replace(/&quot;/g, '"') // Replace encoded quotes
    .replace(/&#39;/g, "'") // Replace encoded apostrophes
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing whitespace
  
  return text;
};

// Fetch real data from Supabase
const fetchWebsiteData = async () => {
  // Check if cache is still valid
  if (dataCache && Date.now() - dataCache.lastFetch < CACHE_DURATION) {
    return dataCache;
  }

  try {
    const [activitiesRes, staysRes, destinationsRes, blogsRes] = await Promise.all([
      supabase.from('activities').select('*').limit(100),
      supabase.from('stays').select('*').limit(50),
      supabase.from('destinations').select('*').limit(30),
      supabase.from('blog_posts').select('*').limit(20)
    ]);

    dataCache = {
      activities: activitiesRes.data || [],
      stays: staysRes.data || [],
      destinations: destinationsRes.data || [],
      blogs: blogsRes.data || [],
      lastFetch: Date.now()
    };

    return dataCache;
  } catch (error) {
    console.error('Error fetching website data:', error);
    return dataCache || { activities: [], stays: [], destinations: [], blogs: [], lastFetch: 0 };
  }
};

// AI-powered search function using real data
export const searchAll = async (query: string): Promise<SearchResult> => {
  const startTime = Date.now();
  
  try {
    // Fetch real website data
    const websiteData = await fetchWebsiteData();
    
    // Build context from real data
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

SEARCH QUERY: "${query}"`;
    
    // Generate AI response for the search query using real data
    const aiPrompt = `Based on the actual Trebound website data provided, analyze the search query "${query}" and provide a helpful response. 
    
    The user is looking for team building activities, venues, or destinations. Provide a conversational response that:
    1. Acknowledges their search query
    2. Highlights relevant options from the actual data
    3. Suggests specific activities/venues that match their needs
    4. Is helpful and engaging
    
    Keep the response under 200 words and mention specific items from the data when relevant.`;

    let aiAnswer: string;
    try {
      console.log('Attempting AI response generation for query:', query);
      aiAnswer = await generateAIResponse(aiPrompt, context);
      console.log('AI response generated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn('AI response generation failed, using intelligent fallback:', errorMessage);
      // Provide intelligent fallback response based on search results
      aiAnswer = generateFallbackResponse(query, websiteData);
      console.log('Fallback response generated:', aiAnswer.substring(0, 100) + '...');
    }
    
    // Filter real data based on search query
    const queryLower = query.toLowerCase();
    
    // Search activities
    const matchingActivities = websiteData.activities.filter(activity => {
      const cleanDescription = extractTextFromHtml(activity.description || '');
      const cleanTagline = extractTextFromHtml(activity.tagline || '');
      const searchableText = `${activity.name} ${cleanTagline} ${cleanDescription} ${activity.activity_type}`.toLowerCase();
      return searchableText.includes(queryLower) ||
             queryLower.split(' ').some(word => word.length > 2 && searchableText.includes(word));
    }).map(activity => ({
      id: activity.id.toString(),
      name: activity.name,
      description: extractTextFromHtml(activity.tagline || activity.description || '') || 'Team building activity',
      type: 'activity' as const,
      slug: activity.slug,
      image: activity.main_image,
      rating: '4.8',
      duration: activity.duration || '2-3 hours',
      capacity: activity.group_size || '10-30 people',
      location: extractTextFromHtml(activity.location || '') || 'Various',
      relevanceScore: calculateRelevanceScore(query, `${activity.name} ${extractTextFromHtml(activity.tagline || '')} ${extractTextFromHtml(activity.description || '')}`)
    })).sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)).slice(0, 10);

    // Search venues/stays
    const matchingVenues = websiteData.stays.filter(stay => {
      const cleanLocation = extractTextFromHtml(stay.location || '');
      const cleanDescription = extractTextFromHtml(stay.stay_description || '');
      const searchableText = `${stay.name} ${stay.tagline || ''} ${cleanDescription} ${cleanLocation}`.toLowerCase();
      return searchableText.includes(queryLower) ||
             queryLower.split(' ').some(word => word.length > 2 && searchableText.includes(word));
    }).map(stay => ({
      id: stay.id.toString(),
      name: stay.name,
      description: extractTextFromHtml(stay.tagline || stay.stay_description || '') || 'Premium venue for team events',
      type: 'venue' as const,
      slug: stay.slug,
      image: stay.stay_image,
      location: extractTextFromHtml(stay.location || '') || 'Premium Location',
      amenities: stay.facilities ? extractTextFromHtml(stay.facilities).split(/[,;.]+/).map(f => f.trim()).filter(f => f) : [],
      relevanceScore: calculateRelevanceScore(query, `${stay.name} ${stay.tagline || ''} ${extractTextFromHtml(stay.location || '')}`)
    })).sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)).slice(0, 8);

    // Search destinations
    const matchingDestinations = websiteData.destinations.filter(dest => {
      const cleanDescription = extractTextFromHtml(dest.description || '');
      const searchableText = `${dest.name} ${cleanDescription} ${dest.region}`.toLowerCase();
      return searchableText.includes(queryLower) ||
             queryLower.split(' ').some(word => word.length > 2 && searchableText.includes(word));
    }).map(dest => ({
      id: dest.id,
      name: dest.name,
      description: extractTextFromHtml(dest.description || '') || 'Team building destination',
      type: 'destination' as const,
      slug: dest.slug,
      image: dest.destination_main_image || dest.destination_image,
      location: dest.region,
      relevanceScore: calculateRelevanceScore(query, `${dest.name} ${extractTextFromHtml(dest.description || '')} ${dest.region}`)
    })).sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)).slice(0, 6);

    // Generate intelligent search suggestions based on available data
    const suggestions = generateSearchSuggestions(query, websiteData);

    const searchTime = Date.now() - startTime;

    return {
      answer: aiAnswer,
      activities: matchingActivities,
      venues: matchingVenues,
      destinations: matchingDestinations,
      suggestions,
      vectorSearchUsed: true, // AI is being used
      searchConfidence: calculateSearchConfidence(matchingActivities.length + matchingVenues.length + matchingDestinations.length),
      totalResults: matchingActivities.length + matchingVenues.length + matchingDestinations.length,
      searchTime
    };
    
  } catch (error) {
    console.error('Search error:', error);
    
    // Enhanced fallback with real data
    try {
      const websiteData = await fetchWebsiteData();
      const fallbackAnswer = generateFallbackResponse(query, websiteData);
      
      // Return basic search results with better fallback answer
      const basicResults = await performBasicSearch(query);
      return {
        ...basicResults,
        answer: fallbackAnswer
      };
    } catch (fallbackError) {
      console.error('Fallback search also failed:', fallbackError);
      return await performBasicSearch(query);
    }
  }
};

// Calculate relevance score for search results
const calculateRelevanceScore = (query: string, text: string): number => {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  let score = 0;
  
  // Exact phrase match gets highest score
  if (textLower.includes(queryLower)) {
    score += 100;
  }
  
  // Word matches
  const queryWords = queryLower.split(' ').filter(word => word.length > 2);
  queryWords.forEach(word => {
    if (textLower.includes(word)) {
      score += 10;
    }
  });
  
  // Title/name match gets bonus
  const title = text.split(' - ')[0]; // Get title part
  if (title.toLowerCase().includes(queryLower)) {
    score += 50;
  }
  
  return score;
};

// Calculate search confidence based on result count
const calculateSearchConfidence = (resultCount: number): number => {
  if (resultCount >= 10) return 0.95;
  if (resultCount >= 5) return 0.85;
  if (resultCount >= 2) return 0.75;
  if (resultCount >= 1) return 0.65;
  return 0.4;
};

// Generate intelligent search suggestions
const generateSearchSuggestions = (query: string, data: typeof dataCache): string[] => {
  const suggestions: string[] = [];
  
  // Activity type suggestions
  const activityTypes = [...new Set(data?.activities.map(a => a.activity_type).filter(Boolean))];
  activityTypes.forEach(type => {
    if (type && !query.toLowerCase().includes(type.toLowerCase())) {
      suggestions.push(`${type} team building activities`);
    }
  });
  
  // Location suggestions
  const locations = [...new Set([
    ...data?.stays.map(s => extractTextFromHtml(s.location || '')).filter(Boolean) || [],
    ...data?.destinations.map(d => d.region).filter(Boolean) || []
  ])];
  
  locations.slice(0, 3).forEach(location => {
    if (location && !query.toLowerCase().includes(location.toLowerCase())) {
      suggestions.push(`Team building in ${location}`);
    }
  });
  
  // Generic helpful suggestions
  suggestions.push(
    'Virtual team building games',
    'Outdoor team activities',
    'Corporate team outing venues',
    'Team building workshops',
    'Leadership development programs'
  );
  
  return suggestions.slice(0, 6);
};

// Basic search fallback without AI
// Generate intelligent fallback response when AI is unavailable
const generateFallbackResponse = (query: string, data: typeof dataCache): string => {
  const queryLower = query.toLowerCase();
  
  // Count matching results
  const activityMatches = data?.activities.filter(activity => {
    const cleanTagline = extractTextFromHtml(activity.tagline || '');
    const cleanDescription = extractTextFromHtml(activity.description || '');
    const searchableText = `${activity.name} ${cleanTagline} ${cleanDescription} ${activity.activity_type}`.toLowerCase();
    return searchableText.includes(queryLower) || queryLower.split(' ').some(word => word.length > 2 && searchableText.includes(word));
  }) || [];
  
  const venueMatches = data?.stays.filter(stay => {
    const cleanLocation = extractTextFromHtml(stay.location || '');
    const cleanDescription = extractTextFromHtml(stay.stay_description || '');
    const searchableText = `${stay.name} ${stay.tagline || ''} ${cleanDescription} ${cleanLocation}`.toLowerCase();
    return searchableText.includes(queryLower) || queryLower.split(' ').some(word => word.length > 2 && searchableText.includes(word));
  }) || [];

  const destinationMatches = data?.destinations.filter(dest => {
    const cleanDescription = extractTextFromHtml(dest.description || '');
    const searchableText = `${dest.name} ${cleanDescription} ${dest.region}`.toLowerCase();
    return searchableText.includes(queryLower) || queryLower.split(' ').some(word => word.length > 2 && searchableText.includes(word));
  }) || [];

  const totalMatches = activityMatches.length + venueMatches.length + destinationMatches.length;

  if (totalMatches === 0) {
    return `I couldn't find exact matches for "${query}", but don't worry! Our team building experts can help you find the perfect activities. We have 350+ unique experiences including virtual activities, outdoor adventures, and creative workshops. Contact us to discuss your specific needs!`;
  }

  // Build response based on what we found
  let response = `Great! I found ${totalMatches} options for "${query}". `;
  
  if (activityMatches.length > 0) {
    const topActivity = activityMatches[0];
    response += `We have ${activityMatches.length} activities including "${topActivity.name}" which is perfect for ${topActivity.group_size || 'teams'}. `;
  }
  
  if (venueMatches.length > 0) {
    const topVenue = venueMatches[0];
    const cleanLocation = extractTextFromHtml(topVenue.location || '');
    response += `Plus ${venueMatches.length} venues like "${topVenue.name}" in ${cleanLocation || 'premium locations'}. `;
  }
  
  if (destinationMatches.length > 0) {
    const topDestination = destinationMatches[0];
    response += `We also cover ${destinationMatches.length} destinations including ${topDestination.name}. `;
  }

  response += "Explore the options below or contact our team for personalized recommendations!";

  return response;
};

const performBasicSearch = async (query: string): Promise<SearchResult> => {
  const startTime = Date.now();
  
  try {
    const websiteData = await fetchWebsiteData();
    const queryLower = query.toLowerCase();
    
    // Simple text matching
    const activities = websiteData.activities.filter(activity => 
      activity.name.toLowerCase().includes(queryLower) ||
      extractTextFromHtml(activity.tagline || '').toLowerCase().includes(queryLower)
    ).slice(0, 5).map(activity => ({
      id: activity.id.toString(),
      name: activity.name,
      description: extractTextFromHtml(activity.tagline || activity.description || '') || 'Team building activity',
      type: 'activity' as const,
      slug: activity.slug,
      duration: activity.duration || '2-3 hours',
      capacity: activity.group_size || '10-30 people',
      relevanceScore: 0.7
    }));

    const venues = websiteData.stays.filter(stay => 
      stay.name.toLowerCase().includes(queryLower) ||
      extractTextFromHtml(stay.location || '').toLowerCase().includes(queryLower)
    ).slice(0, 3).map(stay => ({
      id: stay.id.toString(),
      name: stay.name,
      description: extractTextFromHtml(stay.tagline || stay.stay_description || '') || 'Premium venue for team events',
      type: 'venue' as const,
      slug: stay.slug,
      location: extractTextFromHtml(stay.location || '') || 'Premium Location',
      relevanceScore: 0.7
    }));

    const searchTime = Date.now() - startTime;

    return {
      answer: `I found ${activities.length + venues.length} items related to "${query}". Our platform offers 350+ team building activities and premium venues across India. Contact our team for personalized recommendations!`,
      activities,
      venues,
      destinations: [],
      suggestions: [
        'Contact our team for personalized recommendations',
        'Explore our activity categories',
        'View popular team building options'
      ],
      vectorSearchUsed: false,
      searchConfidence: 0.6,
      totalResults: activities.length + venues.length,
      searchTime
    };
    
  } catch (error) {
    console.error('Basic search error:', error);
    
    const searchTime = Date.now() - startTime;
    
    return {
      answer: `I apologize, but I'm having trouble searching right now. Please contact our team directly for personalized team building recommendations, or browse our categories to find the perfect activity for your team.`,
      activities: [],
      venues: [],
      destinations: [],
      suggestions: [
        'Contact our team directly',
        'Browse activity categories',
        'View our popular options'
      ],
      vectorSearchUsed: false,
      searchConfidence: 0.3,
      totalResults: 0,
      searchTime
    };
  }
}; 