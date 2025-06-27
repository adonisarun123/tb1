import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PageWrapper from '../../components/PageWrapper';
// Import icons
import { BsHeart, BsEmojiSmile, BsTag, BsGraphUp } from 'react-icons/bs';

// Add custom styles
const styles = {
  textShadow: {
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)'
  }
};

const CorporateGiftingPage = () => {
  const [heroRef] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [giftingRef, giftingInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Gifting Solutions | Trebound</title>
        <meta name="description" content="Discover our premium corporate gifting solutions. From customized gift boxes to branded merchandise, we help you create memorable gifting experiences." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/Corporate Gifting.jpg')", // Updated image path
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg font-bold mb-4 px-3 py-1 inline-block rounded bg-black/30 tracking-wider shadow-lg text-white"
              style={{
                ...styles.textShadow,
                borderLeft: '3px solid #FF5A3C'
              }}
            >
              Premium Corporate Gifting Solutions
            </motion.h2>
            <motion.h1
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Customized Corporate<br />
              Gifting Solutions
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Corporate Gifting Solutions Section */}
      <section ref={giftingRef} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-[#002B4F] mb-6"
            >
              Corporate Gifting Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg max-w-3xl mx-auto"
            >
              Discover our range of premium corporate gifting solutions designed to strengthen relationships and create lasting impressions
            </motion.p>
          </div>

          {/* --- UPDATED Gifting Solutions Grid (Based on User Image) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Solution Card 1: Employee Recognition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/images/corporate-gift-1.jpg" // Reverted to original placeholder paths
                  alt="Employee Recognition"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#002B4F] mb-4">Employee Recognition</h3>
                <p className="text-gray-600">Celebrate milestones and achievements with thoughtfully curated gift packages</p>
              </div>
            </motion.div>

            {/* Solution Card 2: Client Appreciation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/images/corporate-gift-2.jpg"
                  alt="Client Appreciation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#002B4F] mb-4">Client Appreciation</h3>
                <p className="text-gray-600">Strengthen business relationships with premium corporate gifts</p>
              </div>
            </motion.div>

            {/* Solution Card 3: Event Merchandise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/images/corporate-gift-3.jpg"
                  alt="Event Merchandise"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#002B4F] mb-4">Event Merchandise</h3>
                <p className="text-gray-600">Custom branded merchandise for corporate events and conferences</p>
              </div>
            </motion.div>

            {/* Solution Card 4: Wellness Packages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/images/corporate-gift-4.jpg"
                  alt="Wellness Packages"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#002B4F] mb-4">Wellness Packages</h3>
                <p className="text-gray-600">Promote employee well-being with curated wellness gift sets</p>
              </div>
            </motion.div>

            {/* Solution Card 5: Festival Celebrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/images/corporate-gift-5.jpg"
                  alt="Festival Celebrations"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#002B4F] mb-4">Festival Celebrations</h3>
                <p className="text-gray-600">Special gift collections for festive occasions and celebrations</p>
              </div>
            </motion.div>

            {/* Solution Card 6: Welcome Kits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/images/corporate-gift-6.jpg"
                  alt="Welcome Kits"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#002B4F] mb-4">Welcome Kits</h3>
                <p className="text-gray-600">Make a great first impression with customized welcome packages</p>
              </div>
            </motion.div>

             {/* Solution Card 7: Anniversary Gifts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/images/corporate-gift-7.jpg"
                  alt="Anniversary Gifts"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#002B4F] mb-4">Anniversary Gifts</h3>
                <p className="text-gray-600">Celebrate work anniversaries with meaningful gifts</p>
              </div>
            </motion.div>

             {/* Solution Card 8: Retirement Gifts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/images/corporate-gift-8.jpg"
                  alt="Retirement Gifts"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#002B4F] mb-4">Retirement Gifts</h3>
                <p className="text-gray-600">Honor retiring employees with memorable gift selections</p>
              </div>
            </motion.div>

             {/* Solution Card 9: Custom Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={giftingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/images/corporate-gift-9.jpg"
                  alt="Custom Awards"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#002B4F] mb-4">Custom Awards</h3>
                <p className="text-gray-600">Recognize excellence with personalized awards and trophies</p>
              </div>
            </motion.div>

          </div>
          {/* --- END UPDATED Grid --- */}
        </div>
      </section>

      {/* UPDATED: Benefits of Corporate Gifts Section (Matching User Image) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-[#002B4F] mb-6"
            >
              Benefits of Corporate Gifts
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg max-w-3xl mx-auto"
            >
              Discover how corporate gifting can transform your business relationships
            </motion.p>
          </div>
          {/* Changed to 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[ // Array of 4 benefits data from image with icons
              { title: "Strengthen Relationships", description: "Build lasting connections with clients and employees", Icon: BsHeart },
              { title: "Boost Employee Morale", description: "Motivate and appreciate your team members", Icon: BsEmojiSmile },
              { title: "Brand Recognition", description: "Enhance your brand visibility and recall", Icon: BsTag },
              { title: "Business Growth", description: "Drive customer loyalty and retention", Icon: BsGraphUp },
            ].map((benefit, index) => (
            <motion.div
                key={index}
              initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg text-center flex flex-col items-center"
              >
                {/* Added Icon Div */}
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-white text-2xl">
                  <benefit.Icon /> {/* Render the icon component */}
              </div>
                <h3 className="text-xl font-bold text-[#002B4F] mb-4">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* END UPDATED: Benefits Section */}

      {/* ADDED: "Ready to Impress?" CTA Section */}
      <section className="py-20 bg-[#002B4F] text-white">
        <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            >
              Ready to Impress?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 mb-10"
            >
              Send Personalized Gifts to Your Team Today!
            </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
             <a 
              href="#contact-section" // Link to contact section below
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300 text-lg"
              onClick={(e) => {
                 e.preventDefault();
                 document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
               }}
            >
              Get Started Now
            </a>
          </motion.div>
        </div>
      </section>
      {/* END ADDED: CTA Section */}

      {/* ADDED: "Our Products" Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            {/* Reference page has uppercase subheading, but image doesn't show one directly above. Add if needed */}
            {/* <motion.p ... >CORPORATE GIFT PRODUCTS</motion.p> */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-[#002B4F] mb-6"
            >
              Our Products
            </motion.h2>
             {/* <motion.p ... >Subheading if needed</motion.p> */}
          </div>
          {/* Grid to display product cards */} 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Product Data from Image */}
            {[ // Match data from the image provided
              { title: "Employee Recognition", description: "Celebrate milestones and achievements with thoughtfully curated gift packages", price: "₹2999", image: "/images/product-1.jpg" },
              { title: "Client Appreciation", description: "Strengthen business relationships with premium corporate gifts", price: "₹4999", image: "/images/product-2.jpg" },
              { title: "Event Merchandise", description: "Custom branded merchandise for corporate events and conferences", price: "₹999", image: "/images/product-3.jpg" },
              { title: "Wellness Packages", description: "Promote employee well-being with curated wellness gift sets", price: "₹4999", image: "/images/product-4.jpg" },
              { title: "Festival Celebrations", description: "Special gift collections for festive occasions and celebrations", price: "₹3499", image: "/images/product-5.jpg" },
              { title: "Welcome Kits", description: "Make a great first impression with customized welcome packages", price: "₹1499", image: "/images/product-6.jpg" },
              { title: "Anniversary Gifts", description: "Celebrate work anniversaries with meaningful gifts", price: "₹2499", image: "/images/product-7.jpg" },
              { title: "Retirement Gifts", description: "Honor retiring employees with memorable gift selections", price: "₹5999", image: "/images/product-8.jpg" },
              { title: "Custom Awards", description: "Recognize excellence with personalized awards and trophies", price: "₹1999", image: "/images/product-9.jpg" },
              // Assuming the last 3 cards are similar to reference page, matching image if possible
              { title: "Event Merchandise", description: "Custom branded merchandise for corporate events and conferences", price: "₹1499", image: "/images/product-10.jpg" }, // Repeated from image
              { title: "Client Appreciation", description: "Strengthen business relationships with premium corporate gifts", price: "₹3999", image: "/images/product-11.jpg" }, // Repeated from image
              // Add 12th card if needed based on full reference
            ].map((product, index) => (
            <motion.div
                key={index}
              initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                // Updated card styling based on image
                className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
                 <div className="p-6 flex flex-col flex-grow">
                   <h3 className="text-xl font-bold text-[#002B4F] mb-2">{product.title}</h3>
                   <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                   {/* Price and View Details row */}
                   <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                     <div>
                       <span className="block text-xs text-[#FF5A3C]">Starting from</span>
                       <span className="text-[#FF5A3C] font-bold">{product.price}</span>
                </div>
                     <a 
                       href="#contact-section" 
                       className="text-[#002B4F] font-bold hover:text-[#FF5A3C] text-sm flex items-center gap-1"
                       onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                       }}
                     >
                       View Details →
                     </a>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* END ADDED: "Our Products" Section */}

      {/* ADDED: "Our Gifting Process" Section */}
      <section className="py-24 bg-[#002B4F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-white text-lg mb-4"
            >
              How We Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent mb-16"
            >
              Our Gifting Process
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto text-white">
              {[ // Steps data from image
                { number: 1, title: "Consultation", description: "Understanding your requirements and budget" },
                { number: 2, title: "Curation", description: "Selecting perfect gifts that align with your brand" },
                { number: 3, title: "Customization", description: "Adding your brand elements and personal touches" },
                { number: 4, title: "Delivery", description: "Timely delivery to your specified locations" }
              ].map((step, index) => (
              <motion.div
                  key={index}
                initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] flex items-center justify-center text-3xl font-bold">
                    {step.number}
                </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
              </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* END ADDED: "Our Gifting Process" Section */}

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <div id="contact-section">
      <ContactSection />
          </div>

      <Footer />
    </PageWrapper>
  );
};

export default CorporateGiftingPage; 