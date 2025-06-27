import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import PageWrapper from '../../components/PageWrapper';

// Activity Interface
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

// Constants
const ITEMS_PER_PAGE = 9;

const CorporateTeamOffsite = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

  // Filter outbound activities (mock data or fetch if needed elsewhere)
  // const outboundActivities: ActivityWithRating[] = []; // Use mock or fetched data if available

  // --- Use fetched activities directly --- 
  // Remove the mapping that added default rating
  // const activitiesWithRating = (activities || []).map(act => ({ ...act, rating: act.rating || '4.5' })); 

  // Only show first 9 activities (or implement pagination later)
  const displayedActivities = (activities || []).slice(0, ITEMS_PER_PAGE);

  // Restore Ref variables
  const [contentRef, contentInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [whyFailRef, whyFailInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [venueRef, venueInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Team Offsite | Best Team Building Activities & Venues | Trebound</title>
        <meta
          name="description"
          content="Plan successful corporate team offsites with Trebound. Expert facilitation, customized activities, and strategic venue selection for impactful team building experiences."
        />
        <meta
          name="keywords"
          content="corporate team offsite, team building activities, offsite venues, corporate retreat, team building games, corporate events bangalore"
        />
        <meta property="og:title" content="Corporate Team Offsite | Best Team Building Activities & Venues | Trebound" />
        <meta property="og:description" content="Transform your team dynamics with expertly planned corporate offsites. Choose from our curated venues and customized team building activities." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.trebound.com/corporate-team-offsite" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/offsite.jpg')",
              backgroundPosition: 'center 23%',
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
              Corporate Team Offsite
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-white/90 italic mb-8 max-w-3xl mx-auto"
            >
              "You can do what I cannot do, I can do what you cannot do. Together we can do greater things."
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
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
                There is a treasure hidden behind this simple looking sentence uttered by none other than our Mother Teresa. When the shared efforts are contributed for a shared vision, the success is definitely not far off.
              </p>
              <p>
                Be it arranging training sessions for new recruits or time to take key strategic decisions, <Link to="/corporate-team-offsite" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team offsite</Link> is used extensively by the companies. The team is formed, the venue is organised, agenda is set, nitty gritty is taken care of. The team go, attend the meetings and take down the minutes or attend the training and feel elated and return to work. Back to routine, entry, monotonous job, challenges, conflicts, go back home, sleep, wake up, back to routine…..the cycle goes on and on. Team offsite comes and go without creating any impact. When Trebound organises your corporate offsite, the success is ensured.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Offsites Fail Section */}
      <section ref={whyFailRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={whyFailInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-[#313131] mb-8">
              Why do corporate offsite fail in bringing the targeted results?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-[18px] leading-relaxed">
                When the corporate offsite effectiveness is measured, the organizations realize that the minutes are saved but the hours are lost. True that the <Link to="/corporate-team-offsite" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team offsite</Link> meetings end up having less to no impact either on the teams or on the organizations as a whole. Beyond making agenda, it could be the <Link to="/corporate-team-outing-places-in-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">team outing place</Link> chosen for offsite or the <Link to="/team-building-games" className="text-[#FF4C39] hover:text-[#FF6B5C]">team building activities</Link> designed to address the goal the reason for such failures. The corporate offsite themes designed by Trebound ensures success and higher ROI.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#313131] mb-8">
              How can a team building activity go wrong and impact the corporate offsite negatively?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-[18px] leading-relaxed">
                The HR team or the organization's committee could have gone with some adventure theme based activity when the team offsite is organized to make important key decisions. Even though the adventure based team outing sounds excited, it may not be the right choice if the meeting is scheduled to make strategic changes in the organizations. When the team is physically drained, it affects the thinking ability temporarily. Hence, it is important to choose the right <Link to="/corporate-team-offsite" className="text-[#FF4C39] hover:text-[#FF6B5C]">offsite team building activity</Link>.
              </p>
              <p className="text-[18px] leading-relaxed">
                The sudden change in the physical activity like adventure sports can be compared to the mentality of workaholics. Such sudden drain in physical activity could trigger the energy levels differently. This change can be compared to the way the workaholics think and work. Their thinking pattern becomes very narrow and they often miss to think through different perspectives. It also becomes tough for them to understand and agree to other's perspectives. Likewise, when the team who needs to use their thinking ability a lot, if they are put in an activity where they get drained physically, their decision-making ability can be seriously impacted. Trebound takes extra care in these aspects while planning <Link to="/corporate-team-offsite" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate offsite activities</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Selection Section */}
      <section ref={venueRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={venueInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-[#313131] mb-8">
              Can venue be the problem in choosing the corporate offsite?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-[18px] leading-relaxed">
                When you are choosing the venue for training, it is important to consider various factors when you are doing it as team offsite. The training sessions might require internet access, facilities to use the properties, workstations, etc., If it is going to be only <Link to="/team-building-games" className="text-[#FF4C39] hover:text-[#FF6B5C]">team engagement activities</Link> during the corporate offsite, we at Trebound suggest doing it in a resort type atmosphere.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#313131] mt-12 mb-6">
              There are key points you need to check before deciding the venue
            </h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-semibold text-[#313131] mb-4">Location</h4>
                <p className="text-[18px] leading-relaxed text-gray-600">
                  If the team is attending day session but for a week-long duration, the approach to the location needs to be considered. Wasting too much in commuting will cause additional human hours and impacting the outcome. Based on the team and duration, choosing the right location makes a greater impact in the corporate offsite outcome.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-[#313131] mb-4">Event Model</h4>
                <p className="text-[18px] leading-relaxed text-gray-600">
                  The specific room where the main event will be occurring need to be carefully chosen based on a number of participants. Also, the mode of the session, like a classroom model, round table conference, stand up meetings, need to be considered before choosing the specific arena for conducting corporate offsite.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-[#313131] mb-4">Ambiance</h4>
                <p className="text-[18px] leading-relaxed text-gray-600">
                  Peaceful ambiance with the perfect audio setting is extremely important while having team offsite sessions. If you are choosing an outdoor arena for conducting any team building activity, make sure that the acoustics are arranged well so that the speaker will be well audible so that the efforts are reaped well.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#002B4F] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
              Embark on a Transformational Offsite Experience with Trebound!
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Are you tired of corporate offsites that lack impact and fail to achieve your organization's goals? At Trebound, we understand the critical components that make a corporate offsite successful and transformative.
            </p>
            <p className="text-lg text-gray-300">
              Contact us today to plan your next corporate offsite that promises meaningful impact, enhanced collaboration, and a revitalized team. Let's create an event that aligns with your vision, fuels creativity, and drives your organization toward greater success.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Team Building Activities Section */}
      <section ref={contentRef} id="activities" className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Corporate Team Building Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Explore our collection of engaging team building activities designed to strengthen bonds, improve communication, and boost team productivity in a fun and interactive way.
            </p>
          </div>

          {/* Loading State */}
          {activitiesLoading && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
            </div>
          )}

          {/* Error State */}
          {activitiesError && (
            <div className="text-center text-red-600 py-8">{activitiesError}</div>
          )}

          {/* Content: No Activities Found */}
          {!activitiesLoading && !activitiesError && (!activities || activities.length === 0) && (
            <div className="text-center text-gray-600 py-8">
              No activities found.
            </div>
          )}

          {/* Content: Activities Grid */}
          {!activitiesLoading && !activitiesError && activities && activities.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
              {/* Optional: Add View More button or Pagination if needed */}
              {activities.length > ITEMS_PER_PAGE && (
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

// Activity Card Component
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

export default CorporateTeamOffsite; 