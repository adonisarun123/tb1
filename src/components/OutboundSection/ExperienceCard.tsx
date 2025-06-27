import { motion } from 'framer-motion';

interface ExperienceCardProps {
  image: string;
  title: string;
  location: string;
  category: string;
}

const ExperienceCard = ({ image, title, location, category }: ExperienceCardProps) => {
  return (
    <motion.div
      className="relative w-[400px] h-[480px] rounded-2xl overflow-hidden group cursor-pointer shadow-card"
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
        <motion.div
          className="absolute inset-0 bg-black/20"
          variants={{
            hover: {
              opacity: 0.4,
              transition: { duration: 0.3 }
            }
          }}
        />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        {/* Top Content */}
        <div className="bg-white/15 backdrop-blur-md rounded-full px-5 py-1.5 w-fit">
          <span className="text-base font-medium font-outfit text-white">
            {category}
          </span>
        </div>

        {/* Bottom Content */}
        <motion.div
          className="space-y-2"
          variants={{
            hover: {
              y: -10,
              transition: { duration: 0.3 }
            }
          }}
        >
          <h3 className="text-2xl font-bold font-outfit text-white leading-tight">
            {title}
          </h3>
          <p className="text-base font-medium font-['DM Sans'] text-neutral-200">
            {location}
          </p>

          {/* Animated Arrow */}
          <motion.div
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mt-4 hover:bg-white/25 transition-colors"
            variants={{
              hover: {
                x: 8,
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
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
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
