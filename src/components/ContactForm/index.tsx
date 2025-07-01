import { useState } from 'react';
import { formTrackingService, FormTrackingResponse } from '../../lib/formTrackingService';
import FormSuccessMessage from '../FormSuccessMessage';

interface FormData {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  eventType: string;
  budget: string;
  message: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    eventType: '',
    budget: '',
    message: '',
    phone: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formResponse, setFormResponse] = useState<FormTrackingResponse | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.teamSize) {
      newErrors.teamSize = 'Please select team size';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Please select event type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await formTrackingService.submitForm(
        'contact-form',
        formData
      );
      
      setFormResponse(response);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds if successful
      if (response.success) {
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            teamSize: '',
            eventType: '',
            budget: '',
            message: '',
            phone: ''
          });
          setIsSubmitted(false);
          setFormResponse(null);
        }, 5000);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormResponse({
        success: false,
        reference_id: '',
        message: 'There was an error submitting your form. Please try again or contact us directly.'
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && formResponse) {
    return (
      <FormSuccessMessage 
        response={formResponse}
        onClose={() => {
          setIsSubmitted(false);
          setFormResponse(null);
        }}
        showCloseButton={true}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl p-8 text-white text-center">
        <h3 className="text-3xl font-bold mb-3">Get Your Free Consultation</h3>
        <p className="text-blue-100 text-lg">
          Tell us about your team and we'll create the perfect experience
        </p>
        <div className="flex justify-center space-x-6 mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">⚡</span>
            <span>24hr Response</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">🎯</span>
            <span>Expert Advice</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">💯</span>
            <span>100% Free</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-bold text-gray-800 uppercase tracking-wider">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 border-2 rounded-2xl text-lg font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 ${
                errors.name 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm font-medium">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-gray-800 uppercase tracking-wider">
              Work Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 border-2 rounded-2xl text-lg font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 ${
                errors.email 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              placeholder="you@company.com"
            />
            {errors.email && <p className="text-red-500 text-sm font-medium">{errors.email}</p>}
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-bold text-gray-800 uppercase tracking-wider">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 border-2 rounded-2xl text-lg font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 ${
                errors.company 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              placeholder="Your company name"
            />
            {errors.company && <p className="text-red-500 text-sm font-medium">{errors.company}</p>}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-bold text-gray-800 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl text-lg font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Team Size Field */}
          <div className="space-y-2">
            <label htmlFor="teamSize" className="block text-sm font-bold text-gray-800 uppercase tracking-wider">
              Team Size *
            </label>
            <select
              id="teamSize"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 border-2 rounded-2xl text-lg font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 ${
                errors.teamSize 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
            >
              <option value="">Select team size</option>
              <option value="10-25">10-25 people</option>
              <option value="25-50">25-50 people</option>
              <option value="50-100">50-100 people</option>
              <option value="100-200">100-200 people</option>
              <option value="200+">200+ people</option>
            </select>
            {errors.teamSize && <p className="text-red-500 text-sm font-medium">{errors.teamSize}</p>}
          </div>

          {/* Event Type Field */}
          <div className="space-y-2">
            <label htmlFor="eventType" className="block text-sm font-bold text-gray-800 uppercase tracking-wider">
              Event Type *
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 border-2 rounded-2xl text-lg font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 ${
                errors.eventType 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
            >
              <option value="">Select event type</option>
              <option value="team-building">Team Building Activity</option>
              <option value="team-outing">Team Outing</option>
              <option value="corporate-offsite">Corporate Offsite</option>
              <option value="virtual-event">Virtual Event</option>
              <option value="training-workshop">Training Workshop</option>
              <option value="other">Other</option>
            </select>
            {errors.eventType && <p className="text-red-500 text-sm font-medium">{errors.eventType}</p>}
          </div>

          {/* Budget Field */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="budget" className="block text-sm font-bold text-gray-800 uppercase tracking-wider">
              Budget Range (Optional)
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl text-lg font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300"
            >
              <option value="">Select budget range</option>
              <option value="under-50k">Under ₹50,000</option>
              <option value="50k-1l">₹50,000 - ₹1,00,000</option>
              <option value="1l-2l">₹1,00,000 - ₹2,00,000</option>
              <option value="2l-5l">₹2,00,000 - ₹5,00,000</option>
              <option value="5l+">₹5,00,000+</option>
            </select>
          </div>

          {/* Message Field */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="message" className="block text-sm font-bold text-gray-800 uppercase tracking-wider">
              Tell us about your event (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl text-lg font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300 resize-none"
              placeholder="Any specific requirements, goals, or questions about your team event..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-auto px-12 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl ${
              isSubmitting 
                ? 'opacity-75 cursor-not-allowed' 
                : 'hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending Request...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-3">
                <span className="text-2xl">🚀</span>
                <span>Get Free Consultation</span>
              </span>
            )}
          </button>
          
          <p className="text-gray-600 text-sm mt-4">
            🔒 Your information is secure and will never be shared with third parties
          </p>
        </div>
      </form>

      {/* Footer */}
      <div className="bg-gray-50 rounded-b-3xl p-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Quick Response</h4>
              <p className="text-gray-600 text-sm">Within 24 hours</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Expert Guidance</h4>
              <p className="text-gray-600 text-sm">Certified consultants</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💯</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">No Commitment</h4>
              <p className="text-gray-600 text-sm">100% free consultation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm; 