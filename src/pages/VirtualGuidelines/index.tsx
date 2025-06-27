import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { BsCheck2Circle, BsXCircle, BsLaptop, BsHeadphones, BsMic, BsCameraVideo, BsWifi, BsPeople } from 'react-icons/bs';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';

const VirtualGuidelinesPage: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Virtual Team Building Guidelines | Trebound</title>
        <meta 
          name="description" 
          content="Essential guidelines for Trebound's virtual team building programs. Learn what to do and what not to do for the best virtual team experience."
        />
      </Helmet>

      <Navbar />

      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-r from-[#002B4F] to-[#0F4C75] overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="w-full h-full object-cover opacity-30"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage: "url('/images/virtual-guidelines.jpg')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002B4F]/90 via-[#002B4F]/80 to-[#0F4C75]/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm md:text-base font-medium mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
            >
              Virtual Team Building Guidelines
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Virtual Program Do's & Don'ts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            >
              Make the most of your virtual team building experience with these essential guidelines
            </motion.p>
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Technical Requirements Section */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">Technical Requirements</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BsLaptop />,
                  title: "Device",
                  description: "Laptop/Desktop with webcam (Mobile phones are not recommended as they limit interaction)"
                },
                {
                  icon: <BsHeadphones />,
                  title: "Audio",
                  description: "Good quality headphones with microphone for clear communication"
                },
                {
                  icon: <BsWifi />,
                  title: "Internet",
                  description: "Stable internet connection with minimum 2 Mbps speed"
                },
                {
                  icon: <BsCameraVideo />,
                  title: "Camera",
                  description: "Working webcam for better engagement and interaction"
                },
                {
                  icon: <BsMic />,
                  title: "Microphone",
                  description: "Clear microphone (built-in or external) for smooth communication"
                },
                {
                  icon: <BsPeople />,
                  title: "Environment",
                  description: "Quiet room/space with minimal background noise and distractions"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center mb-6">
                      <div className="flex items-center justify-center w-full h-full text-[#FF4C39] text-lg">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#002B4F] mb-3 text-center">{item.title}</h3>
                    <p className="text-gray-600 text-center text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Do's Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">Do's</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Join the session 10 minutes prior to the scheduled time to test your audio and video",
                "Keep your video ON throughout the session for better engagement",
                "Use headphones to avoid echo and background noise",
                "Ensure you are in a quiet environment with minimal distractions",
                "Keep yourself on mute when not speaking to avoid background noise",
                "Be actively involved in discussions and activities"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0">
                    <BsCheck2Circle className="w-6 h-6 text-[#FF4C39]" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Don'ts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">Don'ts</h2>
              <div className="w-24 h-1 bg-red-500 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Don't use mobile phones as they limit interaction and visibility",
                "Don't multitask or get distracted during the session",
                "Don't share meeting links or passwords with unauthorized participants",
                "Don't record the session without prior permission",
                "Don't leave the session without informing the facilitator"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-red-500"
                >
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <BsXCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hashtag Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-24 py-12 px-6 rounded-2xl bg-gradient-to-r from-[#002B4F] to-[#0F4C75]"
          >
            <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">
              #VIRTUALTEAMBUILDINGEXPERTS
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact-form">
        <ContactSection />
      </div>
    </div>
  );
};

export default VirtualGuidelinesPage; 