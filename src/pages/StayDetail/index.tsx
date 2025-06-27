import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import { useStayBySlug, useStaysByDestinationId } from '../../lib/hooks/useSupabaseData';
import ResortCard from './ResortCard';
import GalleryModal from '../../components/GalleryModal';
import SafeHTML from '../../components/SafeHTML';
import PartnersSection from '../../components/PartnersSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import StayCTAButton from '../../components/StayCTAButton';
import StayCTASection from '../../components/StayCTASection';
import PageWrapper from '../../components/PageWrapper';

// Helper function to extract plain text from HTML
const extractTextFromHtml = (html: string) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Helper function to clean stay name by removing any "Team Outing" variations
const cleanStayName = (name: string) => {
  if (!name) return '';
  // Remove various "Team Outing" patterns at the beginning
  return name
    .replace(/^Team Outing at\s*/i, '')
    .replace(/^Team Outing\s*/i, '')
    .replace(/^Team outing at\s*/i, '')
    .replace(/^Team outing\s*/i, '')
    .trim();
};

const StayDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { stay, loading: stayLoading, error: stayError } = useStayBySlug(slug);
  const { stays } = useStaysByDestinationId(stay?.destination_details?.name);
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [shouldAutoFocusName, setShouldAutoFocusName] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Format images for gallery - use images array from database or fallback to legacy fields
  const stayImages = (stay?.images && stay.images.length > 0 
    ? stay.images 
    : [
        stay?.banner_image_url,
        stay?.stay_image,
        stay?.image_1,
        stay?.image_2,
        stay?.image_3,
      ].filter(Boolean)
  )
    .map((url, index) => ({
      id: index + 1,
      url: url || '',
      alt: `${stay?.name || 'Stay'} image ${index + 1}`
    }));

  // Calculate remaining images count for gallery preview (show on 4th thumbnail)
  const remainingImagesCount = Math.max(0, stayImages.length - 4);

  const openGallery = (index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  const handleCTAClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Trigger auto-focus on name field
    setShouldAutoFocusName(true);
    // Reset the flag after a delay
    setTimeout(() => setShouldAutoFocusName(false), 1000);
  };

  // If stay is loading, show loading state
  if (stayLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#FF4C39] border-r-[#FF4C39] border-b-[#FFB573] border-l-[#FFB573] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-[#636363]">Loading stay details...</p>
        </div>
      </div>
    );
  }

  // If there was an error fetching the stay
  if (stayError || !stay) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 py-32 text-center">
          <h1 className="text-3xl font-bold text-[#313131] mb-4">Stay Not Found</h1>
          <p className="text-lg text-[#636363] mb-8">We couldn't find the stay you're looking for.</p>
          <Link 
            to="/corporate-team-outing-places" 
            className="inline-flex items-center text-white bg-gradient-to-r from-[#FF4C39] to-[#FFB573] px-6 py-3 rounded-lg"
          >
            <FiArrowLeft className="mr-2" />
            Back to all destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper className="min-h-screen bg-white relative">
      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <GalleryModal
            onClose={() => setIsGalleryOpen(false)}
            images={stayImages}
            initialIndex={galleryInitialIndex}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-24 md:pt-28 lg:pt-32 pb-12 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        <div className="mb-4 md:mb-6">
          {stay.destination_details && (
            <Link 
              to={`/corporate-team-outing-places/${stay.destination_details.slug}`} 
              className="inline-flex items-center text-[#636363] hover:text-[#FF4C39] transition-colors text-sm md:text-base"
            >
              <FiArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5" />
              Back to {stay.destination_details.name}
            </Link>
          )}
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#313131] mb-3 md:mb-4 leading-tight"
        >
          {cleanStayName(stay.name)}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base md:text-lg text-[#636363] mb-6 md:mb-8 max-w-3xl font-['DM Sans'] leading-relaxed"
        >
          {stay.tagline ? extractTextFromHtml(stay.tagline) : 'A Tranquil Oasis'}
        </motion.p>
        
        <div className="flex flex-col lg:flex-row w-full">
          {/* Main large image */}
          <div className="lg:w-[65%] h-[400px] lg:h-[500px] relative rounded-md overflow-hidden cursor-pointer" onClick={() => openGallery(0)}>
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              src={stayImages[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000'} 
              alt={stayImages[0]?.alt || stay.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          
          {/* Thumbnail gallery - using destination layout */}
          <div className="lg:w-[35%] lg:pl-2 flex flex-row lg:flex-col flex-wrap mt-2 lg:mt-0">
            <div className="w-1/2 lg:w-full h-[150px] lg:h-[245px] pr-1 lg:pr-0 lg:mb-2">
              <div className="grid grid-cols-2 h-full gap-1">
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative rounded-md overflow-hidden cursor-pointer h-full"
                  onClick={() => openGallery(1)}
                >
                  <img 
                    src={stayImages[1]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000'} 
                    alt={stayImages[1]?.alt || `${stay.name} image`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative rounded-md overflow-hidden cursor-pointer h-full"
                  onClick={() => openGallery(2)}
                >
                  <img 
                    src={stayImages[2]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000'} 
                    alt={stayImages[2]?.alt || `${stay.name} image`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
            <div className="w-1/2 lg:w-full h-[150px] lg:h-[245px] pl-1 lg:pl-0">
              <div className="grid grid-cols-1 h-full gap-1">
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative rounded-md overflow-hidden cursor-pointer h-full"
                  onClick={() => openGallery(3)}
                >
                  <img 
                    src={stayImages[3]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000'} 
                    alt={stayImages[3]?.alt || `${stay.name} image`}
                    className="w-full h-full object-cover"
                  />
                  {remainingImagesCount > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">+{remainingImagesCount} More</span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Button Section */}
      <StayCTAButton 
        stayName={stay.name}
        destinationName={stay.destination_details?.name || 'Beautiful Location'}
        onCTAClick={handleCTAClick}
      />

      {/* Main Content Section */}
      <section className="w-full bg-white py-16" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Stay Description Section */}
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent font-['Inter']">Stay Description</h2>
              
              <div className="max-w-4xl mx-auto text-lg text-[#636363] font-['DM Sans']">
                {stay.stay_description ? (
                  <div className="text-left">
                    <SafeHTML htmlContent={stay.stay_description} />
                  </div>
                ) : (
                  <p className="text-left">
                    {stay.name} is a delightful blend of nature and leisure, offering an inviting atmosphere 
                    for team building, team offsite, and team outings. Surrounded by lush greenery, it provides a 
                    serene backdrop for teams to come together and unwind. The comfortable accommodations 
                    and range of amenities ensure a pleasant stay and a rejuvenating experience for your team.
                  </p>
                )}
              </div>
            </div>
            
            {/* More Information Section */}
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent font-['Inter']">More Information</h2>
              <p className="text-lg text-[#636363] mb-10 max-w-3xl mx-auto">
                Discover Important Details Before Booking Your Next Team Outing at this Resort
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Booking Particulars Card */}
                <div className="bg-gray-100 rounded-md p-6">
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">Booking Particulars</h3>
                  <ul className="text-left space-y-2">
                    <li className="flex items-start">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Check-In Time: 2:00 PM</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Check-Out Time: 12:00 PM</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Total Rooms: 25</span>
                    </li>
                  </ul>
                </div>
                
                {/* Stay Facilities Card */}
                <div className="bg-gray-100 rounded-md p-6">
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">Stay Facilities</h3>
                  <ul className="text-left space-y-1">
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">24-hour front desk</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Audio/Visual Equipment</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Bar/Lounge</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Newspaper</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Free Parking</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Restaurant</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Room Service</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Indoor Sports area</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Outdoor Sports area</span>
                    </li>
                  </ul>
                </div>
                
                {/* Special Activities Card */}
                <div className="bg-gray-100 rounded-md p-6">
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">Special Activities</h3>
                  <ul className="text-left space-y-1">
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Team Building Activities</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <FiCheck className="min-w-[16px] h-4 mt-1 text-[#FF4C39]" />
                      <span className="ml-2">Team Experiences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Similar Resorts Section */}
      <section className="w-full bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-6 max-w-[1200px]">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2">
                Nearby Luxury Stays
              </span>
              <h2 className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                Serene Resorts, Lasting Memories.
              </h2>
            </div>
            <p className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6">
              Discover exquisite resorts and accommodations that offer the perfect blend of luxury, comfort, and unforgettable experiences.
            </p>
          </div>

          {/* Resort Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {stays && stays.filter(similarStay => similarStay.id !== stay?.id).length > 0 ? (
              // Show actual similar stays if available
              stays
                .filter(similarStay => similarStay.id !== stay?.id)
                .slice(0, 3)
                .map((similarStay, index) => (
                  <ResortCard 
                    key={similarStay.id || index}
                    image={similarStay.stay_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
                    title={similarStay.name}
                    description={similarStay.description?.substring(0, 80) || 'Luxury resort with stunning views and world-class amenities'}
                    slug={similarStay.slug}
                    capacity="10-100"
                    location={stay?.destination_details?.name || 'Beautiful Location'}
                    duration="Day/Night"
                  />
                ))
            ) : (
              // Fallback sample resort cards
              <>
                <ResortCard 
                  image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  title="Double Tree Hilton"
                  description="Luxury beachfront resort with stunning ocean views and world-class amenities"
                  slug="double-tree-hilton"
                  capacity="10-100"
                  location="Goa, India"
                  duration="Day/Night"
                />
                <ResortCard 
                  image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                  title="Taj Exotica"
                  description="Elegant resort with private villas, infinity pools, and personalized service"
                  slug="taj-exotica"
                  capacity="15-200"
                  location="Mumbai, India"
                  duration="Day/Night"
                />
                <ResortCard 
                  image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  title="Radisson Blu"
                  description="Modern resort with spacious rooms, fine dining, and extensive recreation facilities"
                  slug="radisson-blu"
                  capacity="20-300"
                  location="Bangalore, India"
                  duration="Day/Night"
                />
              </>
            )}
          </div>

          {/* View More Button */}
          <div className="flex justify-center">
            <div className="w-full max-w-[200px]">
              <a href="/stays">
                <div className="relative h-[45px] group w-[180px]">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]" />
                  <button className="absolute inset-0 w-full h-full px-6 flex items-center justify-center border border-[#979797] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
                    <span className="text-base font-medium font-['DM Sans'] text-[#979797] group-hover:text-white transition-colors duration-300">
                      View More
                    </span>
                  </button>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Booking Form Section */}
      <div id="stay-booking-form">
        <StayCTASection 
          stayName={stay.name}
          destinationName={stay.destination_details?.name || 'Beautiful Location'}
          location={stay.location || stay.destination_details?.name}
          onCTAClick={handleCTAClick}
        />
      </div>

      {/* Partners Section */}
      <PartnersSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section with ID for scroll */}
      <div>
        <ContactSection autoFocusName={shouldAutoFocusName} />
      </div>

      {/* Footer */}
      <Footer />
    </PageWrapper>
  );
};

export default StayDetail;