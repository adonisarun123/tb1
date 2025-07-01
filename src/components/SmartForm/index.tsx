import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiUsers, 
  FiZap,
  FiCheck,
  FiAlertCircle,
  FiLoader,
  FiSend,
  FiTrendingUp
} from 'react-icons/fi';
import { formTrackingService, FormTrackingResponse } from '../../lib/formTrackingService';
import FormSuccessMessage from '../FormSuccessMessage';

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  groupSize: string;
  preferredDate: string;
  location: string;
  activityType: string;
  budget: string;
  specialRequirements: string;
}

interface CompanySuggestion {
  name: string;
  industry: string;
  estimatedSize: string;
  confidence: number;
}

interface SmartSuggestion {
  field: string;
  value: string;
  reason: string;
  confidence: number;
}

interface FormValidation {
  isValid: boolean;
  errors: { [key: string]: string };
  completionScore: number;
  suggestions: string[];
}

const SmartForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    groupSize: '',
    preferredDate: '',
    location: '',
    activityType: '',
    budget: '',
    specialRequirements: ''
  });

  const [companySuggestions, setCompanySuggestions] = useState<CompanySuggestion[]>([]);
  const [smartSuggestions, setSmartSuggestions] = useState<SmartSuggestion[]>([]);
  const [validation, setValidation] = useState<FormValidation>({
    isValid: false,
    errors: {},
    completionScore: 0,
    suggestions: []
  });
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});
  const [_isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formResponse, setFormResponse] = useState<FormTrackingResponse | null>(null);

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Real Estate', 'Media', 'Government', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-500 employees', '501-1000 employees', '1000+ employees'
  ];

  const locations = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 
    'Pune', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida', 'Other'
  ];

  const activityTypes = [
    'Virtual Team Building', 'Outdoor Adventures', 'Indoor Activities',
    'Cooking Workshops', 'Sports Activities', 'Creative Workshops',
    'Problem Solving Games', 'Leadership Training', 'Communication Skills'
  ];

  const budgetRanges = [
    'Under ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹2,00,000',
    '₹2,00,000 - ₹5,00,000', 'Above ₹5,00,000', 'Let\'s discuss'
  ];

  // Define required and optional fields
  const requiredFields = ['companyName', 'contactPerson', 'email'];
  const optionalFields = ['phone', 'industry', 'companySize', 'groupSize', 'preferredDate', 'location', 'activityType', 'budget', 'specialRequirements'];

  useEffect(() => {
    validateForm();
    generateSmartSuggestions();
  }, [formData, touchedFields]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'companyName' && value.length > 2) {
      searchCompanySuggestions(value);
    }
  };

  const handleFieldBlur = (field: keyof FormData) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const searchCompanySuggestions = async (query: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockSuggestions: CompanySuggestion[] = [
      {
        name: `${query} Technologies Pvt Ltd`,
        industry: 'Technology',
        estimatedSize: '51-200 employees',
        confidence: 0.85
      },
      {
        name: `${query} Solutions`,
        industry: 'Consulting',
        estimatedSize: '11-50 employees',
        confidence: 0.75
      },
      {
        name: `${query} Industries`,
        industry: 'Manufacturing',
        estimatedSize: '201-500 employees',
        confidence: 0.65
      }
    ];
    
    setCompanySuggestions(mockSuggestions);
    setIsLoading(false);
  };

  const applySuggestion = (suggestion: CompanySuggestion) => {
    setFormData(prev => ({
      ...prev,
      companyName: suggestion.name,
      industry: suggestion.industry,
      companySize: suggestion.estimatedSize
    }));
    setCompanySuggestions([]);
  };

  const generateSmartSuggestions = () => {
    const suggestions: SmartSuggestion[] = [];
    
    if (formData.industry === 'Technology' && !formData.activityType) {
      suggestions.push({
        field: 'activityType',
        value: 'Virtual Team Building',
        reason: 'Tech companies often prefer virtual activities for distributed teams',
        confidence: 0.9
      });
    }
    
    if (formData.companySize && !formData.groupSize) {
      const sizeMatch = formData.companySize.match(/(\d+)/);
      if (sizeMatch) {
        const sizeNum = parseInt(sizeMatch[1]);
        const suggestedGroupSize = Math.min(Math.max(Math.floor(sizeNum * 0.4), 15), 100);
        
        suggestions.push({
          field: 'groupSize',
          value: `${suggestedGroupSize} people`,
          reason: `Optimal group size based on your company size for effective team building`,
          confidence: 0.8
        });
      }
    }

    if (formData.industry === 'Finance' && !formData.budget) {
      suggestions.push({
        field: 'budget',
        value: '₹1,00,000 - ₹2,00,000',
        reason: 'Typical budget range for finance sector team building activities',
        confidence: 0.7
      });
    }

    if (formData.activityType === 'Outdoor Adventures' && !formData.location) {
      suggestions.push({
        field: 'location',
        value: 'Bangalore',
        reason: 'Great outdoor venues available near Bangalore',
        confidence: 0.8
      });
    }
    
    setSmartSuggestions(suggestions);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    let filledRequiredFields = 0;
    let filledOptionalFields = 0;

    // Validate required fields
    requiredFields.forEach(field => {
      const value = formData[field as keyof FormData];
      const isFieldTouched = touchedFields[field];
      
      if (!value && isFieldTouched) {
        switch (field) {
          case 'companyName':
            errors[field] = 'Company name is required';
            break;
          case 'contactPerson':
            errors[field] = 'Contact person is required';
            break;
          case 'email':
            errors[field] = 'Email is required';
            break;
        }
      } else if (value) {
        filledRequiredFields++;
        
        // Additional validation for email
        if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          if (isFieldTouched) {
            errors[field] = 'Please enter a valid email address';
          }
        }
      }
    });

    // Count filled optional fields
    optionalFields.forEach(field => {
      const value = formData[field as keyof FormData];
      if (value && value.trim()) {
        filledOptionalFields++;
      }
    });

    // Validate phone if provided
    if (formData.phone && touchedFields.phone) {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        errors.phone = 'Please enter a valid 10-digit phone number';
      }
    }

    // Calculate completion score (required fields are weighted more)
    const requiredScore = (filledRequiredFields / requiredFields.length) * 60;
    const optionalScore = (filledOptionalFields / optionalFields.length) * 40;
    const completionScore = Math.round(requiredScore + optionalScore);

    const suggestions = [];
    if (completionScore < 40) {
      suggestions.push('Complete the required fields to get started');
    } else if (completionScore < 70) {
      suggestions.push('Add more details for better recommendations');
    }

    const isValid = Object.keys(errors).length === 0 && filledRequiredFields === requiredFields.length;

    setValidation({
      isValid,
      errors,
      completionScore,
      suggestions
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all required fields as touched to show validation errors
    const newTouchedFields = { ...touchedFields };
    requiredFields.forEach(field => {
      newTouchedFields[field] = true;
    });
    setTouchedFields(newTouchedFields);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await formTrackingService.submitForm(
        'smart-form',
        formData
      );
      
      setFormResponse(response);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds if successful
      if (response.success) {
        setTimeout(() => {
          setFormData({
            companyName: '',
            contactPerson: '',
            email: '',
            phone: '',
            industry: '',
            companySize: '',
            groupSize: '',
            preferredDate: '',
            location: '',
            activityType: '',
            budget: '',
            specialRequirements: ''
          });
          setTouchedFields({});
          setIsSubmitted(false);
          setFormResponse(null);
        }, 5000);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormResponse({
        success: false,
        reference_id: '',
        message: 'There was an error submitting your smart form. Please try again or contact us directly.'
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCompletionColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const applySuggestionValue = (field: string, value: string) => {
    handleInputChange(field as keyof FormData, value);
    setSmartSuggestions(prev => prev.filter(s => s.field !== field));
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-xl flex items-center justify-center">
            <FiZap className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Smart Team Building Planner</h2>
            <p className="text-gray-600">AI-powered form with intelligent suggestions</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Form Completion</span>
            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${getCompletionColor(validation.completionScore)}`}>
              {validation.completionScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${validation.completionScore}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {validation.suggestions.length > 0 && (
            <div className="mt-2">
              {validation.suggestions.map((suggestion, index) => (
                <p key={index} className="text-xs text-gray-500 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  {suggestion}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <FiHome className="text-blue-600" />
            <span>Company Information</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                onBlur={() => handleFieldBlur('companyName')}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent transition-colors ${
                  validation.errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your company name"
              />
              {validation.errors.companyName && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <FiAlertCircle className="mr-1" />
                  {validation.errors.companyName}
                </motion.p>
              )}
              
              {/* Company Suggestions */}
              <AnimatePresence>
                {companySuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                  >
                    {companySuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => applySuggestion(suggestion)}
                        className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{suggestion.name}</div>
                            <div className="text-xs text-gray-500">
                              {suggestion.industry} • {suggestion.estimatedSize}
                            </div>
                          </div>
                          <div className="text-xs text-blue-600 font-medium">
                            {Math.round(suggestion.confidence * 100)}% match
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
              >
                <option value="">Select industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                onBlur={() => handleFieldBlur('contactPerson')}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent transition-colors ${
                  validation.errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your full name"
              />
              {validation.errors.contactPerson && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <FiAlertCircle className="mr-1" />
                  {validation.errors.contactPerson}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent transition-colors ${
                  validation.errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@company.com"
              />
              {validation.errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <FiAlertCircle className="mr-1" />
                  {validation.errors.email}
                </motion.p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={() => handleFieldBlur('phone')}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent transition-colors ${
                  validation.errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+91 98765 43210"
              />
              {validation.errors.phone && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <FiAlertCircle className="mr-1" />
                  {validation.errors.phone}
                </motion.p>
              )}
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
              <select
                value={formData.companySize}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
              >
                <option value="">Select company size</option>
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <FiUsers className="text-green-600" />
            <span>Event Details</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Group Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Group Size</label>
              <input
                type="text"
                value={formData.groupSize}
                onChange={(e) => handleInputChange('groupSize', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                placeholder="e.g., 25 people"
              />
            </div>

            {/* Activity Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Activity Type</label>
              <select
                value={formData.activityType}
                onChange={(e) => handleInputChange('activityType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
              >
                <option value="">Select activity type</option>
                {activityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
              <select
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
              >
                <option value="">Select location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Special Requirements */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
              <textarea
                value={formData.specialRequirements}
                onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                placeholder="Any specific requirements, dietary restrictions, accessibility needs, etc."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <AnimatePresence>
          {smartSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-yellow-50 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FiTrendingUp className="text-yellow-600" />
                <span>AI Suggestions</span>
              </h3>
              
              <div className="space-y-3">
                {smartSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {suggestion.field.charAt(0).toUpperCase() + suggestion.field.slice(1).replace(/([A-Z])/g, ' $1')}:
                        </span>
                        <span className="text-sm font-semibold text-[#FF4C39]">
                          {suggestion.value}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {Math.round(suggestion.confidence * 100)}% confidence
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{suggestion.reason}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => applySuggestionValue(suggestion.field, suggestion.value)}
                      className="ml-4 px-3 py-1 bg-[#FF4C39] text-white text-xs rounded-lg hover:bg-[#FF6B5A] transition-colors flex items-center space-x-1"
                    >
                      <FiCheck size={12} />
                      <span>Apply</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Section */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600 flex items-center space-x-2">
            <FiCheck className="text-green-500" />
            <span>All fields are validated and secure</span>
          </div>
          
          <button
            type="submit"
            disabled={!validation.isValid || isSubmitting}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <FiSend />
                <span>Submit Request</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SmartForm; 