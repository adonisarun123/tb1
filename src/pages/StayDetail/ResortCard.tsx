import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import { FiUsers, FiClock, FiMapPin } from 'react-icons/fi'; // Removed unused imports
import { BsPeople, BsGeoAlt, BsClock } from 'react-icons/bs';

interface ResortCardProps {
  image: string;
  title: string;
  description: string;
  slug: string;
  duration?: string;
  capacity?: string;
  location?: string;
}

// View Details Button component
const ViewDetailsButton = ({ slug }: { slug: string }) => (
  <Link to={`/stays/${slug}`} className="block">
    <div className="relative w-full h-[45px] group">
      {/* Gradient background that shows on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
      
      {/* Button border and text */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
        <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">
          View Details
        </span>
      </div>
    </div>
  </Link>
);

const ResortCard = ({ 
  image, 
  title, 
  description, 
  slug,
  duration,
  capacity,
  location = "Indoor/Outdoor"
}: ResortCardProps) => {
  return (
    <motion.div
      className="w-full bg-[#eeeeee] rounded-[16px] hover:shadow-md transition-all duration-300 group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden shadow-sm mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131] line-clamp-1">
            {title}
          </h3>
          <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 text-sm mt-3">
          <div className="flex items-center gap-1.5">
            <BsPeople className="w-4 h-4" />
            <span>{capacity || '15-500'}</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-1.5">
            <BsGeoAlt className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-1.5">
            <BsClock className="w-4 h-4" />
            <span>{duration || '3 hrs'}</span>
          </div>
        </div>

        <div className="mt-4">
          <ViewDetailsButton slug={slug} />
        </div>
      </div>
    </motion.div>
  );
};

export default ResortCard;
