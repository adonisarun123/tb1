import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useSupabaseActivities } from '../../hooks/useSupabaseActivities';


const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { activities, loading, error } = useSupabaseActivities();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedGroupSize, setSelectedGroupSize] = useState('');

  // Filter activities based on search and filters
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.tagline?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !selectedType || activity.activity_type?.toLowerCase() === selectedType.toLowerCase();
      
      const matchesGroupSize = !selectedGroupSize || activity.group_size?.toLowerCase().includes(selectedGroupSize.toLowerCase());

      return matchesSearch && matchesType && matchesGroupSize;
    });
  }, [activities, searchTerm, selectedType, selectedGroupSize]);

  const getActivityIcon = (activityType: string) => {
    switch (activityType?.toLowerCase()) {
      case 'virtual':
        return '💻';
      case 'outbound':
        return '🏔️';
      case 'indoor':
        return '🏢';
      case 'outdoor':
        return '🌳';
      case 'team building':
        return '🎯';
      default:
        return '🎮';
    }
  };

  const getActivityColor = (index: number) => {
    const colors = [
      'from-blue-50 to-blue-100 border-blue-200',
      'from-green-50 to-green-100 border-green-200',
      'from-purple-50 to-purple-100 border-purple-200',
      'from-orange-50 to-orange-100 border-orange-200',
      'from-pink-50 to-pink-100 border-pink-200',
      'from-indigo-50 to-indigo-100 border-orange-200'
    ];
    return colors[index % colors.length];
  };

  const getTextColor = (index: number) => {
    const colors = ['text-[#FF4C39]', 'text-green-600', 'text-purple-600', 'text-orange-600', 'text-pink-600', 'text-[#FF4C39]'];
    return colors[index % colors.length];
  };

  // Get unique activity types for filter
  const activityTypes = [...new Set(activities.map(a => a.activity_type).filter(Boolean))];
  const groupSizes = [...new Set(activities.map(a => a.group_size).filter(Boolean))];

  const handleActivityClick = (activity: any) => {
    if (activity.slug) {
      navigate(`/team-building-activity/${activity.slug}`);
    } else {
      // Fallback to generic activity detail page with ID
      navigate(`/activity/${activity.id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Team Building Activities | Trebound</title>
        <meta 
          name="description" 
          content="Discover our comprehensive collection of team building activities. From virtual games to outdoor adventures, find the perfect experience for your team."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Team Building <span className="text-[#FF4C39]">Activities</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Discover our comprehensive collection of engaging activities designed to strengthen team bonds, 
                improve collaboration, and create lasting memories.
              </p>

              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      {activityTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <select
                      value={selectedGroupSize}
                      onChange={(e) => setSelectedGroupSize(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Any Size</option>
                      {groupSizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">Error loading activities: {error}</div>
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
                    Showing {filteredActivities.length} of {activities.length} activities
                  </p>
                </div>

                {filteredActivities.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedType('');
                        setSelectedGroupSize('');
                      }}
                      className="text-[#FF4C39] hover:text-[#FF4C39] font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredActivities.map((activity, index) => (
                      <div 
                        key={activity.id} 
                        onClick={() => handleActivityClick(activity)}
                        className={`group bg-gradient-to-br ${getActivityColor(index)} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border transform hover:scale-105`}
                      >
                        <div className="text-4xl mb-4">
                          {getActivityIcon(activity.activity_type)}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {activity.name}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {activity.tagline || activity.description}
                        </p>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-medium ${getTextColor(index)}`}>
                            {activity.group_size || 'Any Size'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {activity.duration || 'Flexible'}
                          </span>
                        </div>
                        {activity.location && (
                          <div className="mb-2">
                            <span className="text-xs text-gray-500">📍 {activity.location}</span>
                          </div>
                        )}
                        {activity.activity_type && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <span className="inline-block bg-white/50 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                              {activity.activity_type}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Team?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let our experts help you choose the perfect activities for your team's needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#FF4C39] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg">
                📞 Get Expert Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#FF4C39] transition-colors text-lg">
                📋 Download Activity Guide
              </button>
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default ActivitiesPage; 