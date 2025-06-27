import React from 'react';
import ResortCard from './ResortCard';

const CorporateTeamOutingBangalore = () => {
  // Resort data from Supabase
  const resorts = [
    {
      id: 34,
      name: "Angsana Oasis Spa And Resort",
      location: "Main, Doddaballapur Main Rd, Northwest County, Adde Vishwanathapura, Rajanukunte, Karnataka 560064",
      description: "The Angsana Oasis Spa and Resort stands as a luxurious haven nestled amidst nature's splendor, offering the perfect retreat for those seeking a harmonious blend of relaxation, indulgence, and rejuvenation.",
      image: "https://uploads-ssl.webflow.com/65e2e78d061034866949e5e6/667bb3392ef392278f0abb2d_Angsana%20Top%20View.jpg",
      facilities: [
        "World-class spa with private treatment rooms",
        "Infinity pool overlooking lush landscapes",
        "Fully-equipped fitness center",
        "Multiple dining venues",
        "Conference and event spaces"
      ],
      activities: [
        "Yoga and meditation sessions",
        "Guided nature walks",
        "Cooking classes",
        "Traditional craft workshops",
        "Sunset cocktail cruises"
      ]
    },
    {
      id: 545,
      name: "The Gold Coin Resort",
      location: "The Gold Coin Resort, Tranquil Lane, Bangalore - 560054",
      description: "The Gold Coin Resort Bangalore, where tranquility meets luxury, creating an oasis of bliss for those seeking an escape from the ordinary.",
      image: "https://uploads-ssl.webflow.com/65e2e78d061034866949e5e6/65e5c6c4732c160c8a428889_658bb96dff902effa2b9b4d6_05c875926aa611eab3e20242ac11000c.jpeg",
      facilities: [
        "Luxurious Rooms and Cottages",
        "Private Balconies with Scenic Views",
        "In-Room Dining Services",
        "Modern Amenities",
        "24/7 Concierge Assistance"
      ],
      activities: [
        "Swimming Pool",
        "Wellness Spa",
        "Outdoor Sports Courts",
        "Yoga and Meditation Pavilion",
        "Nature Walks"
      ]
    },
    {
      id: 77,
      name: "Chairman's Club Resort",
      location: "Chairman's Club Resort, Elegance Avenue, Bangalore - 560102",
      description: "Experience a world of elegance and tranquility at Chairman's Club Resort in Bangalore. This distinguished resort seamlessly combines timeless elegance with modern amenities.",
      image: "https://uploads-ssl.webflow.com/65e2e78d061034866949e5e6/65e5c67cb92a97c94ce4bec3_658bd4b66556372672cee64d_658bcbce91a9e3f9f0666363_chairman-s-resort.jpeg",
      facilities: [
        "Well-Appointed Rooms and Suites",
        "Modern Decor and Premium Furnishings",
        "In-Room Dining Services",
        "Concierge Assistance",
        "Complimentary Wi-Fi"
      ],
      activities: [
        "Grand Banquet Halls",
        "Conference Rooms with Modern Amenities",
        "Event Planning Services"
      ]
    },
    {
      id: 90,
      name: "Clarks Exotica Airport Road",
      location: "Clarks Exotica Airport Road, Bangalore",
      description: "Discover the charm of Clarks Exotica Airport Road - an ideal destination for team outings and corporate retreats. Nestled amidst serene landscapes, this resort offers a blend of luxury and relaxation.",
      image: "https://uploads-ssl.webflow.com/65e2e78d061034866949e5e6/65e5c682f87da77dd61230b8_658d38bab35609077949e9cc_Clarks%2520Exotica%2520Airport%2520Road.webp",
      facilities: [
        "24-hour front desk",
        "Audio/Visual Equipment",
        "Banquet facilities",
        "Bar/Lounge",
        "Free Parking",
        "Restaurant"
      ],
      activities: [
        "Zen Spa",
        "Adventure Challenges",
        "Culinary Workshops",
        "Nature Trails",
        "Aqua Games"
      ]
    },
    {
      id: 187,
      name: "Golden Palms Resort",
      location: "Golden Palms Resort, Tumkur Road, Bangalore",
      description: "Golden Palms Resort on Tumkur Road stands as an emblem of luxury and comfort in the heart of Bangalore. A prime choice for team outings and corporate getaways.",
      image: "https://uploads-ssl.webflow.com/65e2e78d061034866949e5e6/65e5c69164de3f96ae7dcccb_6523b453aeeb16df64a91747_6522f3676255a39c3d1a87d1_Slide7.jpeg",
      facilities: [
        "24-hour front desk",
        "Wellness Spa",
        "Banquet facilities",
        "Bar/Lounge",
        "Multi-cuisine Restaurant"
      ],
      activities: [
        "Thermal Spa",
        "Aqua Zumba",
        "Conference Halls",
        "Culinary Feasts",
        "Fitness Gym"
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Corporate Team Outing Places in and around Bangalore</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resorts.map((resort) => (
            <ResortCard
              key={resort.id}
              name={resort.name}
              location={resort.location}
              description={resort.description}
              image={resort.image}
              facilities={resort.facilities}
              activities={resort.activities}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CorporateTeamOutingBangalore; 