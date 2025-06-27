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
import { FiUsers, FiZap, FiAward, FiLayers } from 'react-icons/fi';

const ITEMS_PER_PAGE = 9;

const TeamCollaborationGamesPage = () => {
  const { activities, loading, error } = useActivities();
  const [currentPage, setCurrentPage] = useState(1);

  // Filter activities for 'team-collaboration-games' tag (kebab-case)
  const filteredActivities = activities.filter(
    (activity) => {
      const mainTagMatch = Array.isArray(activity.activity_main_tag)
        ? activity.activity_main_tag.includes('team-collaboration-games')
        : activity.activity_main_tag === 'team-collaboration-games';
      // @ts-ignore: activity_tags may not be typed
      const tagsMatch = typeof activity.activity_tags === 'string' && activity.activity_tags.includes('team-collaboration-games');
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
        <title>Team Collaboration Games | Trebound</title>
        <meta name="description" content="Boost collaboration and teamwork with Trebound's expert-led team collaboration games. Discover activities designed to foster communication, trust, and creative problem-solving." />
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
            Collaborate, <span className="inline-block px-3 py-1 rounded-xl bg-white shadow text-[#FF4C39] font-bold" style={{ boxShadow: '0 2px 12px 0 rgba(255,76,57,0.10)' }}>Win Together</span><br />Team Collaboration Games
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 mb-8 font-medium"
          >
            Energize your team with fun, creative, and impactful collaboration games. Build trust, boost communication, and achieve more—together!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {[
              { label: 'Communication', icon: <FiUsers size={22} color="#fff" /> },
              { label: 'Innovation', icon: <FiZap size={22} color="#fff" /> },
              { label: 'Leadership', icon: <FiAward size={22} color="#fff" /> },
              { label: 'Team Unity', icon: <FiLayers size={22} color="#fff" /> },
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

      {/* Content Section (like 'Break the Ice, Build the Team') */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center justify-center mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-[#FFB573] to-[#FF4C39] text-white text-base font-bold">Why Team Collaboration Games?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">Collaboration: The Key to Team Success</h2>
          <p className="text-[#313131] text-base md:text-lg mb-8">
            In today's rapidly evolving business landscape, the ability to collaborate effectively is the cornerstone of success. Embracing innovation, honing leadership skills, breaking through silos, and mastering problem-solving are essential for teams to thrive. That's why we've curated a diverse range of cutting-edge collaboration games designed to supercharge your team's ability to work together, think outside the box, and achieve remarkable results.
          </p>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#222] mb-2">Unleash Innovation Through Collaboration</h3>
              <p className="text-[#636363] text-base md:text-lg">
                Innovation is the lifeblood of any organization striving to stay ahead of the curve. Our collaboration games, such as "Triggertronics" and "Remoto Car Challenge," foster an environment where team members can freely exchange ideas, take calculated risks, and push the boundaries of innovation. As they navigate these engaging challenges, your team will learn to embrace diverse perspectives, think creatively, and turn seemingly impossible ideas into reality.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#222] mb-2">Develop Exceptional Leadership Skills</h3>
              <p className="text-[#636363] text-base md:text-lg">
                Effective leadership is the catalyst that transforms ordinary teams into extraordinary ones. Activities like "Raft Building" and "Pyramid Building" provide a unique opportunity for team members to step up, take ownership, and demonstrate their leadership abilities. As they navigate these intricate challenges, your team will learn to communicate effectively, delegate tasks, and inspire others to work towards a common goal – essential skills for cultivating a culture of exceptional leadership.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#222] mb-2">Break Through Silos and Foster Unity</h3>
              <p className="text-[#636363] text-base md:text-lg">
                In many organizations, silos can impede collaboration and hinder progress. Our collaboration games, such as "Junkyard Sales" and "Gigsaw Challenge," are designed to break down these barriers and foster a sense of unity among team members. As they work together to overcome these engaging challenges, your team will learn to transcend departmental boundaries, appreciate diverse perspectives, and embrace the power of cross-functional collaboration.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#222] mb-2">Master Problem-Solving Through Teamwork</h3>
              <p className="text-[#636363] text-base md:text-lg">
                Effective problem-solving is the key to overcoming obstacles and driving success. Activities like "Cook It Up" and "Beat Box Challenge" challenge your team to think critically, embrace creative solutions, and leverage the collective strengths of the group. As they navigate these engaging challenges, your team will develop a robust problem-solving mindset, learning to break down complex issues, weigh options, and collaborate to find innovative solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="collaboration-activities" className="w-full bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-6 max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Explore <span style={{ color: '#FF4C39' }}>Collaboration Games</span>
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Discover the best activities to energize your team and break down barriers.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : filteredActivities.length === 0 ? (
            <div className="text-center text-gray-600 py-8">No collaboration games found.</div>
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

export default TeamCollaborationGamesPage; 