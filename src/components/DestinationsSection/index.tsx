import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDestinations } from '../../lib/hooks/useSupabaseData';

const ViewMoreButton = () => (
  <div className="relative h-[45px] group w-[180px]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    <button className="absolute inset-0 w-full h-full px-6 flex items-center justify-center border border-[#979797] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
      <span className="text-base font-medium font-['DM Sans'] text-[#979797] group-hover:text-white transition-colors duration-300">
        View More
      </span>
    </button>
  </div>
);

const DestinationsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { destinations, loading: destinationsLoading, error: destinationsError } = useDestinations();

  // Take first 3 random destinations
  const selectedDestinations = destinations
    ?.sort(() => Math.random() - 0.5)
    ?.slice(0, 3)
    ?.map((destination, index) => ({
      image: destination.destination_main_image || destination.destination_image,
      size: index === 0 ? 'large' : 'medium',
      location: destination.region || 'Region Not Set',
      title: destination.name,
      description: destination.description,
      slug: destination.slug,
      featured: index === 0
    })) || [];

  if (destinationsError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading destinations: {destinationsError}</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-8 mb-8">
          <div className="flex-1 space-y-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-sm md:text-base font-medium font-['DM Sans'] text-[#636363]"
            >
              Top Destinations
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-[40px] font-semibold font-['Inter'] leading-[1.1] bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
            >
              Explore the World's Best.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:max-w-[360px] text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-4"
          >
            Discover top destinations with our expertly curated guides. Experience the best of each location.
          </motion.p>
        </div>

        {/* Destinations Grid */}
        {destinationsLoading ? (
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[2.4/1] bg-[#eeeeee] rounded-[16px] animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="w-full aspect-[1.2/1] bg-[#eeeeee] rounded-[16px] animate-pulse" />
              <div className="w-full aspect-[1.2/1] bg-[#eeeeee] rounded-[16px] animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-8">
            {/* Featured Destination */}
            {selectedDestinations.filter(d => d.featured).map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="relative rounded-[16px] overflow-hidden group cursor-pointer w-full"
              >
                <a href={`/corporate-team-outing-places/${destination.slug}`}>
                  <div className="w-full aspect-[2.4/1]">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Destination Details */}
                    <div className="absolute bottom-0 left-0 p-5 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="text-xl md:text-2xl font-medium font-['Outfit'] text-[#faf9f6] leading-tight">
                        {destination.location}
                      </div>
                      <div className="text-2xl md:text-[32px] font-medium font-['Outfit'] text-[#faf9f6] leading-tight mt-2">
                        {destination.title}
                      </div>
                      {destination.description && (
                        <div className="text-base text-[#faf9f6]/90 mt-2 line-clamp-2">
                          {destination.description}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}

            {/* Regular Destinations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedDestinations.filter(d => !d.featured).map((destination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative rounded-[16px] overflow-hidden group cursor-pointer"
                >
                  <a href={`/corporate-team-outing-places/${destination.slug}`}>
                    <div className="w-full aspect-[1.2/1]">
                      <img
                        src={destination.image}
                        alt={destination.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Destination Details */}
                      <div className="absolute bottom-0 left-0 p-4 md:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="text-lg md:text-xl font-medium font-['Outfit'] text-[#faf9f6] leading-tight">
                          {destination.location}
                        </div>
                        <div className="text-xl md:text-2xl font-medium font-['Outfit'] text-[#faf9f6] leading-tight mt-2">
                          {destination.title}
                        </div>
                        {destination.description && (
                          <div className="text-sm text-[#faf9f6]/90 mt-2 line-clamp-2">
                            {destination.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* View More Button */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="/corporate-team-outing-places">
              <ViewMoreButton />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
