import { NextRequest, NextResponse } from 'next/server';

// Generate contextual suggestions based on query
const generateSuggestions = (query: string): string[] => {
  const queryLower = query.toLowerCase();
  const suggestions = [];
  
  // More intelligent suggestion generation
  if (queryLower.includes('bangalore') || queryLower.includes('bengaluru')) {
    suggestions.push('Team building venues Bangalore', 'Corporate retreats near Bangalore', 'Outdoor activities Bangalore', 'Indoor team building Bangalore');
  } else if (queryLower.includes('virtual') || queryLower.includes('online') || queryLower.includes('remote')) {
    suggestions.push('Virtual team building games', 'Online team activities', 'Remote team engagement', 'Virtual escape rooms');
  } else if (queryLower.includes('outdoor') || queryLower.includes('adventure') || queryLower.includes('nature')) {
    suggestions.push('Adventure team building', 'Outdoor corporate events', 'Nature-based activities', 'Team building resorts');
  } else if (queryLower.includes('indoor') || queryLower.includes('conference')) {
    suggestions.push('Indoor team activities', 'Conference room games', 'Workshop activities', 'Meeting room team building');
  } else if (queryLower.includes('cooking') || queryLower.includes('food')) {
    suggestions.push('Cooking team building', 'Culinary workshops', 'Food-based activities', 'Chef team challenges');
  } else if (queryLower.includes('sports') || queryLower.includes('physical')) {
    suggestions.push('Sports team building', 'Physical activities', 'Athletic challenges', 'Competitive team games');
  } else {
    suggestions.push('Popular team building activities', 'Corporate retreat venues', 'Team outing destinations', 'Unique team experiences');
  }
  
  return suggestions.slice(0, 6);
};

// Generate all possible combinations of query words
const generateQueryCombinations = (query: string): string[] => {
  const words = query.toLowerCase().split(' ').filter(word => word.length > 2);
  const combinations: string[] = [];
  
  // Add the full query first (highest priority)
  combinations.push(query.toLowerCase());
  
  // Generate combinations of different lengths (descending order)
  for (let length = words.length - 1; length >= 2; length--) {
    for (let i = 0; i <= words.length - length; i++) {
      const combination = words.slice(i, i + length).join(' ');
      if (!combinations.includes(combination)) {
        combinations.push(combination);
      }
    }
  }
  
  // Add individual words last (lowest priority)
  words.forEach(word => {
    if (!combinations.includes(word)) {
      combinations.push(word);
    }
  });
  
  return combinations;
};

export interface SearchResultItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: 'activity' | 'venue' | 'destination' | 'blog' | 'landing_page' | 'corporate_teambuilding';
  image?: string;
  location?: string;
  capacity?: string;
  duration?: string;
  rating?: string;
  price?: string;
  amenities?: string[];
  activities?: string[];
  author?: string;
  published_date?: string;
  tags?: string;
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

// Enhanced hierarchical relevance scoring function
const calculateRelevanceScore = (item: SearchResultItem, query: string): number => {
  const queryLower = query.toLowerCase();
  const queryCombinations = generateQueryCombinations(query);
  let score = 0;
  let exactPhraseFound = false;

  // Level 1: Exact phrase matching (highest priority - 50 points)
  const exactPhrase = queryLower.trim();
  if (item.name.toLowerCase().includes(exactPhrase)) {
    score += 50;
    exactPhraseFound = true;
  }
  if (item.description.toLowerCase().includes(exactPhrase)) {
    score += 40;
    exactPhraseFound = true;
  }
  if (item.location && item.location.toLowerCase().includes(exactPhrase)) {
    score += 35;
    exactPhraseFound = true;
  }

  // Check amenities and activities for exact phrase
  if (item.amenities) {
    item.amenities.forEach(amenity => {
      if (amenity.toLowerCase().includes(exactPhrase)) {
        score += 30;
        exactPhraseFound = true;
      }
    });
  }
  if (item.activities) {
    item.activities.forEach(activity => {
      if (activity.toLowerCase().includes(exactPhrase)) {
        score += 30;
        exactPhraseFound = true;
      }
    });
  }

  // Level 2: Multi-word combinations (medium priority - 20-35 points)
  queryCombinations.slice(1).forEach((combination, index) => {
    if (combination.split(' ').length > 1) { // Only multi-word combinations
      const combinationScore = Math.max(1, 25 - (index * 2)); // Decreasing score for longer combinations
      
      if (item.name.toLowerCase().includes(combination)) {
        score += combinationScore;
      }
      if (item.description.toLowerCase().includes(combination)) {
        score += Math.floor(combinationScore * 0.8);
      }
      if (item.location && item.location.toLowerCase().includes(combination)) {
        score += Math.floor(combinationScore * 0.7);
      }
      
      if (item.amenities) {
        item.amenities.forEach(amenity => {
          if (amenity.toLowerCase().includes(combination)) {
            score += Math.floor(combinationScore * 0.6);
          }
        });
      }
      if (item.activities) {
        item.activities.forEach(activity => {
          if (activity.toLowerCase().includes(combination)) {
            score += Math.floor(combinationScore * 0.6);
          }
        });
      }
    }
  });

  // Level 3: Individual keywords (lowest priority - 2-10 points)
  const individualWords = queryCombinations.filter(combo => combo.split(' ').length === 1);
  individualWords.forEach(word => {
    if (item.name.toLowerCase().includes(word)) score += 10;
    if (item.description.toLowerCase().includes(word)) score += 6;
    if (item.location && item.location.toLowerCase().includes(word)) score += 5;
    
    if (item.amenities) {
      item.amenities.forEach(amenity => {
        if (amenity.toLowerCase().includes(word)) score += 3;
      });
    }
    if (item.activities) {
      item.activities.forEach(activity => {
        if (activity.toLowerCase().includes(word)) score += 3;
      });
    }
  });

  // Bonus for exact phrase matches
  if (exactPhraseFound) {
    score += 20;
  }

  return score;
};

// Mock data for demonstration (replace with actual Supabase queries)
const getMockData = () => {
  const activities: SearchResultItem[] = [
    {
      id: 1,
      name: 'Outdoor Adventure Team Building Games',
      slug: 'outdoor-adventure-team-building-games',
      description: 'Comprehensive collection of outdoor adventure team building games including survival challenges, adventure races, and nature-based problem solving activities designed to strengthen team bonds.',
      type: 'activity',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=300',
      capacity: '10-100 people',
      duration: '4-8 hours',
      rating: '4.9',
      amenities: ['Safety Equipment', 'Professional Guides', 'First Aid', 'Transportation'],
      activities: ['Rock Climbing', 'Adventure Races', 'Survival Challenges', 'Team Navigation']
    },
    {
      id: 2,
      name: 'Adventure Team Building Outdoor Games',
      slug: 'adventure-team-building-outdoor-games',
      description: 'Exciting collection of outdoor team building games with adventure elements, featuring treasure hunts, obstacle courses, and collaborative challenges in natural settings.',
      type: 'activity',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300',
      capacity: '15-80 people',
      duration: '3-6 hours',
      rating: '4.8',
      amenities: ['Adventure Equipment', 'Safety Gear', 'Refreshments', 'Certificates'],
      activities: ['Treasure Hunt', 'Obstacle Course', 'Team Challenges', 'Adventure Games']
    },
    {
      id: 3,
      name: 'Virtual Escape Room Challenge',
      slug: 'virtual-escape-room',
      description: 'An immersive virtual escape room experience perfect for remote teams',
      type: 'activity',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300',
      capacity: '5-50 people',
      duration: '60-90 minutes',
      rating: '4.9',
      amenities: ['Digital Platform', 'Facilitator', 'Breakout Rooms'],
      activities: ['Puzzle Solving', 'Team Communication', 'Virtual Collaboration']
    }
  ];

  const venues: SearchResultItem[] = [
    {
      id: 101,
      name: 'Discovery Village Nandi Hills',
      slug: 'discovery-village-nandi-hills',
      description: 'Luxury resort with panoramic views and extensive outdoor adventure facilities.',
      type: 'venue',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
      location: 'Nandi Hills, Bangalore',
      capacity: '50-500 people',
      rating: '4.8',
      amenities: ['Adventure Sports', 'Conference Halls', 'Accommodation', 'Dining']
    },
    {
      id: 102,
      name: 'Guhantara Underground Resort',
      slug: 'guhantara-underground-resort',
      description: 'Unique underground resort offering distinctive team building experiences.',
      type: 'venue',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300',
      location: 'Bangalore',
      capacity: '30-200 people',
      rating: '4.7',
      amenities: ['Underground Caves', 'Meeting Rooms', 'Restaurant', 'Parking']
    }
  ];

  const destinations: SearchResultItem[] = [
    {
      id: 201,
      name: 'Bangalore',
      slug: 'bangalore',
      description: 'Silicon Valley of India with numerous team building venues and outdoor adventure opportunities',
      type: 'destination',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
      location: 'Karnataka, India',
      capacity: '1000+ venues available'
    },
    {
      id: 202,
      name: 'Coorg Coffee Country',
      slug: 'coorg',
      description: 'Scenic hill station perfect for outdoor team building and adventure activities',
      type: 'destination',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300',
      location: 'Karnataka, India',
      capacity: 'Multiple venues available'
    }
  ];

  return { activities, venues, destinations };
};

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    console.log('Performing enhanced search for:', query);
    
    // Simulate realistic search processing time
    await new Promise(resolve => setTimeout(resolve, 600));

    const { activities, venues, destinations } = getMockData();
    const queryLower = query.toLowerCase();

    // Calculate relevance scores
    const scoredActivities = activities.map(activity => ({
      ...activity,
      relevanceScore: calculateRelevanceScore(activity, query)
    }));

    const scoredVenues = venues.map(venue => ({
      ...venue,
      relevanceScore: calculateRelevanceScore(venue, query)
    }));

    const scoredDestinations = destinations.map(destination => ({
      ...destination,
      relevanceScore: calculateRelevanceScore(destination, query)
    }));

    // Context-aware filtering
    const selectedActivities: SearchResultItem[] = [];
    const selectedVenues: SearchResultItem[] = [];
    const selectedDestinations: SearchResultItem[] = [];

    if (queryLower.includes('virtual') || queryLower.includes('online') || queryLower.includes('remote')) {
      selectedActivities = scoredActivities
        .filter(a => a.name.toLowerCase().includes('virtual') || a.name.toLowerCase().includes('online'))
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
      selectedVenues = scoredVenues.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)).slice(0, 2);
      selectedDestinations = scoredDestinations.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)).slice(0, 2);
    } else if (queryLower.includes('outdoor') || queryLower.includes('adventure')) {
      selectedActivities = scoredActivities
        .filter(a => a.relevanceScore > 3 || 
          a.name.toLowerCase().includes('outdoor') || 
          a.name.toLowerCase().includes('adventure'))
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
        .slice(0, 3);
      selectedVenues = scoredVenues
        .filter(v => v.relevanceScore > 2 || 
          v.amenities?.some(amenity => amenity.toLowerCase().includes('outdoor') || amenity.toLowerCase().includes('adventure')))
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
        .slice(0, 3);
      selectedDestinations = scoredDestinations
        .filter(d => d.name.toLowerCase().includes('coorg') || d.name.toLowerCase().includes('bangalore'))
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    } else {
      // General search - use relevance scores
      selectedActivities = scoredActivities
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
        .slice(0, 3);
      selectedVenues = scoredVenues
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
        .slice(0, 3);
      selectedDestinations = scoredDestinations
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
        .slice(0, 3);
    }

    // Ensure minimum results
    if (selectedActivities.length === 0) {
      selectedActivities = scoredActivities.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)).slice(0, 2);
    }
    if (selectedVenues.length === 0) {
      selectedVenues = scoredVenues.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)).slice(0, 2);
    }
    if (selectedDestinations.length === 0) {
      selectedDestinations = scoredDestinations.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)).slice(0, 2);
    }

    // Generate enhanced contextual AI response
    const totalResults = selectedActivities.length + selectedVenues.length + selectedDestinations.length;
    const searchTime = Date.now() - startTime;
    let aiResponse = '';
    let confidence = 0.9;

    // Check if we have exact phrase matches
    const hasExactMatches = [...selectedActivities, ...selectedVenues, ...selectedDestinations]
      .some(item => item.relevanceScore && item.relevanceScore > 40);

    const responseQueryWords = query.split(' ').filter(word => word.length > 2);
    const isLongTailQuery = responseQueryWords.length >= 3;

    if (queryLower.includes('outdoor') && queryLower.includes('adventure') && queryLower.includes('team building')) {
      if (hasExactMatches) {
        aiResponse = `Perfect match! I found ${totalResults} options that exactly match "${query}". Our hierarchical search prioritized exact phrase matches first, then related combinations. These activities perfectly combine outdoor adventure with structured team building experiences.`;
        confidence = 0.96;
      } else {
        aiResponse = `Great results! I found ${totalResults} options for "${query}" using intelligent combination matching. While no exact phrase matches were found, these activities combine outdoor adventure elements with team building components.`;
        confidence = 0.91;
      }
    } else if (queryLower.includes('virtual') || queryLower.includes('online')) {
      aiResponse = `Excellent! I found ${totalResults} virtual and remote-friendly options for "${query}". These solutions are perfect for distributed teams.`;
      confidence = 0.92;
    } else if (queryLower.includes('outdoor') || queryLower.includes('adventure')) {
      aiResponse = `Perfect! I discovered ${totalResults} outdoor and adventure-based options for "${query}". These activities combine team building with nature experiences.`;
      confidence = 0.94;
    } else {
      if (isLongTailQuery && hasExactMatches) {
        aiResponse = `Excellent! I found ${totalResults} highly relevant options for "${query}" using our advanced hierarchical search.`;
        confidence = 0.93;
      } else {
        aiResponse = `I discovered ${totalResults} highly relevant options for "${query}". Our curated selection includes diverse activities and premium venues.`;
        confidence = 0.87;
      }
    }

    const result: SearchResult = {
      answer: aiResponse,
      activities: selectedActivities,
      venues: selectedVenues,
      destinations: selectedDestinations,
      suggestions: generateSuggestions(query),
      vectorSearchUsed: false,
      searchConfidence: confidence,
      totalResults,
      searchTime
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Enhanced search error:', error);
    
    const fallbackResult: SearchResult = {
      answer: 'I found some excellent team building options for you. Our curated selection includes diverse activities, premium venues, and exciting destinations.',
      activities: [
        {
          id: 1,
          name: 'Virtual Escape Room Challenge',
          slug: 'virtual-escape-room',
          description: 'An immersive virtual escape room experience perfect for remote teams',
          type: 'activity',
          image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300',
          capacity: '5-50 people',
          duration: '60-90 minutes',
          rating: '4.9'
        }
      ],
      venues: [
        {
          id: 101,
          name: 'Discovery Village Nandi Hills',
          slug: 'discovery-village-nandi-hills',
          description: 'Luxury resort with panoramic views and extensive facilities.',
          type: 'venue',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
          location: 'Nandi Hills, Bangalore',
          capacity: '50-500 people',
          rating: '4.8'
        }
      ],
      destinations: [
        {
          id: 201,
          name: 'Bangalore',
          slug: 'bangalore',
          description: 'Silicon Valley of India with numerous team building venues',
          type: 'destination',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
          location: 'Karnataka, India',
          capacity: '1000+ venues available'
        }
      ],
      suggestions: ['Popular team building activities', 'Corporate retreat venues', 'Team outing destinations'],
      vectorSearchUsed: false,
      searchConfidence: 0.7,
      totalResults: 3,
      searchTime: Date.now() - startTime
    };

    return NextResponse.json(fallbackResult);
  }
} 