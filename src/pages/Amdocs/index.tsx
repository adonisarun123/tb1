// import { motion } from 'framer-motion'; // Removed unused import
// import { useInView } from 'react-intersection-observer'; // Removed unused import
import { Helmet } from 'react-helmet-async';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// import ContactSection from '../../components/ContactSection'; // Removed unused import
// import TeamSection from '../../components/TeamSection'; // Removed unused import
// import TestimonialsSection from '../../components/TestimonialsSection'; // Removed unused import
// import PartnersSection from '../../components/PartnersSection'; // Removed unused import
// import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection'; // Removed unused import
// import HowItWorksProcessSection from '../../components/HowItWorksProcessSection'; // Removed unused import

const AmdocsPage: React.FC = () => {
  // const [, setSelectedTab] = React.useState(0); // Removed unused variable

  // ... rest of the component code ...

  return (
    <>
      <Helmet>
        {/* ... meta tags ... */}
      </Helmet>
      <Navbar />

      {/* ... Page content likely using TeamSection, TestimonialsSection, ContactSection ... */}
      
      <Footer />
    </>
  );
};

export default AmdocsPage; 