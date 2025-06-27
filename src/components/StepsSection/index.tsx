import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { images } from '../../assets/images';
import { FiSearch, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';

const StepIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'catalog':
      return <FiSearch className="w-6 h-6 text-[#FF4C39]" />;
    case 'contact':
      return <FiMessageCircle className="w-6 h-6 text-[#FF4C39]" />;
    case 'adventure':
      return <FiCheckCircle className="w-6 h-6 text-[#FF4C39]" />;
    default:
      return null;
  }
};

const steps = [
  {
    number: 1,
    title: 'Explore Our Extensive Experience Catalog',
    description: 'Browse through our curated collection of team experiences',
    icon: 'catalog'
  },
  {
    number: 2,
    title: 'Get in Touch with the Trebound Team',
    description: 'Connect with our experts to plan your perfect event',
    icon: 'contact'
  },
  {
    number: 3,
    title: 'Dive into Your Customized Adventure!',
    description: 'Experience your tailored team-building journey',
    icon: 'adventure'
  }
];

const StepsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative py-8 sm:py-12" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[400px] lg:min-h-[600px]">
          {/* Left side - Image */}
          <div className="relative flex order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="w-full relative rounded-[16px] overflow-hidden h-[300px] sm:h-[400px] lg:h-full"
            >
              <img
                src={images.hero.background}
                alt="Adventure"
                className="w-full h-full object-cover absolute inset-0"
              />
              {/* Optional overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </motion.div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <h3 className="text-[#636363] text-xl sm:text-2xl font-normal font-['Inter']">
                Steps to Secure
              </h3>
              <h2 className="text-[32px] sm:text-[40px] font-semibold font-['Inter'] leading-tight mt-2 sm:mt-3 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Your Experience.
              </h2>
            </motion.div>

            <div className="space-y-4 sm:space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-start gap-3 sm:gap-4 group hover:bg-white/50 p-3 sm:p-4 rounded-[16px] transition-colors duration-300"
                >
                  {/* Icon Box */}
                  <div className="flex-shrink-0 w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] bg-[#faf9f6] rounded-[12px] flex items-center justify-center group-hover:bg-[#fff1ec] transition-colors duration-300">
                    <StepIcon name={step.icon} />
                  </div>

                  {/* Step Content */}
                  <div className="flex-grow">
                    <div className="text-[#616161] text-base sm:text-lg font-semibold font-['Outfit'] leading-normal">
                      Step {step.number}
                    </div>
                    <div className="text-[#5a5a5a] text-sm sm:text-base font-medium font-['Outfit'] leading-relaxed">
                      {step.title}
                    </div>
                    <div className="text-[#979797] text-xs sm:text-sm font-normal font-['Outfit'] leading-relaxed mt-1">
                      {step.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
