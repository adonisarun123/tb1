import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import PageWrapper from '../../components/PageWrapper';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import { BsPeople, BsStars, BsHeadset } from 'react-icons/bs';
import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';
import { Activity } from '../../lib/supabaseClient';

interface ActivityWithRating extends Activity {
  rating: string;
}

const ActivityCard = ({ activity }: { activity: ActivityWithRating }) => (
   <div className="p-5 bg-[#f6f6f6] rounded-[16px]">
     <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden mb-4">
       <img 
         src={activity.main_image} 
         alt={activity.name} 
         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
       />
       <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
           <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
         </svg>
         <span className="text-sm font-medium">{activity.rating}</span>
       </div>
     </div>
     <div className="space-y-2 flex-1">
       <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131]">{activity.name}</h3>
       <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">{activity.tagline}</p>
     </div>
     <div className="flex flex-wrap gap-2 mt-4">
       {activity.group_size && (
         <div className="h-[24px] bg-white rounded-[16px] flex items-center justify-center px-3 gap-1.5 shadow-sm">
           <BsPeople className="text-[#FF4C39]" />
           <span className="text-[#313131] text-sm font-medium font-['Outfit']">{activity.group_size}</span>
         </div>
       )}
       {activity.activity_type && (
         <div className="h-[24px] bg-white rounded-[16px] flex items-center justify-center px-3 gap-1.5 shadow-sm">
           <BsStars className="text-[#FF4C39]" />
           <span className="text-[#313131] text-sm font-medium font-['Outfit']">{activity.activity_type}</span>
         </div>
       )}
       {activity.duration && (
         <div className="h-[24px] bg-white rounded-[16px] flex items-center justify-center px-3 gap-1.5 shadow-sm">
           <BsHeadset className="text-[#FF4C39]" />
           <span className="text-[#313131] text-sm font-medium font-['Outfit']">{activity.duration}</span>
         </div>
       )}
     </div>
     <div className="mt-4">
       <Link 
         to={`/team-building-activity/${activity.slug}`}
         className="relative w-full h-[45px] group block"
       >
         <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]"></div>
         <div className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
           <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">View Details</span>
         </div>
       </Link>
     </div>
   </div>
);

const ActivitiesSectionMumbai: React.FC = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const allActivities: ActivityWithRating[] = React.useMemo(() => 
    (activities || []).map(activity => ({
      ...activity,
      rating: '4.9'
    })), [activities]
  );

  const totalPages = Math.max(1, Math.ceil(allActivities.length / ITEMS_PER_PAGE));
  const paginatedActivities = allActivities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const Pagination: React.FC = () => (
    <div className="flex justify-center items-center space-x-2 mt-8 pb-12 bg-white">
      <button
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Previous
      </button>
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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

  return (
     <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Corporate Team Building Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-2xl mx-auto">
              Discover our wide range of team building activities designed to strengthen team bonds and enhance workplace collaboration.
            </p>
          </motion.div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
            {totalPages > 1 && <Pagination />}
          </div>
      </div>
    </section>
  );
};

const CorporateTeamOutingMumbai: React.FC = () => {

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Team Outing in Mumbai | Best Team Building Venues | Trebound</title>
        <meta name="description" content="Discover the best corporate team outing venues in Mumbai. From luxury resorts to adventure camps, find the perfect location for your next team building event. Book now!" />
        <meta name="keywords" content="corporate team outing mumbai, team building venues mumbai, corporate offsite mumbai, team outing places near mumbai" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/mumbai.jpg')",
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
              Corporate Team Building Activities<br />In Mumbai
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6"
            >
              <p>
                In this globally competitive world, the quality of deliverable an organization produces depends on the quality of work each of its teams does. <Link to="/corporate-team-outing-in-mumbai" className="text-[#FF4C39] hover:text-[#FF6B5C]">Team bonding</Link> is the core strength that makes the teams work towards achieving a common goal which can be built through <Link to="/corporate-team-outing-in-mumbai" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team outings</Link>. To many members, <Link to="/corporate-team-outing-in-mumbai" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team outbound</Link> might be a chance to break the barriers that were holding them back and start with a new beginning.
              </p>
              <p>
                At the very core, the corporate team outings are stress busters, which help the employees to take a break from their routine hectic schedule and connect with their team members on a more personal level. Also, when organizations take such initiatives, it makes their employees feel more valued and respected, so this will ultimately motivate them to make good use of this opportunity to grow both as individuals and as teams.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Section Mumbai */}
      <ActivitiesSectionMumbai />

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

export default CorporateTeamOutingMumbai; 