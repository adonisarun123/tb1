import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Load the external script
    const script = document.createElement('script');
    script.src = 'https://reviewsonmywebsite.com/js/v2/embed.js?id=8ed8fd45a2fd062872f56952886c1ec5';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-12 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-sm md:text-base font-medium font-['DM Sans'] text-[#636363] mb-2"
          >
            Client Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-[#757575] max-w-2xl mx-auto"
          >
            Read authentic reviews from our valued clients about their experiences with our team building activities and events.
          </motion.p>
        </div>

        {/* Reviews Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full"
        >
          <div 
            data-romw-token="htSPDkjmrIZaOmmTg9kiOL1fSbUeoDl1a04pgwBOzQ99XPODAb"
            className="min-h-[400px] bg-[#f8fafc] rounded-[20px] p-6"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
