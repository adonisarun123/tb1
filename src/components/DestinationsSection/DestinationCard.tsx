import { motion } from 'framer-motion';

interface DestinationCardProps {
  image: string;
  title: string;
  rating: string;
  location: string;
  price: string;
  isLarge?: boolean;
}

const DestinationCard = ({ image, title, rating, location, price, isLarge = false }: DestinationCardProps) => {
  return (
    <motion.div
      className={`relative ${isLarge ? 'w-[840px] h-[480px]' : 'w-[400px] h-[480px]'} rounded-2xl overflow-hidden group cursor-pointer shadow-card`}
      whileHover="hover"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          variants={{
            hover: {
              scale: 1.05,
              transition: { duration: 0.4 }
            }
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        {/* Top Content */}
        <div className="flex justify-between items-start">
          <div className="bg-white/15 backdrop-blur-md rounded-full px-5 py-1.5">
            <span className="text-base font-medium font-outfit text-white">
              {rating} Rating
            </span>
          </div>
          <motion.div
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-colors"
            variants={{
              hover: {
              scale: 1.05,
              transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="white"
              />
            </svg>
          </motion.div>
        </div>

        {/* Bottom Content */}
        <motion.div
          className="space-y-3"
          variants={{
            hover: {
              y: -10,
              transition: { duration: 0.3 }
            }
          }}
        >
          <h3 className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-bold font-outfit text-white leading-tight`}>
            {title}
          </h3>
          <div className="flex items-center space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                fill="white"
              />
            </svg>
            <p className="text-base font-medium font-['DM Sans'] text-neutral-200">
              {location}
            </p>
          </div>
          <div className="pt-4">
            <span className="text-lg font-bold font-['DM Sans'] text-white">
              {price}
            </span>
            <span className="text-base font-medium font-['DM Sans'] text-neutral-200 ml-2">
              / person
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
