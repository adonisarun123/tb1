import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import TeamSection from '../../components/TeamSection';
import PageWrapper from '../../components/PageWrapper';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import { FiUsers, FiEdit3, FiZap, FiTarget } from 'react-icons/fi';

const ITEMS_PER_PAGE = 9;

const TopTeamBuildingActivitiesLargeGroups = () => {
  const { activities, loading, error } = useActivities();
  const [currentPage, setCurrentPage] = useState(1);

  // Filter activities for 'top-team-building-activities-for-large-groups' tag
  const filteredActivities = activities.filter(
    (activity) => {
      const mainTagMatch = Array.isArray(activity.activity_main_tag)
        ? activity.activity_main_tag.includes('top-team-building-activities-for-large-groups')
        : activity.activity_main_tag === 'top-team-building-activities-for-large-groups';
      // @ts-ignore: activity_tags may not be typed
      const tagsMatch = typeof activity.activity_tags === 'string' && activity.activity_tags.includes('top-team-building-activities-for-large-groups');
      return mainTagMatch || tagsMatch;
    }
  );
  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / ITEMS_PER_PAGE));
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Top Team Building Activities for Large Groups | Trebound</title>
        <meta name="description" content="Discover the best team building activities for large groups. Boost collaboration, engagement, and unity with Trebound's expert-led activities designed for big teams." />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#FFB573] via-[#FF4C39] to-[#FFB573]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="100" r="80" fill="#FFB573" fillOpacity="0.18">
              <animate attributeName="cy" values="100;120;100" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="1240" cy="500" r="100" fill="#FF4C39" fillOpacity="0.12">
              <animate attributeName="cy" values="500;520;500" dur="5s" repeatCount="indefinite" />
            </circle>
            <rect x="600" y="200" width="240" height="80" rx="40" fill="#FF4C39" fillOpacity="0.08">
              <animate attributeName="x" values="600;620;600" dur="6s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg text-white"
            style={{ fontFamily: 'Outfit, sans-serif', lineHeight: 1.1 }}
          >
            Large Groups, <span className="inline-block px-3 py-1 rounded-xl bg-white shadow text-[#FF4C39] font-bold" style={{ boxShadow: '0 2px 12px 0 rgba(255,76,57,0.10)' }}>Big Impact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 mb-8 font-medium"
          >
            Energize your large team with fun, creative, and impactful activities designed for groups of 20+. Build unity, boost engagement, and spark collaboration at scale!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {[
              { label: 'Mass Collaboration', icon: <FiUsers size={22} color="#fff" /> },
              { label: 'Creativity', icon: <FiEdit3 size={22} color="#fff" /> },
              { label: 'Adaptability', icon: <FiZap size={22} color="#fff" /> },
              { label: 'Strategic Thinking', icon: <FiTarget size={22} color="#fff" /> },
            ].map((tag) => (
              <motion.span
                key={tag.label}
                whileHover={{ scale: 1.08, rotate: -2 }}
                className="bg-white/20 text-white font-semibold px-5 py-2 rounded-full shadow flex items-center gap-2 text-lg"
              >
                <span>{tag.icon}</span> {tag.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Section (Break the Ice, Build the Team) */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center justify-center mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-[#FFB573] to-[#FF4C39] text-white text-base font-bold">Why Large Group Team Building?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">Large Group, Big Results: Team Building That Works</h2>
          <div className="text-[#313131] text-base md:text-lg mb-8">
            <p>In the ever-evolving business landscape, success hinges on having a team that can seamlessly navigate challenges, think outside the box, and adapt to dynamic situations. Introducing our curated collection of top-tier team building activities, meticulously designed to hone essential skills like strategic planning, creativity, adaptability, and strategic thinking – the cornerstones of high-performing teams.</p>
            <h3 className="text-xl md:text-2xl font-bold text-[#222] mt-8 mb-2">Master Strategic Planning and Execution</h3>
            <p>Effective planning and execution are the hallmarks of exceptional teams. Activities like the adrenaline-fueled "F1 Challenge" and the inventive "Junkyard Sales" push your team to plan meticulously, allocate resources strategically, and execute plans with precision. As they navigate these engaging challenges, your team will develop the critical thinking, problem-solving, and decision-making skills necessary to tackle complex projects with confidence and finesse.</p>
            <h3 className="text-xl md:text-2xl font-bold text-[#222] mt-8 mb-2">Ignite Creativity and Innovation</h3>
            <p>In today's competitive market, creativity and innovation are the keys to staying ahead of the curve. Activities such as the rhythmic "Drum Jam Session" and the artistic "Race the Picture" challenge your team to think outside the box, embrace diverse perspectives, and explore unconventional solutions. As they navigate these exhilarating experiences, your team will unlock their creative potential, fostering an environment where innovative ideas thrive and problem-solving becomes second nature.</p>
            <h3 className="text-xl md:text-2xl font-bold text-[#222] mt-8 mb-2">Cultivate Adaptability and Agility</h3>
            <p>The ability to adapt and pivot is essential for navigating the ever-changing business landscape. Activities like the dynamic "Water Volleyball" and the ever-shifting "Pipeline" challenge your team to think on their feet, embrace change, and find creative solutions in real-time. As they navigate these engaging challenges, your team will develop the agility and adaptability needed to thrive in unpredictable environments, ensuring they're always one step ahead.</p>
            <h3 className="text-xl md:text-2xl font-bold text-[#222] mt-8 mb-2">Sharpen Strategic Thinking and Decision-Making</h3>
            <p>Successful teams are built on a foundation of strategic thinking and informed decision-making. Activities like "F1 Challenge" and "Junkyard Sales" push your team to analyze complex situations, weigh multiple variables, and formulate winning strategies. As they navigate these exhilarating challenges, your team will hone their critical thinking and decision-making skills, enabling them to make informed choices that drive results and outmaneuver competitors.</p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="large-group-activities" className="w-full bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-6 max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Explore <span style={{ color: '#FF4C39' }}>Large Group Activities</span>
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Discover the best activities to energize your large team and break down barriers.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : filteredActivities.length === 0 ? (
            <div className="text-center text-gray-600 py-8">No large group activities found.</div>
          ) : (
            <>
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
                        <span className="text-sm font-medium">{'4.9'}</span>
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
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8 pb-12">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 bg-white border rounded-md">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
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

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      <Footer />
    </PageWrapper>
  );
};

export default TopTeamBuildingActivitiesLargeGroups; 