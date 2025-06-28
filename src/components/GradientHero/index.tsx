import { useInView } from 'react-intersection-observer';
import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTrendingUp, FiUsers, FiStar } from 'react-icons/fi';
import AISearchWidget from '../AISearchWidget';
import {
  HeroContainer,
  ContentContainer,
  StatsContainer,
  StatNumber,
  StatLabel,
} from './styles';
import { staggerChildren } from './animations';

interface GradientHeroProps {
  className?: string;
}

// Hero image - custom image from public folder
const heroImageUrl = "/hero.webp";

const GradientHero: React.FC<GradientHeroProps> = ({ className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
    rootMargin: '50px' // Start loading earlier
  });

  // Preload hero image for better LCP
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = heroImageUrl;
  }, []);

  // Stats with hardcoded values
  const stats = [
    {
      number: '96,753+',
      label: 'Employees\nengaged'
    },
    {
      number: '4.9/5',
      label: 'Stellar Feedback\non Google'
    },
    {
      number: '550+',
      label: 'Global organizations\ntrust us'
    }
  ];

  return (
    <div className="relative">
      <HeroContainer ref={ref} className={className}>
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: imageLoaded ? `url('${heroImageUrl}')` : 'none',
            backgroundColor: imageLoaded ? 'transparent' : '#1a1a1a', // Fallback color
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: imageLoaded ? 1 : 0.8,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.7)]" />
        </div>
        
        {/* Enhanced Hero Content with Search Focus */}
        <ContentContainer 
          variants={staggerChildren} 
          initial="hidden" 
          animate="visible"
        >
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Team Experience
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Discover 350+ team building activities, premium venues, and amazing destinations with our AI-powered search. 
              Get instant recommendations tailored to your team's needs.
            </p>
          </motion.div>

          {/* AI Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <AISearchWidget />
          </motion.div>

          {/* Quick Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
          >
            <button className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/20 text-sm sm:text-base">
              <FiTrendingUp className="mr-2 text-sm" />
              Popular Activities
              <FiArrowRight className="ml-2 text-sm" />
            </button>
            <button className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/20 text-sm sm:text-base">
              <FiUsers className="mr-2 text-sm" />
              Premium Venues
              <FiArrowRight className="ml-2 text-sm" />
            </button>
            <button className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/20 text-sm sm:text-base">
              <FiStar className="mr-2 text-sm" />
              Top Destinations
              <FiArrowRight className="ml-2 text-sm" />
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center text-white/80 px-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                <span>Instant Recommendations</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                <span>Expert Curated</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                <span>AI-Powered</span>
              </div>
            </div>
          </motion.div>
        </ContentContainer>

        {/* Enhanced Stats Section */}
        <div className="hidden lg:block">
          <StatsContainer 
            variants={staggerChildren} 
            initial="hidden" 
            animate={inView ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <StatNumber className="text-white">{stat.number}</StatNumber>
                <StatLabel className="text-white/80">{stat.label}</StatLabel>
              </motion.div>
            ))}
          </StatsContainer>
        </div>
        
        {/* Mobile/Tablet Stats Section - Normal Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="block lg:hidden mt-8 sm:mt-12 px-4 space-y-3 sm:space-y-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 text-center max-w-sm mx-auto"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2 font-outfit">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-white/80 font-outfit font-medium leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </HeroContainer>
      
      {/* Smooth transition to next section */}
      <div className="h-[120px] sm:h-[120px] bg-gradient-to-b from-transparent to-white" />
    </div>
  );
};

export default memo(GradientHero);
