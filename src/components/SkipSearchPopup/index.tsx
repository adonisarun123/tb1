import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import { useContactSubmission } from '../../lib/hooks/useSupabaseData';

interface SkipSearchPopupProps {
  onClose: () => void;
  isVisible: boolean;
}

const SkipSearchPopup = ({ onClose, isVisible }: SkipSearchPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    work_email: '',
    phone: '',
    number_of_pax: '',
    preferred_destination: '',
    more_details: '',
    activity_type: 'exploring' as const
  });

  const { submit, loading, error, success } = useContactSubmission();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.work_email.trim() || !formData.phone.trim() || !formData.preferred_destination.trim() || !formData.number_of_pax) {
      console.error('Missing required fields');
      return;
    }

    try {
      await submit({
        name: formData.name.trim(),
        work_email: formData.work_email.trim(),
        phone: formData.phone.trim(),
        preferred_destination: formData.preferred_destination.trim(),
        number_of_pax: parseInt(formData.number_of_pax) || 1,
        more_details: formData.more_details.trim() || '',
        activity_type: formData.activity_type,
        page_url: window.location.href,
        page_heading: 'Skip Search Popup Form'
      });
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  // Watch for successful submission
  useEffect(() => {
    if (success) {
      setFormData({
        name: '',
        work_email: '',
        phone: '',
        number_of_pax: '',
        preferred_destination: '',
        more_details: '',
        activity_type: 'exploring'
      });
      // Close popup and redirect to thank you page
      onClose();
      window.location.href = '/thank-you';
    }
  }, [success, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          {/* Popup Content */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            className="relative bg-white rounded-xl shadow-xl w-[95%] max-w-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FiX size={20} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image Section - Hidden on mobile */}
              <div className="hidden md:block md:w-[35%] md:h-auto">
                <img
                  src="https://cdn.prod.website-files.com/655e49f111202615f47a3d82/6631fb65afcee8415edaa6a8_Vaish.jpg"
                  alt="Team Building Expert"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="md:w-[65%] p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                    Skip the Search
                  </span>
                  <span className="text-[#313131]">—Your Ideal Teambuilding Plan is Just a Click Away!</span>
                </h2>

                <div className="mb-4">
                  <p className="text-base text-[#636363] mb-1">
                    We've been doing this for <span className="font-semibold">more than 10 years now</span>. Tell us what you need.
                  </p>
                  <p className="text-base text-[#636363]">
                    Skip the search, sit back, and relax.
                  </p>
                </div>

                {success && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm">Thank you! We'll get back to you soon.</p>
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4C39]"
                  />
                  <input
                    type="email"
                    name="work_email"
                    placeholder="Work Email"
                    value={formData.work_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4C39]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4C39]"
                    />
                    <input
                      type="number"
                      name="number_of_pax"
                      placeholder="No of Pax"
                      value={formData.number_of_pax}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4C39]"
                    />
                  </div>
                  <input
                    type="text"
                    name="preferred_destination"
                    placeholder="Destination (Eg. Bangalore)"
                    value={formData.preferred_destination}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4C39]"
                  />
                  <textarea
                    name="more_details"
                    placeholder="More details? (*For priority)"
                    value={formData.more_details}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4C39] resize-none"
                  />
                  <select 
                    name="activity_type"
                    value={formData.activity_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4C39] bg-white"
                  >
                    <option value="exploring">Exploring Options</option>
                    <option value="outbound">Outbound Activities</option>
                    <option value="virtual">Virtual Activities</option>
                    <option value="hybrid">Hybrid Activities</option>
                  </select>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <img
                      src="https://cdn.prod.website-files.com/655e49f111202615f47a3d82/6631fb65afcee8415edaa6a8_Vaish.jpg"
                      alt="Google Rating"
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="ml-2 text-[#636363]">Excellent</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#636363] font-semibold">4.9</span>
                    <span className="ml-1 text-[#636363]">out of 5</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkipSearchPopup; 