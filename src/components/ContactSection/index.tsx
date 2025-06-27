import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useRef } from 'react';
import { useContactSubmission } from '../../lib/hooks/useSupabaseData';
import { addGCLIDToFormData, populateGCLIDFields, trackConversion } from '../../lib/gclid';
import type { ActivityType } from '../../lib/supabaseClient';

const steps = [
  {
    number: 1,
    title: 'Explore Our Extensive Experience Catalog',
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
    title: 'Get in Touch with the Trebound Team',
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
    title: 'Dive into Your Customized Adventure!',
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

interface ContactSectionProps {
  autoFocusName?: boolean;
}

const ContactSection = ({ autoFocusName = false }: ContactSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    work_email: '',
    preferred_destination: '',
    phone: '',
    number_of_pax: '',
    more_details: '',
    activity_type: 'exploring' as ActivityType
  });

  const { submit, loading, error, success } = useContactSubmission();

  // Auto-populate GCLID fields when form loads
  useEffect(() => {
    if (formRef.current) {
      populateGCLIDFields(formRef.current);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.work_email.trim() || !formData.phone.trim() || !formData.preferred_destination.trim() || !formData.number_of_pax) {
      console.error('Missing required fields');
      return;
    }

    const pageUrl = window.location.href;
    const pageHeading = document.title;

    // Prepare form data with GCLID and UTM parameters
    const baseFormData = {
      name: formData.name.trim(),
      work_email: formData.work_email.trim(),
      preferred_destination: formData.preferred_destination.trim(),
      phone: formData.phone.trim(),
      number_of_pax: parseInt(formData.number_of_pax),
      more_details: formData.more_details.trim() || '',
      activity_type: formData.activity_type,
      page_url: pageUrl,
      page_heading: pageHeading
    };

    // Add GCLID and UTM parameters for Google Ads tracking
    const formDataWithTracking = addGCLIDToFormData(baseFormData);

    console.log('📝 Form submission with tracking data:', formDataWithTracking);

    try {
      await submit(formDataWithTracking as any); // Type assertion to handle additional tracking fields
      
      // Track conversion in Google Ads
      trackConversion('contact_form_submission');
      
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
        preferred_destination: '',
        phone: '',
        number_of_pax: '',
        more_details: '',
        activity_type: 'exploring'
      });
      
      // Track successful conversion
      trackConversion('lead_generation', 1);
      
      // Redirect to thank you page
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 1000);
    }
  }, [success]);

  // Auto-focus name input when autoFocusName prop is true
  useEffect(() => {
    if (autoFocusName && nameInputRef.current) {
      // Small delay to ensure the component is rendered and scrolled to
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 500);
    }
  }, [autoFocusName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact-section" className="w-full bg-white py-12" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="relative rounded-[20px] border border-[#eeeeee] p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:justify-around items-start lg:items-start gap-12">
            {/* Left Side - Steps */}
            <div className="w-full lg:w-[45%]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="text-[#717171] text-lg font-medium font-['DM Sans'] mb-4">
                  Reach Out To Us
                </div>
                <div className="text-[#313131] text-3xl font-semibold font-['DM Sans'] leading-tight">
                  Let's Start Planning Your Amazing Experience!
                </div>
              </motion.div>

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

            {/* Right Side - Form */}
            <div className="w-full lg:w-[50%]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#fafafa] rounded-[16px] p-8"
              >
                <div className="text-[#717171] text-base font-medium font-['DM Sans'] mb-8">
                  To start the conversation, please fill in the form
                </div>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden GCLID fields - auto-populated by our GCLID system */}
                  <input type="hidden" name="gclid" />
                  <input type="hidden" name="utm_source" />
                  <input type="hidden" name="utm_medium" />
                  <input type="hidden" name="utm_campaign" />
                  
                  {/* Two-column grid for shorter inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">
                        Name
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] text-[#313131] text-base font-normal font-['DM Sans'] focus:outline-none focus:ring-1 focus:ring-[#ff4c39] focus:border-[#ff4c39] transition-all placeholder:text-[#979797]"
                      />
                    </div>
                    
                    <div className="relative">
                      <label className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        name="work_email"
                        placeholder="Enter work email"
                        value={formData.work_email}
                        onChange={handleChange}
                        required
                        className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] text-[#313131] text-base font-normal font-['DM Sans'] focus:outline-none focus:ring-1 focus:ring-[#ff4c39] focus:border-[#ff4c39] transition-all placeholder:text-[#979797]"
                      />
                    </div>
                  </div>

                  {/* Another two-column grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] text-[#313131] text-base font-normal font-['DM Sans'] focus:outline-none focus:ring-1 focus:ring-[#ff4c39] focus:border-[#ff4c39] transition-all placeholder:text-[#979797]"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">
                        Number of Participants
                      </label>
                      <input
                        type="number"
                        name="number_of_pax"
                        placeholder="Enter number"
                        value={formData.number_of_pax}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] text-[#313131] text-base font-normal font-['DM Sans'] focus:outline-none focus:ring-1 focus:ring-[#ff4c39] focus:border-[#ff4c39] transition-all placeholder:text-[#979797]"
                      />
                    </div>
                  </div>

                  {/* Full-width inputs */}
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">
                        Preferred Destination
                      </label>
                      <input
                        type="text"
                        name="preferred_destination"
                        placeholder="Enter preferred destination"
                        value={formData.preferred_destination}
                        onChange={handleChange}
                        required
                        className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] text-[#313131] text-base font-normal font-['DM Sans'] focus:outline-none focus:ring-1 focus:ring-[#ff4c39] focus:border-[#ff4c39] transition-all placeholder:text-[#979797]"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">
                        Activity Type
                      </label>
                      <div className="relative">
                        <select
                          name="activity_type"
                          value={formData.activity_type}
                          onChange={handleChange}
                          required
                          className="w-full h-[45px] px-4 bg-white border border-[#e2e2e2] rounded-[8px] text-[#313131] text-base font-normal font-['DM Sans'] focus:outline-none focus:ring-1 focus:ring-[#ff4c39] focus:border-[#ff4c39] transition-all appearance-none pr-10"
                        >
                          <option value="outbound">Outbound</option>
                          <option value="virtual">Virtual</option>
                          <option value="hybrid">Hybrid</option>
                          <option value="exploring">Just Exploring</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#979797" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-[#313131] text-sm font-medium font-['DM Sans'] mb-1.5">
                        More Details (Optional)
                      </label>
                      <textarea
                        name="more_details"
                        placeholder="Enter any additional details"
                        value={formData.more_details}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-[#e2e2e2] rounded-[8px] text-[#313131] text-base font-normal font-['DM Sans'] focus:outline-none focus:ring-1 focus:ring-[#ff4c39] focus:border-[#ff4c39] transition-all resize-none placeholder:text-[#979797]"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm font-['DM Sans']">{error}</div>
                  )}
                  {success && (
                    <div className="text-green-500 text-sm font-['DM Sans']">
                      Thank you for your submission! We'll get back to you soon.
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-[45px] relative rounded-[8px] border border-[#979797] group overflow-hidden hover:border-transparent transition-colors duration-300 disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 text-[#979797] text-base font-medium font-['DM Sans'] group-hover:text-white transition-colors duration-300">
                        {loading ? 'Submitting...' : 'Submit'}
                      </span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
