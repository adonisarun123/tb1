import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TermsAndConditionsPage: React.FC = () => {
  const [contentRef, contentInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Terms and Conditions | Trebound</title>
        <meta 
          name="description" 
          content="Read Trebound's terms and conditions to understand the rules and regulations for using our services." 
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
              Terms and Conditions
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
                Welcome to <strong>Trebound</strong>!
              </p>

              <p className="text-gray-600 mb-8">
                These terms and conditions outline the rules and regulations for the use of Trebound's Website, located at wwww.trebound.com.
              </p>

              <p className="text-gray-600 mb-8">
                By accessing this website we assume you accept these terms and conditions. Do not continue to use Trebound if you do not agree to take all of the terms and conditions stated on this page.
              </p>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">Cookies</h2>
              <p className="text-gray-600 mb-8">
                We employ the use of cookies. By accessing Trebound, you agreed to use cookies in agreement with the Trebound's Privacy Policy.
              </p>
              <p className="text-gray-600 mb-8">
                Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
              </p>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">License</h2>
              <p className="text-gray-600 mb-8">
                Unless otherwise stated, Trebound and/or its licensors own the intellectual property rights for all material on Trebound. All intellectual property rights are reserved. You may access this from Trebound for your own personal use subjected to restrictions set in these terms and conditions.
              </p>

              <p className="text-gray-600 mb-4">You must not:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-8">
                <li className="mb-2">Republish material from Trebound</li>
                <li className="mb-2">Sell, rent or sub-license material from Trebound</li>
                <li className="mb-2">Reproduce, duplicate or copy material from Trebound</li>
                <li>Redistribute content from Trebound</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">Hyperlinking to our Content</h2>
              <p className="text-gray-600 mb-8">
                The following organizations may link to our Website without prior written approval:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-8">
                <li className="mb-2">Government agencies</li>
                <li className="mb-2">Search engines</li>
                <li className="mb-2">News organizations</li>
                <li className="mb-2">Online directory distributors</li>
                <li>System wide Accredited Businesses</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">Content Liability</h2>
              <p className="text-gray-600 mb-8">
                We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
              </p>

              <h2 className="text-3xl font-bold text-[#002B4F] mb-6">Disclaimer</h2>
              <p className="text-gray-600 mb-8">
                To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-8">
                <li className="mb-2">limit or exclude our or your liability for death or personal injury;</li>
                <li className="mb-2">limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li className="mb-2">limit any of our or your liabilities in any way that is not permitted under applicable law;</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
              </ul>

              <p className="text-gray-600 mb-8">
                As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
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

export default TermsAndConditionsPage; 