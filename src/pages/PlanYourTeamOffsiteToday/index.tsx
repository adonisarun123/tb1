import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import ActivitiesSection from '../../components/ActivitiesSection';
import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';
import PageWrapper from '../../components/PageWrapper';

const PlanYourTeamOffsiteToday = () => {
  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Plan Your Team Offsite Today | Trebound</title>
        <meta
          name="description"
          content="Plan your next team offsite with Trebound. Discover engaging activities, expert facilitation, and a seamless process for impactful team building experiences."
        />
        <meta
          name="keywords"
          content="team offsite, plan team offsite, team building activities, corporate retreat, team games, corporate events"
        />
        <meta property="og:title" content="Plan Your Team Offsite Today | Trebound" />
        <meta property="og:description" content="Transform your team dynamics with expertly planned offsites. Choose from curated activities and a seamless planning process." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.trebound.com/plan-your-team-offsite-today" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/offsite activities.jpg')",
              backgroundPosition: 'center 23%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
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
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Plan Your Team Offsite Today
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-white/90 italic mb-8 max-w-3xl mx-auto"
            >
              Fun & Engaging Off-site Activities. Keep Your Employees Happy, Engaged and Energized.
            </motion.p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
              Get a Proposal
            </a>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[20px] [&>p]:leading-relaxed [&>p]:mb-6"
            >
              <p>
                Discover how Trebound can help you plan a seamless, impactful, and fun team offsite. Our expert facilitators, curated activities, and proven process ensure your team returns energized, connected, and ready to achieve more together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore Latest Games & Activities Section */}
      <section className="py-[64px] bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">
              Explore Latest Games & Activities
            </h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Improve Teamwork and Boost Team Morale With Engaging & Impactful Team Building Activities
            </p>
          </div>
          <ActivitiesSection />
        </div>
      </section>

      {/* Why Us Section */}
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

export default PlanYourTeamOffsiteToday; 