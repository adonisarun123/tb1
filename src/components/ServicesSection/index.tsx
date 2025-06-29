import { useState } from 'react';
import { motion } from 'framer-motion';
import { useActivities, useStays, useCustomizedTrainings } from '../../lib/hooks/useSupabaseData';
import { FiArrowRight, FiTarget, FiHome, FiAward, FiMapPin, FiClock, FiUsers, FiStar } from 'react-icons/fi';

// Helper function to extract plain text from HTML
const extractTextFromHtml = (html: string) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

type TabId = 'stays' | 'activities' | 'trainings';

interface TabInfo {
  id: TabId;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface BaseCardContent {
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface StayCardContent extends BaseCardContent {
  type: 'stay';
  location: string;
}

interface ActivityCardContent extends BaseCardContent {
  type: 'activity' | 'training';
  participants: string;
  duration: string;
  time: string;
}

type CardContent = StayCardContent | ActivityCardContent;

const tabs: TabInfo[] = [
  {
    id: 'stays',
    title: 'Stays',
    description: 'Luxurious accommodations and resorts perfect for team offsites and bonding',
    icon: <FiHome className="w-4 h-4" />
  },
  {
    id: 'activities',
    title: 'Activities',
    description: 'Engaging outdoor and indoor activities designed to strengthen team dynamics',
    icon: <FiTarget className="w-4 h-4" />
  },
  {
    id: 'trainings',
    title: 'Trainings',
    description: 'Specialized programs to enhance team skills and performance',
    icon: <FiAward className="w-4 h-4" />
  }
];

const ExploreButton = ({ slug, text = "Explore" }: { slug: string; text?: string }) => (
  <div className="relative w-full h-[45px] group">
    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    <a 
      href={`/${slug}`}
      className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300"
    >
      <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">
        {text}
      </span>
      <FiArrowRight className="w-4 h-4 text-[#b1b1b1] group-hover:text-white transition-colors duration-300" />
    </a>
  </div>
);

const RatingBadge = () => (
  <div className="min-w-[60px] h-[24px] bg-white rounded-[16px] flex items-center justify-center gap-1 shadow-sm px-3">
    <FiStar className="w-3 h-3 text-[#FF4C39] fill-[#FF4C39]" />
    <span className="text-[#313131] text-sm font-medium font-['Outfit']">4.6</span>
  </div>
);

const StatBadge = ({ type, children }: { type: 'participants' | 'outbound' | 'time' | 'location', children: React.ReactNode }) => (
  <div className="h-[24px] bg-white rounded-[16px] flex items-center justify-center px-3 gap-1.5 shadow-sm hover:shadow-md transition-shadow duration-300">
    {type === 'participants' && <FiUsers className="w-4 h-4 text-[#FF4C39]" />}
    {type === 'outbound' && <FiTarget className="w-4 h-4 text-[#FF4C39]" />}
    {type === 'time' && <FiClock className="w-4 h-4 text-[#FF4C39]" />}
    {type === 'location' && <FiMapPin className="w-4 h-4 text-[#FF4C39]" />}
    <span className="text-[#313131] text-sm font-medium font-['Outfit'] whitespace-nowrap">{children}</span>
  </div>
);

const ViewMoreButton = () => (
  <div className="relative h-[45px] group w-[180px]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    <button className="absolute inset-0 w-full h-full px-6 flex items-center justify-center gap-2 border border-[#979797] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
      <span className="text-base font-medium font-['DM Sans'] text-[#979797] group-hover:text-white transition-colors duration-300">
        View More
      </span>
      <FiArrowRight className="w-4 h-4 text-[#979797] group-hover:text-white transition-colors duration-300" />
    </button>
  </div>
);

const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  const { stays, loading: staysLoading, error: staysError } = useStays();
  const { trainings, loading: trainingsLoading, error: trainingsError } = useCustomizedTrainings();

  const getCardContent = (): CardContent[] => {
    switch (activeTab) {
      case 'stays':
        if (!stays?.length) return [];
        return stays
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((stay): StayCardContent => ({
            type: 'stay',
            title: stay.name || stay.title || 'Default Title',
            description: extractTextFromHtml(stay.tagline || stay.description || ''),
            image: stay.stay_image || stay.image_url || '/placeholder-image.jpg',
            slug: `stays/${stay.slug}`,
            location: String(stay.destination) || 'Destination Not Set'
          }));

      case 'activities':
        if (!activities?.length) return [];
        return activities
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((activity): ActivityCardContent => ({
            type: 'activity',
            title: activity.name,
            description: activity.tagline,
            image: activity.main_image,
            slug: `team-building-activity/${activity.slug}`,
            participants: activity.group_size || '20-1000',
            duration: activity.activity_type || 'Outbound',
            time: activity.duration || '60 Mins'
          }));

      case 'trainings':
        if (!trainings?.length) return [];
        return trainings
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((training): ActivityCardContent => ({
            type: 'training',
            title: training.name,
            description: training.tagline,
            image: training.banner_image,
            slug: `customized-training/${training.slug}`,
            participants: training.group_size || '15-20',
            duration: 'Training',
            time: training.activity_time || '2-3 Days'
          }));
    }
  };

  const renderSkeleton = () => (
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
  );

  const renderError = (error: string) => (
    <div className="text-center py-8 text-red-500">
      <p>Error loading data: {error}</p>
    </div>
  );

  if (activeTab === 'stays' && staysError) return renderError(staysError);
  if (activeTab === 'activities' && activitiesError) return renderError(activitiesError);
  if (activeTab === 'trainings' && trainingsError) return renderError(trainingsError);

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Header */}
        <div className="text-center relative mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium font-inter text-neutral-500 inline-block"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-2xl md:text-[40px] font-semibold font-inter text-neutral-900 tracking-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
          >
            Discover Your Perfect Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-base text-neutral-600 max-w-xl mx-auto"
          >
            From thrilling activities to serene stays and transformative training programs,
            find the perfect experience for your team.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="relative mb-8">
          <div className="flex rounded-[20px] border border-[#b1b1b1] overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 text-base font-medium font-['DM Sans'] transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-b from-[#FF4C39] to-[#FFB573] text-white'
                    : 'text-[#b1b1b1]'
                }`}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        {(activitiesLoading || staysLoading || trainingsLoading) ? (
          renderSkeleton()
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {getCardContent()?.map((card, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    }
                  }}
                  className="bg-[#eeeeee] rounded-[16px] overflow-hidden h-[450px] flex flex-col"
                >
                  <div className="p-5 flex flex-col h-full">
                    <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden mb-4 flex-shrink-0">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <RatingBadge />
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                      {/* Title Section - Fixed Height */}
                      <div className="h-14 mb-2">
                        <h3 className="text-lg font-medium font-inter text-[#373737] line-clamp-2">
                          {card.title}
                        </h3>
                      </div>
                      
                      {/* Description Section - Fixed Height */}
                      <div className="h-12 mb-4">
                        <p className="text-sm text-[#979797] font-['DM Sans'] line-clamp-2">
                          {card.description}
                        </p>
                      </div>
                      
                      {/* Stats Section - Fixed Height */}
                      <div className="h-8 flex flex-wrap gap-2 mb-4">
                        {'location' in card ? (
                          <StatBadge type="location">{card.location}</StatBadge>
                        ) : (
                          <>
                            <StatBadge type="participants">{card.participants}</StatBadge>
                            <StatBadge type="outbound">{card.duration}</StatBadge>
                            <StatBadge type="time">{card.time}</StatBadge>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Button Section - Fixed at Bottom */}
                    <div className="mt-auto">
                      <ExploreButton 
                        slug={card.slug} 
                        text={activeTab === 'stays' ? 'Book Now' : 'Learn More'} 
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* View More Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center"
            >
              <a 
                href={`/${activeTab === 'trainings' ? 'customized-training' : 
                         activeTab === 'activities' ? 'team-building-activity' :
                         'stays'}`}
              >
                <ViewMoreButton />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
