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

// Define constant for items per page
const ITEMS_PER_PAGE = 9;

// Define interface for display, adding rating
interface ActivityDisplay extends SupabaseActivity {
  rating: string;
}

// Define standard ActivityCard component locally
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

const TeamEngagementActivities = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  
  const [heroRef] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [contentRef, contentInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filter activities (removed type filter) and add rating
  const displayActivities: ActivityDisplay[] = React.useMemo(() => {
    return (activities || [])
      .filter((activity): activity is SupabaseActivity => 
        activity !== null &&
        typeof activity === 'object' // Basic check for valid object
        // Removed activity_type filter
      )
      .map(activity => ({
      ...activity,
        rating: (activity as any).rating || "4.9" // Use existing rating or default
      }));
  }, [activities]);

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Team Engagement Activities | Fun Employee Engagement Games | Trebound</title>
        <meta 
          name="description" 
          content="Discover effective team engagement activities and games designed to boost employee morale, improve collaboration, and drive organizational success. Expert-led programs by Trebound." 
        />
        <meta 
          name="keywords" 
          content="team engagement activities, employee engagement games, team building activities, corporate team building, employee engagement activities, team engagement games" 
        />
        <link rel="canonical" href="https://www.trebound.com/team-engagement-activities" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/Team engagement.jpg')",
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
              Team Engagement Activities
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-semibold"
            >
              <span className="text-[#FF4C39]">T</span>ogether{' '}
              <span className="text-[#FF4C39]">E</span>veryone{' '}
              <span className="text-[#FF4C39]">A</span>chieves{' '}
              <span className="text-[#FF4C39]">M</span>ore
            </motion.p>
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
                Having fun together is the well-demonstrated way to convert the strength of the Individuals into an asset of a team. Winning in the workplace is the key tool to winning in the market place. There are very powerful and fun <Link to="/team-engagement-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">employee engagement activities</Link> help in achieving strong teams and success. Trebound has built a treasure of various fun activities for employee engagement. Such fun <Link to="/team-engagement-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">employee engagement activities</Link> help in improving the morale of the teams in higher percentages than any other motivational actions taken by the organisations.
              </p>

              <p>
                Jack Welch, the renowned Management Guru and well-known as a CEO of GE classifies 'Employee Engagement' as the first among three measurement techniques for the overall performance of the organization. He says, "There are only three measurements that tell you nearly everything you need to know about your organization's overall performance: employee engagement, customer satisfaction, and cash flow." He is placing 'Team Engagement' before customer satisfaction and a cash flow.'
              </p>

              <p>
                If we observe keenly, many organizations fail because they fail to focus on the employee well-being and team engagement. The companies put customer and revenue before employees. Unless the organisations plan for <Link to="/team-engagement-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">games for employees engagement</Link> periodically, it will reflect negatively in their productivity. When we insist on conducting games frequently, the companies need not go out every time which can make a big hole in the budget. There are numerous fun and powerful <Link to="/indoor-team-building-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">indoor employee engagement games</Link> that can be organised to develop highly motivated teams.
              </p>

              <h2 className="text-3xl font-bold text-[#313131] mt-12 mb-6">
                Do you know your team well?
              </h2>

              <p>
                Especially in the current technology dominating business scenario, the amount of importance given to improving the 'technical skills' of the team is much higher than the other 'survival' and 'success' skill. The team should be taught and trained in the below key attributes as well. Trebound can conduct various <Link to="/team-engagement-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">employee engagement activities</Link> to instill such business and survival skills.
              </p>

              <ul className="list-none space-y-4 mt-6">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#FF4C39] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Is your team understanding the common vision and working towards achieving the same?</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#FF4C39] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Is your team aware of business strategies that are in place?</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#FF4C39] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Does your team work together by managing the conflicts well among themselves?</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#FF4C39] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Do they have a capability to solve conflicts without impacting the productivity?</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#FF4C39] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Are they motivated to work together as a team?</span>
                </li>
              </ul>

              <p className="mt-6">
                Even if you have 'No' as an answer to any one of the above questions, it is high time to get them involved in <Link to="/team-engagement-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">team engagement activities</Link>.
              </p>

              <h2 className="text-3xl font-bold text-[#313131] mt-12 mb-6">
                Why don't Team Engagement Activities result positively as aimed?
              </h2>

              <p>
                Unfortunately, organising the employee engagement activities and games are considered as a responsibility of 'HR Function' in many organizations. It is not entirely appropriate. Unless, the engagement games for employees are designed in collaboration with the HR, project teams, achieving the results as aimed would be highly challenging. It requires brainstorming sessions, discussing various issues, analysing team effectiveness, defining the requirements, identifying the gaps between Employees engagement and productivity issues followed by the well-designed Employee Engagement activities.
              </p>

              <h2 className="text-3xl font-bold text-[#313131] mt-12 mb-6">
                The emotional intelligence of the organizers is the key here
              </h2>

              <p>
                The author of 'Employee Engagement 2.0, Kevin Kruse insists the fact, "Employee engagement advocates the emotional commitment of the employees towards the organization and its goals."
              </p>

              <p>
                To advocate such emotional commitment, the professionals who organise the team games must have astonishing emotional intelligence. What does it take to build the best employee engagement activity? The process should start with asking 'why'.
              </p>

              <p>
                'Why' are we conducting the Team Engagement activities now? What is the key goal behind the initiative? The answer will set the goal or a vision. Once the vision is set, then comes the teams. Teams need to be given utmost priority while building any team games.
              </p>

              <h2 className="text-3xl font-bold text-[#313131] mt-12 mb-6">
                Think and Treat Teams as 'human beings' first before planning Your Team Engagement Activities
              </h2>

              <p>
                Foremost among all, one fact needs to be remembered again and again. Whatever position they are in and the years of experience they have gained as professionals, the employees are first 'normal' human beings with 'normal' feelings, emotions and needs. Often, teams are considered as 'mere professionals' with 'X', 'Y' and 'Z' skills, the emotional part is ignored completely. The organizers need to understand the emotional needs of the teams.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Team Building Activities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Corporate Team Building Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Explore our collection of engaging team building activities designed to strengthen bonds, improve communication, and boost team productivity in a fun and interactive way.
            </p>
          </div>

          {activitiesLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
            </div>
          ) : activitiesError ? (
            <div className="text-center text-red-600 py-8">{activitiesError}</div>
          ) : displayActivities.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No activities found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayActivities.slice(0, ITEMS_PER_PAGE).map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
              {displayActivities.length > ITEMS_PER_PAGE && (
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

export default TeamEngagementActivities; 