import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SimpleFooter = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Ensure year stays current even if component doesn't remount
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#001a33] py-8 w-full"
      aria-label="Simple footer"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center">
          <Link 
            to="/" 
            className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
            aria-label="Return to homepage"
          >
            <img
              src="https://yrppmcoycmydrujbesnd.supabase.co/storage/v1/object/public/images/logo-white.png"
              alt="Trebound Logo"
              className="h-10 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/200x80/001a33/FFFFFF?text=TREBOUND";
              }}
            />
          </Link>
          <p className="text-white/60 text-sm text-center">
            © {currentYear} Trebound. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default SimpleFooter; 