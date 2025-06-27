import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import TeamSection from '../../components/TeamSection';
import ActivitiesSection from '../../components/ActivitiesSection';
import BestBangaloreStaysSection from '../../components/BestBangaloreStaysSection';
import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';
import PageWrapper from '../../components/PageWrapper';

const ResortsAroundBangalore = () => {
  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Resorts Around Bangalore | Trebound</title>
        <meta name="description" content="Discover the best resorts in and around Bangalore for team outings. Curated list of top resorts with unmatched comfort, leisure, and team building activities." />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/bangalore city.jpg')",
              backgroundPosition: 'center 70%',
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Top Resorts In and Around Bangalore for Unmatched Comfort and Leisure
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-white mb-4"
            >
              Find the perfect getaway that combines relaxation, adventure, and memorable experiences
            </motion.p>
            <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300">
              Get a proposal
            </a>
          </motion.div>
        </div>
      </section>

      {/* Top Resorts Section (dynamic, shared) */}
      <BestBangaloreStaysSection />

      {/* Explore Latest Games & Activities Section */}
      <section className="py-[64px] bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">Explore Latest Games & Activities</h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Improve Teamwork and Boost Team Morale With Engaging & Impactful Team Building Activities
            </p>
          </div>
          <ActivitiesSection />
        </div>
      </section>

      {/* Plan your teambuilding session In Bangalore Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-[#313131] mb-6" style={{ fontSize: '32px' }}>
              Plan your teambuilding session In Bangalore
            </h2>
            <p className="text-gray-600 mb-8" style={{ fontSize: '20px' }}>
              Ready to energize your team and create lasting memories? Let Trebound help you plan a seamless, impactful, and fun team building session in Bangalore. Our expert facilitators, curated activities, and proven process ensure your team returns connected and motivated.
            </p>
            <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300">
              Get a Proposal
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Trebound Section */}
      <WhyChooseTreboundSection />

      {/* How It Works Section */}
      <HowItWorksProcessSection />

      {/* Team Section */}
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

export default ResortsAroundBangalore; 