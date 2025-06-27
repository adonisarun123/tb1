export interface Resort {
  image: string;
  title: string;
  description: string;
  rating: string;
  slug: string;
  duration: string;
  capacity: string;
  location: string;
  amenities?: string[];
  activities?: string[];
}

export const bangaloreResorts: Resort[] = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Discovery Village Nandi Hills",
    description: "Experience luxury amidst nature with panoramic views of Nandi Hills. Perfect for team retreats and corporate events.",
    rating: "4.8",
    slug: "discovery-village-nandi-hills",
    duration: "Day/Night",
    capacity: "50-500",
    location: "Nandi Hills",
    amenities: [
      "Swimming Pool",
      "Conference Hall",
      "Adventure Activities",
      "Restaurant",
      "Indoor Games"
    ],
    activities: [
      "Team Building Games",
      "Adventure Sports",
      "Nature Walks",
      "Corporate Training"
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
    title: "Guhantara Underground Resort",
    description: "India's first underground resort offering unique team building experiences in a cave-themed setting.",
    rating: "4.7",
    slug: "guhantara-underground-resort",
    duration: "Day/Night",
    capacity: "100-1000",
    location: "Kanakapura Road",
    amenities: [
      "Underground Cave Resort",
      "Wave Pool",
      "Conference Facilities",
      "Multi-cuisine Restaurant",
      "Adventure Zone"
    ],
    activities: [
      "Cave Exploration",
      "Water Activities",
      "Team Building",
      "Corporate Events"
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    title: "Clarks Exotica Convention Resort",
    description: "Premium resort with state-of-the-art convention facilities and extensive outdoor activity areas.",
    rating: "4.9",
    slug: "clarks-exotica-convention-resort",
    duration: "Day/Night",
    capacity: "200-2000",
    location: "Devanahalli",
    amenities: [
      "Convention Center",
      "Multiple Pools",
      "Spa",
      "Fine Dining",
      "Business Center"
    ],
    activities: [
      "Corporate Events",
      "Team Building",
      "Outdoor Activities",
      "Wellness Programs"
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1548704806-0c20f7ea6474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    title: "Eagleton Golf Resort",
    description: "Luxury golf resort offering premium corporate retreat experiences with world-class facilities.",
    rating: "4.8",
    slug: "eagleton-golf-resort",
    duration: "Day/Night",
    capacity: "100-1500",
    location: "Bidadi",
    amenities: [
      "Golf Course",
      "Conference Center",
      "Swimming Pool",
      "Sports Complex",
      "Luxury Accommodation"
    ],
    activities: [
      "Golf Sessions",
      "Team Building",
      "Corporate Training",
      "Sports Activities"
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Wonderla Resort",
    description: "Combine business with leisure at this unique resort adjacent to Wonderla Amusement Park.",
    rating: "4.7",
    slug: "wonderla-resort",
    duration: "Day/Night",
    capacity: "50-300",
    location: "Bidadi",
    amenities: [
      "Theme Park Access",
      "Conference Room",
      "Swimming Pool",
      "Restaurant",
      "Recreation Area"
    ],
    activities: [
      "Theme Park Activities",
      "Team Building",
      "Group Events",
      "Corporate Functions"
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Golden Palms Hotel & Spa",
    description: "Mediterranean-style resort offering extensive MICE facilities and luxury amenities.",
    rating: "4.8",
    slug: "golden-palms-hotel-and-spa",
    duration: "Day/Night",
    capacity: "150-2000",
    location: "Tumkur Road",
    amenities: [
      "Convention Center",
      "Spa & Wellness",
      "Olympic-size Pool",
      "Multiple Restaurants",
      "Sports Facilities"
    ],
    activities: [
      "Corporate Events",
      "Team Building",
      "Wellness Programs",
      "Sports Activities"
    ]
  }
]; 