import { FiStar, FiClock, FiUsers, FiArrowLeft, FiMapPin, FiCalendar } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuoteModal } from '../../contexts/QuoteModalContext';
import TeamOutingsHeader from '../../components/TeamOutingsHeader';
import TeamOutingsFooter from '../../components/TeamOutingsFooter';
import { useTeamOutingAds } from '../../contexts/TeamOutingAdsContext';
import type { TeamOutingAd } from '../../contexts/TeamOutingAdsContext';

// Showcase Card Component
const ShowcaseCard = ({ 
  image, 
  heading, 
  subtext 
}: { 
  image: string | undefined; 
  heading: string | undefined; 
  subtext: string | undefined;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!image || !heading || !subtext) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={heading}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xl font-bold text-white mb-2 font-['Inter']">
          {heading}
        </h3>
        <p className="text-white/90 text-sm font-medium font-['Inter'] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {subtext}
        </p>
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
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
      className="flex items-start p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white shrink-0">
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-white mb-2 font-['Inter']">{title}</h3>
        <p className="text-white/80 font-['Inter'] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const TeamOutingDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { teamOutingAds } = useTeamOutingAds();
  const [ad, setAd] = useState<TeamOutingAd | null>(null);
  const { openModal } = useQuoteModal();

  useEffect(() => {
    if (teamOutingAds) {
      const foundAd = teamOutingAds.find(ad => ad.slug === slug);
      if (foundAd) {
        setAd(foundAd);
      }
    }
  }, [teamOutingAds, slug]);

  if (!ad) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33] flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Team Outing Destination Not Found</h1>
        <p className="text-lg text-white/80 mb-8">The team outing destination you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/team-outings')}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-medium rounded-full hover:opacity-95 transition-all duration-300"
        >
          <FiArrowLeft className="mr-2" />
          Back to Team Outings
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#003366]">
      <TeamOutingsHeader />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33]"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                Premium Destination
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Outfit']">
                {ad.name}
              </h1>
              <p className="text-lg text-white/80 mb-8 font-['Inter'] leading-relaxed">
                {ad.subtext_after_heading}
              </p>
              
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center text-white/80">
                  <FiMapPin className="mr-3" size={20} />
                  <span>Location: {ad.location || 'Location available upon request'}</span>
                </div>
                <div className="flex items-center text-white/80">
                  <FiUsers className="mr-3" size={20} />
                  <span>Group Size: 10-50</span>
                </div>
                <div className="flex items-center text-white/80">
                  <FiClock className="mr-3" size={20} />
                  <span>Duration: 2-3 days</span>
                </div>
                <div className="flex items-center text-white/80">
                  <FiCalendar className="mr-3" size={20} />
                  <span>Available Year-round</span>
                </div>
              </div>

              {/* Hero CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => openModal()}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-semibold hover:opacity-95 hover:translate-y-[-2px] active:scale-[0.98] transition-all duration-200"
              >
                Get Quote for This Destination
              </motion.button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl">
                <img
                  src={ad.banner_image}
                  alt={ad.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/50 to-transparent"></div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-[#003366] to-[#002244] rounded-full opacity-50 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#313131] mb-6 font-['Outfit']">
              {ad.cta_heading || "Access to Premium Team Outing Destinations"}
            </h2>
            <div className="prose prose-lg">
              <p className="text-[#636363] leading-relaxed font-['Inter']">
                {ad.description || `Experience an unforgettable team outing at ${ad.name}. Our carefully curated activities and premium accommodations ensure your team building experience is both enjoyable and productive. From team-building exercises to relaxation activities, everything is designed to strengthen team bonds and boost morale.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      {(ad.image_1 || ad.image_2 || ad.image_3) && (
        <section className="py-20 bg-[#f8f9fa]">
          <div className="max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-[40px] font-bold font-['Outfit'] text-[#313131] mb-4">
                {ad.showcase_heading || "Explore What Awaits Your Team"}
              </h2>
              <p className="text-lg text-[#636363] max-w-2xl mx-auto font-['Inter']">
                {ad.showcase_subtext || "Take a glimpse at the experiences that await your team at this premium destination."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ad.image_1 && (
                <ShowcaseCard 
                  image={ad.image_1} 
                  heading={ad.heading_1} 
                  subtext={ad.subtext_1} 
                />
              )}
              {ad.image_2 && (
                <ShowcaseCard 
                  image={ad.image_2} 
                  heading={ad.heading_2} 
                  subtext={ad.subtext_2} 
                />
              )}
              {ad.image_3 && (
                <ShowcaseCard 
                  image={ad.image_3} 
                  heading={ad.heading_3} 
                  subtext={ad.subtext_3} 
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33]">
        <div className="max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-[40px] font-bold font-['Outfit'] text-white mb-4">
              Why Choose This Destination
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-['Inter']">
              Discover what makes this location perfect for your next team outing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiStar size={24} />}
              title="Premium Experience"
              description="Exclusive access to handpicked venues and activities designed for corporate teams"
            />
            <FeatureCard
              icon={<FiClock size={24} />}
              title="Time-Efficient Planning"
              description="Quick turnaround time with our expert team handling all arrangements"
            />
            <FeatureCard
              icon={<FiUsers size={24} />}
              title="Team-Focused Activities"
              description="Customized programs that enhance team bonding and collaboration"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33] rounded-[24px] p-10 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-[40px] font-bold font-['Outfit'] text-white mb-6">
                {ad.final_cta_heading || "Ready to Plan Your Team's Next Great Adventure?"}
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto font-['Inter'] mb-10">
                {ad.final_cta_subtext || "Let us help you create an unforgettable experience that will strengthen your team's bonds and boost their motivation."}
              </p>
              
              <motion.button
                onClick={() => openModal()}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-medium rounded-full hover:opacity-95 transition-all duration-300"
              >
                {ad.form_button_text || "Get Started Now"}
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <TeamOutingsFooter />
    </div>
  );
};

export default TeamOutingDetail; 