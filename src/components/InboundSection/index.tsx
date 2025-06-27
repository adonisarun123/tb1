import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useActivities } from '../../lib/hooks/useSupabaseData';

const ViewDetailsButton = () => (
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

const ViewMoreButton = () => (
  <div className="relative h-[45px] group w-[180px]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    <button className="absolute inset-0 w-full h-full px-6 flex items-center justify-center border border-[#979797] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
      <span className="text-base font-medium font-['DM Sans'] text-[#979797] group-hover:text-white transition-colors duration-300">
        View More
      </span>
    </button>
  </div>
);

const GradientIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <svg width="0" height="0">
      <defs>
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF4C39" />
          <stop offset="100%" stopColor="#FFB573" />
        </linearGradient>
      </defs>
    </svg>
    <div className="[&>svg]:stroke-[url(#icon-gradient)]">
      {children}
    </div>
  </div>
);

const StatIcon = ({ type }: { type: 'participants' | 'outbound' | 'time' }) => {
  const icons = {
    participants: (
      <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6.66667C6.61083 6.66667 7.91667 5.36083 7.91667 3.75C7.91667 2.13917 6.61083 0.833333 5 0.833333C3.38917 0.833333 2.08333 2.13917 2.08333 3.75C2.08333 5.36083 3.38917 6.66667 5 6.66667Z" strokeWidth="1.5"/>
        <path d="M9.16667 12.5C9.16667 9.27833 7.32167 6.66667 5 6.66667C2.67833 6.66667 0.833333 9.27833 0.833333 12.5" strokeWidth="1.5"/>
      </svg>
    ),
    outbound: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 13.1667C10.4058 13.1667 13.1667 10.4058 13.1667 7C13.1667 3.59421 10.4058 0.833333 7 0.833333C3.59421 0.833333 0.833333 3.59421 0.833333 7C0.833333 10.4058 3.59421 13.1667 7 13.1667Z" strokeWidth="1.5"/>
        <path d="M7 3.33333V7L9.16667 9.16667" strokeWidth="1.5"/>
      </svg>
    ),
    time: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.25 12.75H2.5C1.53333 12.75 0.75 11.9667 0.75 11V2.5C0.75 1.53333 1.53333 0.75 2.5 0.75H11C11.9667 0.75 12.75 1.53333 12.75 2.5V6.25" strokeWidth="1.5"/>
        <path d="M4.16667 5.41667H8.75" strokeWidth="1.5"/>
        <path d="M4.16667 8.33333H6.25" strokeWidth="1.5"/>
      </svg>
    )
  };

  return <GradientIcon>{icons[type]}</GradientIcon>;
};

const RatingBadge = () => (
  <div className="min-w-[60px] h-[24px] bg-white rounded-[16px] flex items-center justify-center shadow-sm px-3">
    <span className="text-[#313131] text-sm font-medium font-['Outfit']">4.6</span>
  </div>
);

const StatBadge = ({ type, children }: { type: 'participants' | 'outbound' | 'time', children: React.ReactNode }) => (
  <div className="h-[24px] bg-white rounded-[16px] flex items-center justify-center px-3 gap-1.5 shadow-sm hover:shadow-md transition-shadow duration-300">
    <StatIcon type={type} />
    <span className="text-[#313131] text-sm font-medium font-['Outfit'] whitespace-nowrap">{children}</span>
  </div>
);

const InboundSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

  // Filter indoor activities and take 3 random ones
  const indoorExperiences = activities
    ?.filter(activity => activity.activity_type?.toLowerCase().includes('indoor'))
    ?.sort(() => Math.random() - 0.5)
    ?.slice(0, 3)
    ?.map(activity => ({
      image: activity.main_image,
      title: activity.name,
      description: activity.tagline,
      slug: activity.slug,
      stats: {
        participants: activity.group_size || '20-1000',
        duration: activity.activity_type || 'Indoor',
        difficulty: activity.duration || '6H Min'
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
              Top Indoor Experiences
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
            >
              Explore Indoor Adventures.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6"
          >
            Discover exciting indoor team building activities and experiences designed to strengthen bonds and create lasting memories.
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
            {indoorExperiences.map((experience, index) => (
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
                  
                  <div className="flex items-center gap-3 mt-4">
                    <StatBadge type="participants">{experience.stats.participants}</StatBadge>
                    <StatBadge type="outbound">{experience.stats.duration}</StatBadge>
                    <StatBadge type="time">{experience.stats.difficulty}</StatBadge>
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
            <a href="/team-building-activity?type=indoor">
              <ViewMoreButton />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InboundSection;
