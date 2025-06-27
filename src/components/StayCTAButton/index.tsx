import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';

interface StayCTAButtonProps {
  stayName: string;
  destinationName: string;
  onCTAClick?: () => void;
}

const StayCTAButton = ({ stayName, destinationName, onCTAClick }: StayCTAButtonProps) => {
  // Helper function to clean stay name by removing any "Team Outing" variations
  const cleanStayName = (name: string) => {
    if (!name) return '';
    // Remove various "Team Outing" patterns at the beginning
    return name
      .replace(/^Team Outing at\s*/i, '')
      .replace(/^Team Outing\s*/i, '')
      .replace(/^Team outing at\s*/i, '')
      .replace(/^Team outing\s*/i, '')
      .trim();
  };

  const scrollToForm = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
      // Fallback to default behavior
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-orange-50 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#313131] mb-4 font-outfit leading-tight">
            Ready to Plan Your Team Outing at{' '}
            <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
              {cleanStayName(stayName)}?
            </span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-[#636363] max-w-2xl mx-auto font-dm-sans mb-8">
            Get a personalized quote for your team outing at this beautiful resort. 
            We'll handle everything from planning to execution.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center space-x-2 text-[#636363]"
            >
              <FiMapPin className="text-[#FF4C39] w-4 h-4" />
              <span className="text-sm sm:text-base font-medium">{destinationName}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center space-x-2 text-[#636363]"
            >
              <FiUsers className="text-[#FF4C39] w-4 h-4" />
              <span className="text-sm sm:text-base font-medium">10-300 People</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center space-x-2 text-[#636363]"
            >
              <FiClock className="text-[#FF4C39] w-4 h-4" />
              <span className="text-sm sm:text-base font-medium">24hr Response</span>
            </motion.div>
          </div>

          {/* Main CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={scrollToForm}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#FF4C39]/50"
          >
            Plan My Team Outing
            <FiArrowRight className="ml-2 w-5 h-5" />
          </motion.button>

          <p className="text-xs sm:text-sm text-[#757575] mt-4">
            ✨ Free consultation • No commitment required • Quick 24hr response
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StayCTAButton; 