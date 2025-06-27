import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiUsers, FiBriefcase, FiShare2 } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import NewsletterSection from '../../components/NewsletterSection';
import SkipSearchPopup from '../../components/SkipSearchPopup';
import DOMPurify from 'dompurify';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import { supabase } from '../../lib/supabaseClient';

// Team building related Unsplash images
const fallbackImages = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=center', // Team meeting
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop&crop=center', // Team collaboration
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop&crop=center', // Team discussion
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop&crop=center', // Team workshop
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&crop=center', // Team presentation
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center', // Team planning
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop&crop=center', // Team brainstorming
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=center', // Team meeting room
  'https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=800&h=600&fit=crop&crop=center', // Team high five
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center', // Team huddle
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop&crop=center', // Team outdoor activity
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&crop=center', // Team building exercise
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=center', // Team celebration
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center', // Team work session
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&crop=center'  // Team collaboration
];

// Function to get a random fallback image
const getRandomFallbackImage = () => {
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

// Function to get fallback image with error handling
const getImageWithFallback = (originalImage: string | undefined, fallbackImage?: string) => {
  if (originalImage) {
    return originalImage;
  }
  return fallbackImage || getRandomFallbackImage();
};

interface CorporateTeambuilding {
  id: number;
  name: string;
  slug: string;
  collection_id?: string;
  locale_id?: string;
  item_id?: string;
  target_keyword?: string;
  main_heading?: string;
  meta_description?: string;
  tagline?: string;
  heading_2?: string;
  heading_2_argument?: string;
  heading_3_satire?: string;
  heading_3?: string;
  heading_3_argument_1?: string;
  heading_3_argument_2?: string;
  heading_4?: string;
  reason_1_heading?: string;
  reason_1_paragraph?: string;
  reason_2_heading?: string;
  reason_2_paragraph?: string;
  reason_3_heading?: string;
  reason_3_paragraph?: string;
  reason_4_heading?: string;
  reason_4_paragraph?: string;
  reason_5_heading?: string;
  reason_5_paragraph?: string;
  form_cta_heading?: string;
  form_cta_paragraph?: string;
  button_text?: string;
  special_section_heading?: string;
  card_1_heading?: string;
  card_2_heading?: string;
  card_3_heading?: string;
  card_4_heading?: string;
  card_1_image?: string;
  card_2_image?: string;
  card_3_image?: string;
  card_4_image?: string;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

const CorporateTeambuildingDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [teambuilding, setTeambuilding] = useState<CorporateTeambuilding | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSkipSearchPopup, setShowSkipSearchPopup] = useState(false);

  useEffect(() => {
    const fetchTeambuilding = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('corporate_teambuildings')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Corporate teambuilding not found');

        setTeambuilding(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTeambuilding();
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: teambuilding?.name || 'Corporate Teambuilding',
        text: teambuilding?.tagline || 'Check out this corporate teambuilding activity',
        url: window.location.href
      }).catch(console.error);
    }
  };

  const sanitizeHtml = (html: string) => {
    return DOMPurify.sanitize(html || '', {
      ADD_ATTR: ['target', 'class', 'style', 'id', 'data-*'],
      ADD_TAGS: ['iframe'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'class', 'style', 'width', 'height', 'frameborder', 'allowfullscreen', 'id', 'data-*']
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center py-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF4C39]"></div>
        </div>
      </div>
    );
  }

  if (error || !teambuilding) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col justify-center items-center py-40 px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {error || 'Corporate teambuilding not found'}
          </h1>
          <p className="text-gray-600 mb-8">
            The corporate teambuilding you're looking for may have been removed or doesn't exist.
          </p>
          <Link 
            to="/corporate-teambuilding" 
            className="px-6 py-3 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Browse All Corporate Teambuildings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{teambuilding.name} | Trebound</title>
        <meta name="description" content={teambuilding.meta_description || `Discover ${teambuilding.name} with Trebound. Professional corporate team building solutions.`} />
        {teambuilding.target_keyword && (
          <meta name="keywords" content={teambuilding.target_keyword} />
        )}
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        
        <SkipSearchPopup 
          isVisible={showSkipSearchPopup} 
          onClose={() => setShowSkipSearchPopup(false)} 
        />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                {teambuilding.tagline && (
                  <div className="inline-block px-4 py-2 bg-[#F3F3F3] text-[#636363] rounded-full text-sm font-medium mb-6 font-dm-sans">
                    {teambuilding.tagline}
                  </div>
                )}
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#313131] mb-6 leading-tight font-outfit">
                  {teambuilding.main_heading || teambuilding.name}
                </h1>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center px-4 py-2 bg-[#F3F3F3] rounded-full">
                    <FiUsers className="mr-2 text-[#FF4C39] w-4 h-4" />
                    <span className="text-[#636363] text-sm font-medium font-dm-sans">Team Activity</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-[#F3F3F3] rounded-full">
                    <FiBriefcase className="mr-2 text-[#FF4C39] w-4 h-4" />
                    <span className="text-[#636363] text-sm font-medium font-dm-sans">Corporate</span>
                  </div>
                  <button 
                    onClick={handleShare}
                    className="flex items-center px-4 py-2 bg-[#F3F3F3] hover:bg-[#FF4C39]/10 rounded-full transition-colors duration-300"
                  >
                    <FiShare2 className="mr-2 text-[#FF4C39] w-4 h-4" />
                    <span className="text-[#636363] hover:text-[#FF4C39] text-sm font-medium transition-colors font-dm-sans">Share</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowSkipSearchPopup(true)}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 font-outfit"
                >
                  {teambuilding.button_text || "Get Started"}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2"
              >
                <div className="relative">
                  <img
                    src={getRandomFallbackImage()}
                    alt={teambuilding.name}
                    className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Heading 2 Section */}
        {teambuilding.heading_2 && (
          <section className="py-20 bg-[#F3F3F3]">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[#313131] mb-6 font-inter">
                  {teambuilding.heading_2}
                </h2>
                {teambuilding.heading_2_argument && (
                  <div 
                    className="prose prose-lg max-w-none text-[#636363] font-dm-sans"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(teambuilding.heading_2_argument) }}
                  />
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Heading 3 Section */}
        {teambuilding.heading_3 && (
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {teambuilding.heading_3_satire && (
                  <p className="text-lg text-[#FF4C39] font-medium mb-4 font-dm-sans">
                    {teambuilding.heading_3_satire}
                  </p>
                )}
                
                <h2 className="text-3xl md:text-4xl font-bold text-[#313131] mb-6 font-inter">
                  {teambuilding.heading_3}
                </h2>
                
                <div className="space-y-6">
                  {teambuilding.heading_3_argument_1 && (
                    <div 
                      className="prose prose-lg max-w-none text-[#636363] font-dm-sans"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(teambuilding.heading_3_argument_1) }}
                    />
                  )}
                  {teambuilding.heading_3_argument_2 && (
                    <div 
                      className="prose prose-lg max-w-none text-[#636363] font-dm-sans"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(teambuilding.heading_3_argument_2) }}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Reasons Section */}
        {(teambuilding.reason_1_heading || teambuilding.reason_2_heading || teambuilding.reason_3_heading || teambuilding.reason_4_heading || teambuilding.reason_5_heading) && (
          <section className="py-20 bg-[#F3F3F3]">
            <div className="max-w-7xl mx-auto px-4">
              {teambuilding.heading_4 && (
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#313131] mb-12 font-inter">
                  {teambuilding.heading_4}
                </h2>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { heading: teambuilding.reason_1_heading, paragraph: teambuilding.reason_1_paragraph },
                  { heading: teambuilding.reason_2_heading, paragraph: teambuilding.reason_2_paragraph },
                  { heading: teambuilding.reason_3_heading, paragraph: teambuilding.reason_3_paragraph },
                  { heading: teambuilding.reason_4_heading, paragraph: teambuilding.reason_4_paragraph },
                  { heading: teambuilding.reason_5_heading, paragraph: teambuilding.reason_5_paragraph }
                ].filter(reason => reason.heading).map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#EEEEEE]"
                  >
                    <h3 className="text-xl font-bold text-[#313131] mb-4 font-inter">{reason.heading}</h3>
                    {reason.paragraph && (
                      <div 
                        className="text-[#636363] leading-relaxed font-dm-sans"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(reason.paragraph) }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Special Section Cards */}
        {teambuilding.special_section_heading && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#313131] mb-12 font-inter">
                {teambuilding.special_section_heading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { heading: teambuilding.card_1_heading, image: teambuilding.card_1_image },
                  { heading: teambuilding.card_2_heading, image: teambuilding.card_2_image },
                  { heading: teambuilding.card_3_heading, image: teambuilding.card_3_image },
                  { heading: teambuilding.card_4_heading, image: teambuilding.card_4_image }
                ].filter(card => card.heading).map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#EEEEEE] hover:-translate-y-1"
                  >
                    <div className="relative pt-[75%] overflow-hidden">
                      <img
                        src={getImageWithFallback(card.image)}
                        alt={card.heading}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#313131] group-hover:text-[#FF4C39] transition-colors duration-300 font-inter">{card.heading}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#313131] to-[#636363]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-outfit">
                {teambuilding.form_cta_heading || `Ready to Transform Your Team with ${teambuilding.name}?`}
              </h2>
              {teambuilding.form_cta_paragraph && (
                <div 
                  className="text-xl text-white/90 mb-8 max-w-2xl mx-auto prose prose-lg prose-invert font-dm-sans"
                  dangerouslySetInnerHTML={{ 
                    __html: sanitizeHtml(teambuilding.form_cta_paragraph)
                  }}
                />
              )}
              <button
                onClick={() => setShowSkipSearchPopup(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 font-outfit"
              >
                {teambuilding.button_text || "Get Started Today"}
              </button>
            </motion.div>
          </div>
        </section>

        <TestimonialsSection />
        <PartnersSection />

        <div id="contact">
          <ContactSection />
        </div>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
};

export default CorporateTeambuildingDetail; 