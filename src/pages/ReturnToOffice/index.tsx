import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer'; // Removed unused import
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import type { Activity } from '../../lib/supabaseClient'; // Import Activity type
import PageWrapper from '../../components/PageWrapper';

// Constants
const ITEMS_PER_PAGE = 9; // Define ITEMS_PER_PAGE

const ReturnToOffice = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  
  // Filter activities for Return to Office
  const returnToOfficeActivities = (activities || [])
    ?.filter((activity): activity is Activity & { name: string } =>
      activity !== null &&
      typeof activity === 'object' &&
      'name' in activity &&
      typeof activity.name === 'string' && // Ensure name is a string before includes check
      [
        'Acid Bridge',
        'Ball and Ring',
        'Balloon Over and Under',
        'Bangkok Klong Amazing Race',
        'Beach Olympics',
        'Beach Olympics at Sai Kaew Beach',
        'Beat Box Challenge',
        'Beat the Trash',
        'Bicycle Building Challenge',
        'Bikes For Kids- CSR',
        'Blast From The Past',
        'Blind Origami',
        'Blindfold Tent Pitching',
        'Born To Race',
        'Build Your Own Dragon',
        'Cardboard Boat Racing'
      ].includes(activity.name)
    )
    ?.map(activity => ({
      ...activity,
      rating: (activity as any).rating || "4.9" // Use type assertion if needed or keep default
    })) || [];

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Return to Office 2022 | Welcome Back Activities | Trebound</title>
        <meta 
          name="description" 
          content="Welcome your remote employees back to the office with fun and engaging team experiences. Explore our range of team building activities designed to make the return to office transition smooth and enjoyable." 
        />
        <meta 
          name="keywords" 
          content="return to office, team building activities, welcome back activities, remote teams, office transition, team bonding, employee engagement" 
        />
        <link rel="canonical" href="https://www.trebound.com/return-to-office-2022-welcome-your-employees-back-to-office-with-an-amazing-fun-experience" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/fun and engaging.jpg')",
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
              Fun and engaging team experiences to help your remote teams return to office with a smile
            </motion.h1>
          </motion.div>
        </div>
      </section>

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
              <h2 className="text-3xl font-bold text-[#313131] mb-8">
                Returning back to the office is tough, but here is how team bonding activities can help
              </h2>

              <p className="italic text-lg mb-8">
                Team bonding activities help your employees...
              </p>

              <ul className="list-none space-y-4">
                {[
                  'Return to the office feeling refreshed and motivated for the upcoming project.',
                  'Deal with stress and negative emotions by using fun activities',
                  'Engage and get to know each other more',
                  'Maintain the unity of your employees by bringing back the good old office memories',
                  'Get new hires acclimated to the office environment and bring the team together by breaking the barriers.',
                  'Deal with the transition of returning to office and adjust with teammates at ease.',
                  'Ultimately, team building activities are fun and will help your team build a positive momentum'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-[#FF4C39] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Explore Activities To Welcome Your Remote Teams
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Discover our carefully curated selection of team building activities designed to make the return to office transition smooth and enjoyable.
            </p>
          </div>

          {activitiesLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
            </div>
          ) : activitiesError ? (
            <div className="text-center text-red-600 py-8">{activitiesError}</div>
          ) : returnToOfficeActivities.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No activities found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {returnToOfficeActivities.slice(0, ITEMS_PER_PAGE).map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
              {returnToOfficeActivities.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center mt-12">
                  <Link 
                    to="/team-building-activity" // Adjust link if necessary
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300"
                  >
                    View More Activities
                  </Link>
                </div>
              )}
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

export default ReturnToOffice;

// Add standard ActivityCard definition
const ActivityCard = ({ activity }: { activity: Activity & { rating: string } }) => (
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