import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiUsers, FiTarget, FiBriefcase, FiArrowDown, FiAward, FiSmile, FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import NewsletterSection from '../../components/NewsletterSection';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import { supabase } from '../../lib/supabaseClient';

// Team building related Unsplash images
const fallbackImages = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center', // Team meeting
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop&crop=center', // Team collaboration
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=300&fit=crop&crop=center', // Team discussion
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center', // Team workshop
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop&crop=center', // Team presentation
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center', // Team planning
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&crop=center', // Team brainstorming
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=center', // Team meeting room
  'https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=400&h=300&fit=crop&crop=center', // Team high five
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center', // Team huddle
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&crop=center', // Team outdoor activity
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center', // Team building exercise
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop&crop=center', // Team celebration
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center', // Team work session
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop&crop=center'  // Team collaboration
];

// Hero image for team building
const heroImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&crop=center';

// Function to get a consistent fallback image based on index
const getFallbackImageByIndex = (index: number) => {
  return fallbackImages[index % fallbackImages.length];
};

interface CorporateTeambuilding {
  id: number;
  name: string;
  slug: string;
  target_keyword?: string;
  main_heading?: string;
  meta_description?: string;
  tagline?: string;
  form_cta_heading?: string;
  form_cta_paragraph?: string;
  button_text?: string;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

const CorporateTeamBuildingActivities: React.FC = () => {
  const [teambuildings, setTeambuildings] = useState<CorporateTeambuilding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeambuildings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('corporate_teambuildings')
          .select('id, name, slug, target_keyword, main_heading, meta_description, tagline, form_cta_heading, form_cta_paragraph, button_text, created_at, updated_at, published_at')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTeambuildings(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTeambuildings();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Team Building Activities | Professional Team Building Solutions | Trebound</title>
        <meta 
          name="description" 
          content="Transform your team with engaging corporate team building activities. Keep your employees happy, engaged and energized with our diverse range of team building solutions." 
        />
        <meta
          name="keywords"
          content="corporate team building, team building activities, corporate training, team development, employee engagement, workplace collaboration"
        />
        <link rel="canonical" href="https://www.trebound.com/corporate-teambuilding" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Corporate Team Building Activities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
          >
            <span className="text-white font-medium text-lg">Empower Your Team</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-outfit"
          >
            Partnering with Leading<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF4C39] to-[#FFB573]">
              Corporate Team Building
            </span><br />
            Companies
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-outfit"
          >
            Forge Stronger Bonds with Top Corporate Team Building Experts
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="#activities"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 font-outfit"
            >
              Explore Activities
              <FiArrowDown className="ml-2 w-5 h-5" />
            </Link>
            
            <div className="flex items-center text-white/80">
              <FiUsers className="mr-2 w-5 h-5" />
              <span className="text-sm font-outfit">Trusted by 500+ Companies</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#313131] mb-6 font-inter">
                Corporate Team Building Companies
              </h2>
              <p className="text-lg text-[#636363] leading-relaxed font-dm-sans">
                Discover our Corporate Team Building Companies program designed to enhance team collaboration and performance through innovative activities and expert facilitation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Link
                to="#activities"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 font-outfit"
              >
                Learn More
                <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <div className="flex items-center text-[#636363] bg-[#F3F3F3] px-4 py-2 rounded-full">
                <FiUsers className="mr-2 w-4 h-4" />
                <span className="text-sm font-medium font-dm-sans">Team Activity</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#313131] mb-6 font-inter">
              Why Choose Our Team Building Activities?
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto font-dm-sans">
              Our corporate team building activities are designed to create lasting impact and meaningful connections within your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 border border-[#EEEEEE]">
              <FiUsers className="text-4xl text-[#FF4C39] mb-6" />
              <h3 className="text-xl font-bold text-[#313131] mb-4 font-inter">Enhanced Team Bonding</h3>
              <p className="text-[#636363] font-dm-sans">
                Build stronger relationships and trust among team members through shared experiences and challenges.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 border border-[#EEEEEE]">
              <FiTarget className="text-4xl text-[#FF4C39] mb-6" />
              <h3 className="text-xl font-bold text-[#313131] mb-4 font-inter">Improved Communication</h3>
              <p className="text-[#636363] font-dm-sans">
                Develop better communication skills and understanding between team members.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 border border-[#EEEEEE]">
              <FiBriefcase className="text-4xl text-[#FF4C39] mb-6" />
              <h3 className="text-xl font-bold text-[#313131] mb-4 font-inter">Professional Growth</h3>
              <p className="text-[#636363] font-dm-sans">
                Foster leadership skills and professional development through engaging activities.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 border border-[#EEEEEE]">
              <FiAward className="text-4xl text-[#FF4C39] mb-6" />
              <h3 className="text-xl font-bold text-[#313131] mb-4 font-inter">Increased Productivity</h3>
              <p className="text-[#636363] font-dm-sans">
                Boost team efficiency and productivity through improved collaboration.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 border border-[#EEEEEE]">
              <FiSmile className="text-4xl text-[#FF4C39] mb-6" />
              <h3 className="text-xl font-bold text-[#313131] mb-4 font-inter">Employee Satisfaction</h3>
              <p className="text-[#636363] font-dm-sans">
                Create a positive work environment and boost employee morale.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 border border-[#EEEEEE]">
              <FiTarget className="text-4xl text-[#FF4C39] mb-6" />
              <h3 className="text-xl font-bold text-[#313131] mb-4 font-inter">Goal Achievement</h3>
              <p className="text-[#636363] font-dm-sans">
                Align team efforts towards common goals and objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Team Building Activities Section */}
      <section id="activities" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#313131] mb-6 font-inter">
              Our Corporate Team Building Programs
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto font-dm-sans">
              Explore our comprehensive collection of corporate team building activities designed to transform your team dynamics and boost performance.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center text-red-600 py-8">
              <p>{error}</p>
            </div>
          )}

          {/* Team Building Activities Grid */}
          {!loading && !error && (
            <>
              {teambuildings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teambuildings.map((teambuilding, index) => (
                    <motion.div
                      key={teambuilding.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group bg-white rounded-2xl overflow-hidden border border-[#EEEEEE] hover:border-[#FF4C39]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={getFallbackImageByIndex(index)}
                          alt={teambuilding.main_heading || teambuilding.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        {/* Floating tag */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#FF4C39] text-sm font-medium rounded-full font-dm-sans">
                            Team Building
                          </span>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="mb-4">
                          {teambuilding.tagline && (
                            <span className="inline-block px-3 py-1 bg-[#F3F3F3] text-[#636363] text-xs font-medium rounded-full mb-3 font-dm-sans">
                              {teambuilding.tagline}
                            </span>
                          )}
                          
                          <h3 className="text-xl font-bold text-[#313131] mb-3 group-hover:text-[#FF4C39] transition-colors duration-300 leading-tight font-inter">
                            {teambuilding.main_heading || teambuilding.name}
                          </h3>
                        </div>
                        
                        <p className="text-[#636363] mb-6 line-clamp-3 leading-relaxed text-sm font-dm-sans">
                          {teambuilding.meta_description || `Discover our ${teambuilding.name} program designed to enhance team collaboration and performance.`}
                        </p>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-[#EEEEEE]">
                          <Link
                            to={`/corporate-teambuilding/${teambuilding.slug}`}
                            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 font-outfit"
                          >
                            Learn More
                            <FiArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                          
                          <div className="flex items-center text-xs text-[#717171]">
                            <FiUsers className="mr-1.5 w-3.5 h-3.5" />
                            <span className="font-dm-sans">Corporate</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiBriefcase className="mx-auto text-6xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No Team Building Activities Yet
                  </h3>
                  <p className="text-gray-500">
                    Our corporate team building activities are being prepared. Check back soon!
                  </p>
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

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default CorporateTeamBuildingActivities; 