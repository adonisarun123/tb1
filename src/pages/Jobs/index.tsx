import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiClock, FiUsers, FiTrendingUp, FiHeart, FiStar, FiArrowRight, FiCheck, FiGift } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet-async';
import LazyImage from '../../components/LazyImage';

const JobsPage: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [jobsRef, jobsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cultureRef, cultureInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const jobs = [
    {
      id: 1,
      title: 'Senior Activity Designer',
      department: 'Creative',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Design innovative team building activities that create meaningful experiences for corporate teams.',
      requirements: ['Experience in event planning or activity design', 'Creative problem-solving skills', 'Strong communication abilities'],
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Build lasting relationships with clients and ensure exceptional team building experiences.',
      requirements: ['Customer service experience', 'Excellent interpersonal skills', 'Problem-solving mindset'],
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      featured: false
    },
    {
      id: 3,
      title: 'Sales Development Representative',
      department: 'Sales',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Drive growth by connecting with companies looking to strengthen their teams through engaging activities.',
      requirements: ['Sales experience preferred', 'Strong communication skills', 'Goal-oriented mindset'],
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      featured: false
    },
    {
      id: 4,
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Create compelling marketing campaigns that showcase the impact of team building experiences.',
      requirements: ['Digital marketing experience', 'Content creation skills', 'Analytics knowledge'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      featured: true
    },
    {
      id: 5,
      title: 'Operations Coordinator',
      department: 'Operations',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '1-2 years',
      description: 'Coordinate seamless execution of team building events and activities across multiple locations.',
      requirements: ['Project management skills', 'Attention to detail', 'Multitasking abilities'],
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80',
      featured: false
    },
    {
      id: 6,
      title: 'Product Manager',
      department: 'Product',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '4-6 years',
      description: 'Lead product development for our digital team building platform and activity management tools.',
      requirements: ['Product management experience', 'Technical background', 'User-centric thinking'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
      featured: true
    }
  ];

  const benefits = [
    {
      icon: FiHeart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness programs',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: FiTrendingUp,
      title: 'Career Growth',
      description: 'Clear career progression paths, mentorship programs, and skill development',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: FiUsers,
      title: 'Team Culture',
      description: 'Regular team building activities, company retreats, and collaborative environment',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: FiGift,
      title: 'Perks & Benefits',
      description: 'Flexible working hours, remote work options, and performance bonuses',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const cultureImages = [
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      title: 'Team Collaboration',
      description: 'Working together on innovative projects'
    },
    {
      url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
      title: 'Innovation Hub',
      description: 'Creative workspace for breakthrough ideas'
    },
    {
      url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80',
      title: 'Team Events',
      description: 'Regular team building and social activities'
    }
  ];

  const departments = ['all', 'Creative', 'Customer Success', 'Sales', 'Marketing', 'Operations', 'Product'];
  const locations = ['all', 'Bangalore', 'Mumbai', 'Hyderabad', 'Remote'];

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchesDepartment && matchesLocation;
  });

  const handleApply = (jobId: number) => {
    // Handle job application
    window.open(`mailto:careers@trebound.com?subject=Application for Job ID: ${jobId}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Careers at Trebound | Join Our Team Building Experts</title>
        <meta 
          name="description" 
          content="Join Trebound's mission to transform teams worldwide. Explore exciting career opportunities in activity design, customer success, sales, marketing, and more. Apply now!"
        />
        <meta name="keywords" content="trebound careers, team building jobs, activity designer jobs, customer success careers, remote work opportunities" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
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
              alt="Join our team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-indigo-900/80 to-purple-900/85"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dream Team</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
                Help us transform teams worldwide through exceptional experiences. Build your career while building better teams.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <FiUsers className="text-blue-300 text-xl" />
                  <span className="text-white font-semibold">50+ Team Members</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <FiStar className="text-yellow-300 text-xl" />
                  <span className="text-white font-semibold">4.8/5 Employee Rating</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <FiTrendingUp className="text-green-300 text-xl" />
                  <span className="text-white font-semibold">Growing Fast</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-[#FF4C39] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  View Open Positions
                </button>
                <button 
                  onClick={() => document.getElementById('culture-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#FF4C39] transition-colors"
                >
                  Learn About Our Culture
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          ref={benefitsRef}
          initial={{ opacity: 0 }}
          animate={benefitsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">With Us?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe in taking care of our team so they can take care of our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={benefitsInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <LazyImage
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <benefit.icon className="text-white text-xl" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF4C39] transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Jobs Section */}
        <motion.div 
          id="jobs-section"
          ref={jobsRef}
          initial={{ opacity: 0 }}
          animate={jobsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">Positions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Find your perfect role and help us create amazing team experiences.
              </p>

              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 self-center mr-2">Department:</span>
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedDepartment === dept
                          ? 'bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {dept === 'all' ? 'All Departments' : dept}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 self-center mr-2">Location:</span>
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedLocation === location
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {location === 'all' ? 'All Locations' : location}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={jobsInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handleApply(job.id)}
                >
                  <div className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 ${
                    job.featured ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    {job.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Job Image */}
                    <div className="relative h-48 overflow-hidden">
                      <LazyImage
                        src={job.image}
                        alt={job.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center space-x-2 text-sm">
                            <FiMapPin className="text-blue-300" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <FiClock className="text-green-300" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {job.department}
                        </span>
                        <span className="text-sm text-gray-500">{job.experience}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF4C39] transition-colors">
                        {job.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {job.description}
                      </p>

                      {/* Requirements */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                        <ul className="space-y-1">
                          {job.requirements.slice(0, 2).map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start text-sm text-gray-600">
                              <FiCheck className="text-green-500 text-xs mt-1 mr-2 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Apply Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job.id);
                        }}
                        className="w-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 group"
                      >
                        <span>Apply Now</span>
                        <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No positions found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later for new opportunities.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Culture Section */}
        <motion.div 
          id="culture-section"
          ref={cultureRef}
          initial={{ opacity: 0 }}
          animate={cultureInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">Culture</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We practice what we preach - building strong teams starts with our own team culture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {cultureImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={cultureInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    <LazyImage
                      src={image.url}
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                      <p className="text-blue-100">{image.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Culture Values */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">What We Believe In</h3>
                <p className="text-lg text-gray-600">The values that guide our daily work and decisions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: '🚀', title: 'Innovation', description: 'Always pushing boundaries' },
                  { icon: '🤝', title: 'Collaboration', description: 'Better together' },
                  { icon: '💡', title: 'Creativity', description: 'Thinking outside the box' },
                  { icon: '❤️', title: 'Impact', description: 'Making a real difference' }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={cultureInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </div>
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
                Ready to Join Our Mission?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Help us transform teams worldwide and build your career in the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:careers@trebound.com"
                  className="bg-white text-[#FF4C39] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Send Your Resume
                </a>
                <button 
                  onClick={() => document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#FF4C39] transition-colors"
                >
                  View All Openings
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

export default JobsPage; 