import React from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  HeroContainer, 
  ContentContainer
} from './styles';
import AISearchWidget from '../AISearchWidget';
import StatsSection from '../StatsSection';

// Removed animations for faster FCP/LCP - using CSS transitions instead

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
    <div
      ref={ref}
      className={`relative ${className || ''}`}
      style={{ pointerEvents: 'auto' }}
    >
      <HeroContainer>
        {/* Critical LCP Image - Use <img> tag for optimal LCP performance */}
        <img 
          src={heroImageUrl}
          alt="Team building activities"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundColor: '#667eea', // Fallback color
            contain: 'layout size', // Prevent layout shifts
          }}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        

        
        {/* Content - Fixed dimensions to completely prevent layout shift */}
        <ContentContainer className="relative z-20" style={{ pointerEvents: 'auto', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="text-center space-y-8 opacity-100"
            style={{ pointerEvents: 'auto', width: '100%', maxWidth: '1200px' }}
          >
            {/* Main Heading */}
            <div className="space-y-6">
              {/* Background for text readability */}
              <div className="bg-black/30 backdrop-blur-sm rounded-3xl px-8 py-6 mx-auto inline-block">
                <h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight opacity-100"
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
                </h1>
              </div>
              
              {/* Background for subtitle */}
              <div className="bg-black/25 backdrop-blur-sm rounded-2xl px-6 py-4 mx-auto inline-block max-w-5xl">
                <p 
                  className="text-xl sm:text-2xl md:text-3xl text-white max-w-4xl mx-auto leading-relaxed font-semibold opacity-100"
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
                </p>
              </div>
            </div>

            {/* Search Widget */}
            <div
              className="max-w-2xl mx-auto relative z-50 opacity-100"
              style={{ pointerEvents: 'auto' }}
            >
              <AISearchWidget 
                onSearchQueryChange={onSearchQueryChange}
              />
            </div>
          </div>
        </ContentContainer>
      </HeroContainer>

      {/* Stats Section - Lazy loaded */}
      {inView && (
        <div className="py-12 sm:py-16">
          <StatsSection />
        </div>
      )}
    </div>
  );
};

export default GradientHero;
