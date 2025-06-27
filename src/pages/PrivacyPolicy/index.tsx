import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
  const [contentRef, contentInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy | Trebound</title>
        <meta 
          name="description" 
          content="Read Trebound's privacy policy to understand how we collect, use, and protect your personal information." 
        />
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-gradient-to-br from-[#002B4F] to-[#001F3F]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#002B4F] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002B4F]/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90"
            >
              Last updated: 22nd March 2025
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-gray-600 mb-8">
                At Trebound, accessible from wwww.trebound.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Trebound and how we use it.
              </p>

              <p className="text-gray-600 mb-8">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              </p>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">Consent</h2>
              <p className="text-gray-600 mb-8">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">Information we collect</h2>
              <p className="text-gray-600 mb-8">
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>

              <p className="text-gray-600 mb-8">
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>

              <p className="text-gray-600 mb-8">
                When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
              </p>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">How we use your information</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-8">
                <li className="mb-2">Provide, operate, and maintain our website</li>
                <li className="mb-2">Improve, personalize, and expand our website</li>
                <li className="mb-2">Understand and analyze how you use our website</li>
                <li className="mb-2">Develop new products, services, features, and functionality</li>
                <li className="mb-2">Communicate with you for customer service, updates, and marketing</li>
                <li className="mb-2">Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">Log Files</h2>
              <p className="text-gray-600 mb-8">
                Trebound follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
              </p>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">Cookies and Web Beacons</h2>
              <p className="text-gray-600 mb-8">
                Like any other website, Trebound uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">GDPR Data Protection Rights</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-8">
                <li className="mb-2">The right to access – You have the right to request copies of your personal data.</li>
                <li className="mb-2">The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li className="mb-2">The right to erasure – You have the right to request that we erase your personal data.</li>
                <li className="mb-2">The right to restrict processing – You have the right to request that we restrict the processing of your personal data.</li>
                <li className="mb-2">The right to object to processing – You have the right to object to our processing of your personal data.</li>
                <li>The right to data portability – You have the right to request that we transfer your data to another organization.</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">Children's Information</h2>
              <p className="text-gray-600 mb-8">
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Trebound does not knowingly collect any Personal Identifiable Information from children under the age of 13.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage; 