import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface GalleryModalProps {
  onClose: () => void;
  images: { id: number; url: string; alt: string }[];
  initialIndex: number;
}

const GalleryModal = ({ onClose, images, initialIndex = 0 }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close gallery"
      >
        <FiX size={24} />
      </button>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="relative">
          <img 
            src={images[currentIndex].url} 
            alt={images[currentIndex].alt} 
            className="w-full h-auto max-h-[80vh] object-contain"
          />
          
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
            aria-label="Previous image"
          >
            <FiChevronLeft size={24} />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
            aria-label="Next image"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
        
        <div className="text-center text-white mt-4">
          <p className="text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryModal; 