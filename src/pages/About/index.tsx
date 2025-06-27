import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUsers, FiTarget, FiAward, FiHeart, FiTrendingUp, FiStar } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet-async';
import LazyImage from '../../components/LazyImage';

const AboutPage: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [missionRef, missionInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { number: '500+', label: 'Companies Served', icon: FiUsers },
    { number: '50,000+', label: 'Team Members Engaged', icon: FiTarget },
    { number: '350+', label: 'Unique Activities', icon: FiAward },
    { number: '98%', label: 'Client Satisfaction', icon: FiHeart },
  ];

  const values = [
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We believe in the power of working together to achieve extraordinary results.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: '🎨',
      title: 'Creativity',
      description: 'Innovation and creative thinking drive our unique approach to team building.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: '⚡',
      title: 'Excellence',
      description: 'We\'re committed to delivering exceptional experiences that exceed expectations.',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: '💖',
      title: 'Impact',
      description: 'Every activity is designed to create meaningful, lasting impact on teams.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80'
    },
  ];

  const teamMembers = [
    {
      name: 'Leadership Team',
      role: 'Strategic Vision & Growth',
      description: 'Experienced leaders with decades of expertise in team building and corporate training.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      icon: '👨‍💼'
    },
    {
      name: 'Activity Designers',
      role: 'Creative Experience Design',
      description: 'Creative minds who design innovative activities that engage and inspire teams.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      icon: '🎯'
    },
    {
      name: 'Customer Success',
      role: 'Client Relationship Management',
      description: 'Dedicated professionals ensuring every client experience exceeds expectations.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      icon: '🌟'
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Trebound | Team Building Experts Since 2015</title>
        <meta 
          name="description" 
          content="Learn about Trebound's mission to transform teams through exceptional experiences. Discover our story, values, and commitment to creating meaningful team connections. 500+ companies served, 50,000+ team members engaged."
        />
        <meta name="keywords" content="about trebound, team building company, corporate training experts, team building professionals" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section - Image Rich */}
        <motion.div 
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/75 to-purple-900/80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Trebound</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
                Transforming teams through exceptional experiences since 2015. We're passionate about creating 
                meaningful connections that strengthen bonds, improve collaboration, and drive results.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <FiUsers className="text-blue-300 text-xl" />
                  <span className="text-white font-semibold">500+ Companies</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <FiStar className="text-yellow-300 text-xl" />
                  <span className="text-white font-semibold">98% Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <FiTrendingUp className="text-green-300 text-xl" />
                  <span className="text-white font-semibold">50K+ Participants</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gradient-to-r from-[#FF4C39] to-[#FFB573]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={statsInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="text-4xl text-white/80 mx-auto mb-4" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mission Section - Enhanced */}
        <motion.div 
          ref={missionRef}
          initial={{ opacity: 0 }}
          animate={missionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={missionInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">Mission</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At Trebound, we believe that great teams are built through shared experiences. Our mission is to 
                  create transformative team building activities that go beyond traditional corporate events.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We specialize in designing custom experiences that align with your team's unique goals, culture, 
                  and dynamics. From virtual team building games to outdoor adventures, we have something for every team.
                </p>
                
                {/* Why Choose Trebound */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Why Choose Trebound?
                  </h3>
                  <div className="space-y-4">
                    {[
                      'Expert-designed activities tailored to your team',
                      'Transparent pricing with no hidden costs',
                      'Full-service support from planning to execution',
                      'Measurable results and team engagement'
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={missionInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-start group"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={missionInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <LazyImage
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                    alt="Team building activity"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">Success Rate</div>
                          <div className="text-2xl font-bold text-gray-900">98%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Repeat Clients</div>
                          <div className="text-2xl font-bold text-gray-900">85%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Values Section - Enhanced with Images */}
        <motion.div 
          ref={valuesRef}
          initial={{ opacity: 0 }}
          animate={valuesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core values guide everything we do and shape how we create experiences for teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={valuesInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    {/* Image Background */}
                    <div className="relative h-48 overflow-hidden">
                      <LazyImage
                        src={value.image}
                        alt={value.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${value.bgColor} opacity-90`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                          {value.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF4C39] transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section - Enhanced */}
        <motion.div 
          ref={teamRef}
          initial={{ opacity: 0 }}
          animate={teamInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our passionate team of experts is dedicated to creating unforgettable experiences for your team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={teamInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <LazyImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <span className="text-2xl">{member.icon}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF4C39] transition-colors">
                        {member.name}
                      </h3>
                      <div className="text-[#FF4C39] font-medium mb-3">{member.role}</div>
                      <p className="text-gray-600 leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Team?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Let's create an unforgettable experience that brings your team closer together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#FF4C39] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  Get Free Consultation
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#FF4C39] transition-colors">
                  View Our Activities
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage; 