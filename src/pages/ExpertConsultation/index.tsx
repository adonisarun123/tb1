import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { formTrackingService, FormTrackingResponse } from '../../lib/formTrackingService';
import FormSuccessMessage from '../../components/FormSuccessMessage';

// Icons
const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  
  // Company Information
  companyName: string;
  companySize: string;
  industry: string;
  location: string;
  
  // Consultation Details
  consultationType: string;
  teamSize: string;
  budget: string;
  timeframe: string;
  challenges: string;
  goals: string;
  previousExperience: string;
  
  // Scheduling
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  duration: string;
  
  // Additional
  additionalInfo: string;
  marketingConsent: boolean;
}

const ExpertConsultation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    companyName: '',
    companySize: '',
    industry: '',
    location: '',
    consultationType: '',
    teamSize: '',
    budget: '',
    timeframe: '',
    challenges: '',
    goals: '',
    previousExperience: '',
    preferredDate: '',
    preferredTime: '',
    timezone: '',
    duration: '',
    additionalInfo: '',
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formResponse, setFormResponse] = useState<FormTrackingResponse | null>(null);

  const steps = [
    { id: 1, title: 'Personal Info', icon: <UserIcon /> },
    { id: 2, title: 'Company Details', icon: <BuildingIcon /> },
    { id: 3, title: 'Consultation Needs', icon: <CheckIcon /> },
    { id: 4, title: 'Schedule Meeting', icon: <CalendarIcon /> },
  ];

  const companyOptions = [
    '1-10 employees',
    '11-50 employees', 
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const industryOptions = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Non-profit',
    'Government',
    'Other'
  ];

  const consultationTypes = [
    'Team Building Strategy',
    'Leadership Development',
    'Remote Team Engagement',
    'Corporate Training',
    'Event Planning',
    'Culture Transformation',
    'Performance Improvement',
    'Custom Solution'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  const durations = [
    '30 minutes',
    '45 minutes', 
    '60 minutes',
    '90 minutes'
  ];

  const timezones = [
    'UTC-12:00 - Baker Island Time',
    'UTC-11:00 - Hawaii-Aleutian Standard Time',
    'UTC-10:00 - Hawaii-Aleutian Time',
    'UTC-09:00 - Alaska Time',
    'UTC-08:00 - Pacific Time (US & Canada)',
    'UTC-07:00 - Mountain Time (US & Canada)',
    'UTC-06:00 - Central Time (US & Canada)',
    'UTC-05:00 - Eastern Time (US & Canada)',
    'UTC-04:00 - Atlantic Time (Canada)',
    'UTC-03:00 - Brazil Time',
    'UTC-02:00 - Mid-Atlantic Time',
    'UTC-01:00 - Azores Time',
    'UTC+00:00 - Greenwich Mean Time (GMT)',
    'UTC+01:00 - Central European Time',
    'UTC+02:00 - Eastern European Time',
    'UTC+03:00 - Moscow Time',
    'UTC+04:00 - Gulf Standard Time',
    'UTC+05:00 - Pakistan Standard Time',
    'UTC+05:30 - India Standard Time',
    'UTC+06:00 - Bangladesh Standard Time',
    'UTC+07:00 - Indochina Time',
    'UTC+08:00 - China Standard Time',
    'UTC+09:00 - Japan Standard Time',
    'UTC+10:00 - Australian Eastern Time',
    'UTC+11:00 - Solomon Islands Time',
    'UTC+12:00 - New Zealand Standard Time'
  ];

  // Team size ranges
  const teamSizeRanges = [
    '0 - 50 people',
    '51 - 100 people',
    '101 - 150 people', 
    '151 - 200 people',
    '201 - 300 people',
    '300+ people'
  ];

  // Budget ranges per person in INR
  const budgetRanges = [
    '₹500 - ₹1,000 per person',
    '₹1,001 - ₹2,000 per person',
    '₹2,001 - ₹3,500 per person',
    '₹3,501 - ₹5,000 per person',
    '₹5,001 - ₹7,500 per person',
    '₹7,501 - ₹10,000 per person',
    '₹10,000+ per person'
  ];

  // Get minimum and maximum dates for date picker
  const getDateLimits = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 1); // Start from tomorrow
    
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() + 2); // Up to 2 years from today
    
    return {
      min: minDate.toISOString().split('T')[0],
      max: maxDate.toISOString().split('T')[0]
    };
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
        break;
      case 2:
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.companySize) newErrors.companySize = 'Company size is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        break;
      case 3:
        if (!formData.consultationType) newErrors.consultationType = 'Consultation type is required';
        if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
        if (!formData.challenges.trim()) newErrors.challenges = 'Please describe your challenges';
        if (!formData.goals.trim()) newErrors.goals = 'Please describe your goals';
        break;
      case 4:
        if (!formData.preferredDate) {
          newErrors.preferredDate = 'Please select a date';
        } else {
          // Check if selected date is a weekend
          const selectedDate = new Date(formData.preferredDate);
          const dayOfWeek = selectedDate.getDay();
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            newErrors.preferredDate = 'Please select a weekday (Monday-Friday)';
          }
        }
        if (!formData.preferredTime) newErrors.preferredTime = 'Please select a time';
        if (!formData.timezone) newErrors.timezone = 'Please select your timezone';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      const response = await formTrackingService.submitForm(
        'expert-consultation',
        formData,
        {
          formStepsCompleted: 4,
          totalFormSteps: 4
        }
      );
      
      setFormResponse(response);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormResponse({
        success: false,
        reference_id: '',
        message: 'There was an error submitting your consultation request. Please try again or contact us directly.'
      });
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Neumorphism styles
  const neumorphicCard = "bg-gray-100 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] rounded-3xl";
  const neumorphicInset = "bg-gray-100 shadow-[inset_20px_20px_60px_#bebebe,inset_-20px_-20px_60px_#ffffff] rounded-2xl";
  const neumorphicButton = "bg-gray-100 shadow-[8px_8px_20px_#bebebe,-8px_-8px_20px_#ffffff] hover:shadow-[4px_4px_10px_#bebebe,-4px_-4px_10px_#ffffff] rounded-xl transition-all duration-300";

  if (submitSuccess && formResponse) {
    return (
      <>
        <Helmet>
          <title>Consultation Booked Successfully | Trebound</title>
        </Helmet>
        <div className="min-h-screen bg-gray-100 py-12">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <FormSuccessMessage 
              response={formResponse}
              onClose={() => window.location.href = '/'}
              showCloseButton={true}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Expert Consultation - Team Building Strategy | Trebound</title>
        <meta 
          name="description" 
          content="Book a free consultation with our team building experts. Get personalized strategies and solutions for your team's success."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-100">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-20 pb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              >
                Expert <span className="text-emerald-600">Consultation</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Get personalized strategies from our team building experts. Book a free consultation 
                to discover how we can transform your team's performance and culture.
              </motion.p>
            </div>

            {/* Progress Bar */}
            <div className={`max-w-4xl mx-auto mb-12 p-6 ${neumorphicCard}`}>
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                      currentStep >= step.id 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-1 mx-4 rounded transition-all duration-300 ${
                        currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Step {currentStep}: {steps[currentStep - 1].title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {currentStep}/4 - Complete all steps to book your consultation
                </p>
              </div>
            </div>

            {/* Form */}
            <div className={`max-w-4xl mx-auto p-8 ${neumorphicCard}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                            placeholder="Enter your first name"
                          />
                          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                            placeholder="Enter your last name"
                          />
                          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          placeholder="Enter your email address"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                            placeholder="+1 (555) 123-4567"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title *
                          </label>
                          <input
                            type="text"
                            value={formData.jobTitle}
                            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                            placeholder="e.g., HR Manager, CEO, Team Lead"
                          />
                          {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Company Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Information</h2>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          placeholder="Enter your company name"
                        />
                        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Size *
                          </label>
                          <select
                            value={formData.companySize}
                            onChange={(e) => handleInputChange('companySize', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          >
                            <option value="">Select company size</option>
                            {companyOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Industry *
                          </label>
                          <select
                            value={formData.industry}
                            onChange={(e) => handleInputChange('industry', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          >
                            <option value="">Select industry</option>
                            {industryOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location *
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          placeholder="City, State/Country"
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Consultation Needs */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Consultation Needs</h2>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type of Consultation *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {consultationTypes.map(type => (
                            <label key={type} className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                              formData.consultationType === type 
                                ? 'bg-emerald-100 border-2 border-emerald-500' 
                                : `${neumorphicInset} hover:shadow-md`
                            }`}>
                              <input
                                type="radio"
                                value={type}
                                checked={formData.consultationType === type}
                                onChange={(e) => handleInputChange('consultationType', e.target.value)}
                                className="sr-only"
                              />
                              <span className="text-gray-800 font-medium">{type}</span>
                            </label>
                          ))}
                        </div>
                        {errors.consultationType && <p className="text-red-500 text-sm mt-1">{errors.consultationType}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Team Size *
                          </label>
                          <select
                            value={formData.teamSize}
                            onChange={(e) => handleInputChange('teamSize', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          >
                            <option value="">Select team size</option>
                            {teamSizeRanges.map(range => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                          {errors.teamSize && <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Budget Range (Per Person)
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          >
                            <option value="">Select budget per person</option>
                            {budgetRanges.map(range => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timeframe
                          </label>
                          <select
                            value={formData.timeframe}
                            onChange={(e) => handleInputChange('timeframe', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          >
                            <option value="">Select timeframe</option>
                            <option value="asap">ASAP</option>
                            <option value="1-month">Within 1 month</option>
                            <option value="3-months">Within 3 months</option>
                            <option value="6-months">Within 6 months</option>
                            <option value="exploring">Just exploring</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Challenges *
                        </label>
                        <textarea
                          value={formData.challenges}
                          onChange={(e) => handleInputChange('challenges', e.target.value)}
                          rows={4}
                          className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800 resize-none`}
                          placeholder="Describe the main challenges your team is facing..."
                        />
                        {errors.challenges && <p className="text-red-500 text-sm mt-1">{errors.challenges}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Desired Outcomes *
                        </label>
                        <textarea
                          value={formData.goals}
                          onChange={(e) => handleInputChange('goals', e.target.value)}
                          rows={4}
                          className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800 resize-none`}
                          placeholder="What specific outcomes are you hoping to achieve?"
                        />
                        {errors.goals && <p className="text-red-500 text-sm mt-1">{errors.goals}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Previous Team Building Experience
                        </label>
                        <textarea
                          value={formData.previousExperience}
                          onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                          rows={3}
                          className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800 resize-none`}
                          placeholder="Tell us about any previous team building activities or initiatives..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Schedule Meeting */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule Your Consultation</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                            min={getDateLimits().min}
                            max={getDateLimits().max}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100`}
                          />
                          {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Time *
                          </label>
                          <select
                            value={formData.preferredTime}
                            onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          >
                            <option value="">Select a time</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                          {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Timezone *
                          </label>
                          <select
                            value={formData.timezone}
                            onChange={(e) => handleInputChange('timezone', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          >
                            <option value="">Select your timezone</option>
                            {timezones.map(timezone => (
                              <option key={timezone} value={timezone}>{timezone}</option>
                            ))}
                          </select>
                          {errors.timezone && <p className="text-red-500 text-sm mt-1">{errors.timezone}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meeting Duration *
                          </label>
                          <select
                            value={formData.duration}
                            onChange={(e) => handleInputChange('duration', e.target.value)}
                            className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800`}
                          >
                            <option value="">Select duration</option>
                            {durations.map(duration => (
                              <option key={duration} value={duration}>{duration}</option>
                            ))}
                          </select>
                          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Information
                        </label>
                        <textarea
                          value={formData.additionalInfo}
                          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                          rows={4}
                          className={`w-full p-4 ${neumorphicInset} border-0 focus:ring-0 focus:outline-none text-gray-800 resize-none`}
                          placeholder="Any additional information you'd like our expert to know before the consultation..."
                        />
                      </div>

                      <div className={`p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50`}>
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.marketingConsent}
                            onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                            className="mt-1 w-5 h-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">
                            I agree to receive marketing communications from Trebound about team building 
                            solutions and upcoming events. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentStep === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : `text-gray-700 ${neumorphicButton} hover:text-gray-900`
                  }`}
                >
                  Previous
                </button>

                <div className="text-sm text-gray-500">
                  {currentStep} of {steps.length}
                </div>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className={`px-8 py-3 text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl font-medium transition-all duration-300 ${neumorphicButton}`}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-3 text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl font-medium transition-all duration-300 ${neumorphicButton} ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Booking...</span>
                      </div>
                    ) : (
                      'Book Consultation'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 text-center ${neumorphicCard}`}>
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserIcon />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Guidance</h3>
                  <p className="text-gray-600 text-sm">
                    Get personalized advice from certified team building professionals
                  </p>
                </div>

                <div className={`p-6 text-center ${neumorphicCard}`}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Customized Solutions</h3>
                  <p className="text-gray-600 text-sm">
                    Receive tailored recommendations based on your specific needs
                  </p>
                </div>

                <div className={`p-6 text-center ${neumorphicCard}`}>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClockIcon />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Free Consultation</h3>
                  <p className="text-gray-600 text-sm">
                    No cost, no commitment - just valuable insights for your team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ExpertConsultation; 