import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiStar, FiAward, FiTrendingUp } from 'react-icons/fi';
import { QuoteModalProvider } from '../../contexts/QuoteModalContext';

import TeamOutingsHeader from '../../components/TeamOutingsHeader';
import TeamOutingsFooter from '../../components/TeamOutingsFooter';
import ContactSection from '../../components/ContactSection';
import PartnersSection from '../../components/PartnersSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PageWrapper from '../../components/PageWrapper';
import { useTeamOutingAds } from '../../contexts/TeamOutingAdsContext';
import type { TeamOutingAd } from '../../contexts/TeamOutingAdsContext';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TeamOutingAdCardProps {
  ad: TeamOutingAd;
}

// Team Outing Ad Card Component
const TeamOutingAdCard: React.FC<TeamOutingAdCardProps> = ({ ad }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full bg-white rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden"
      whileHover={{ y: -4 }}
    >
      <Link to={`/team-outings/${ad.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={ad.banner_image}
            alt={ad.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white text-xs font-bold px-3 py-1 rounded-full">
            Premium
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold font-['Outfit'] text-[#313131] mb-2 leading-tight group-hover:text-[#FF4C39] transition-colors duration-300">
            {ad.name}
          </h3>
          <p className="text-sm font-medium font-['DM_Sans'] text-[#636363] leading-relaxed mb-4">
            {ad.subtext_after_heading}
          </p>
          <div className="flex items-center text-sm font-medium font-['Inter'] text-[#FF4C39] transition-all duration-300">
            View Details
            <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Benefits Card Component
const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#FF4C39] to-[#FFB573] p-[1px] mb-6">
        <div className="w-full h-full rounded-2xl bg-[#003366] flex items-center justify-center text-[#FF4C39] group-hover:opacity-90 group-hover:text-white transition-all duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-4 font-['Inter']">{title}</h3>
      <p className="text-white/80 font-['Inter'] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const TeamOutings: React.FC = () => {
  const { teamOutingAds, loading: adsLoading } = useTeamOutingAds();

  console.log('TeamOutings - Data:', { teamOutingAds, adsLoading });

  const filteredAndSortedAds = useMemo(() => {
    if (!teamOutingAds) return [];
    console.log('Processing ads:', teamOutingAds);
    return [...teamOutingAds];
  }, [teamOutingAds]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Benefits data
  const benefits = [
    {
      icon: <FiAward size={28} />,
      title: "Tailored Experiences",
      description: "Customized outings designed specifically for your team's unique needs, goals, and preferences to ensure maximum engagement and impact."
    },
    {
      icon: <FiStar size={28} />,
      title: "All-Inclusive Packages",
      description: "Comprehensive packages covering premium accommodation, curated activities, gourmet meals, and seamless transportation arrangements."
    },
    {
      icon: <FiTrendingUp size={28} />,
      title: "Expert Facilitation",
      description: "Seasoned professionals who expertly guide your team through transformative activities designed to strengthen bonds and boost productivity."
    }
  ];

  if (adsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF4C39]"></div>
      </div>
    );
  }

  return (
    <QuoteModalProvider>
      <PageWrapper className="min-h-screen bg-[#003366]">
        <TeamOutingsHeader />
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33]"></div>
          
          {/* Content Container */}
          <div className="relative z-10 max-w-[1448px] w-full mx-auto px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                  Elevate Your Team's Experience
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Crafting{' '}
                  <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                    Unforgettable
                  </span>{' '}
                  Team Experiences
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-xl font-['Inter'] leading-relaxed mb-10">
                  Discover the perfect destination for your next team retreat and create lasting memories that strengthen bonds and inspire collaboration.
                </p>
                <motion.a
                  href="#destinations"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-medium rounded-full hover:opacity-95 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Team Outing Options
                  <FiArrowRight className="ml-2" size={18} />
                </motion.a>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
                  alt="Team Building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/50 to-transparent"></div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-[#003366] to-[#002244] rounded-full opacity-50 blur-2xl"></div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33]" ref={ref}>
          <div className="max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-2 uppercase tracking-wider"
              >
                WHY CHOOSE US
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-[40px] font-bold font-['Outfit'] text-white mb-4"
              >
                The Trebound Advantage
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg font-['DM_Sans'] text-white/80 max-w-2xl mx-auto"
              >
                We specialize in creating memorable team experiences that foster collaboration, boost morale, and drive results
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <BenefitCard 
                  key={index} 
                  icon={benefit.icon} 
                  title={benefit.title} 
                  description={benefit.description} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Outing Solutions Section */}
        <section id="destinations" className="py-20 px-4 md:px-8 lg:px-16 bg-[#F3F3F3]">
          <div className="max-w-[1448px] mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block text-sm md:text-base font-semibold font-['Inter'] text-[#FF4C39] mb-2 uppercase tracking-wider"
              >
                SOLUTIONS
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl md:text-[40px] font-bold font-['Outfit'] bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent mb-4"
              >
                Explore Premium Team Outing Solutions
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-lg font-['DM_Sans'] text-[#636363] max-w-2xl mx-auto"
              >
                Discover our curated selection of team building packages designed to strengthen bonds, boost morale, and create lasting memories
              </motion.p>
            </div>
            
            {adsLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
              </div>
            ) : teamOutingAds && teamOutingAds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedAds.map((ad) => (
                  <motion.div
                    key={ad.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="group relative overflow-hidden rounded-2xl"
                  >
                    <TeamOutingAdCard ad={ad} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-neutral-50 rounded-2xl">
                <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="text-neutral-700" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 font-['Inter']">No Results Found</h3>
                <p className="text-lg text-neutral-800 font-['Inter']">
                  No team outing solutions available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#f9f9f9]">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33] rounded-[24px] p-10 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-10">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-[40px] font-bold font-['Outfit'] leading-tight text-white mb-6"
                  >
                    Ready to Plan Your Team's Next{' '}
                    <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                      Unforgettable
                    </span>{' '}
                    Outing?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-white/90 text-lg max-w-2xl mx-auto font-['Inter'] leading-relaxed"
                  >
                    Finding the right place for your team outing shouldn't be hard. Let us help you plan a great event that your team will talk about for a long time.
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <Link to="#contact-section" className="inline-block">
                    <button className="px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-bold font-['Outfit'] rounded-full hover:opacity-95 transition-all duration-300 transform hover:-translate-y-[2px]">
                      Contact Us Now
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Partners Section */}
        <PartnersSection />
        
        {/* Contact Section */}
        <div id="contact-section">
          <ContactSection />
        </div>
        
        {/* Footer */}
        <TeamOutingsFooter />
      </PageWrapper>
    </QuoteModalProvider>
  );
};

export default TeamOutings; 