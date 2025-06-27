import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import PageWrapper from '../../components/PageWrapper';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import type { Activity as SupabaseActivity } from '../../lib/supabaseClient';

// Add constant for items per page
const ITEMS_PER_PAGE = 9;

interface ActivityDisplay {
  id: number;
  name: string;
  tagline: string;
  main_image: string;
  duration: string;
  group_size: string;
  activity_type: string;
  rating: string;
  slug: string;
}

const OneDayOutingBangalore: React.FC = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  
  const [heroRef] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activitiesRef] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filter activities
  const outboundActivities: ActivityDisplay[] = React.useMemo(() => {
    return (activities || [])
      .filter((activity): activity is SupabaseActivity => 
        activity !== null &&
        typeof activity === 'object' &&
        'activity_type' in activity &&
        activity.activity_type === 'Outbound'
      )
      .map(activity => ({
        id: activity.id,
        name: activity.name,
        tagline: activity.tagline,
        main_image: activity.main_image,
        duration: activity.duration,
        group_size: activity.group_size,
        activity_type: activity.activity_type,
        rating: (activity as any).rating || "4.9",
        slug: activity.slug
      }));
  }, [activities]);

  // ActivityCard component
  const ActivityCard: React.FC<{ activity: ActivityDisplay }> = ({ activity }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-5 rounded-[16px] shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-[386/304]">
        <img 
          src={activity.main_image} 
          alt={`${activity.name} Team Building Activity`} 
          className="w-full h-full object-cover rounded-[16px]"
        />
        <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">{activity.rating}</span>
        </div>
        {activity.activity_type && (
          <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1">
            <span className="text-sm font-medium text-[#636363]">{activity.activity_type}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-[#313131] mb-2">{activity.name}</h3>
        <p className="text-[#636363] mb-4 line-clamp-2">{activity.tagline}</p>
        <div className="flex items-center gap-4 text-sm text-[#636363] mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {activity.duration}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>One Day Team Outing in Bangalore | Corporate Team Building Activities | Trebound</title>
        <meta
          name="description"
          content="Plan a perfect one day team outing in Bangalore with Trebound. Explore our range of team building activities and corporate outings designed for your team." />
        <meta
          name="keywords"
          content="one day team outing bangalore, corporate team building, team bonding activities, team outings bangalore" />
        <link rel="canonical" href="https://www.trebound.com/one-day-outing-in-bangalore" />
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
              One Day Team Outing<br />in Bangalore
            </motion.h1>
            <p className="text-white text-xl max-w-2xl mx-auto mt-4">
              Engage Your Team With Fun & Exciting Activities. Perfect For Corporate Team Building & Bonding.
            </p>
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
              <blockquote className="text-xl italic font-semibold text-gray-700 border-l-4 border-[#FF4C39] pl-4 my-8">
                "I have always found that the speed of the boss is the speed of the team."
                <footer className="text-base mt-2">- Lee Iacocca</footer>
              </blockquote>
              
              <p>
                The statement by Lee Iacocca, who is best known for the revival of Chrysler Corporation away from bankruptcy, summarizes the power of teamwork and qualities of a great leader. A great team led by a great leader create a mutually win-win situation for the success of the organization and the team environment as they bring out the best from each other.
              </p>

              <h2 className="text-3xl font-bold text-[#313131] my-8">Some are energized by work; Some need to be energized to work</h2>
              
              <p>
                The globalized business scenario makes teams working 40 hours a week, about 50 weeks a year which is nearly 2,000 hours a year. The job occupies so much of our waking life that we need to be energized to give out the best. Be it an entry-level role or a leading role or the management roles, every one of us needs to work as a team to achieve a common goal. One has to be motivated to guide, lead and keep up the morale of the team. Such leaders need to take the teams through the <Link to="/team-building-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">fun based journey</Link> and build the competent ones.
              </p>

              <blockquote className="text-xl italic font-semibold text-gray-700 border-l-4 border-[#FF4C39] pl-4 my-8">
                "Remember: upon the conduct of each depends the fate of all."
              </blockquote>

              <p>
                Building a cohesive winning team requires efforts in the right direction. First, connect the team to a common goal of the organization and then connect all of them to each other. The important question here is how to connect and bond the teammates together? The <Link to="/corporate-team-building-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate Team building activities</Link> help to build mutual trust and harmony in the team. To break free from the mundane work, <Link to="/corporate-team-outbound-training" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team outbound</Link> is the best gateway.
              </p>

              <h2 className="text-3xl font-bold text-[#313131] my-8">Interdependence rather than independence of dependence</h2>

              <p>
                Interdependence is the mutual reliance between two or more groups. The teams have to be interdependent for an organizational growth and also for business development. The strongly interconnected teams help achieve the set business goals. To bring in synergy, focus, and cohesiveness, the <Link to="/team-building-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">'developmental' team building</Link> process is essential. Lee Iacocca in another statement says, "A major reason for the capable people fail to advance is that they do not work well with their colleagues." This emphasizes the importance of working together.
              </p>

              <blockquote className="text-xl italic font-semibold text-gray-700 border-l-4 border-[#FF4C39] pl-4 my-8">
                "You don't win with the best talent - you win with the players who are able to play well together."
              </blockquote>

              <h2 className="text-3xl font-bold text-[#313131] my-8">Why is Bangalore the best place to have one-day outings?</h2>

              <p>
                A right venue will give the right space and set the momentum to carry out various tasks efficiently. Trebound can help understanding the event requirement, team size, team culture and suggest a venue just right for the crowd for a <Link to="/one-day-outing-in-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">one-day team outing</Link>. Bangalore being a Garden City, boasts of sprawling lawns and lush green gardens and is considered home for the best luxury resorts, especially for its facilities and services.
              </p>

              <div className="space-y-12 mt-12">
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-[#313131] mb-4">Shilaandara Resort, Ramanagara</h3>
                  <p>
                    Surrounded by opulent shades of greenery, <Link to="/resorts/shilaandara-resort-ramanagara" className="text-[#FF4C39] hover:text-[#FF6B5C]">Shilaandara Resort</Link> which is situated at the foothills of Ramanagara rocks offers you an impeccably comforting experience. The comforts comprise of a huge swimming pool, a lot of indoor and outdoor games, restaurant and a lounge bar. The countrified environs make it perfect for calming down amidst nature. Trebound can help plan a wonderful, <Link to="/team-building-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">fun-filled team outing</Link> here and so that the team is completely recharged and revitalised.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-[#313131] mb-4">Signature Club Resort</h3>
                  <p>
                    The serene atmosphere right within the city limit, but amazingly calm and beautiful, the <Link to="/resorts/signature-club-resort" className="text-[#FF4C39] hover:text-[#FF6B5C]">Signature Club Resort</Link> is sure to surprise you. Easily accessible for outsiders as it is located very near to Bangalore's Devanahalli airport. Snuggled in 130 acres nifty community, along with a multi-cuisine restaurant, a cafe, and a bar, the venue has extensive luxurious green sceneries to conduct exciting <Link to="/team-building-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">team activities</Link>.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-[#313131] mb-4">Golden Amoon Resort, Hoskote</h3>
                  <p>
                    A class apart luxury and sophistication is what <Link to="/resorts/golden-amoon-resort-hoskote" className="text-[#FF4C39] hover:text-[#FF6B5C]">Golden Amoon Resort</Link> has in offer. This Egyptian themed retreat is equipped with all up to date facilities where you can satisfy the large groups and improve the relationship through entertaining activities. Located right on the NH75, Kolar Highway, a very convenient venue to reach, this place tops the list, especially for the richness and luxury the guests get to enjoy here.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-[#313131] mb-4">Clarks Exotica, Airport Road</h3>
                  <p>
                    'Grandeur' is the term that comes to mind the minute you step into <Link to="/resorts/clarks-exotica-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">Clarks Exotica</Link> at Bangalore Airport Road. Be it a small group of 15 or a large one with 6000 members, this venue has 9 different accommodative options to engage teams during <Link to="/one-day-outing-in-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">one day outing</Link>. The central hall of 25,000 sqft and a dining area of 10,000 sqft give a spectacular time to your teams.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-[#313131] mb-4">Goldfinch Resort, Airport Road</h3>
                  <p>
                    <Link to="/resorts/goldfinch-resort-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">Goldfinch Resort</Link>, located in the Airport Road is the biggest relief to avoid travel and traffic chaos if you want to bring the employees from other branches. They offer water polo, cricket, board games where your teams can warm up before engaging in more amusing <Link to="/team-building-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">team building activities</Link>.
                  </p>
                </div>
              </div>

              <blockquote className="text-xl italic font-semibold text-gray-700 border-l-4 border-[#FF4C39] pl-4 my-8">
                "There will be breakouts…. There will be crossfires…...There will be misses……But with team work, there are no limits"
              </blockquote>

              <p>
                This is what one gets to realize after accomplishing <Link to="/one-day-outing-in-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">one day outing in Bangalore</Link>. Motivating teams by allowing them to relax from mundane routine, daily stresses, milestone pressure, target issues and engaging in calming situations is highly essential. Such stress-free mind will be able to think clearly, make informed decisions and solve problems with an ease which result in higher productivity and enhanced personal growth. The personal growth of each employee will contribute to cumulate growth of the organisation. The growth cycle continues seamlessly and ultimately provides happier workspace and leads to the economic growth of the country and so the globe.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section ref={activitiesRef} className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Corporate Team Building Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Explore our collection of engaging team building activities designed to strengthen bonds and boost team productivity.
            </p>
          </div>

          {activitiesLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
            </div>
          ) : activitiesError ? (
            <div className="text-center text-red-600 py-8">{activitiesError}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {outboundActivities.slice(0, ITEMS_PER_PAGE).map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
              {outboundActivities.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center mt-12">
                  <Link 
                    to="/team-building-activity"
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

export default OneDayOutingBangalore; 