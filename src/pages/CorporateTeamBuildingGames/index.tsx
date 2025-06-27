import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import PageWrapper from '../../components/PageWrapper';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import React, { useState } from 'react';
import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';
import { Activity } from '../../lib/supabaseClient';

interface ActivityWithRating extends Activity {
  rating: string;
}

// ActivityCard component
const ActivityCard: React.FC<{ activity: ActivityWithRating }> = ({ activity }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="relative aspect-[386/304]">
      <img 
        src={activity.main_image} 
        alt={`${activity.name} Team Building Activity`} 
        className="w-full h-full object-cover"
      />
      <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
        </svg>
        <span className="text-sm font-medium">{activity.rating}</span>
      </div>
      {activity.activity_type && (
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1">
          <span className="text-sm font-medium text-[#636363]">{activity.activity_type}</span>
        </div>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-[#313131] mb-2">{activity.name}</h3>
      <p className="text-[#636363] mb-4 line-clamp-2">{activity.tagline}</p>
      <div className="flex items-center gap-4 text-sm text-[#636363] mb-4">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {activity.duration}
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          {activity.group_size}
        </div>
      </div>
      <a
        href={`/team-building-activity/${activity.slug}`}
        className="inline-block w-full text-center py-3 border border-[#b1b1b1] rounded-lg text-[#b1b1b1] font-semibold hover:bg-gradient-to-r hover:from-[#FF4C39] hover:to-[#FFB573] hover:text-white hover:border-transparent transition-all duration-300"
      >
        View Details
      </a>
    </div>
  </motion.div>
);

const CorporateTeamBuildingGames = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const activitiesWithRating: ActivityWithRating[] = React.useMemo(() => 
    (activities || []).map(activity => ({
      ...activity,
      rating: '4.9' // Assign a default or calculated rating
    })),
    [activities]
  );

  // Paginate all activities
  const paginatedActivities = activitiesWithRating.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = activitiesWithRating ? Math.ceil(activitiesWithRating.length / ITEMS_PER_PAGE) : 1;

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Team Building Games | Trebound</title>
        <meta name="description" content="Fun & Engaging Corporate Team Building Games. Keep Your Employees Happy, Engaged and Energized. Explore the latest games & activities for your team." />
        <link rel="canonical" href="https://www.trebound.com/corporate-team-building-games" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/games.jpg')",
              backgroundPosition: 'center 15%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Fun & Engaging Corporate<br />Team Building Games
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
            >
              Keep Your Employees Happy, Engaged and Energized. Explore the latest games & activities for your team.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Explore Latest Games & Activities Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Explore Latest Games & Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Improve Teamwork and Boost Team Morale With Engaging & Impactful Team Building Activities
            </p>
          </div>
          {activitiesLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]" />
            </div>
          ) : activitiesError ? (
            <div className="text-center text-red-600 py-8">{activitiesError}</div>
          ) : paginatedActivities.length === 0 ? (
            <div className="text-center text-gray-600 py-8">No activities found.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((prev: number) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev: number) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Why Us Section */}
      <WhyChooseTreboundSection />

      {/* How It Works Section */}
      <HowItWorksProcessSection />

      {/* Team/Experts Section */}
      <TeamSection />
      {/* Testimonials Section */}
      <TestimonialsSection />
      {/* Partners Section */}
      <PartnersSection />
      {/* Contact Section */}
      <ContactSection />
      <Footer />
    </PageWrapper>
  );
};

export default CorporateTeamBuildingGames; 