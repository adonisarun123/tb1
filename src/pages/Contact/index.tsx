import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle, FiSend, FiCheck, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet-async';
import LazyImage from '../../components/LazyImage';

const ContactPage: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [officesRef, officesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [faqRef, faqInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '',
    eventType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const offices = [
    {
      city: 'Bangalore',
      address: 'No 10, 5th B Cross, Sharadamba Nagar, Jalahalli, Bangalore 560013',
      phone: '080952 04666',
      email: 'connect@trebound.com',
      image: '/images/bangalore city.jpg',
      timezone: 'IST (UTC+5:30)',
      hours: '9:00 AM - 6:00 PM'
    },
    {
      city: 'Hyderabad',
      address: '3rd Floor, Door No- 1-60/8/A & B, KNR Square, Kondapur, Opp. The Platina, Gachibowli, Hyderabad, Rangareddy, Telangana, 500032',
      phone: '080952 04666',
      email: 'connect@trebound.com',
      image: '/images/Hyderabad.jpg',
      timezone: 'IST (UTC+5:30)',
      hours: '9:00 AM - 6:00 PM'
    },
    {
      city: 'Pune',
      address: 'Ground Floor, Office No- A5, Suite No- 149, Survey Number- 16/2, Shree, Swapnamandir Society Pune, NEAR- Spearhead Academy, Erandwane, Pune, Pune, Maharashtra, 411004',
      phone: '080952 04666',
      email: 'connect@trebound.com',
      image: '/images/mumbai.jpg',
      timezone: 'IST (UTC+5:30)',
      hours: '9:00 AM - 6:00 PM'
    },
    {
      city: 'Goa',
      address: 'N- 66, Wisdomlab Desk No- 94, Wisdomlab, Phase- IV, Verna Industrial Estate, Chicalim, South Goa, Goa, 403722',
      phone: '080952 04666',
      email: 'connect@trebound.com',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
      timezone: 'IST (UTC+5:30)',
      hours: '9:00 AM - 6:00 PM'
    },
    {
      city: 'Gurugram',
      address: '2nd, Plot No 4, Minarch Overseas Pvt Ltd, Minarch Tower, Infrapro Spaces Coworking Space, Sector 44, Gurugram, Gurugram, Haryana, 122003',
      phone: '080952 04666',
      email: 'connect@trebound.com',
      image: '/images/corporate.jpg',
      timezone: 'IST (UTC+5:30)',
      hours: '9:00 AM - 6:00 PM'
    },
    {
      city: 'Jodhpur',
      address: 'Desk-E-137, J1-371, Phase-II, RIICO Sangaria Industrial Area, Jodhpur, Jodhpur, Rajasthan, 342013',
      phone: '080952 04666',
      email: 'connect@trebound.com',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80',
      timezone: 'IST (UTC+5:30)',
      hours: '9:00 AM - 6:00 PM'
    }
  ];

  const faqs = [
    {
      question: 'How far in advance should we book?',
      answer: 'We recommend booking at least 2-3 weeks in advance for best availability, though we can often accommodate shorter notice requests.'
    },
    {
      question: 'What is included in the pricing?',
      answer: 'Our pricing includes activity facilitation, materials, venue coordination (if needed), and full event support. Travel costs may apply for certain locations.'
    },
    {
      question: 'Can you accommodate remote teams?',
      answer: 'Absolutely! We offer a wide range of virtual team building activities designed specifically for remote and hybrid teams.'
    },
    {
      question: 'What if we need to reschedule?',
      answer: 'We understand plans change. We offer flexible rescheduling options with advance notice, subject to availability.'
    }
  ];

  const benefits = [
    {
      icon: FiUsers,
      title: 'Expert Consultation',
      description: 'Free 30-minute consultation to understand your team\'s needs'
    },
    {
      icon: FiTrendingUp,
      title: 'Custom Solutions',
      description: 'Tailored activities designed for your specific goals'
    },
    {
      icon: FiAward,
      title: 'Proven Results',
      description: '98% client satisfaction with measurable team improvements'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Trebound | Get Free Team Building Consultation</title>
        <meta 
          name="description" 
          content="Contact Trebound for your team building needs. Get a free consultation and custom quote. Available in Bangalore, Hyderabad, Pune, Goa, Gurugram, Jodhpur. Call 080952 04666 or email us."
        />
        <meta name="keywords" content="contact trebound, team building consultation, corporate events, team outing booking" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=80"
              alt="Contact us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-indigo-900/80 to-purple-900/85"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={heroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Let's Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Magic</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                  Ready to transform your team? Get a free consultation and discover the perfect activities for your next team building event.
                </p>
                
                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      animate={heroInView ? { x: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <benefit.icon className="text-white text-xl" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{benefit.title}</div>
                        <div className="text-blue-100 text-sm">{benefit.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Contact */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:08095204666"
                    className="flex items-center justify-center space-x-2 bg-white text-[#FF4C39] px-6 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    <FiPhone className="text-lg" />
                    <span>Call Now</span>
                  </a>
                  <a 
                    href="mailto:connect@trebound.com"
                    className="flex items-center justify-center space-x-2 border-2 border-white text-white px-6 py-4 rounded-full font-semibold hover:bg-white hover:text-[#FF4C39] transition-colors"
                  >
                    <FiMail className="text-lg" />
                    <span>Email Us</span>
                  </a>
                </div>
              </motion.div>

              {/* Right Content - Contact Form */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={heroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
              >
                {!isSubmitted ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Free Consultation</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Your company"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="080952 04666"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                          <select
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          >
                            <option value="">Select team size</option>
                            <option value="10-25">10-25 people</option>
                            <option value="25-50">25-50 people</option>
                            <option value="50-100">50-100 people</option>
                            <option value="100+">100+ people</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                          <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          >
                            <option value="">Select event type</option>
                            <option value="corporate-event-management">Corporate Event Management</option>
                            <option value="venue-booking">Venue Booking</option>
                            <option value="corporate-gifting">Corporate Gifting</option>
                            <option value="management-offsite">Management Offsite</option>
                            <option value="campus-to-corporate">Campus to Corporate</option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                          placeholder="Tell us about your team and what you're looking to achieve..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FiSend className="text-lg" />
                            <span>Get Free Consultation</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      We've received your message and will get back to you within 24 hours with a custom proposal.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#FF4C39] hover:text-[#FF4C39] font-medium"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Office Locations */}
        <motion.div 
          ref={officesRef}
          initial={{ opacity: 0 }}
          animate={officesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">Offices</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're here to serve you across major cities in India with local expertise and support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={officesInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    {/* City Image */}
                    <div className="relative h-48 overflow-hidden">
                      <LazyImage
                        src={office.image}
                        alt={office.city}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-2xl font-bold text-white">{office.city}</h3>
                      </div>
                    </div>

                    {/* Office Details */}
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <FiMapPin className="text-[#FF4C39] text-lg mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Address</div>
                            <div className="text-gray-600">{office.address}</div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <FiPhone className="text-[#FF4C39] text-lg mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Phone</div>
                            <a href={`tel:${office.phone}`} className="text-[#FF4C39] hover:text-[#FF4C39]">
                              {office.phone}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <FiMail className="text-[#FF4C39] text-lg mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Email</div>
                            <a href={`mailto:${office.email}`} className="text-[#FF4C39] hover:text-[#FF4C39]">
                              {office.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <FiClock className="text-[#FF4C39] text-lg mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Business Hours</div>
                            <div className="text-gray-600">{office.hours}</div>
                            <div className="text-sm text-gray-500">{office.timezone}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          ref={faqRef}
          initial={{ opacity: 0 }}
          animate={faqInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20 bg-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">Questions</span>
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions about our team building services.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={faqInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                    <FiMessageCircle className="text-[#FF4C39] text-xl mr-3 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-9 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Our team building experts are here to help you create the perfect experience for your team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:08095204666"
                  className="bg-white text-[#FF4C39] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center space-x-2"
                >
                  <FiPhone className="text-lg" />
                  <span>Call 080952 04666</span>
                </a>
                <a 
                  href="mailto:connect@trebound.com"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#FF4C39] transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <FiMail className="text-lg" />
                  <span>Email connect@trebound.com</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage; 