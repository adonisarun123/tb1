import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom'; // Removed unused import
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import StepsSection from '../../components/StepsSection';
import PageWrapper from '../../components/PageWrapper';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import { useState } from 'react';
import React from 'react';

// Activity interface
interface Activity {
  id: number;
  name: string;
  tagline: string;
  main_image: string;
  slug: string;
  group_size?: string;
  activity_type?: string;
  duration?: string;
  destination?: string;
  location?: string;
}

interface ActivityWithRating extends Activity {
  rating: string;
}

// Removed unused/problematic ActivityCard definition
// const ActivityCard: React.FC<{ activity: ActivityWithRating }> = ({ activity }) => (
//   <div className="p-5 bg-[#f6f6f6] rounded-[16px]">
//     <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden mb-4 group">
//       <img 
//         src={activity.main_image} 
//         alt={activity.name} 
//         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//       />
//       <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
//           <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
//         </svg>
//         <span className="text-sm font-medium">{activity.rating}</span>
//       </div>
//     </div>
//     <div className="space-y-2 flex-1">
//       <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131]">{activity.name}</h3>
//       <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">{activity.tagline}</p>
//     </div>
//     <div className="mt-4">
//       <Link 
//         to={`/team-building-activity/${activity.slug}`}
//         className="relative w-full h-[45px] group block"
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]"></div>
//         <div className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
//           <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">View Details</span>
//         </div>
//       </Link>
//     </div>
//   </div>
// );

const whyUs = [
  {
    title: '30+ years of experience',
    description:
      "With 30+ years of combined experience, our team has the experience and know-how to help you plan the perfect teambuilding experience. We assure our facilitators are going to provide complete support in building your teams.",
  },
  {
    title: 'We help your company improve employee engagement',
    description:
      "Our team-building activities are widely known to break down barriers, inspire, and promote creativity.",
  },
  {
    title: 'Great Support',
    description:
      "We have a proven methodology for delivering exceptional customer service. You can expect to receive professional and personalized support from our team at all stages of your team building plan.",
  },
  {
    title: 'Expect fun and intense adventures',
    description:
      "Our team will help you increase employee participation, energize the team, build trust and have fun through a variety of unique and exciting teambuilding activities.",
  },
];

// Define type for whyUs items
interface WhyUsItem {
  title: string;
  description: string;
}

const TeamBuildingActivitiesMumbai: React.FC = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [heroRef] = useInView({ threshold: 0.1, triggerOnce: true });

  // Filter activities for Mumbai
  const mumbaiActivities: ActivityWithRating[] = React.useMemo(() => 
    (activities || [])
      .filter(activity => 
        activity.activity_type === 'Outbound' && 
        (activity.location?.toLowerCase().includes('mumbai') || 
         activity.name.toLowerCase().includes('mumbai'))
      )
      .map(activity => ({
        ...activity,
        rating: '4.9'
      }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
  , [activities]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(mumbaiActivities.length / ITEMS_PER_PAGE));
  const paginatedActivities = mumbaiActivities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Pagination component
  const Pagination: React.FC = () => (
    <div className="flex justify-center items-center space-x-2 mt-12">
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

  // Mumbai-specific venues (example, can be expanded)
  const venues = [
    {
      title: 'Beach Olympics at Juhu Beach',
      description:
        "Sun, sand, and team spirit! Enjoy a series of fun and competitive games on the iconic Juhu Beach, perfect for energizing your team and building camaraderie.",
    },
    {
      title: 'Acid Bridge Challenge',
      description:
        "Strategize, construct, and traverse: Cross the Acid Bridge to Success! This activity is designed to boost problem-solving and collaboration skills.",
    },
    {
      title: 'Ball and Ring',
      description:
        "Guide, balance, achieve: Perfect your team's harmony with Ball and Ring! A classic team-building challenge that requires coordination and communication.",
    },
  ];

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Team Building Activities in Mumbai | Corporate Team Building Games | Trebound</title>
        <meta
          name="description"
          content="Discover the best team building activities in Mumbai. From outdoor adventures to indoor games, find perfect activities for your corporate team building events." />
        <meta
          name="keywords"
          content="team building activities mumbai, corporate team building, team bonding exercises, team games mumbai, corporate team outbound" />
        <link rel="canonical" href="https://www.trebound.com/corporate-team-building-activities-in-mumbai" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/Corporate team outings.jpg')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
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
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Team Building Activities<br />in Mumbai
            </motion.h1>
            <p className="text-white text-xl max-w-2xl mx-auto mt-4">
              Fun & Engaging Corporate Team Building Activities In Mumbai. Engage Your Employees With a Fun Team Building Session.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-[#313131] mb-4">Why Choose Trebound for Team Building in Mumbai?</h2>
            <p className="text-lg text-[#636363] max-w-2xl mx-auto">
              Build a highly energetic workforce. Transform your team dynamics for business success with our proven methodology and expert facilitators.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item: WhyUsItem, idx: number) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-[#313131] mb-2">{item.title}</h3>
                <p className="text-[#636363]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process/Steps Section */}
      <StepsSection />

      {/* Main Content Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6"
            >
              <p>
                We offer various engaging & impactful team building activities in and around Mumbai. Our activities are designed to break down barriers, inspire, and promote creativity, ensuring your team is energized and connected.
              </p>
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#FF4C39] pl-4 my-8">
                "A team that plays together, stays together!"
              </blockquote>
            </motion.div>
            {/* Venue Activities Section */}
            <div className="mt-16 space-y-12">
              {venues.map((venue, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-lg p-8 shadow-sm"
                >
                  <h3 className="text-2xl font-bold text-[#313131] mb-4">{venue.title}</h3>
                  <p className="text-[#636363] leading-relaxed">{venue.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Team Building Activities in Mumbai
            </h2>
            <p className="text-lg text-[#636363] max-w-2xl mx-auto">
              Discover our wide range of team building activities designed to strengthen team bonds and enhance workplace collaboration.
            </p>
          </motion.div>

          {activitiesLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
            </div>
          ) : activitiesError ? (
            <div className="text-center text-red-600 py-8">{activitiesError}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedActivities.map((activity) => (
                  // <ActivityCard key={activity.id} activity={activity} /> // Commented out usage
                  <div key={activity.id} className="border p-4 rounded-lg">{/* Placeholder */} {activity.name}</div>
                ))}
              </div>
              {totalPages > 1 && <Pagination />}
            </>
          )}
        </div>
      </section>

      {/* Team Section */}
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

export default TeamBuildingActivitiesMumbai; 