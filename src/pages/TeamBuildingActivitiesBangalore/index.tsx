import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import PageWrapper from '../../components/PageWrapper';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import { useState } from 'react';

// Add the Activity interface from CorporateTeamOffsite
interface Activity {
  id: number;
  name: string;
  tagline: string;
  description: string;
  main_image: string;
  duration: string;
  group_size: string;
  slug: string;
  activity_type: string;
  rating?: string;
}

const TeamBuildingActivitiesBangalore = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  
  const [heroRef] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [contentRef, contentInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filter activities for Bangalore
  const bangaloreActivities = activities?.map(activity => ({
    ...activity,
    rating: "4.9" // Default rating for these activities
  })) || [];

  // Calculate pagination
  const TOTAL_PAGES = 12; // Fixed number of pages
  const paginatedActivities = bangaloreActivities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Pagination component
  const Pagination = () => {
    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {TOTAL_PAGES}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(TOTAL_PAGES, prev + 1))}
          disabled={currentPage === TOTAL_PAGES}
          className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    );
  };

  const venues = [
    {
      title: "The Actuator at the Golden Palms Resort",
      description: "One of the most powerful team building activities, 'The Actuator', requires the team members to perform a relatively simple job through a series of complex transitions. One of the key team building activities where building a structure helps in inculcating numerous skills. The participants will be given supplies and then be asked to create a machine of energy conversions. This high-energy activity is suitable for your team and they stick together to achieve the common goal. To get the best results, the team members need to communicate effectively, collaborate with each other and unite to achieve the ultimate goal. It gives an opportunity to think out of the box, enhances creativity and resource management skills. People learn to be leaders keeping the team together from initiation till the final execution. Golden Palms Resort in Bangalore offers the best space and, at the end, they create a magic that boosts team morale."
    },
    {
      title: "Jumbo Volleyball at the Mango Mist",
      description: "A larger than life experience! Mango mist in Bangalore is the place your team must go and play fun team bonding game. 'Jumbo Volleyball' is riddled with fun and excitement where the teams have to maneuver a ball with a diameter that is almost double the size of an average human. Considering the size of the ball, the activity will require four teams playing at the same time. Every member has to be positioned appropriately and put in all his/her might to steer the ball in the air and pass it on to the opposite team. While providing perfect fun, the activity helps to increase trust, coordination and strategic planning."
    },
    {
      title: "Junkyard Sales at Palm Meadows",
      description: "While seeing an entrepreneur talking passionately about their product, don't we all get inspired to sell something of our own, that's close to our heart? Provide your employees an opportunity to 'sell' as a part of 'junkyard sales.' Teams will be required to build a creative product from junk, and will also be tasked with selling the same to the 'investors'. Assorted items are provided by Trebound and the teams get the basic stationeries to build. Each team starts with similar items and set up shop for some unique pieces of Junk. Teams are allotted a set time to build and prepare the sales pitch. 'Palm Meadows' in Bangalore, that too, within the city, near IT hub, is the perfect destination to help improve the creativity, negotiation capability and communication skills. The activity also helps to improve on problem-solving and escalation management."
    }
  ];

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Team Building Activities in Bangalore | Corporate Team Building Games | Trebound</title>
        <meta 
          name="description" 
          content="Discover the best team building activities in Bangalore. From outdoor adventures to indoor games, find perfect activities for your corporate team building events." 
        />
        <meta 
          name="keywords" 
          content="team building activities bangalore, corporate team building, team bonding exercises, team games bangalore, corporate team outbound" 
        />
        <link rel="canonical" href="https://www.trebound.com/team-building-activities-in-bangalore" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/team outing bangalore.jpg')",
              backgroundPosition: 'center',
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
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Team Building Activities<br />in Bangalore
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6"
            >
              <p>
                The <Link to="/team-building-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">team bonding exercises</Link> – from roller coaster to jumbo volleyball, from treasure hunt to key punch – are the fun way of getting to know each other better, taking out all the hidden capabilities, identifying the skill gaps and bringing in the paradigm shift in the thought processes. The <Link to="/corporate-team-outbound-training" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team outbound</Link> has always proven its importance in bringing the team together, enhancing and encouraging trust, building communication and collaborative skills. A perfect gateway where the team enjoys and indulges in fun activities together which the learning's last longer than a regular classroom session or seminar environment.
              </p>

              <p>
                The corporates in Bangalore are fortunate to have beautiful and rustic surroundings within the city limit or at a shorter distance. Be it an adventurous team or a peace-loving group, the resorts around Bangalore fulfil the requirements with numerous options and various offerings. Some venues are by default surrounded by natural rudiments like hills and water-bodies while some others offer peace & tranquility away from traffic and the hustle-bustle of the city. Go trekking, make a splash or just enjoy relaxing strolls, everything is on offer.
              </p>

              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#FF4C39] pl-4 my-8">
                "Teamwork is the ability to work together toward a common vision. The ability to direct individual accomplishment toward organizational objectives. It is the fuel that allows common people to attain uncommon results."
              </blockquote>
            </motion.div>

            {/* Venue Activities Section */}
            <div className="mt-16 space-y-12">
              {venues.map((venue, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-lg p-8 shadow-sm"
                >
                  <h3 className="text-2xl font-bold text-[#313131] mb-4">{venue.title}</h3>
                  <p className="text-[#636363] leading-relaxed">{venue.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <blockquote className="text-xl italic text-gray-700 text-center my-12">
                "A team that plays together, stays together!"
              </blockquote>
              
              <p className="text-[#636363] leading-relaxed">
                Team Trebound not only helps in conducting activities but also helps to book resorts and various perfect venues in and around Bangalore. The perfect opportunity to make your efforts hassle-free. Allow your team to indulge in fun team bonding activities which will result in building numerous skills and enhancing the overall productivity. Encourage them to de-stress, relax and bond together. The enjoyment and learning's in these team outing events sure get carried to the workplace and elevate the work environment!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Corporate Team Building Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Discover our wide range of team building activities designed to strengthen team bonds and enhance workplace collaboration.
            </p>
          </div>

          {activitiesLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
            </div>
          ) : activitiesError ? (
            <div className="text-center text-red-600 py-8">{activitiesError}</div>
          ) : bangaloreActivities.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No activities found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
              <Pagination />
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

      <ContactSection />
      <Footer />
    </PageWrapper>
  );
};

// Add the ActivityCard component from CorporateTeamOffsite
const ActivityCard = ({ activity }: { activity: Activity }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg overflow-hidden group"
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
        <span className="text-sm font-medium">{activity.rating || 'N/A'}</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-[#313131] mb-2">{activity.name}</h3>
      <p className="text-[#636363] mb-4">{activity.tagline}</p>
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
      <Link 
        to={`/team-building-activity/${activity.slug}`}
        className="inline-block w-full text-center py-3 border border-[#b1b1b1] rounded-lg text-[#b1b1b1] font-semibold hover:bg-gradient-to-r hover:from-[#FF4C39] hover:to-[#FFB573] hover:text-white hover:border-transparent transition-all duration-300"
      >
        View Details
      </Link>
    </div>
  </motion.div>
);

export default TeamBuildingActivitiesBangalore; 