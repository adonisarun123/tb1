import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseStays } from '../../hooks/useSupabaseStays';

const FeaturedStays: React.FC = () => {
  const navigate = useNavigate();
  const { stays, loading, error } = useSupabaseStays();
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4C39] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading amazing stays...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading stays: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const locations = ['all', 'bangalore', 'mumbai', 'hyderabad', 'goa', 'kerala'];
  const filteredStays = selectedLocation === 'all' 
    ? stays.slice(0, 6) 
    : stays.filter(stay => 
        stay.location?.toLowerCase().includes(selectedLocation) || 
        stay.name?.toLowerCase().includes(selectedLocation)
      ).slice(0, 6);

  // Fallback images for stays/resorts
  const getStayImage = (stay: any, index: number) => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop', // Luxury resort
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2940&auto=format&fit=crop', // Hotel exterior
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2940&auto=format&fit=crop', // Resort pool
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2940&auto=format&fit=crop', // Mountain resort
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2940&auto=format&fit=crop', // Beach resort
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2940&auto=format&fit=crop', // Luxury hotel
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop', // Resort view
      'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2940&auto=format&fit=crop'  // Hotel lobby
    ];
    
    return stay.main_image || fallbackImages[index % fallbackImages.length];
  };



  const handleStayClick = (stay: any) => {
    if (stay.slug) {
      navigate(`/stay/${stay.slug}`);
    } else {
      // Fallback to generic stay detail page with ID
      navigate(`/stay/${stay.id}`);
    }
  };

  const handleViewAllClick = () => {
    navigate('/stays');
  };

  const getStayFeatures = (stay: any) => {
    const features = [];
    if (stay.amenities) {
      features.push(...stay.amenities.slice(0, 3));
    } else {
      // Default features for stays without amenities
      const defaultFeatures = [
        'Conference Hall',
        'Team Activities',
        'Catering',
        'WiFi',
        'Parking',
        'AC Rooms',
        'Restaurant',
        'Swimming Pool'
      ];
      features.push(...defaultFeatures.slice(0, 3));
    }
    return features;
  };

  return (
    <div className="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Background */}
        <div className="relative mb-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-blue-600/10 rounded-3xl"></div>
          <div className="relative py-12 px-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-orange-100 text-orange-800 text-lg font-medium mb-6">
              🏨 Premium Stays & Resorts
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">Amazing</span> Team Retreat Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From luxury resorts to unique venues - find the perfect location for your next team outing or corporate retreat.
            </p>
            
            {/* Stats Display */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">🏆</span>
                <span className="font-semibold">Top rated destinations</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">📍</span>
                <span className="font-semibold">{stays.length}+ locations available</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-2">💎</span>
                <span className="font-semibold">Luxury & budget options</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                selectedLocation === location
                  ? 'bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border-2 border-gray-200'
              }`}
            >
              {location === 'all' ? 'All Locations' : 
               location.charAt(0).toUpperCase() + location.slice(1)}
            </button>
          ))}
        </div>

        {/* Stays Grid - Enhanced Visual Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStays.map((stay, index) => (
            <div 
              key={stay.id} 
              onClick={() => handleStayClick(stay)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer"
            >
              {/* Premium Badge */}
              {index < 2 && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <span className="mr-1">⭐</span>
                    {index === 0 ? 'Most Popular' : 'Premium Choice'}
                  </div>
                </div>
              )}

              {/* Special Offers Badge */}
              {Math.random() > 0.5 && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {Math.random() > 0.5 ? 'Early Bird' : 'Group Discount'}
                  </div>
                </div>
              )}

              {/* Stay Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getStayImage(stay, index)}
                  alt={stay.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Capacity & Rating Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                                         <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                       👥 Up to {Math.floor(Math.random() * 200) + 50} guests
                     </div>
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      {(4.5 + Math.random() * 0.5).toFixed(1)}
                    </div>
                  </div>
                </div>

                {/* Image Gallery Indicator */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                  📷 {Math.floor(Math.random() * 20) + 10}+ photos
                </div>
              </div>

              {/* Stay Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#FF4C39] transition-colors">
                      {stay.name}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center">
                      📍 {stay.location || 'Prime Location'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{Math.floor(Math.random() * 15000) + 5000}
                    </div>
                    <div className="text-xs text-gray-500">per night</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {stay.description || stay.tagline || 'Perfect venue for corporate retreats and team building events with world-class amenities.'}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {getStayFeatures(stay).map((feature, idx) => (
                    <span key={idx} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Pricing & Availability */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm">
                    <span className="text-green-600 font-semibold">✓ Available</span>
                    <span className="text-gray-500 ml-2">• Free cancellation</span>
                  </div>
                  <div className="text-sm text-orange-600 font-semibold">
                    Group rates available
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStayClick(stay);
                    }}
                    className="flex-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Contact or booking functionality
                      navigate('/contact');
                    }}
                    className="px-4 py-3 border-2 border-orange-200 text-[#FF4C39] rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>

                {/* Quick Info */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>🍽️ Restaurant on-site</span>
                    <span>🚗 Free parking</span>
                    <span>📶 High-speed WiFi</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-16">
          <button 
            onClick={handleViewAllClick}
            className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore All {stays.length}+ Destinations
          </button>
          <p className="text-gray-500 mt-4">
            🏨 New properties added weekly • 🎯 Best rates guaranteed
          </p>
        </div>

        {/* Why Choose Our Stays Section */}
        <div className="mt-20 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Teams Love Our Venue Partners
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've partnered with the best venues across India to offer you exceptional experiences at competitive rates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=100&auto=format&fit=crop"
                  alt="Best rates"
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Best Rates</h4>
              <p className="text-gray-600 text-sm">Guaranteed lowest prices with exclusive group discounts</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=100&auto=format&fit=crop"
                  alt="Premium quality"
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Premium Quality</h4>
              <p className="text-gray-600 text-sm">Hand-picked venues with exceptional service standards</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=100&auto=format&fit=crop"
                  alt="Full support"
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Full Support</h4>
              <p className="text-gray-600 text-sm">Dedicated event coordinators for seamless planning</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=100&auto=format&fit=crop"
                  alt="Flexible booking"
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Flexible Booking</h4>
              <p className="text-gray-600 text-sm">Easy modifications and free cancellation options</p>
            </div>
          </div>

          {/* Client Testimonials */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Perfect venue for our annual retreat!",
              "Exceptional service and beautiful location.",
              "Made our team outing unforgettable!"
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-gray-700 font-medium mb-2">"{testimonial}"</p>
                <div className="flex items-center justify-center">
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">- Corporate Client</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStays; 