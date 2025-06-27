import { motion } from 'framer-motion';
import { FiMapPin, FiUsers, FiClock } from 'react-icons/fi';

interface StayCTASectionProps {
  stayName: string;
  destinationName: string;
  location?: string;
  onCTAClick?: () => void;
}

const StayCTASection = ({ stayName, destinationName, onCTAClick }: StayCTASectionProps) => {
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

  return (
    <section className="w-full bg-white py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with refined typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FF4C39]/10 to-[#FFB573]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#FF4C39] tracking-wide uppercase">Team Outing Experience</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 font-outfit leading-[1.1] tracking-tight max-w-4xl mx-auto">
            Ready to Plan Your
            <br />
            <span className="text-[#FF4C39]">{cleanStayName(stayName)}</span> Experience?
          </h2>
          
          <p className="text-lg sm:text-xl text-[#666] max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Get a personalized quote for your team outing at this beautiful resort in {destinationName}. 
            We'll handle everything from planning to execution.
          </p>

          {/* Stats Section - Apple-style clean design */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4C39]/10 to-[#FFB573]/10 rounded-2xl flex items-center justify-center mb-3">
                <FiMapPin className="w-6 h-6 text-[#FF4C39]" />
              </div>
              <h4 className="text-lg font-bold text-[#1a1a1a] mb-1 font-outfit">Beautiful Location</h4>
              <p className="text-[#666] text-sm">{destinationName}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4C39]/10 to-[#FFB573]/10 rounded-2xl flex items-center justify-center mb-3">
                <FiUsers className="w-6 h-6 text-[#FF4C39]" />
              </div>
              <h4 className="text-lg font-bold text-[#1a1a1a] mb-1 font-outfit">10-300</h4>
              <p className="text-[#666] text-sm">Team Size</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4C39]/10 to-[#FFB573]/10 rounded-2xl flex items-center justify-center mb-3">
                <FiClock className="w-6 h-6 text-[#FF4C39]" />
              </div>
              <h4 className="text-lg font-bold text-[#1a1a1a] mb-1 font-outfit">24hr</h4>
              <p className="text-[#666] text-sm">Response Time</p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (onCTAClick) {
                onCTAClick();
              } else {
                // Fallback to default behavior
                const contactSection = document.getElementById('contact-section');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39]/30 focus:ring-offset-2 group"
          >
            Plan My Team Outing
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>

          <p className="text-sm text-[#999] mt-4 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-[#FF4C39]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free consultation • No commitment required • Quick 24hr response
          </p>
        </motion.div>

        {/* Benefits Grid - Minimalist Apple-style cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#FF4C39]/20 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#FF4C39]/10 to-[#FFB573]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-[#FF4C39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-[#1a1a1a] mb-3 font-outfit">Expert Planning</h4>
            <p className="text-[#666] leading-relaxed">Professional event coordination from start to finish with attention to every detail</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#FF4C39]/20 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#FF4C39]/10 to-[#FFB573]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-[#FF4C39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-[#1a1a1a] mb-3 font-outfit">Quick Response</h4>
            <p className="text-[#666] leading-relaxed">Fast 24-hour response time with personalized proposals tailored to your needs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#FF4C39]/20 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#FF4C39]/10 to-[#FFB573]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-[#FF4C39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-[#1a1a1a] mb-3 font-outfit">Best Rates</h4>
            <p className="text-[#666] leading-relaxed">Competitive pricing with transparent costs and no hidden booking fees</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StayCTASection; 