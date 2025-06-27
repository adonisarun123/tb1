import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDestinations } from '../../lib/hooks/useSupabaseData';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageWrapper from '../../components/PageWrapper';
import { useState, useMemo } from 'react';
import type { Region } from '../../lib/supabaseClient';

const ViewDetailsButton = () => (
  <div className="relative w-full h-[45px] group">
    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
    <button className="absolute inset-0 w-full h-full flex items-center justify-center border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
      <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">
        View Details
      </span>
    </button>
  </div>
);

const Destinations = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { destinations, loading: destinationsLoading } = useDestinations();
  const [currentRegion] = useState<Region | null>(null);
  
  // Filter destinations based on currentRegion
  const filteredDestinations = useMemo(() => {
    if (!currentRegion) return destinations;
    return destinations.filter(dest => dest.region_id === currentRegion.id);
  }, [destinations, currentRegion]);

  const loading = destinationsLoading || !currentRegion;

  if (!currentRegion && !destinationsLoading) {
    return (
      <PageWrapper className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Region not found</h1>
        </div>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentRegion?.banner_image_url}
            alt={currentRegion?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 lg:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-lg font-medium font-['DM Sans'] text-white/80"
            >
              Explore Destinations in
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Inter'] text-white leading-tight"
            >
              {currentRegion?.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-['DM Sans']"
            >
              {currentRegion?.description}
            </motion.p>
          </motion.div>
        </div>

        {/* Improved Transition - Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg 
            className="relative block w-full h-[70px]" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full bg-white py-16" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
            <div className="flex-1 max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2"
              >
                {destinations?.length || 0} Available Destinations
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
              >
                Discover Amazing Places.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6"
            >
              Explore our handpicked destinations in {currentRegion?.name}, each offering unique experiences for your team.
            </motion.p>
          </div>

          {/* Destinations Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="bg-[#eeeeee] rounded-[16px] overflow-hidden animate-pulse">
                  <div className="p-5">
                    <div className="aspect-[386/304] rounded-[16px] bg-gray-300 mb-6" />
                    <div className="h-8 bg-gray-300 rounded mb-4" />
                    <div className="h-6 bg-gray-300 rounded mb-6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations?.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="w-full bg-[#eeeeee] rounded-[16px] hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-5 flex flex-col h-full">
                    <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden shadow-sm mb-4">
                      <img
                        src={destination.destination_main_image || destination.destination_image}
                        alt={destination.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131] line-clamp-1">
                        {destination.name}
                      </h3>
                      <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">
                        {destination.destination_description}
                      </p>
                    </div>

                    <div className="mt-4">
                      <a href={`/corporate-team-outing-places/${destination.slug}`}>
                        <ViewDetailsButton />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </PageWrapper>
  );
};

export default Destinations; 