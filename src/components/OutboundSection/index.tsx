import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import { FiUsers, FiClock, FiStar, FiTarget } from 'react-icons/fi';
import type { Activity } from '../../lib/supabaseClient';

interface ViewDetailsButtonProps {
  onClick?: () => void;
}

interface StatIconProps {
  type: 'participants' | 'activity' | 'duration' | 'difficulty';
}

interface StatBadgeProps extends StatIconProps {
  children: React.ReactNode;
}

interface Experience {
  image: string;
  title: string;
  description: string;
  slug: string;
  stats: {
    participants: string;
    duration: string;
    difficulty: string;
  };
}

const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = () => (
  <div className="relative w-full h-[45px] group">
    {/* Gradient background that shows on hover */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    
    {/* Button border and text */}
    <button className="absolute inset-0 w-full h-full flex items-center justify-center border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
      <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">
        View Details
      </span>
    </button>
  </div>
);

const ViewMoreButton: React.FC = () => (
  <div className="relative h-[45px] group">
    {/* Gradient background that shows on hover */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    
    {/* Button border and text */}
    <button className="absolute inset-0 w-full h-full px-8 flex items-center justify-center border border-[#979797] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
      <span className="text-base font-medium font-['DM Sans'] text-[#979797] group-hover:text-white transition-colors duration-300">
        View More
      </span>
    </button>
  </div>
);

const GradientIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative">
    <div className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-[#FF4C39] [&>svg]:stroke-[1.5]">
      {children}
    </div>
  </div>
);

const StatIcon: React.FC<StatIconProps> = ({ type }) => {
  const icons = {
    participants: <FiUsers className="stroke-2" />,
    activity: <FiTarget className="stroke-2" />,
    duration: <FiClock className="stroke-2" />,
    difficulty: <FiClock className="stroke-2" />
  };

  return <GradientIcon>{icons[type]}</GradientIcon>;
};

const RatingBadge: React.FC = () => (
  <div className="min-w-[60px] h-[32px] bg-white/90 backdrop-blur-sm rounded-[16px] flex items-center justify-center gap-1.5 shadow-sm px-3">
    <FiStar className="w-4 h-4 text-[#FF4C39] fill-[#FF4C39] stroke-[#FF4C39]" />
    <span className="text-[#313131] text-sm font-medium font-['Outfit']">4.8</span>
  </div>
);

const StatBadge: React.FC<StatBadgeProps> = ({ type, children }) => (
  <div className="h-[32px] bg-white/90 backdrop-blur-sm rounded-[16px] flex items-center justify-center px-3 gap-2 shadow-sm hover:shadow-md transition-shadow duration-300 whitespace-nowrap">
    <StatIcon type={type} />
    <span className="text-[#313131] text-xs font-medium font-['Outfit']">{children}</span>
  </div>
);

const OutboundSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

  // Filter outbound activities and take 3 random ones
  const outboundExperiences: Experience[] = React.useMemo(() => {
    return (activities || [])
      .filter((activity): activity is Activity => 
        activity !== null &&
        typeof activity === 'object' &&
        'activity_type' in activity &&
        activity.activity_type === 'Outbound'
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(activity => ({
        image: activity.main_image || '',
        title: activity.name,
        description: activity.tagline || '',
        slug: activity.slug,
        stats: {
          participants: activity.group_size || '20-1000',
          duration: activity.activity_type || 'Outbound',
          difficulty: activity.duration || '6H Min'
        }
      }));
  }, [activities]);

  if (activitiesError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading experiences: {activitiesError}</p>
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
              Top Outbound Experiences
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
            >
              Explore Beyond Borders.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6"
          >
            Discover new horizons and immerse yourself in diverse cultures with our curated travel experiences.
          </motion.p>
        </div>

        {/* Experience Cards */}
        {activitiesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-[#eeeeee] rounded-[20px] overflow-hidden animate-pulse">
                <div className="p-7">
                  <div className="aspect-[386/304] rounded-[20px] bg-gray-300 mb-6" />
                  <div className="h-8 bg-gray-300 rounded mb-4" />
                  <div className="h-6 bg-gray-300 rounded mb-6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {outboundExperiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="w-full bg-[#eeeeee] rounded-[16px] hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-5 flex flex-col h-full">
                  <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden shadow-sm mb-4">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <RatingBadge />
                    </div>
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131] line-clamp-1">
                      {experience.title}
                    </h3>
                    <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">
                      {experience.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 justify-start mt-4">
                    <StatBadge type="participants">{experience.stats.participants}</StatBadge>
                    <StatBadge type="activity">{experience.stats.duration}</StatBadge>
                    <StatBadge type="duration">{experience.stats.difficulty}</StatBadge>
                  </div>

                  <div className="mt-4">
                    <a href={`/team-building-activity/${experience.slug}`}>
                      <ViewDetailsButton />
                    </a>
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
            <a href="/team-building-activity">
              <ViewMoreButton />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const VirtualActivitiesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

  // Filter virtual activities and take 3 random ones
  const virtualExperiences = activities
    ?.filter(activity => activity.activity_type === 'Virtual')
    ?.sort(() => Math.random() - 0.5)
    ?.slice(0, 3)
    ?.map(activity => ({
      image: activity.main_image,
      title: activity.name,
      description: activity.tagline,
      slug: activity.slug,
      stats: {
        participants: activity.group_size || '20-1000',
        activity: activity.activity_type || 'Virtual',
        duration: activity.duration || '1H Min'
      }
    })) || [];

  if (activitiesError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading experiences: {activitiesError}</p>
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6"
          >
            Build stronger connections and foster collaboration among your remote team members through our interactive virtual experiences.
          </motion.p>
        </div>

        {/* Experience Cards */}
        {activitiesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-[#eeeeee] rounded-[20px] overflow-hidden animate-pulse">
                <div className="p-7">
                  <div className="aspect-[386/304] rounded-[20px] bg-gray-300 mb-6" />
                  <div className="h-8 bg-gray-300 rounded mb-4" />
                  <div className="h-6 bg-gray-300 rounded mb-6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {virtualExperiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="w-full bg-[#eeeeee] rounded-[16px] hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-5 flex flex-col h-full">
                  <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden shadow-sm mb-4">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <RatingBadge />
                    </div>
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131] line-clamp-1">
                      {experience.title}
                    </h3>
                    <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">
                      {experience.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 min-h-[32px]">
                    <StatBadge type="participants">{experience.stats.participants}</StatBadge>
                    <StatBadge type="activity">{experience.stats.activity}</StatBadge>
                    <StatBadge type="duration">{experience.stats.duration}</StatBadge>
                  </div>

                  <div className="mt-4">
                    <a href={`/team-building-activity/${experience.slug}`}>
                      <ViewDetailsButton />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More Activities Button */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-[200px]"
          >
            <a href="/team-building-activity">
              <ViewMoreButton />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const OutboundActivitiesSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

  // Filter outbound activities and take 3 random ones
  const outboundActivities = activities
    ?.filter(activity => activity.activity_type === 'Outbound')
    ?.sort(() => Math.random() - 0.5)
    ?.slice(0, 3)
    ?.map(activity => ({
      image: activity.main_image,
      title: activity.name,
      description: activity.tagline,
      slug: activity.slug,
      stats: {
        participants: activity.group_size || '15-150',
        duration: activity.activity_type || 'Outbound',
        difficulty: activity.duration || '2 hrs'
      }
    })) || [];

  if (activitiesError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading activities: {activitiesError}</p>
      </div>
    );
  }

  return (
    <section ref={ref} className="w-full bg-white py-12">
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
              Top Outbound Activities
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
            >
              Explore Beyond Boundaries.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6"
          >
            Engage your teams with exciting outdoor experiences designed to build stronger bonds and create lasting memories.
          </motion.p>
        </div>

        {/* Activity Cards Grid */}
        {activitiesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-[#eeeeee] rounded-[20px] overflow-hidden animate-pulse">
                <div className="p-7">
                  <div className="aspect-[386/304] rounded-[20px] bg-gray-300 mb-6" />
                  <div className="h-8 bg-gray-300 rounded mb-4" />
                  <div className="h-6 bg-gray-300 rounded mb-6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {outboundActivities.map((activity, index) => (
              <motion.div
                key={index}
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
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <StatBadge type="participants">{activity.stats.participants}</StatBadge>
                    <StatBadge type="duration">{activity.stats.duration}</StatBadge>
                    <StatBadge type="difficulty">{activity.stats.difficulty}</StatBadge>
                  </div>

                  <div className="mt-4">
                    <a href={`/team-building-activity/${activity.slug}`}>
                      <ViewDetailsButton />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Activities Button */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-[200px]"
          >
            <a href="/team-building-activity">
              <ViewMoreButton />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { OutboundSection as default, OutboundActivitiesSection };
