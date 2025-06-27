import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Destination } from '../../lib/supabaseClient';

interface QuoteCarouselProps {
  destination?: Destination;
}

// Sample quotes about team building and corporate outings
const quotes = [
  {
    id: 1,
    text: "Coming together is a beginning, staying together is progress, and working together is success.",
    author: "Henry Ford"
  },
  {
    id: 2,
    text: "Alone we can do so little; together we can do so much.",
    author: "Helen Keller"
  },
  {
    id: 3,
    text: "Teamwork is the ability to work together toward a common vision.",
    author: "Andrew Carnegie"
  },
  {
    id: 4,
    text: "The strength of the team is each individual member. The strength of each member is the team.",
    author: "Phil Jackson"
  },
  {
    id: 5,
    text: "Great things in business are never done by one person. They're done by a team of people.",
    author: "Steve Jobs"
  },
  {
    id: 6,
    text: "If you want to go fast, go alone. If you want to go far, go together.",
    author: "African Proverb"
  },
  {
    id: 7,
    text: "None of us is as smart as all of us.",
    author: "Ken Blanchard"
  },
  {
    id: 8,
    text: "Talent wins games, but teamwork and intelligence win championships.",
    author: "Michael Jordan"
  },
  {
    id: 9,
    text: "The best teamwork comes from men who are working independently toward one goal in unison.",
    author: "James Cash Penney"
  },
  {
    id: 10,
    text: "Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved.",
    author: "Mattie Stepanek"
  }
];

const QuoteCarousel: React.FC<QuoteCarouselProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-rotate quotes every 5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-white mb-6">
              <svg className="w-12 h-12 mx-auto mb-4 text-[#FFB573]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl md:text-2xl font-['DM Sans'] mb-6 leading-relaxed">
                {quotes[currentIndex].text}
              </p>
              <p className="text-lg font-medium text-[#FFB573]">
                — {quotes[currentIndex].author}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false);
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#FFB573] scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-300"
          aria-label="Previous quote"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-300"
          aria-label="Next quote"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default QuoteCarousel;
