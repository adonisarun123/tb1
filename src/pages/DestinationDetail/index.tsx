import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiUsers, FiArrowLeft, FiX, FiChevronLeft, FiChevronRight, FiClock, FiPlus, FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import PartnersSection from '../../components/PartnersSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { useDestinationBySlug, useStaysByDestinationId, useDestinations } from '../../lib/hooks/useSupabaseData';

const GalleryModal = ({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex = 0 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  images: Array<{ id: number; url: string; alt: string }>; 
  initialIndex?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onClose}
          className="text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>
      
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="max-h-[80vh] max-w-full object-contain"
        />
        
        <button 
          onClick={goToPrevious}
          className="absolute left-2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
        >
          <FiChevronLeft size={24} />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
        >
          <FiChevronRight size={24} />
        </button>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/50 px-4 py-2 rounded-full text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface Destination {
  id: string;
  name: string;
  slug: string;
  region?: string;
  destination_main_image?: string;
  destination_image?: string;
}

const DestinationDetail = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  const { destination, loading: destinationLoading, error: destinationError } = useDestinationBySlug(destinationSlug);
  const { stays, loading: staysLoading } = useStaysByDestinationId(destination?.name);
  const { destinations } = useDestinations();
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const openGallery = (index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  // If destination is loading, show loading state
  if (destinationLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#FF4C39] border-r-[#FF4C39] border-b-[#FFB573] border-l-[#FFB573] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-[#636363]">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (!destination || destinationError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#002244] to-[#001a33] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Destination Not Found</h1>
          <p className="text-lg text-white/80 mb-8">The destination you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Display only the first 4 images in the gallery, the rest will be shown when clicking "More"
  // const displayedImages = mockGalleryImages.slice(0, 4);
  // const remainingImagesCount = mockGalleryImages.length - 4;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <GalleryModal
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            images={stays
              .filter(stay => stay.stay_image)
              .map(stay => ({
                id: stay.id,
                url: stay.stay_image || '/placeholder-image.jpg',
                alt: stay.name
              }))}
            initialIndex={galleryInitialIndex}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto relative bg-white">
        <div className="mb-8">
          <Link 
            to="/corporate-team-outing-places" 
            className="inline-flex items-center text-[#1a1a1a] hover:text-[#FF4C39] transition-colors font-medium"
          >
            <FiArrowLeft className="mr-2" />
            All Destinations
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
          {destination.name}'s Top Spots for Team Fun
        </h1>
        
        <p className="text-base md:text-lg text-[#636363] mb-8 max-w-3xl font-['DM Sans']">
          Elevate your team's energy with corporate team outing places in {destination.name} by Trebound. 
          Experience team-building activities in the {destination.region || 'City of Pearls'}.
        </p>
        
        <div className="flex flex-col lg:flex-row w-full gap-4">
          {/* Main large image */}
          <div className="lg:w-[65%] h-[500px] relative rounded-xl overflow-hidden cursor-pointer" onClick={() => openGallery(0)}>
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={stays?.[0]?.stay_image || destination.destination_main_image || destination.destination_image} 
              alt={stays?.[0]?.name || destination.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Thumbnail gallery */}
          <div className="lg:w-[35%] grid grid-cols-2 gap-4">
            {stays?.slice(1, 5).map((stay, index) => (
              <motion.div
                key={stay.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className={`relative rounded-xl overflow-hidden cursor-pointer ${index === 0 || index === 1 ? 'h-[242px]' : 'h-[242px]'}`}
                onClick={() => openGallery(index + 1)}
              >
                <img 
                  src={stay.stay_image}
                  alt={stay.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {index === 3 && stays.length > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors">
                    <span className="text-lg font-medium text-white">+{stays.length - 5} More</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resorts Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2">
                Resorts & Stays
              </span>
              <h2 className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Where You'll Be Staying
              </h2>
            </div>
            <p className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6">
              Discover luxurious accommodations and amenities designed to make your team outing memorable and comfortable.
            </p>
          </div>

          {staysLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-[#eeeeee] rounded-[16px] overflow-hidden animate-pulse">
                  <div className="p-5">
                    <div className="aspect-[386/304] rounded-[16px] bg-gray-300 mb-4" />
                    <div className="h-8 bg-gray-300 rounded mb-4" />
                    <div className="h-6 bg-gray-300 rounded mb-6" />
                    <div className="flex justify-between mb-4">
                      <div className="h-8 w-24 bg-gray-300 rounded-full" />
                      <div className="h-8 w-24 bg-gray-300 rounded-full" />
                    </div>
                    <div className="h-12 bg-gray-300 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : stays.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-[#636363]">No resorts found for this destination.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stays.map((stay, index) => (
                <motion.div
                  key={stay.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="w-full bg-[#eeeeee] rounded-[16px] hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-5">
                    <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden mb-4">
                      <img 
                        src={stay.banner_image_url || stay.stay_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'} 
                        alt={stay.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">4.6</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131]">
                        {stay.name}
                      </h3>
                      <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">
                        {stay.tagline || stay.stay_description?.substring(0, 100) || 'A Tranquil Oasis'}
                      </p>
                    </div>

                    <div className="mt-4">
                      <div className="relative w-full h-[45px] group">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
                        <Link 
                          to={`/stays/${stay.slug}`}
                          className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300"
                        >
                          <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">
                            Book Now
                          </span>
                          <FiArrowRight className="w-4 h-4 text-[#b1b1b1] group-hover:text-white transition-colors duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full bg-white py-16" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
          >
            {/* Key Highlights Column */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent font-['Inter']">Key Highlights</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-[#f9f9f9] p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <FiMapPin size={20} />
                    </div>
                    <h4 className="text-xl font-medium font-['DM Sans']">Location</h4>
                  </div>
                  <p className="text-base text-[#636363] ml-14 font-['DM Sans']">
                    {destination?.region || 'South'}
                  </p>
                </div>
                
                <div className="bg-[#f9f9f9] p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <FiClock size={20} />
                    </div>
                    <h4 className="text-xl font-medium font-['DM Sans']">Duration</h4>
                  </div>
                  <p className="text-base text-[#636363] ml-14 font-['DM Sans']">
                    Full-day and multi-day options available
                  </p>
                </div>
                
                <div className="bg-[#f9f9f9] p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <FiUsers size={20} />
                    </div>
                    <h4 className="text-xl font-medium font-['DM Sans']">Group Size</h4>
                  </div>
                  <p className="text-base text-[#636363] ml-14 font-['DM Sans']">
                    Ideal for teams of 10-100 people
                  </p>
                </div>
                
                <div className="bg-[#f9f9f9] p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <FiPlus size={20} />
                    </div>
                    <h4 className="text-xl font-medium font-['DM Sans']">Activities</h4>
                  </div>
                  <p className="text-base text-[#636363] ml-14 font-['DM Sans']">
                    Team-building, adventure sports, cultural experiences
                  </p>
                </div>
              </div>
            </div>
            
            {/* Why Choose Column */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent font-['Inter']">
                Why Choose {destination?.name || 'This Destination'}
              </h3>
              
              <ul className="space-y-5 text-[#636363]">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p className="text-base font-['DM Sans']">Diverse range of activities suitable for different team dynamics and preferences</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p className="text-base font-['DM Sans']">Professional facilitators to ensure smooth execution of team-building activities</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p className="text-base font-['DM Sans']">Customizable packages to meet specific team objectives and budgets</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <p className="text-base font-['DM Sans']">Excellent infrastructure and amenities for a comfortable experience</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Destinations Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2">
                EXPLORE MORE
              </span>
              <h2 className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Distinct Destinations,<br />Lasting Memories
              </h2>
            </div>
            <p className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6">
              Discover more amazing destinations perfect for your next team building adventure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {destinations?.filter((dest: Destination) => dest.id !== destination?.id)
              .slice(0, 6)
              .map((dest: Destination) => (
                <Link key={dest.id} to={`/destinations/${dest.slug}`} className="block">
                  <div 
                    className="relative bg-[#eeeeee] rounded-lg overflow-hidden aspect-square group"
                    style={{
                      backgroundImage: `url(${dest.destination_main_image || dest.destination_image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute top-0 left-0 p-5">
                      <h3 className="text-xl font-semibold text-white">
                        {dest.name}
                      </h3>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/corporate-team-outing-places" className="inline-block px-6 py-3 border border-[#FF4C39] text-[#FF4C39] rounded-full hover:bg-gradient-to-b hover:from-[#FF4C39] hover:to-[#FFB573] hover:text-white transition-all duration-300">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Contact Section */}
      <div id="contact-section">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DestinationDetail;
