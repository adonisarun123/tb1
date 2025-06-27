// Mock search API for the original React project
// This is a temporary solution - the real implementation is in the Next.js project

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

// Mock search function
export const searchAll = async (query: string): Promise<SearchResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock response
  return {
    answer: `Here are some great options for "${query}". For the full Next.js experience with real search functionality, please run the Next.js project instead.`,
    activities: [
      {
        id: '1',
        name: 'Virtual Team Building Workshop',
        description: 'Engaging online activities for remote teams',
        type: 'activity',
        slug: 'virtual-team-building-workshop',
        rating: '4.8',
        price: '₹2,500 per person',
        duration: '2-3 hours',
        capacity: '10-50 people',
        relevanceScore: 0.9
      }
    ],
    venues: [
      {
        id: '2',
        name: 'Corporate Retreat Resort',
        description: 'Perfect venue for team outings',
        type: 'venue',
        slug: 'corporate-retreat-resort',
        rating: '4.6',
        location: 'Bangalore',
        amenities: ['Conference Room', 'Outdoor Activities'],
        relevanceScore: 0.8
      }
    ],
    destinations: [
      {
        id: '3',
        name: 'Bangalore Team Outings',
        description: 'Best team outing destinations in Bangalore',
        type: 'destination',
        slug: 'bangalore-team-outings',
        relevanceScore: 0.7
      }
    ],
    suggestions: [
      'Try running the Next.js project for full functionality',
      'Virtual team building activities',
      'Corporate team outing venues'
    ],
    vectorSearchUsed: false,
    searchConfidence: 0.8,
    totalResults: 3,
    searchTime: 500
  };
}; 