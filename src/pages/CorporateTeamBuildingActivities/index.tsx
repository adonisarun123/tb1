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

const CorporateTeamBuildingActivities = () => {
  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Team Building Activities | Trebound</title>
        <meta name="description" content="Engage your team with fun and impactful corporate team building activities. Explore the latest games and activities for your organization." />
        <link rel="canonical" href="https://www.trebound.com/corporate-team-building-activities" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/corporate.jpg')",
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
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Fun & Engaging Corporate<br />Team Building Activities
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
            >
              Keep Your Employees Happy, Engaged and Energized
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-[40px] font-bold text-[#313131] mb-6">
              Improve Teamwork and Boost Team Morale <br />
              With <span className="text-[#FF4C39]">Engaging & Impactful</span> <br />
              Corporate Team Building Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-4xl mx-auto">
              Our corporate team building activities are designed to create meaningful experiences that enhance trust, communication, and team performance.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Latest Games & Activities Section */}
      <section className="py-[64px] bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Explore Latest Games & Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Improve Teamwork and Boost Team Morale With Engaging & Impactful Team Building Activities
            </p>
          </div>
          <ExploreGamesActivitiesSection />
        </div>
      </section>

      {/* Why Us Section */}
      <WhyChooseTreboundSection />

      {/* How It Works Section */}
      <HowItWorksProcessSection />

      {/* SEO Content Section (Paste content here) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="prose prose-lg mx-auto custom-seo-prose">
            <div id="seo-content-placeholder">
              <h2 className="text-2xl md:text-3xl font-bold text-[#002B4F] mb-6">The Power of Team Building in Modern Workplaces</h2>
              <p className="mb-6">Now more than ever, companies recognize the value of fostering social solid connections and employee collaboration. But what exactly does meaningful team building entail, and why is it essential rather than just a "feel good" bonus? This guide explores why workplace bonding matters, how to facilitate activities that create trust and engagement, and what skills participants hone.</p>

              <h3 className="text-xl font-semibold text-[#FF4C39] mt-10 mb-4">Why invest in team building?</h3>
              <p className="mb-4">Intentional team bonding, especially creative activities versus standard happy hours, enables the formation of a resilient company culture and higher performance through:</p>
              <ul className="mb-8 space-y-2">
                <li><span className="font-bold">Deeper insight into personalities</span> – Understanding colleagues' strengths, weaknesses, passions, and work styles allows for more patience, support, and customized collaboration.</li>
                <li><span className="font-bold">Healthier conflict resolution</span> – Building relationships centred on empathy and vulnerability minimises tension and leads to more constructive debates.</li>
                <li><span className="font-bold">Enhanced problem-solving</span> – Varied perspectives stemming from mutual understanding spark innovation to handle complex issues.</li>
                <li><span className="font-bold">Elevated agility and resilience</span> – Unitary teams navigate change and manage stressors without cracking under pressure.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#FF4C39] mt-10 mb-4">What impactful team-building activities cultivate stronger bonds?</h3>
              <p className="mb-4">Rather than mere social gatherings, activities should inspire insight sharing, creativity, planning, and collaboration, including:</p>
              <ul className="mb-8 space-y-2">
                <li>Storytelling circles to establish trust and respect.</li>
                <li>Volunteer initiatives remind us of shared values and capacity to help communities.</li>
                <li>"Amazing race" style adventures tap collective critical thinking and resilience.</li>
                <li>Interactive games or competitions requiring cooperation and communication.</li>
                <li>Culinary creation challenges drawing on imagination and compromise.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#FF4C39] mt-10 mb-4">How To Implement Successful Bonding Initiatives?</h3>
              <p className="mb-4">From pitching concepts to upper management to rallying employee engagement, properly facilitating team building involves:</p>
              <ul className="mb-8 space-y-2">
                <li>Securing buy-in by connecting activities to reduced turnover, better work culture, and collaborative efficiency.</li>
                <li>Conveying clear objectives so participants recognize skills strengthened.</li>
                <li>Planning well in advance while allowing colleagues flexibility if overwhelmed.</li>
                <li>Adding bonding elements into existing meetings via insightful prompts or creative challenges.</li>
                <li>Following up beyond events to sustain newly formed connections.</li>
              </ul>

              <p className="mt-8 font-semibold text-[#313131]">Investing in thoughtful team building yields dividends for organizational success powered by an engaged, aligned workforce equipped to handle shared obstacles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-10 text-center">FAQs</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">How often should we host team-building activities?</h3>
              <p>Aim for at least one dedicated bonding activity per quarter, plus consistently integrate relationship-building elements into regular meetings.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">What outcomes should we expect from successful initiatives?</h3>
              <p>Key outcomes include a deeper understanding of strengths and weaknesses among team members, increased camaraderie and morale, healthier conflict resolution, and enhanced collaboration and innovation.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">How do I convince sceptics like senior management that such activities are worth investing in?</h3>
              <p>Emphasize reputable data on how respected companies leverage thoughtful bonding to reduce turnover, minimize tension, spark fresh ideas, and empower employees, especially amidst uncertainty.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">What are signs our current team building efforts aren't working?</h3>
              <p>Indicators include lingering interpersonal conflicts, closed-mindedness to specific ideas or colleagues in brainstorms, lack of volunteerism for involvement, and resistance to change initiatives.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">What should we avoid when planning corporate team-building events?</h3>
              <p>Only schedule a few activities packed into one day, leading to fatigue rather than meaningful interactions. Also, avoid overly elaborate events that create disruption rather than positive outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <TeamSection />
      <TestimonialsSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </PageWrapper>
  );
};

interface ActivityWithRating extends Activity {
  rating: string;
}

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

const ExploreGamesActivitiesSection = () => {
  const { activities, loading, error } = useActivities();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const activitiesWithRating: ActivityWithRating[] = React.useMemo(() => 
    (activities || []).map(activity => ({
      ...activity,
      rating: '4.9' // Assign a default or calculated rating
    })),
    [activities]
  );

  const totalPages = Math.max(1, Math.ceil(activitiesWithRating.length / ITEMS_PER_PAGE));
  const paginatedActivities = activitiesWithRating.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) return <div className="text-center py-8">Loading activities...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading activities: {error}</div>;

  return (
    <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
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
    </div>
  );
};

export default CorporateTeamBuildingActivities; 