import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

// Mock data for demonstration
const getActivityBySlug = async (slug: string) => {
  const activities = [
    {
      id: 1,
      name: 'Outdoor Adventure Team Building Games',
      slug: 'outdoor-adventure-team-building-games',
      description: 'Comprehensive outdoor adventure activities',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
      capacity: '10-100 people',
      duration: '4-8 hours',
      rating: '4.9',
      price: 'Starting from ₹2,500 per person'
    },
    {
      id: 2,
      name: 'Virtual Escape Room Challenge',
      slug: 'virtual-escape-room',
      description: 'An immersive virtual escape room experience perfect for remote teams',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800',
      capacity: '5-50 people',
      duration: '60-90 minutes',
      rating: '4.9',
      price: 'Starting from ₹800 per person',
      amenities: ['Digital Platform', 'Facilitator', 'Breakout Rooms'],
      activities: ['Puzzle Solving', 'Team Communication', 'Virtual Collaboration']
    }
  ];

  return activities.find(activity => activity.slug === slug);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = await getActivityBySlug(params.slug);
  
  if (!activity) {
    return {
      title: 'Activity Not Found - Trebound',
    };
  }

  return {
    title: `${activity.name} - Trebound Team Building`,
    description: activity.description,
    openGraph: {
      title: activity.name,
      description: activity.description,
      images: [activity.image],
    },
  };
}

export default async function ActivityPage({ params }: Props) {
  const activity = await getActivityBySlug(params.slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">{activity.name}</h1>
            <p className="text-xl lg:text-2xl opacity-90">{activity.description}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Activity</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {activity.description}
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {activity.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.activities?.map((act, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#FF4C39] mb-2">{activity.price}</div>
                  <div className="text-gray-600">Per person</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">{activity.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{activity.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium flex items-center">
                      ⭐ {activity.rating}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300">
                  Book Now
                </button>

                <button className="w-full mt-4 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-medium hover:border-[#FF4C39] hover:text-[#FF4C39] transition-all duration-300">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 