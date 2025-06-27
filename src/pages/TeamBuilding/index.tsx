import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiUsers, FiTarget, FiBriefcase, FiArrowDown, FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import NewsletterSection from '../../components/NewsletterSection';

interface TeamBuildingPage {
  id: number;
  name: string;
  slug: string;
  small_description: string;
  main_image: string;
  thumbnail_image: string;
  featured: boolean;
  post_body: string;
}

const TeamBuilding = () => {
  const [pages, setPages] = useState<TeamBuildingPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/landing_pages?select=*`,
          {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched landing pages:', data);
          setPages(data);
        } else {
          console.error('Error response:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching landing pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Team Building Activities & Solutions | Trebound</title>
        <meta name="description" content="Discover innovative team building activities and solutions designed to strengthen team bonds, improve communication, and boost productivity." />
        <meta property="og:title" content="Team Building Activities & Solutions | Trebound" />
        <meta property="og:description" content="Discover innovative team building activities and solutions designed to strengthen team bonds, improve communication, and boost productivity." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
              alt="Team Building Activities"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative text-center px-4 max-w-5xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-outfit leading-tight">
              Transform Your Team with
              <span className="block bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Engaging Experiences
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-dm-sans">
              Discover innovative team building activities that strengthen bonds, improve communication, and boost productivity.
            </p>
            <a
              href="#explore"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 group"
            >
              Explore Activities
              <FiArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <FiUsers className="w-12 h-12" />,
                  title: "Build Stronger Bonds",
                  description: "Foster meaningful connections and trust among team members through engaging activities."
                },
                {
                  icon: <FiTarget className="w-12 h-12" />,
                  title: "Boost Creativity",
                  description: "Stimulate innovative thinking and problem-solving skills in a fun, collaborative environment."
                },
                {
                  icon: <FiBriefcase className="w-12 h-12" />,
                  title: "Improve Performance",
                  description: "Enhance team productivity and efficiency through targeted team building exercises."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="mb-6 text-gray-400 group-hover:text-[#FF4C39] transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-outfit group-hover:text-[#FF4C39] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Activities Grid */}
        <section id="explore" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-12 text-center font-outfit"
            >
              <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Discover Right Solutions
              </span>
              <span className="block text-3xl md:text-4xl mt-2 text-gray-800">
                For Your Team
              </span>
            </motion.h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {pages.map((page) => (
                  <motion.div
                    key={page.id}
                    variants={fadeInUp}
                    className="rounded-xl overflow-hidden bg-white shadow-xl transition-all duration-300 hover:shadow-2xl h-full flex flex-col"
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Link to={`/teambuilding/${page.slug}`} className="block h-full flex flex-col">
                      <div className="relative h-48 md:h-60 overflow-hidden">
                        <img
                          src={page.thumbnail_image || page.main_image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80'}
                          alt={page.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-900/70 to-transparent w-full h-1/3"></div>
                        
                        {/* Trebound favicon with date */}
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-white shadow-md overflow-hidden p-0">
                            <img 
                              src="/images/trebound-favicon-32px.jpg" 
                              alt="Trebound" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-grow flex flex-col">          
                        <h3 className="text-xl font-medium text-primary mb-3 line-clamp-2 font-outfit">
                          {page.name}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {page.small_description}
                        </p>
                        
                        <div className="mt-auto pt-4">
                          <span className="inline-flex items-center text-[rgb(26,54,93)] font-medium group no-underline">
                            Learn More
                            <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-outfit">
                Ready to Transform Your Team?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let us help you create memorable team building experiences that drive real results.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
              >
                Get Started
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
};

export default TeamBuilding; 