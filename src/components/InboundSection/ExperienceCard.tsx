import { motion } from 'framer-motion';

interface ExperienceCardProps {
  image: string;
  title: string;
  location: string;
  category: string;
  participants: string;
}

const ExperienceCard = ({ image, title, location, category, participants }: ExperienceCardProps) => {
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
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        {/* Top Content */}
        <div className="flex justify-between items-start">
          <div className="bg-primary/20 backdrop-blur-md rounded-full px-5 py-1.5">
            <span className="text-base font-medium font-outfit text-white">
              {category}
            </span>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-full px-5 py-1.5">
            <span className="text-base font-medium font-outfit text-white">
              {participants}
            </span>
          </div>
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
          <h3 className="text-2xl font-bold font-outfit text-white leading-tight">
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

          {/* Explore Button */}
          <motion.button
            className="mt-4 w-full h-14 bg-white/15 backdrop-blur-md rounded-xl relative overflow-hidden group"
            variants={{
              hover: {
                scale: 1.02,
                transition: { duration: 0.2 }
              }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-300"
              variants={{
                hover: {
                  opacity: 1
                }
              }}
            />
            <span className="relative z-10 text-lg font-semibold font-['DM Sans'] text-white">
              Explore
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
