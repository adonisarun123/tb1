import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiX, FiChevronLeft, FiChevronRight, FiPlay, FiUsers, FiClock, FiTarget, FiCheck, FiStar } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabaseClient';
import SkipSearchPopup from '../../components/SkipSearchPopup';
import TestimonialsSection from '../../components/TestimonialsSection';
import ContactSection from '../../components/ContactSection';

// Enhanced Gallery Modal with Apple-style animations
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
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="absolute top-6 right-6 z-10">
        <motion.button 
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-white/80 bg-black/40 backdrop-blur-md rounded-full p-3 hover:bg-black/60 transition-all duration-300 border border-white/10"
        >
          <FiX size={20} />
        </motion.button>
      </div>
      
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
        />
        
        {images.length > 1 && (
          <>
            <motion.button 
              onClick={goToPrevious}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 text-white/80 bg-black/40 backdrop-blur-md rounded-full p-4 hover:bg-black/60 transition-all duration-300 border border-white/10"
            >
              <FiChevronLeft size={24} />
            </motion.button>
            
            <motion.button 
              onClick={goToNext}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 text-white/80 bg-black/40 backdrop-blur-md rounded-full p-4 hover:bg-black/60 transition-all duration-300 border border-white/10"
            >
              <FiChevronRight size={24} />
            </motion.button>
          </>
        )}
        
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm border border-white/10">
            {currentIndex + 1} of {images.length}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ActivityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activity, setActivity] = useState<any>(null);
  const [similarActivities, setSimilarActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [isSkipSearchOpen, setIsSkipSearchOpen] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;

        if (data) {
          setActivity({
            ...data,
            images: [data.main_image].filter(Boolean),
            description: data.activity_description?.replace(/<[^>]*>/g, '') || ''
          });

          // Fetch similar activities based on activity_type
          const { data: similarData, error: similarError } = await supabase
            .from('activities')
            .select('*')
            .eq('activity_type', data.activity_type)
            .neq('slug', slug)
            .limit(3);

          if (!similarError && similarData) {
            setSimilarActivities(similarData);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activity:', error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchActivity();
    }
  }, [slug]);

  const openGallery = (index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-lg text-gray-600 font-medium">Loading activity details...</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-16 px-6 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Activity not found</h1>
            <p className="text-lg text-gray-600 mb-8">The activity you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/team-building-activity"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              <FiArrowLeft className="mr-2" />
              Browse all activities
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // Format gallery images for the modal
  const galleryImages = activity.images.map((url: string, index: number) => ({
    id: index,
    url,
    alt: `${activity.name} - Image ${index + 1}`
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <GalleryModal
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            images={galleryImages}
            initialIndex={galleryInitialIndex}
          />
        )}
      </AnimatePresence>

      {/* Hero Section - Apple-style clean design */}
      <section className="pt-24 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link 
              to="/team-building-activity" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium text-lg"
            >
              <FiArrowLeft className="mr-2" />
              All Activities
            </Link>
          </motion.div>
          
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              {activity.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed text-center max-w-4xl mx-auto" 
               style={{ 
                 lineHeight: '1.6'
               }}>
              {activity.tagline || 'Transform your team through engaging experiences and build stronger connections that last beyond the workplace'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image - Full width with sophisticated presentation */}
      <section className="bg-white pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group mx-auto"
            onClick={() => openGallery(0)}
          >
            <div className="aspect-[16/9] relative">
              <img 
                src={activity.main_image || 'https://via.placeholder.com/1200x675?text=No+Image+Available'} 
                alt={activity.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Play button overlay if video exists */}
              {activity.activity_video && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                  >
                    <FiPlay className="text-gray-900 text-2xl ml-1" />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Stats - Apple-style cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {/* Activity Type */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FiTarget className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Activity Type</h3>
              <p className="text-2xl font-bold text-gray-900">{activity.activity_type}</p>
            </div>
            
            {/* Group Size */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <FiUsers className="text-green-600 text-xl" />
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Group Size</h3>
              <p className="text-2xl font-bold text-gray-900">{activity.group_size}</p>
            </div>
            
            {/* Duration */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <FiClock className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Duration</h3>
              <p className="text-2xl font-bold text-gray-900">{activity.duration}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-20">
              
              {/* Activity Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-4xl mx-auto lg:mx-0"
              >
                <div className="text-center lg:text-left mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About This Experience</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto lg:mx-0"></div>
                </div>
                <div 
                  className="prose prose-lg prose-gray max-w-none leading-relaxed text-gray-700 text-justify"
                  style={{ 
                    textAlign: 'justify',
                    textJustify: 'inter-word',
                    hyphens: 'auto',
                    lineHeight: '1.8'
                  }}
                  dangerouslySetInnerHTML={{ __html: activity.activity_description }}
                />
              </motion.div>

              {/* Target Areas */}
              {activity.target_areas && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative"
                >
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">What You'll Develop</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" 
                       style={{ 
                         lineHeight: '1.7'
                       }}>
                      Key skills and competencies your team will strengthen through this carefully designed experience that promotes growth and collaboration
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {activity.target_areas.split(',').map((area: string, index: number) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-100 transition-colors duration-300">
                              <FiCheck className="text-blue-600 text-lg" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg mb-3 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                              {area.trim()}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2 text-justify leading-relaxed">
                              Essential skill development for enhanced team performance
                            </p>
                            <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                        
                        {/* Subtle gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Impact on Team Dynamics */}
              {activity.impact_on_team_dynamics && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative"
                >
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Team Impact</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed" 
                       style={{ 
                         lineHeight: '1.7'
                       }}>
                      Discover how this activity transforms team dynamics, strengthens collaboration, and creates lasting positive changes in your workplace culture
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {activity.impact_on_team_dynamics
                      .replace(/<\/?ul[^>]*>/g, '')
                      .split('<li>')
                      .slice(1)
                      .map((impact: string, index: number) => {
                        const cleanImpact = impact
                          .replace('</li>', '')
                          .replace(/<\/?strong>/g, '')
                          .split(':');
                        
                        if (cleanImpact.length < 2) return null;
                        
                        const [title, description] = cleanImpact;
                        
                        // Icon mapping for different impact areas
                        const getIcon = (title: string) => {
                          const lowerTitle = title.toLowerCase();
                          if (lowerTitle.includes('creativity') || lowerTitle.includes('creative')) return '🎨';
                          if (lowerTitle.includes('collaboration') || lowerTitle.includes('teamwork')) return '🤝';
                          if (lowerTitle.includes('communication')) return '💬';
                          if (lowerTitle.includes('personalization') || lowerTitle.includes('personal')) return '👥';
                          if (lowerTitle.includes('reflection') || lowerTitle.includes('learning')) return '🧠';
                          if (lowerTitle.includes('leadership')) return '🎯';
                          return '⭐';
                        };
                        
                        return (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
                            className="group relative"
                          >
                            <div className="relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 h-full">
                              {/* Background pattern */}
                              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-3xl opacity-50"></div>
                              
                              {/* Icon */}
                              <div className="relative z-10 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <span className="text-white font-bold">
                                    {getIcon(title)}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                                  {title.trim()}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg text-justify" 
                                   style={{ 
                                     textAlign: 'justify',
                                     textJustify: 'inter-word',
                                     hyphens: 'auto',
                                     lineHeight: '1.7'
                                   }}>
                                  {description.trim()}
                                </p>
                              </div>
                              
                              {/* Decorative element */}
                              <div className="absolute bottom-6 left-8">
                                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                              
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                  
                  {/* Bottom decorative element */}
                  <div className="mt-16 text-center">
                    <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100">
                      <span className="text-blue-600 font-medium text-lg">Transforming teams through meaningful experiences</span>
                    </div>
                    <p className="mt-4 text-gray-500 text-sm max-w-2xl mx-auto text-center leading-relaxed">
                      Every activity is designed with intention, backed by research, and delivered with excellence to ensure maximum impact for your team.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Activity Blueprint */}
              {activity.blueprint && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="max-w-4xl mx-auto lg:mx-0"
                >
                  <div className="text-center lg:text-left mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto lg:mx-0"></div>
                  </div>
                  <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 shadow-lg">
                    <div 
                      className="prose prose-lg prose-gray max-w-none text-justify"
                      style={{ 
                        textAlign: 'justify',
                        textJustify: 'inter-word',
                        hyphens: 'auto',
                        lineHeight: '1.8'
                      }}
                      dangerouslySetInnerHTML={{ __html: activity.blueprint }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="sticky top-32 space-y-8"
              >
                {/* Booking Card */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-white/90 text-sm">4.9 (127 reviews)</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 leading-tight">Ready to get started?</h3>
                    <p className="text-blue-100 leading-relaxed text-justify" 
                       style={{ 
                         textAlign: 'justify',
                         textJustify: 'inter-word',
                         lineHeight: '1.6'
                       }}>
                      Book this experience for your team and create lasting memories together through engaging activities designed to strengthen bonds and enhance collaboration.
                    </p>
                  </div>
                  
                  <motion.button
                    onClick={() => setIsSkipSearchOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:bg-gray-50 transition-colors duration-200 shadow-lg"
                  >
                    Book This Activity
                  </motion.button>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="space-y-3 text-sm text-blue-100">
                      <div className="flex items-center">
                        <FiCheck className="mr-2 text-green-400" />
                        Free consultation included
                      </div>
                      <div className="flex items-center">
                        <FiCheck className="mr-2 text-green-400" />
                        Custom planning available
                      </div>
                      <div className="flex items-center">
                        <FiCheck className="mr-2 text-green-400" />
                        24/7 support
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Preview */}
                {activity.activity_video && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Activity Preview</h4>
                    <div className="relative rounded-xl overflow-hidden aspect-video">
                      <iframe
                        src={activity.activity_video.replace('watch?v=', 'embed/')}
                        title="Activity Video"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Activities - Apple-style grid */}
      {similarActivities.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Similar Experiences</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" 
                   style={{ 
                     lineHeight: '1.7'
                   }}>
                  Discover more ways to strengthen your team bonds and explore additional activities that complement this experience
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {similarActivities.map((similarActivity, index) => (
                  <motion.div
                    key={similarActivity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  >
                    <Link 
                      to={`/team-building-activity/${similarActivity.slug}`}
                      className="group block"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-gray-200">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={similarActivity.main_image}
                            alt={similarActivity.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                            {similarActivity.name}
                          </h3>
                          <p className="text-gray-600 mb-6 leading-relaxed text-justify" 
                             style={{ 
                               textAlign: 'justify',
                               textJustify: 'inter-word',
                               lineHeight: '1.6'
                             }}>
                            {similarActivity.tagline || 'Experience the power of collaboration through carefully designed team building activities'}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <div className="flex items-center">
                              <FiUsers className="mr-1" />
                              <span>{similarActivity.group_size}</span>
                            </div>
                            <div className="flex items-center">
                              <FiClock className="mr-1" />
                              <span>{similarActivity.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-200">
                            <span>Learn more</span>
                            <motion.div
                              className="ml-2"
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              →
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      <div className="py-8 bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating CTA Button - Apple-style */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.button
          onClick={() => setIsSkipSearchOpen(true)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-md border border-blue-500/20"
        >
          Book Now
        </motion.button>
      </motion.div>

      {/* Skip Search Popup */}
      <SkipSearchPopup
        isVisible={isSkipSearchOpen}
        onClose={() => setIsSkipSearchOpen(false)}
      />
    </div>
  );
};

export default ActivityDetail; 