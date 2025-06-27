import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import ActivitiesSection from '../../components/ActivitiesSection';
import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';
import PageWrapper from '../../components/PageWrapper';

const OutdoorTeamBuildingActivities = () => {
  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Exciting Outdoor Team Building Activities | Trebound</title>
        <meta name="description" content="Fun & Engaging Outdoor Team Building Activities. Keep Your Employees Happy, Engaged and Energized. Explore the latest games & activities for your team." />
        <link rel="canonical" href="https://www.trebound.com/exciting-outdoor-team-building-activities" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/outdoor.jpg')",
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Fun & Engaging Outdoor<br />Team Building Activities
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
            >
              Keep Your Employees Happy, Engaged and Energized
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-[40px] font-bold text-[#313131] mb-6">
              Improve Teamwork and Boost Team Morale With <span className="text-[#FF4C39]">Engaging & Impactful</span><br />Outdoor Team Building Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-4xl mx-auto">
              Outdoor team building activities provide a unique opportunity for teams to connect, collaborate, and challenge themselves in a natural environment. These activities help foster trust, communication, and problem-solving skills while creating lasting memories and strengthening team bonds.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Latest Games & Activities Section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Explore Latest Games & Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              We offer various Engaging & Impactful Outdoor Team Building Activities
            </p>
          </div>
          <ActivitiesSection />
        </div>
      </section>

      {/* Why Us Section */}
      <WhyChooseTreboundSection />

      {/* How It Works Section */}
      <HowItWorksProcessSection />

      {/* Team/Experts Section */}
      <TeamSection />
      {/* Testimonials Section */}
      <TestimonialsSection />
      {/* Partners Section */}
      <PartnersSection />
      {/* Contact Section */}
      <ContactSection />
      <Footer />
    </PageWrapper>
  );
};

export default OutdoorTeamBuildingActivities; 