import React from 'react';
import { motion } from 'framer-motion';

interface ActivityCardProps {
  title: string;
  rating: string;
  participants: string;
  duration: string;
  description: string;
  type: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  rating,
  participants,
  duration,
  description,
  type
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-[#FF5A3C] font-bold">{rating}</span>
          <span className="ml-2 text-gray-600">Most Adored</span>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="text-gray-600 mb-2">
          <span>{participants} participants</span>
          <span className="mx-2">•</span>
          <span>{duration}</span>
          <span className="mx-2">•</span>
          <span>{type}</span>
        </div>
        <p className="text-gray-700">{description}</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="mt-4 text-[#FF5A3C] font-semibold hover:text-[#FFB573] transition-colors duration-300"
        >
          View activity →
        </motion.button>
      </div>
    </motion.div>
  );
}; 