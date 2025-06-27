import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { FiCheck } from 'react-icons/fi';
import { BsGlobe2, BsLightbulb, BsPeople, BsShield } from 'react-icons/bs';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabaseClient';
import { webhookService } from '../../lib/webhookService';

const steps = [
  {
    number: 1,
    title: 'Fill Out the Partner Registration Form',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="url(#iconGradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="iconGradient1" x1="5" y1="12" x2="19" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4C39"/>
            <stop offset="1" stopColor="#FFB573"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    number: 2,
    title: 'Our Team Reviews Your Application',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="url(#iconGradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="iconGradient2" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4C39"/>
            <stop offset="1" stopColor="#FFB573"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    number: 3,
    title: 'Begin Your Journey with Trebound!',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15H12.01M12 12V12.01M12 9V9.01M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="url(#iconGradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="iconGradient3" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4C39"/>
            <stop offset="1" stopColor="#FFB573"/>
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

// interface ContactForm { // Removed unused interface
//   name: string;
//   workEmail: string;
//   phoneNumber: string;
//   numberOfPax: string;
//   preferredDestination: string;
//   activity_type: ActivityType;
//   more_details: string;
// }

interface PartnerFormData {
  companyName: string;
  website: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  companyType: string;
  employeeCount: string;
  yearsInBusiness: string;
  servicesOffered: string[];
  message: string;
}

const GlobalPartnerRegistration = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<PartnerFormData>({
    companyName: '',
    website: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    companyType: '',
    employeeCount: '',
    yearsInBusiness: '',
    servicesOffered: [],
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const services = prev.servicesOffered;
      if (checked) {
        return { ...prev, servicesOffered: [...services, value] };
      } else {
        return { ...prev, servicesOffered: services.filter(service => service !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.companyName.trim() || !formData.firstName.trim() || !formData.lastName.trim() || 
        !formData.email.trim() || !formData.phone.trim() || !formData.country.trim() || 
        !formData.city.trim() || !formData.companyType.trim() || formData.servicesOffered.length === 0) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Send to n8n webhook (non-blocking)
      try {
        const webhookData = webhookService.preparePartnerRegistrationData({
          company_name: formData.companyName.trim(),
          website: formData.website.trim(),
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          country: formData.country.trim(),
          city: formData.city.trim(),
          company_type: formData.companyType.trim(),
          employee_count: formData.employeeCount.trim(),
          years_in_business: formData.yearsInBusiness.trim(),
          services_offered: formData.servicesOffered,
          message: formData.message.trim()
        });
        
        // Send to webhook without waiting for response (fire and forget)
        webhookService.sendToWebhook(webhookData).catch(error => {
          console.error('N8N webhook failed (non-blocking):', error);
        });
      } catch (webhookError) {
        console.error('Error preparing webhook data (non-blocking):', webhookError);
      }

      const { error: supabaseError } = await supabase
        .from('partner_registrations')
        .insert([{
          company_name: formData.companyName.trim(),
          website: formData.website.trim() || null,
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          country: formData.country.trim(),
          city: formData.city.trim(),
          company_type: formData.companyType.trim(),
          employee_count: formData.employeeCount.trim() || null,
          years_in_business: formData.yearsInBusiness.trim() || null,
          services_offered: formData.servicesOffered,
          message: formData.message.trim() || null,
          status: 'pending'
        }]);

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        throw new Error(supabaseError.message || 'Failed to submit registration');
      }

      setSuccess(true);
      setFormData({
        companyName: '',
        website: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        companyType: '',
        employeeCount: '',
        yearsInBusiness: '',
        servicesOffered: [],
        message: ''
      });
      // Redirect to thank you page after successful submission
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 2000);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err instanceof Error ? err.message : 'Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Global Partner Registration | Join Trebound's Partner Network</title>
        <meta 
          name="description" 
          content="Join Trebound's global partner network. Register your company to become a partner and grow your business with us. Access exclusive resources and opportunities."
        />
      </Helmet>

      <Navbar />

      {/* Hero Section with adjusted padding */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-[#002B4F] to-[#0F4C75] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover opacity-20"
            style={{
              backgroundImage: "url('/images/global.jpg')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002B4F]/90 via-[#002B4F]/80 to-[#0F4C75]/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 pt-4"
            >
              Join Our Global Partner Network
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            >
              Partner with Trebound to expand your reach and create exceptional team building experiences
            </motion.p>
          </div>
        </div>
      </section>

      {/* Why Partner with Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">
              Why Partner with Us?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BsGlobe2 className="w-8 h-8" />,
                title: "Strong Network",
                description: "Join our collaborative network to share insights on event delivery, pricing strategies, and marketing techniques. Connect with global clients and industry leaders."
              },
              {
                icon: <BsPeople className="w-8 h-8" />,
                title: "Global Product Collaboration",
                description: "Share and access a diverse portfolio of activities and games, making us collectively the biggest player in the market."
              },
              {
                icon: <BsLightbulb className="w-8 h-8" />,
                title: "Product Development",
                description: "Benefit from our dedicated team of young product developers who continuously create interesting & unique activities."
              },
              {
                icon: <BsShield className="w-8 h-8" />,
                title: "Integrity and Trust",
                description: "Build long-term relationships based on trust and integrity, ensuring sustainable business growth and success."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#FF4C39]/10 to-[#FFB573]/10 rounded-full flex items-center justify-center text-[#FF4C39]">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-[#002B4F] mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section ref={ref} id="register" className="py-16 bg-white">
        <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="relative rounded-[20px] border border-[#eeeeee] p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side content (Benefits) */}
              <div className="flex-1 max-w-[480px]">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="block text-sm md:text-base font-medium font-['DM Sans'] text-[#636363] mb-2"
                >
                  Get Started
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl md:text-[48px] font-semibold font-['Inter'] leading-tight bg-gradient-to-b from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent mb-10"
                >
                  Become a Partner
                </motion.h2>

                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="flex items-start gap-4 group hover:bg-[#faf9f6] p-4 rounded-xl transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-[#616161] text-base font-medium font-['DM Sans'] leading-tight">
                          Step {step.number}
                        </div>
                        <div className="text-[#313131] text-xl font-semibold font-['DM Sans'] leading-relaxed mt-1">
                          {step.title}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
                {/* Right Side - Form or Success Message */}
              <div className="w-full lg:w-[480px]">
                  {success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center bg-green-50 p-8 rounded-lg shadow-md"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheck className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                      <p className="text-gray-600">Your partner registration has been submitted successfully. We will review your application and get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-[#fafafa] rounded-[16px] p-8"
                    >
                      <div className="text-[#717171] text-base font-medium font-['DM Sans'] mb-8">
                        To start the conversation, please fill in the form
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Company Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="companyName" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Company Name</label>
                            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                          </div>
                          <div>
                            <label htmlFor="website" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Website</label>
                            <input type="url" id="website" name="website" value={formData.website} onChange={handleInputChange} className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                          </div>
                        </div>

                        {/* Contact Person */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                          </div>
                        </div>

                        {/* Contact Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="email" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                          </div>
                          </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="country" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Country</label>
                            <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} required className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                          </div>
                          <div>
                            <label htmlFor="city" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">City</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                              </div>
                        </div>

                        {/* Company Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="companyType" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Company Type</label>
                            <select id="companyType" name="companyType" value={formData.companyType} onChange={handleInputChange} required className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39] appearance-none pr-8">
                              <option value="">Select Type</option>
                              <option value="agency">Agency</option>
                              <option value="facilitator">Facilitator</option>
                              <option value="venue">Venue</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="employeeCount" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Employee Count</label>
                            <input type="number" id="employeeCount" name="employeeCount" value={formData.employeeCount} onChange={handleInputChange} min="1" className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                          </div>
                          <div>
                            <label htmlFor="yearsInBusiness" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Years in Business</label>
                            <input type="number" id="yearsInBusiness" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleInputChange} min="0" className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39]" />
                            </div>
                          </div>

                        {/* Services Offered */}
                        <div>
                          <label className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Services Offered</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Team Building Activities', 'Venue Provider', 'Event Management', 'Corporate Training', 'Travel Services', 'Other'].map(service => (
                              <div key={service} className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id={`service-${service.toLowerCase().replace(/ /g, '-')}`} 
                                  name="servicesOffered" 
                                  value={service} 
                                  checked={formData.servicesOffered.includes(service)}
                                  onChange={handleCheckboxChange} 
                                  className="h-4 w-4 text-[#FF4C39] focus:ring-[#FFB573] border-gray-300 rounded"
                                />
                                <label htmlFor={`service-${service.toLowerCase().replace(/ /g, '-')}`} className="ml-2 block text-sm text-gray-700">{service}</label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">Message (Optional)</label>
                          <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 bg-white border border-[#e2e2e2] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#ff4c39] resize-none" />
                        </div>

                        {error && (
                          <div className="text-red-500 text-sm font-['DM Sans']">{error}</div>
                        )}

                        <div className="flex justify-center pt-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-[45px] relative rounded-[8px] border border-[#979797] group overflow-hidden hover:border-transparent transition-colors duration-300 disabled:opacity-50"
                          >
                            <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 text-[#979797] text-base font-medium font-['DM Sans'] group-hover:text-white transition-colors duration-300">
                              {loading ? 'Submitting...' : 'Submit Registration'}
                            </span>
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GlobalPartnerRegistration; 