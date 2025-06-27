import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useContactSubmission } from '../lib/hooks/useSupabaseData';

interface QuoteModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export const QuoteModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <QuoteModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && <QuoteModal onClose={closeModal} />}
    </QuoteModalContext.Provider>
  );
};

export const useQuoteModal = () => {
  const context = useContext(QuoteModalContext);
  if (context === undefined) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  }
  return context;
};

const QuoteModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    work_email: '',
    company: '',
    more_details: '',
    preferred_destination: 'Not specified',
    phone: '',
    number_of_pax: 1,
    activity_type: 'exploring' as const
  });

  const { submit, loading, error, success } = useContactSubmission();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.work_email.trim() || !formData.company.trim() || !formData.more_details.trim()) {
      console.error('Missing required fields');
      return;
    }

    try {
      await submit({
        name: formData.name.trim(),
        work_email: formData.work_email.trim(),
        preferred_destination: formData.preferred_destination,
        phone: formData.phone.trim() || 'Not provided',
        number_of_pax: formData.number_of_pax,
        more_details: `Company: ${formData.company.trim()}\n\n${formData.more_details.trim()}`,
        activity_type: formData.activity_type,
        page_url: window.location.href,
        page_heading: 'Quote Modal Form'
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
        company: '',
        more_details: '',
        preferred_destination: 'Not specified',
        phone: '',
        number_of_pax: 1,
        activity_type: 'exploring'
      });
      // Close modal and redirect to thank you page
      onClose();
      window.location.href = '/thank-you';
    }
  }, [success, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6">Get a Quote</h2>
        
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Email
            </label>
            <input
              type="email"
              name="work_email"
              value={formData.work_email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your work email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="more_details"
              value={formData.more_details}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={4}
              placeholder="Tell us about your team and what you're looking for"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-medium rounded-lg hover:opacity-95 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}; 