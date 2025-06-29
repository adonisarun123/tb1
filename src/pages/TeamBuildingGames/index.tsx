import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import GameCard from '../../components/GameCard';
import TeamSection from '../../components/TeamSection';
import PageWrapper from '../../components/PageWrapper';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import { FiCheck } from 'react-icons/fi';

// Constants
const ITEMS_PER_PAGE = 9;

const TeamBuildingGames = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  const [currentPage, setCurrentPage] = useState(1);

  const [activitiesRef, activitiesInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filter outbound activities
  const outboundActivities = activities
    ?.filter(activity => activity.activity_type === 'Outbound')
    ?.map(activity => ({
      id: activity.id,
      title: activity.name,
      tagline: activity.tagline || (activity.description ? `${activity.description.slice(0, 100)}...` : ''),
      image: activity.main_image || '/placeholder.jpg',
      duration: activity.duration || '2-3 Hours',
      participants: activity.group_size || '15-100',
      rating: "4.8", // Default rating
      slug: activity.slug
    })) || [];

  // Get current page activities
  const getCurrentPageActivities = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return outboundActivities.slice(startIndex, endIndex);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Team Building Games & Activities for Corporate Teams | Best Corporate Team Building Activities | Trebound</title>
        <meta
          name="description"
          content="Discover our extensive collection of team building games and activities designed for corporate teams. From indoor to outdoor activities, we offer customized solutions to strengthen team bonds and improve productivity."
        />
        <meta
          name="keywords"
          content="team building games, corporate team building, team building activities, outdoor team building, indoor team building, team bonding activities, corporate team activities bangalore"
        />
        <meta property="og:title" content="Team Building Games & Activities for Corporate Teams | Trebound" />
        <meta property="og:description" content="Explore our collection of engaging team building activities designed to strengthen bonds, improve communication, and boost team productivity in a fun and interactive way." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.trebound.com/team-building-games" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/Team building games.jpg')",
              backgroundPosition: 'center 12%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              transform: 'scale(1.1)'
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
              Team Building Games
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-white/90 italic mb-8 max-w-3xl mx-auto"
            >
              "You can discover more about a person in an hour of play than in a year of conversation" - Plato
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Introduction Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6"
            >
              <h2 className="text-3xl font-bold text-[#313131] mb-6">Understanding Team Building Activities</h2>
              <p>
                We believe that as social beings we can better connect with each other when we're involved in social activities. Team building is an umbrella term to describe various activities which help individuals to work effectively in teams. It helps in molding individuals into efficient team players, wherein they can slowly come out of their comfort zones and get to know one another.
              </p>
              <p>
                That way, the trust can be built among team members and they would be able to work together well in their work place. What better way can be used than the fun team building activities to encourage your employees know & understand each other?
              </p>
              <p>
                In the current day scenario, organizations prefer to have their employees work in teams to obtain positive results. Thus, it can be said that well-coordinated teams are the crux to the development of an organization. These activities create opportunities for your employees to understand the goals of their organization and interact with each other in a pressure-free environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="bg-gray-50">
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Team Building Games
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our collection of engaging team building activities designed to strengthen bonds,
              improve communication, and boost team productivity in a fun and interactive way.
            </p>
          </motion.div>

          <div 
            ref={activitiesRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activitiesLoading ? (
              <div className="col-span-3 flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
              </div>
            ) : activitiesError ? (
              <div className="col-span-3 text-center text-red-600 py-8">
                Failed to load activities. Please try again later.
              </div>
            ) : outboundActivities.length === 0 ? (
              <div className="col-span-3 text-center text-gray-600 py-8">
                No activities found.
              </div>
            ) : (
              getCurrentPageActivities().map((activity) => (
                <motion.div
                  key={activity.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={activitiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <GameCard
                    title={activity.title}
                    tagline={activity.tagline}
                    image={activity.image}
                    duration={activity.duration}
                    participants={activity.participants}
                    rating={activity.rating}
                    slug={activity.slug}
                  />
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          {!activitiesLoading && !activitiesError && outboundActivities.length > 0 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {Math.ceil(outboundActivities.length / ITEMS_PER_PAGE)}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(outboundActivities.length / ITEMS_PER_PAGE), prev + 1))}
                disabled={currentPage === Math.ceil(outboundActivities.length / ITEMS_PER_PAGE)}
                className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-24 mb-24"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#313131] mb-4">
                Why Choose Our Team Building Activities?
              </h2>
              <p className="text-lg text-[#636363] max-w-3xl mx-auto">
                Experience excellence in team building with our carefully crafted activities designed to deliver measurable results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#313131] mb-4">Customizable Experience</h3>
                <p className="text-[#636363] leading-relaxed">
                  Every activity is tailored to match your team's unique dynamics, size, and objectives. We understand that no two teams are alike, which is why we customize our programs to deliver maximum impact.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-[#636363]">
                    <FiCheck className="text-[#FF4C39] mr-2" />
                    <span>Flexible group sizes</span>
                  </li>
                  <li className="flex items-center text-[#636363]">
                    <FiCheck className="text-[#FF4C39] mr-2" />
                    <span>Adaptable difficulty levels</span>
                  </li>
                  <li className="flex items-center text-[#636363]">
                    <FiCheck className="text-[#FF4C39] mr-2" />
                    <span>Goal-oriented programs</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#313131] mb-4">Professional Facilitation</h3>
                <p className="text-[#636363] leading-relaxed">
                  Our expert facilitators bring years of experience in guiding teams through engaging activities. They ensure every participant is involved and the objectives are met effectively.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-[#636363]">
                    <FiCheck className="text-[#FF4C39] mr-2" />
                    <span>Experienced trainers</span>
                  </li>
                  <li className="flex items-center text-[#636363]">
                    <FiCheck className="text-[#FF4C39] mr-2" />
                    <span>Structured approach</span>
                  </li>
                  <li className="flex items-center text-[#636363]">
                    <FiCheck className="text-[#FF4C39] mr-2" />
                    <span>Continuous support</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#313131] mb-4">Measurable Outcomes</h3>
                <p className="text-[#636363] leading-relaxed">
                  We believe in delivering tangible results. Our activities are designed with specific objectives in mind, and we track progress to ensure meaningful improvements in team dynamics.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-[#636363]">
                    <FiCheck className="text-[#FF4C39] mr-2" />
                    <span>Clear objectives</span>
                  </li>
                  <li className="flex items-center text-[#636363]">
                    <FiCheck className="text-[#FF4C39] mr-2" />
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center text-[#636363]">
                    <FiCheck className="text-[#FF4C39] mr-2" />
                    <span>Result analysis</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Enhanced Benefits Section */}
      <section className="py-20 bg-[#002B4F] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
              How Organizations Benefit from Team Building Activities
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
              Team building activities create lasting impact on organizational culture and team performance through various channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FF4C39]">Understanding Organizational Goals</h3>
              <p className="text-gray-300">
                It creates an opportunity for organizations to convey their goals and objectives freely to their employees without making them feel pressurized.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/5 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FF4C39]">Breaking Hierarchical Barriers</h3>
              <p className="text-gray-300">
                Team building activities allow different levels of management to interact freely, reducing organizational gaps and promoting open communication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/5 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FF4C39]">Fostering Innovation</h3>
              <p className="text-gray-300">
                Outside the organizational framework, employees can explore their creativity and come up with brilliant ideas that can be applied to their work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white/5 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FF4C39]">Building Trust</h3>
              <p className="text-gray-300">
                Activities help team members understand each other's roles better, leading to increased trust and reduced workplace conflicts.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Material Design Section: Activity Types */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              🎯 Activity Categories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Types of Team Building Activities
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We offer a diverse range of activities to suit different team sizes, objectives, and preferences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Indoor Activities Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
            >
              {/* Material Design Elevation Indicator */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  Indoor Activities
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Perfect for any weather condition, our indoor activities focus on problem-solving, creativity, and team coordination. These activities can be conducted within your office or at our partner venues.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Strategy Games</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Team Challenges</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Creative Workshops</span>
                  </div>
                </div>

                <div className="inline-flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors duration-300">
                  Learn More
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Outdoor Adventures Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
            >
              {/* Material Design Elevation Indicator */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  Outdoor Adventures
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Take your team outside for exciting adventures that combine physical activity with team building. These activities are designed to push boundaries and build trust.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Adventure Sports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Nature Challenges</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Team Olympics</span>
                  </div>
                </div>

                <div className="inline-flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-300">
                  Learn More
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Virtual Team Building Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 md:col-span-2 lg:col-span-1"
            >
              {/* Material Design Elevation Indicator */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Virtual Team Building
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Perfect for remote teams or hybrid workplaces, our virtual activities maintain team spirit across distances.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Online Escape Rooms</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Virtual Team Challenges</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Digital Collaboration Games</span>
                  </div>
                </div>

                <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                  Learn More
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Not sure which type suits your team?
              </h3>
              <p className="text-gray-600 mb-6">
                Our experts will help you choose the perfect activities based on your team's unique needs and objectives.
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Expert Consultation
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Expertise Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#313131] mb-4">Why Choose Trebound?</h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              With 20 years of combined experience and a track record of successful events, we're your trusted partner for team building excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mb-6">
                <FiCheck className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-[#313131] mb-4">Zero Failure Delivery</h3>
              <p className="text-[#636363]">
                Our core delivery principle #ZFD ensures that every team building activity meets our high standards of excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mb-6">
                <FiCheck className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-[#313131] mb-4">Customized Solutions</h3>
              <p className="text-[#636363]">
                We design activities that perfectly align with your team's size, objectives, and organizational culture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mb-6">
                <FiCheck className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-[#313131] mb-4">98.9% Satisfaction</h3>
              <p className="text-[#636363]">
                Our dedication to excellence has earned us consistently high satisfaction ratings from our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#313131] mb-4">Our Design Process</h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              We follow a systematic approach to create effective team building activities that deliver results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#313131] mb-2">Understanding Goals</h3>
              <p className="text-[#636363]">We start by understanding your organization's specific objectives and team dynamics.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#313131] mb-2">Custom Design</h3>
              <p className="text-[#636363]">Activities are tailored to match your team size, preferences, and desired outcomes.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#313131] mb-2">Professional Execution</h3>
              <p className="text-[#636363]">Expert facilitators ensure smooth delivery and maximum engagement.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold text-[#313131] mb-2">Measurable Results</h3>
              <p className="text-[#636363]">Track and measure the impact of activities on team performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      <ContactSection />
      <Footer />
    </PageWrapper>
  );
};

export default TeamBuildingGames; 