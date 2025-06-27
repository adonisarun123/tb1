import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import TeamSection from '../../components/TeamSection';
import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';
import PageWrapper from '../../components/PageWrapper';
import { useActivities } from '../../lib/hooks/useSupabaseData';

const VirtualActivitiesPaginatedSection = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Filter for virtual activities
  const virtualActivities = (activities || [])
    .filter(activity => activity.activity_type === 'Virtual')
    .map(activity => ({ ...activity, rating: (activity as any)?.rating || '4.8' }));

  const TOTAL_PAGES = Math.max(1, Math.ceil(virtualActivities.length / ITEMS_PER_PAGE));
  const paginatedActivities = virtualActivities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const Pagination = () => (
    <div className="flex justify-center items-center space-x-2 mt-8 pb-12">
      <button
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-white border rounded-md">
        Page {currentPage} of {TOTAL_PAGES}
      </span>
      <button
        onClick={() => setCurrentPage(prev => Math.min(TOTAL_PAGES, prev + 1))}
        disabled={currentPage === TOTAL_PAGES}
        className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );

  if (activitiesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
      </div>
    );
  }
  if (activitiesError) {
    return <div className="text-center text-red-600 py-8">{activitiesError}</div>;
  }
  if (virtualActivities.length === 0) {
    return <div className="text-center text-gray-600 py-8">No virtual activities found.</div>;
  }
  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-6 max-w-[1200px]">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-bold text-[#313131] mb-4">
            Explore <span style={{ color: '#FF4C39' }}>Latest Games & Activities</span>
          </h2>
          <p className="text-lg text-[#636363] max-w-3xl mx-auto">
            Improve Teamwork and Boost Team Morale With Engaging & Impactful Online Team Building Games
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300">
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
            </div>
          ))}
        </div>
        {TOTAL_PAGES > 1 && <Pagination />}
      </div>
    </section>
  );
};

const OnlineTeamBuildingActivities = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Online Team Building Activities for Digital Workspaces | Trebound</title>
        <meta name="description" content="Discover the best online team building activities for digital workspaces. Engage, connect, and energize your remote team with Trebound." />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/online activity.jpg')",
              backgroundPosition: 'center 30%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Online Team Building Activities<br />for Digital Workspaces
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-white max-w-2xl mx-auto font-medium"
              style={{ marginBottom: 20 }}
            >
              Keep Your Employees<br />Happy, Engaged and Energized.
            </motion.p>
            <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300">
              Get a proposal
            </a>
          </motion.div>
        </div>
      </section>

      {/* Explore Latest Games & Activities Section (Virtual Only) */}
      <VirtualActivitiesPaginatedSection />

      {/* Why Choose Trebound Section */}
      <WhyChooseTreboundSection />

      {/* How It Works Section */}
      <HowItWorksProcessSection />

      {/* Our Teambuilding Subject Matter Experts Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      <Footer />
    </PageWrapper>
  );
};

export default OnlineTeamBuildingActivities; 