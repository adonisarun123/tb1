import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCheck, 
  FiCopy, 
  FiMail, 
  FiPhone, 
  FiClock,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi';
import { FormTrackingResponse } from '../../lib/formTrackingService';

interface FormSuccessMessageProps {
  response: FormTrackingResponse;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

const FormSuccessMessage: React.FC<FormSuccessMessageProps> = ({
  response,
  onClose,
  showCloseButton = false,
  className = ""
}) => {
  const [referenceIdCopied, setReferenceIdCopied] = useState(false);

  const copyReferenceId = () => {
    navigator.clipboard.writeText(response.reference_id);
    setReferenceIdCopied(true);
    setTimeout(() => setReferenceIdCopied(false), 2000);
  };

  const getFormTypeDisplay = (response: FormTrackingResponse) => {
    if (response.reference_id.startsWith('TRB-')) return 'General Inquiry';
    if (response.reference_id.startsWith('TBF-')) return 'Expert Consultation';
    if (response.reference_id.startsWith('TSF-')) return 'Smart Form';
    if (response.reference_id.startsWith('TCF-')) return 'Contact Form';
    if (response.reference_id.startsWith('TEF-')) return 'Event Form';
    return 'Form Submission';
  };

  const getStatusColor = () => {
    if (response.success) return 'from-emerald-500 to-teal-500';
    return 'from-red-500 to-red-600';
  };

  const getResponseTimeColor = (time: string) => {
    if (time.includes('hour') && parseInt(time) <= 6) return 'text-green-600 bg-green-50';
    if (time.includes('hour') && parseInt(time) <= 24) return 'text-blue-600 bg-blue-50';
    if (time.includes('day')) return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  if (!response.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 text-center border border-red-200 ${className}`}
      >
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl text-white">⚠️</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Submission Failed</h3>
        <p className="text-xl text-gray-600 mb-6">{response.message}</p>
        
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
          >
            Try Again
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 text-center border border-emerald-200 ${className}`}
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`w-20 h-20 bg-gradient-to-r ${getStatusColor()} rounded-full flex items-center justify-center mx-auto mb-6`}
      >
        <FiCheck className="text-3xl text-white" />
      </motion.div>

      {/* Success Title */}
      <h3 className="text-3xl font-bold text-gray-900 mb-4">Success!</h3>
      
      {/* Main Message */}
      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
        {response.message}
      </p>

      {/* Reference ID Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-800">Your Reference ID</h4>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {getFormTypeDisplay(response)}
          </span>
        </div>
        
        <div className="flex items-center justify-center space-x-3 bg-gray-50 p-4 rounded-xl">
          <code className="text-2xl font-mono font-bold text-blue-600 tracking-wider">
            {response.reference_id}
          </code>
          <button
            onClick={copyReferenceId}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            title="Copy Reference ID"
          >
            {referenceIdCopied ? (
              <>
                <FiCheckCircle className="w-4 h-4" />
                <span className="text-sm">Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </>
            )}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-3">
          Save this reference ID for tracking your request
        </p>
      </div>

      {/* Response Time Info */}
      {response.estimated_response_time && (
        <div className="flex items-center justify-center space-x-3 mb-6">
          <FiClock className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">Expected Response Time:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getResponseTimeColor(response.estimated_response_time)}`}>
            {response.estimated_response_time}
          </span>
        </div>
      )}

      {/* Next Steps */}
      {response.next_steps && response.next_steps.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FiArrowRight className="w-5 h-5 mr-2 text-blue-600" />
            What happens next?
          </h4>
          <div className="space-y-3 text-left">
            {response.next_steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-600 leading-relaxed">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      {response.contact_info && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Need immediate assistance?</h4>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
            {response.contact_info.email && (
              <a
                href={`mailto:${response.contact_info.email}`}
                className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl transition-colors shadow-sm border border-gray-200"
              >
                <FiMail className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{response.contact_info.email}</span>
              </a>
            )}
            
            {response.contact_info.phone && (
              <a
                href={`tel:${response.contact_info.phone}`}
                className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl transition-colors shadow-sm border border-gray-200"
              >
                <FiPhone className="w-4 h-4 text-green-600" />
                <span className="font-medium">{response.contact_info.phone}</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Close Button */}
      {showCloseButton && onClose && (
        <div className="mt-8">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Continue Exploring
          </button>
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-6 pt-6 border-t border-emerald-200">
        <p className="text-sm text-gray-500">
          We appreciate your interest in Trebound! Our team is committed to providing you with the best team building experience.
        </p>
      </div>
    </motion.div>
  );
};

export default FormSuccessMessage; 