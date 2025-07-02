import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  HeroContainer, 
  ContentContainer
} from './styles';
import AISearchWidget from '../AISearchWidget';
import StatsSection from '../StatsSection';

// Animation variants
const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface GradientHeroProps {
  className?: string;
  onSearchQueryChange?: (query: string) => void;
}

// Hero image - optimized for LCP
const heroImageUrl = "/hero.webp";

const GradientHero: React.FC<GradientHeroProps> = ({ className, onSearchQueryChange }) => {
  // Remove redundant image loading since hero.webp is already preloaded in HTML with fetchpriority="high"
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className={`relative ${className || ''}`}
      style={{ pointerEvents: 'auto' }}
    >
      <HeroContainer>
        {/* Background Image - Optimized for LCP with layout stability */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#667eea', // Fallback color matching gradient
            contain: 'layout', // Prevent layout shifts
          }}
        />
        

        
        {/* Content - Layout shift prevention */}
        <ContentContainer className="relative z-20" style={{ pointerEvents: 'auto', minHeight: '60vh' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-8"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Main Heading */}
            <div className="space-y-6">
              {/* Background for text readability */}
              <div className="bg-black/30 backdrop-blur-sm rounded-3xl px-8 py-6 mx-auto inline-block">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
                  style={{
                    textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
                    WebkitTextStroke: '1px rgba(255,255,255,0.1)'
                  }}
                >
                  Team Building
                  <br />
                  <span 
                    className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent font-black"
                    style={{
                      textShadow: '0 0 30px rgba(255,76,57,0.5)',
                      WebkitTextStroke: '1px rgba(255,165,0,0.3)'
                    }}
                  >
                    Reimagined
                  </span>
                </motion.h1>
              </div>
              
              {/* Background for subtitle */}
              <div className="bg-black/25 backdrop-blur-sm rounded-2xl px-6 py-4 mx-auto inline-block max-w-5xl">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-xl sm:text-2xl md:text-3xl text-white max-w-4xl mx-auto leading-relaxed font-semibold"
                  style={{
                    textShadow: '1px 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.4)'
                  }}
                >
                  AI-powered experiences that bring teams together through 
                  <span 
                    className="text-orange-300 font-bold"
                    style={{
                      textShadow: '1px 1px 6px rgba(0,0,0,0.9), 0 0 15px rgba(255,165,0,0.3)'
                    }}
                  > unforgettable adventures</span>
                </motion.p>
              </div>
            </div>

            {/* Search Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="max-w-2xl mx-auto relative z-50"
              style={{ pointerEvents: 'auto' }}
            >
              <AISearchWidget 
                onSearchQueryChange={onSearchQueryChange}
              />
            </motion.div>
          </motion.div>
        </ContentContainer>
      </HeroContainer>

      {/* Stats Section - Lazy loaded */}
      {inView && (
        <div className="py-12 sm:py-16">
          <StatsSection />
        </div>
      )}
    </motion.div>
  );
};

export default GradientHero;
