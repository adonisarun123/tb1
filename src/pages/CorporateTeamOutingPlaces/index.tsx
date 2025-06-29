import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import StepsSection from '../../components/StepsSection';
import PartnersSection from '../../components/PartnersSection';
import ContactSection from '../../components/ContactSection';
import PageWrapper from '../../components/PageWrapper';
import { useRegions } from '../../lib/hooks/useSupabaseData';
import type { Destination } from '../../lib/supabaseClient';
import { supabase } from '../../lib/supabaseClient';

// Extend the Destination type to include location_type
interface ExtendedDestination extends Destination {
  location_type?: string;
}

// Location tabs
const locationTabs = [
  { id: 'india', name: 'India' },
  { id: 'abroad', name: 'Abroad' }
];

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

const CorporateTeamOutingPlaces = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState('india');
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const destinationsPerPage = 6;
  const [allDestinations, setAllDestinations] = useState<ExtendedDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch regions from Supabase
  const { regions: supabaseRegions, loading: regionsLoading } = useRegions();

  // Get filtered regions based on active tab
  const getFilteredRegions = () => {
    if (!supabaseRegions) return [];
    
    return supabaseRegions.filter(region => {
      const isInternational = region.name.toLowerCase().includes('international');
      
      // For India tab, exclude international regions
      if (activeTab === 'india') {
        return !isInternational;
      }
      
      // For Abroad tab, only show international regions
      if (activeTab === 'abroad') {
        return isInternational;
      }
      
      return true;
    });
  };

  // Create a combined regions array with "All" option
  const displayRegions = [
    { id: 'all', name: 'All' },
    ...getFilteredRegions().map(region => ({
      id: region.id,
      name: region.name
    }))
  ];
  
  // Effect to fetch and combine all destinations
  useEffect(() => {
    if (regionsLoading || !supabaseRegions || supabaseRegions.length === 0) {
      return;
    }
    
    const fetchAllDestinations = async () => {
      setIsLoading(true);
      
      try {
        // Get all region IDs
        const regionIds = supabaseRegions.map(region => region.id);
        
        // Fetch all destinations for these regions directly from Supabase
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .in('region_id', regionIds)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Process the destinations to properly set the location_type
        const processedDestinations = (data || []).map(destination => {
          // Get the region name for this destination
          const regionName = supabaseRegions.find(r => r.id === destination.region_id)?.name || '';
          
          // Check if this is an international destination
          const isInternational = regionName.toLowerCase().includes('international') || 
                                 destination.region?.toLowerCase().includes('international');
          
          // Set the location_type based on whether it's international
          return {
            ...destination,
            location_type: isInternational ? 'abroad' : 'india'
          };
        });
        
        setAllDestinations(processedDestinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllDestinations();
  }, [supabaseRegions, regionsLoading]);

  // Reset region filter when changing tabs
  useEffect(() => {
    setActiveRegion('all');
    setCurrentPage(1);
  }, [activeTab]);

  // Filter destinations based on search query, active region, and location
  const filteredDestinations = allDestinations.filter(destination => {
    const matchesSearch = !searchQuery || 
                         destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (destination.destination_description && 
                          destination.destination_description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by region if not "all"
    const matchesRegion = activeRegion === 'all' || 
                         (destination.region_id && destination.region_id.toString() === activeRegion);
    
    // Filter by location (India/Abroad)
    const matchesLocation = destination.location_type === activeTab;
    
    return matchesSearch && matchesRegion && matchesLocation;
  });

  // Pagination logic
  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = filteredDestinations.slice(indexOfFirstDestination, indexOfLastDestination);
  const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage);

  return (
    <PageWrapper className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
            alt="Corporate team outing"
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
              Discover Amazing Destinations
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Inter'] text-white leading-tight"
            >
              Let's Create a Memorable<br />
              Time Together!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-['DM Sans']"
            >
              From serene retreats to adventure-packed destinations, find the perfect location for your corporate team building activities.
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
      <section className="w-full bg-white pt-8 pb-16" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12 mb-12">
            <div className="flex-1 max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block text-lg font-medium font-['DM Sans'] text-[#636363] mb-2"
              >
                Corporate Team Outings
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[40px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
              >
                Explore Perfect Locations.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:max-w-md text-left lg:text-right text-base font-normal font-['DM Sans'] text-[#757575] lg:pt-6"
            >
              Each destination offers unique experiences and activities designed to strengthen team bonds and create unforgettable moments.
            </motion.p>
          </div>

          {/* Filter Section */}
          <div className="mb-10">
            {/* Location Tabs */}
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-1 flex border border-[#e0e0e0]">
                {locationTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white'
                        : 'text-[#757575]'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {displayRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(String(region.id))}
                  className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                    activeRegion === String(region.id)
                      ? 'bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white border-transparent'
                      : 'text-[#757575] border-[#b1b1b1] hover:border-[#FF4C39]'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a destination"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 px-5 pr-12 rounded-full border border-[#b1b1b1] focus:outline-none focus:border-[#FF4C39] text-[#313131] placeholder-[#757575]"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full p-2 text-white">
                  <FiSearch size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Destinations Grid */}
          {isLoading ? (
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
              {currentDestinations.map((destination, index) => (
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
                      <Link to={`/corporate-team-outing-places/${destination.slug}`}>
                        <ViewDetailsButton />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex justify-center items-center mt-10">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#b1b1b1] text-[#757575] disabled:opacity-50"
              >
                ←
              </button>
              
              <div className="mx-4 px-4 py-2 rounded-full bg-[#f5f5f5] text-[#313131]">
                {currentPage} / {totalPages}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#b1b1b1] text-[#757575] disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Steps Section */}
      <StepsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </PageWrapper>
  );
};

export default CorporateTeamOutingPlaces;
