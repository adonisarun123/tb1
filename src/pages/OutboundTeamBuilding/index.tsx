import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import { OutboundActivitiesSection } from '../../components/OutboundSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';
import PageWrapper from '../../components/PageWrapper';

// Add custom styles
const styles = {
  textShadow: {
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)'
  }
};

const OutboundTeamBuildingPage: React.FC = () => {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [teamRef, teamInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Outbound Team Building Activities | Trebound</title>
        <meta name="description" content="Outbound team building activities for corporate teams made easy" />
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/outbound.jpg')",
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
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg font-bold mb-4 px-3 py-1 inline-block rounded bg-black/30 tracking-wider shadow-lg text-white"
              style={{
                ...styles.textShadow,
                borderLeft: '3px solid #FF5A3C'
              }}
            >
              Engaging Outdoor Activities for Corporate Teams
            </motion.h2>
            <motion.h1
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Outbound Team Building<br />
              Activities
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Outbound Activities Section */}
      <OutboundActivitiesSection />

      {/* Mission Section */}
      <section className="relative py-24 bg-[#002B4F] overflow-hidden">
        {/* Background wave pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 700" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-114 699.5C-114 699.5 243.5 699.5 499.5 699.5C755.5 699.5 1113 699.5 1113 699.5C1113 699.5 1302.5 699.5 1440 699.5" stroke="url(#paint0_linear)" strokeWidth="2"/>
            <path d="M-114 599.5C-114 599.5 243.5 599.5 499.5 599.5C755.5 599.5 1113 599.5 1113 599.5C1113 599.5 1302.5 599.5 1440 599.5" stroke="url(#paint1_linear)" strokeWidth="2"/>
            <path d="M-114 499.5C-114 499.5 243.5 499.5 499.5 499.5C755.5 499.5 1113 499.5 1113 499.5C1113 499.5 1302.5 499.5 1440 499.5" stroke="url(#paint2_linear)" strokeWidth="2"/>
            <path d="M-114 399.5C-114 399.5 243.5 399.5 499.5 399.5C755.5 399.5 1113 399.5 1113 399.5C1113 399.5 1302.5 399.5 1440 399.5" stroke="url(#paint3_linear)" strokeWidth="2"/>
            <path d="M-114 299.5C-114 299.5 243.5 299.5 499.5 299.5C755.5 299.5 1113 299.5 1113 299.5C1113 299.5 1302.5 299.5 1440 299.5" stroke="url(#paint4_linear)" strokeWidth="2"/>
            <path d="M-114 199.5C-114 199.5 243.5 199.5 499.5 199.5C755.5 199.5 1113 199.5 1113 199.5C1113 199.5 1302.5 199.5 1440 199.5" stroke="url(#paint5_linear)" strokeWidth="2"/>
            <path d="M-114 99.5C-114 99.5 243.5 99.5 499.5 99.5C755.5 99.5 1113 99.5 1113 99.5C1113 99.5 1302.5 99.5 1440 99.5" stroke="url(#paint6_linear)" strokeWidth="2"/>
            <path d="M-114 -0.5C-114 -0.5 243.5 -0.5 499.5 -0.5C755.5 -0.5 1113 -0.5 1113 -0.5C1113 -0.5 1302.5 -0.5 1440 -0.5" stroke="url(#paint7_linear)" strokeWidth="2"/>
            <defs>
              <linearGradient id="paint0_linear" x1="-114" y1="700" x2="1440" y2="700" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4C39"/>
                <stop offset="1" stopColor="#FFB573"/>
              </linearGradient>
              <linearGradient id="paint1_linear" x1="-114" y1="600" x2="1440" y2="600" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4C39"/>
                <stop offset="1" stopColor="#FFB573"/>
              </linearGradient>
              <linearGradient id="paint2_linear" x1="-114" y1="500" x2="1440" y2="500" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4C39"/>
                <stop offset="1" stopColor="#FFB573"/>
              </linearGradient>
              <linearGradient id="paint3_linear" x1="-114" y1="400" x2="1440" y2="400" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4C39"/>
                <stop offset="1" stopColor="#FFB573"/>
              </linearGradient>
              <linearGradient id="paint4_linear" x1="-114" y1="300" x2="1440" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4C39"/>
                <stop offset="1" stopColor="#FFB573"/>
              </linearGradient>
              <linearGradient id="paint5_linear" x1="-114" y1="200" x2="1440" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4C39"/>
                <stop offset="1" stopColor="#FFB573"/>
              </linearGradient>
              <linearGradient id="paint6_linear" x1="-114" y1="100" x2="1440" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4C39"/>
                <stop offset="1" stopColor="#FFB573"/>
              </linearGradient>
              <linearGradient id="paint7_linear" x1="-114" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4C39"/>
                <stop offset="1" stopColor="#FFB573"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-white text-lg font-medium mb-4 inline-block"
            >
              Mission
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
            >
              Building Bonds, Creating Memories
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white text-xl md:text-2xl leading-relaxed mb-8"
            >
              "Our mission is to create unforgettable outdoor experiences that strengthen team bonds and inspire collaboration. We believe in the power of shared adventures to transform teams."
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[#FFB573] text-2xl italic"
            >
              Adventure Together!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-gray-600 text-lg mb-4"
            >
              Team
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-[#FF5A3C]"
            >
              Meet Our Trailblazers
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-lg group"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src="/images/Team hover 1.png"
                  alt="Jemcy"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-3xl font-bold mb-2">Jemcy</h3>
                <p className="text-white text-lg transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">Adventure Seeker</p>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-lg group"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src="/images/team hover 2.png"
                  alt="Vaishnavi"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-3xl font-bold mb-2">Vaishnavi</h3>
                <p className="text-white text-lg transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">Nature Enthusiast</p>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative rounded-3xl overflow-hidden shadow-lg group"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src="/images/team hover 3.png"
                  alt="Raj Lakshmi"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-3xl font-bold mb-2">Raj Lakshmi</h3>
                <p className="text-white text-lg transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">Cultural Explorer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </PageWrapper>
  );
};

export default OutboundTeamBuildingPage; 