import React, { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import { Helmet } from 'react-helmet-async';
import { useSupabaseStays } from '../../hooks/useSupabaseStays';
import { useNavigate } from 'react-router-dom';



// Removed unused components - functionality moved to main component

const StaysPage: React.FC = () => {
  const navigate = useNavigate();
  const { stays, loading, error } = useSupabaseStays();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Filter stays based on search and filters
  const filteredStays = useMemo(() => {
    return stays.filter(stay => {
      const matchesSearch = stay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stay.stay_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stay.location?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !selectedLocation || stay.location?.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesType = !selectedType || stay.destination?.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [stays, searchTerm, selectedLocation, selectedType]);

  const getStayIcon = (stayType: string) => {
    switch (stayType?.toLowerCase()) {
      case 'resort':
        return '🏖️';
      case 'hotel':
        return '🏨';
      case 'villa':
        return '🏡';
      case 'farmhouse':
        return '🏠';
      case 'camp':
        return '⛺';
      default:
        return '🏨';
    }
  };

  // Removed unused getStayColor function

  const getTextColor = (index: number) => {
    const colors = ['text-[#FF4C39]', 'text-green-600', 'text-purple-600', 'text-orange-600', 'text-pink-600', 'text-[#FF4C39]'];
    return colors[index % colors.length];
  };

  // Get unique locations and types for filters
  const locations = [...new Set(stays.map(s => s.location).filter(Boolean))];
  const stayTypes = [...new Set(stays.map(s => s.destination || 'Resort').filter(Boolean))];

  const handleStayClick = (stay: any) => {
    if (stay.slug) {
      navigate(`/stay/${stay.slug}`);
    } else {
      // Fallback to generic stay detail page with ID
      navigate(`/stay/${stay.id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Team Outing Stays & Destinations | Trebound</title>
        <meta 
          name="description" 
          content="Discover amazing stays and destinations for your team outings. From luxury resorts to adventure camps, find the perfect venue for your team building experience."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Amazing <span className="text-[#FF4C39]">Stays</span> & Destinations
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Find the perfect venue for your team outing. From luxury resorts to adventure camps, 
                we have handpicked destinations that create unforgettable experiences.
              </p>

              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Search stays..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      {stayTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stays Grid */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">Error loading stays: {error}</div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-6 py-2 rounded-lg hover:opacity-90"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="mb-8">
                  <p className="text-gray-600">
                    Showing {filteredStays.length} of {stays.length} stays
                  </p>
                </div>

                {filteredStays.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🏨</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No stays found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedLocation('');
                        setSelectedType('');
                      }}
                      className="text-[#FF4C39] hover:text-[#FF4C39] font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredStays.map((stay, index) => (
                      <div 
                        key={stay.id} 
                        onClick={() => handleStayClick(stay)}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          {stay.stay_image ? (
                            <img
                              src={stay.stay_image}
                              alt={stay.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <span className="text-4xl">{getStayIcon(stay.destination || 'resort')}</span>
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <span className={`bg-white/90 px-3 py-1 rounded-full text-sm font-medium ${getTextColor(index)}`}>
                              {stay.destination || 'Stay'}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                            {stay.name}
                          </h3>
                          
                          {stay.location && (
                            <div className="flex items-center text-gray-600 mb-3">
                              <span className="text-sm">📍 {stay.location}</span>
                            </div>
                          )}

                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {stay.stay_description || stay.tagline || 'A perfect destination for your team outing experience.'}
                          </p>

                          <div className="flex items-center justify-between">
                            {stay.price && (
                              <div className="text-lg font-bold text-[#FF4C39]">
                                {stay.price}
                              </div>
                            )}
                            
                            {stay.total_room_value && (
                              <div className="text-sm text-gray-500">
                                {stay.total_room_value}
                              </div>
                            )}
                          </div>

                          {stay.facilities && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                  {stay.facilities.substring(0, 50)}...
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Stays?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We carefully select each destination to ensure your team has an exceptional experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  Handpicked destinations that meet our high standards for comfort and service.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team-Focused</h3>
                <p className="text-gray-600">
                  Venues designed with team activities and group experiences in mind.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Value</h3>
                <p className="text-gray-600">
                  Competitive pricing with transparent costs and no hidden fees.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Support</h3>
                <p className="text-gray-600">
                  Complete assistance from booking to checkout for a hassle-free experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Book Your Perfect Stay?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let our experts help you find the ideal destination for your team outing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#FF4C39] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg">
                📞 Get Expert Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#FF4C39] transition-colors text-lg">
                📋 Request Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StaysPage; 