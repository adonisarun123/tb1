import { motion } from 'framer-motion';

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  index: number;
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description, index }) => {
  return (
    <motion.div
      layout
      variants={cardVariants}
      custom={index}
      className="w-full max-w-[380px] aspect-square rounded-[20px] relative overflow-hidden group"
    >
      {/* Image with Shimmer Loading Effect */}
      <div className="absolute inset-0 bg-neutral-100 animate-pulse">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onLoad={(e) => {
            const target = e.target as HTMLElement;
            target.parentElement?.classList.remove('animate-pulse', 'bg-neutral-100');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-300">
        <h3 className="text-2xl font-semibold font-inter text-white mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-base font-medium font-inter text-neutral-100 leading-relaxed opacity-90">
          {description}
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 h-[42px] px-6 bg-white/95 backdrop-blur-sm rounded-full 
            text-base font-semibold font-inter text-primary hover:bg-white 
            transition-colors duration-300 shadow-lg hover:shadow-xl
            transform-gpu hover:-translate-y-0.5"
        >
          Learn More
        </motion.button>
      </div>

      {/* Card Hover Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={[
          "idle"
        ]}
        whileHover={[
          "hover"
        ]}
        variants={{
          idle: {
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
          },
          hover: {
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
          }
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
};

export default ServiceCard;
