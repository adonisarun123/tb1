import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TeamOutingsFooter = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Ensure year stays current
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#003366] text-white py-16 w-full" aria-label="Team outings footer">
      <div className="max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo and Description */}
          <div>
            <div className="mb-6">
              <a 
                href="/" 
                aria-label="Return to homepage"
                className="inline-block focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
              >
                <img
                  src="https://cdn.prod.website-files.com/61ead40fcee1ea7e99aa2b1f/66f54b982ce090736e4e4d1c_Tewbound%20Hover.png"
                  alt="Trebound"
                  className="h-8 w-auto mb-4"
                />
              </a>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Creating unforgettable team experiences that foster collaboration, boost morale, and drive results. Your trusted partner in team building and corporate events.
            </p>
          </div>

          {/* Contact Info with improved accessibility */}
          <div>
            <h3 className="text-lg font-semibold mb-4" id="contact-heading">Contact Us</h3>
            <ul className="space-y-2" aria-labelledby="contact-heading">
              <li className="text-white/80">
                <span aria-label="Email address">Email: <a href="mailto:info@trebound.com" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded">info@trebound.com</a></span>
              </li>
              <li className="text-white/80">
                <span aria-label="Phone number">Phone: <a href="tel:+15551234567" className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded">+1 (555) 123-4567</a></span>
              </li>
              <li className="text-white/80">
                <span aria-label="Location">Location: San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright with dynamic year */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm"
        >
          © {currentYear} Trebound. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default TeamOutingsFooter; 