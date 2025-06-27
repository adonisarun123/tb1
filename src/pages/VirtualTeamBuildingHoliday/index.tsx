import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import { VirtualActivitiesSection } from '../../components/OutboundSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import ContactSection from '../../components/ContactSection';
import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';
import PageWrapper from '../../components/PageWrapper';

const VirtualTeamBuildingHolidayPage: React.FC = () => {
  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Virtual Team Building Activities for the Holiday Season | Trebound</title>
        <meta 
          name="description" 
          content="Spread holiday cheer with virtual team building activities. Bring your team together, boost morale, and improve communication, all from the comfort of home."
        />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-[#002B4F] to-[#0F4C75] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover opacity-30"
            style={{
              backgroundImage: "url('/images/Virtual.jpg')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002B4F]/90 via-[#002B4F]/80 to-[#0F4C75]/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm md:text-base font-medium mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
            >
              Join in on the holiday teambuilding fun before it's too late
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Spread Holiday Cheer With<br />Virtual Teambuilding!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
            >
              Bring your team together, boost morale, and improve communication, all from the comfort of your own home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl font-semibold text-[#FFB573] mb-8"
            >
              ⭐ Activities priced as low as $7/person ⭐
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Talk to us
            </motion.button>
          </div>
        </div>
      </section>

      {/* Virtual Activities Section */}
      <VirtualActivitiesSection />

      {/* Why Us Section */}
      <WhyChooseTreboundSection />

      {/* How It Works Section */}
      <HowItWorksProcessSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <div id="contact-form">
        <ContactSection />
      </div>
    </PageWrapper>
  );
};

export default VirtualTeamBuildingHolidayPage; 