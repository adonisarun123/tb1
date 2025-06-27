import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate } from '../../lib/utils';

interface BlogCardProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  date: string;
  variants?: any;
}

const BlogCard = ({ title, slug, description, image, date, variants }: BlogCardProps) => {
  // Fallback to a gradient if image is not available
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' text-anchor='middle' alignment-baseline='middle' fill='%23888888'%3ETrebound%3C/text%3E%3C/svg%3E";

  // Format date for display
  const formattedDate = formatDate(date);

  return (
    <motion.div
      variants={variants}
      className="rounded-xl overflow-hidden bg-white shadow-xl transition-all duration-300 hover:shadow-2xl h-full flex flex-col"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <Link 
        to={`/blog/${slug}`} 
        className="block h-full flex flex-col"
      >
        <div className="relative h-48 md:h-60 overflow-hidden">
          <img 
            src={image || fallbackImage} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-900/70 to-transparent w-full h-1/3"></div>
          
          {/* Trebound favicon with date */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-white shadow-md overflow-hidden p-0">
              <img 
                src="/images/trebound-favicon-32px.jpg" 
                alt="Trebound" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white font-medium">
              {formattedDate}'
            </div>
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">          
          <h3 className="text-xl font-medium text-primary mb-3 line-clamp-2 font-outfit">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
            {description}
          </p>
          
          <div className="mt-auto pt-4">
            <span className="inline-flex items-center text-[rgb(26,54,93)] font-medium group no-underline">
              Read More
              <svg 
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard; 