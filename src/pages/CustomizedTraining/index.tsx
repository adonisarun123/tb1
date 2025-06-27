import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiUsers, FiClock, FiMapPin } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import NewsletterSection from '../../components/NewsletterSection';
import SkipSearchPopup from '../../components/SkipSearchPopup';

interface CustomizedTraining {
  id: number;
  name: string;
  slug: string;
  banner_image: string;
  alt_text: string;
  tagline: string;
  activity_description: string;
  activity_time: string;
  group_size: string;
  preferred_setting: string;
  meta_description: string;
}

const CustomizedTrainingPage = () => {
  const [trainings, setTrainings] = useState<CustomizedTraining[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSkipSearchPopup, setShowSkipSearchPopup] = useState(false);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/customized_trainings?select=*`,
          {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTrainings(data);
        }
      } catch (error) {
        console.error('Error fetching trainings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Customized Training Programs | Corporate Training Solutions | Trebound</title>
        <meta 
          name="description" 
          content="Transform your team with Trebound's customized corporate training programs. Expert-led, tailored solutions for leadership, communication, and professional development."
        />
        <meta name="keywords" content="corporate training, customized training, professional development, leadership training, team development" />
        <meta name="author" content="Trebound" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Trebound" />
        <meta property="og:title" content="Customized Training Programs | Corporate Training Solutions | Trebound" />
        <meta property="og:description" content="Transform your team with Trebound's customized corporate training programs. Expert-led, tailored solutions for leadership, communication, and professional development." />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Customized Training Programs | Corporate Training Solutions | Trebound" />
        <meta name="twitter:description" content="Transform your team with Trebound's customized corporate training programs. Expert-led, tailored solutions for leadership, communication, and professional development." />
        
        {/* Additional SEO */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        <SkipSearchPopup 
          isVisible={showSkipSearchPopup} 
          onClose={() => setShowSkipSearchPopup(false)} 
        />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto mb-20"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-outfit">
                Customized Training Programs for{' '}
                <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                  Modern Teams
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 font-dm-sans">
                Enhance your team's capabilities with our expert-led training programs. 
                Tailored solutions for lasting impact and measurable results.
              </p>
              <button
                onClick={() => setShowSkipSearchPopup(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Partner with Us
                <FiArrowRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>

            {/* Training Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainings.map((training) => (
                <motion.div
                  key={training.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  <Link to={`/customized-training/${training.slug}`} className="block flex-grow">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={training.banner_image}
                        alt={training.alt_text}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 font-outfit">
                        {training.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {training.tagline}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <FiClock className="w-5 h-5 mr-2 text-[#FF4C39]" />
                          <span>{training.activity_time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiUsers className="w-5 h-5 mr-2 text-[#FF4C39]" />
                          <span>{training.group_size}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiMapPin className="w-5 h-5 mr-2 text-[#FF4C39]" />
                          <span>{training.preferred_setting}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-[#FF4C39] font-medium group">
                        Learn More
                        <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-outfit">
                Why Choose Our{' '}
                <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                  Training Programs
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Transform your team's potential with our expertly crafted training solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Customized Approach",
                  description: "Programs tailored to your team's specific needs and goals"
                },
                {
                  title: "Expert Facilitators",
                  description: "Led by industry professionals with proven track records"
                },
                {
                  title: "Measurable Results",
                  description: "Clear metrics and outcomes to track progress and success"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-xl shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-outfit">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
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
                Let's create a customized training program that meets your specific needs.
              </p>
              <button
                onClick={() => setShowSkipSearchPopup(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Get Started
                <FiArrowRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
};

export default CustomizedTrainingPage; 