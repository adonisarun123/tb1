import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface BlogHeroProps {
  title: string;
  subtitle?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const BlogHero = ({ title, subtitle }: BlogHeroProps) => {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true
  });

  return (
    <div className="relative">
      <div ref={ref} className="min-h-screen w-full relative flex flex-col justify-center items-center overflow-visible px-5 py-20 pb-[120px] md:py-16 md:pb-[160px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.5)]" />
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 text-center max-w-[800px] w-full"
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1
            variants={fadeInUp}
            className="font-outfit text-[64px] font-bold leading-[1.2] text-white text-shadow-lg mb-6 md:text-[40px] sm:text-[32px]"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeInUp}
              className="font-outfit text-2xl font-medium leading-[1.4] text-white/95 text-shadow md:text-xl sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogHero; 