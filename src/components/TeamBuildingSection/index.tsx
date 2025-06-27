import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import { FiUsers, FiClock, FiTarget, FiStar } from 'react-icons/fi';

// Reusable button component
const ViewDetailsButton = () => (
  <div className="relative h-[45px] group cursor-pointer">
    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    <div className="absolute inset-0 w-full h-full flex items-center justify-center border border-[#979797] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
      <span className="text-base font-medium font-['DM Sans'] text-[#979797] group-hover:text-white transition-colors duration-300">
        View Activity
      </span>
    </div>
  </div>
);

const GradientIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <div className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-[#FF4C39] [&>svg]:stroke-[1.5]">
      {children}
    </div>
  </div>
);

const StatIcon = ({ type }: { type: 'participants' | 'activity' | 'duration' }) => {
  const icons = {
    participants: <FiUsers className="stroke-2" />,
    activity: <FiTarget className="stroke-2" />,
    duration: <FiClock className="stroke-2" />
  };

  return <GradientIcon>{icons[type]}</GradientIcon>;
};

const StatBadge = ({ type, children }: { type: 'participants' | 'activity' | 'duration', children: React.ReactNode }) => (
  <div className="h-[32px] bg-white/90 backdrop-blur-sm rounded-[16px] flex items-center justify-center px-3 gap-2 shadow-sm hover:shadow-md transition-shadow duration-300">
    <StatIcon type={type} />
    <span className="text-[#313131] text-xs font-medium font-['Outfit'] whitespace-nowrap">{children}</span>
  </div>
);

const RatingBadge = () => (
  <div className="min-w-[60px] h-[32px] bg-white/90 backdrop-blur-sm rounded-[16px] flex items-center justify-center gap-1.5 shadow-sm px-3">
    <FiStar className="w-4 h-4 text-[#FF4C39] fill-[#FF4C39] stroke-[#FF4C39]" />
    <span className="text-[#313131] text-sm font-medium font-['Outfit']">4.8</span>
  </div>
);

export const TeamBuildingActivitiesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

  // Filter virtual team building activities
  const teamBuildingActivities = activities
    ?.filter(activity => 
      activity.activity_type === 'Virtual Team Building' || 
      activity.name?.toLowerCase().includes('virtual')
    )
    ?.map(activity => ({
      id: activity.id,
      image: activity.main_image || '/images/activity-placeholder.jpg',
      title: activity.name,
      description: activity.tagline || (activity as any).short_description || (activity.description ? `${activity.description.slice(0, 100)}...` : ''),
      slug: activity.slug,
      rating: (activity as any).rating || 4.8,
      participants: activity.group_size || '15-100',
      duration: activity.duration || '2-3 Hours',
      type: 'Virtual'
    })) || [];

  if (activitiesError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading activities: {activitiesError}</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-12" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
          <div className="flex-1 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2"
            >
              Virtual Team Building Activities
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
            >
              Connect Teams Virtually
            </motion.h2>
          </div>
        </div>

        {/* Activity Cards */}
        {activitiesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <div key={index} className="bg-[#eeeeee] rounded-[20px] overflow-hidden animate-pulse">
                <div className="p-7">
                  <div className="aspect-[386/304] rounded-[20px] bg-gray-300 mb-6" />
                  <div className="h-8 bg-gray-300 rounded mb-4" />
                  <div className="h-6 bg-gray-300 rounded mb-6" />
                </div>
              </div>
            ))}
          </div>
        ) : teamBuildingActivities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No team building activities found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {teamBuildingActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="w-full bg-[#eeeeee] rounded-[16px] hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-5 flex flex-col h-full">
                  <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden shadow-sm mb-4">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/activity-placeholder.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <RatingBadge />
                    </div>
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131] line-clamp-1">
                      {activity.title}
                    </h3>
                    <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center flex-nowrap gap-2 mt-4 overflow-x-auto pb-2">
                    <StatBadge type="participants">{activity.participants}</StatBadge>
                    <StatBadge type="activity">{activity.type}</StatBadge>
                    <StatBadge type="duration">{activity.duration}</StatBadge>
                  </div>

                  <div className="mt-4">
                    <Link to={`/team-building-activity/${activity.slug}`}>
                      <ViewDetailsButton />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-[200px]"
          >
            <Link to="/team-building-activity">
              <div className="relative h-[45px] group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
                <div className="absolute inset-0 w-full h-full flex items-center justify-center border border-[#979797] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
                  <span className="text-base font-medium font-['DM Sans'] text-[#979797] group-hover:text-white transition-colors duration-300">
                    View More Activities
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* SVG Gradient Definitions */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF4C39" />
            <stop offset="100%" stopColor="#FFB573" />
          </linearGradient>
          <linearGradient id="rating-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF4C39" />
            <stop offset="100%" stopColor="#FFB573" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default TeamBuildingActivitiesSection; 