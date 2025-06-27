import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <FiX size={24} />
              </button>

              {/* Content */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold font-['Inter'] text-neutral-900 mb-2">
                    Welcome to Chennai Beach Outing!
                  </h3>
                  <p className="text-neutral-600 font-['Inter']">
                    Get exclusive access to our premium team outing packages
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3 text-neutral-700">
                    <div className="w-2 h-2 rounded-full bg-gradient-primary" />
                    <p className="font-['Inter']">Customized beach activities</p>
                  </div>
                  <div className="flex items-center space-x-3 text-neutral-700">
                    <div className="w-2 h-2 rounded-full bg-gradient-primary" />
                    <p className="font-['Inter']">Professional event coordination</p>
                  </div>
                  <div className="flex items-center space-x-3 text-neutral-700">
                    <div className="w-2 h-2 rounded-full bg-gradient-primary" />
                    <p className="font-['Inter']">Special early bird discounts</p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Scroll to contact form
                    const element = document.querySelector('#contact-form');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative w-full h-[60px] group"
                >
                  <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-[1px] bg-gradient-primary rounded-[10px] flex items-center justify-center">
                    <span className="text-lg font-bold text-white tracking-wide group-hover:tracking-wider transition-all duration-300">
                      Get Started Now
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup; 