import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SimpleHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm"
    >
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <Link to="/" className="inline-block">
          <img
            src="https://yrppmcoycmydrujbesnd.supabase.co/storage/v1/object/public/images/logo.png"
            alt="Trebound Logo"
            className="h-12 w-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/200x80/FF4C39/FFFFFF?text=TREBOUND";
            }}
          />
        </Link>
      </div>
    </motion.header>
  );
};

export default SimpleHeader; 