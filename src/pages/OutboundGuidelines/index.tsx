import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { BsCheck2Circle, BsXCircle, BsWater, BsCamera, BsPerson, BsBag, BsCapsule, BsPersonFill } from 'react-icons/bs';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';

const OutboundGuidelinesPage: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Outbound Program Guidelines | Trebound</title>
        <meta 
          name="description" 
          content="Essential guidelines and preparations for Trebound's outbound team building programs. Know what to do and what not to do for the best experience."
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
              backgroundImage: "url('/images/outbound-guidelines.jpg')",
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
              Essential Guidelines for Your Adventure
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Outbound Program Guidelines
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            >
              Make the most of your team building experience by following these important guidelines
            </motion.p>
          </div>
        </div>
      </section>

      {/* Guidelines Section with Enhanced Design */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Do's Section with Hover Effects */}
          <motion.div
            ref={ref}
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
                "Wear comfortable clothes and footwear (Preferably sports shoes. Slippers or Jimmy Choo High Heels will be definite No No!)",
                "Personal medication must be carried. Do inform the facilitator regarding any health issues prior to the start of the activities. Basic first aid will be available with the facilitator.",
                "Re-hydrate yourself properly during the day. Water will be made available at certain areas in the resort and at the activity centers.",
                "Always listen to the facilitator's instructions during the program.",
                "Wear swimming costumes if using the swimming pool. You will not be permitted to use it with regular clothes.",
                "You rarely get a chance to break out with your team, so try and mingle as much as possible with each other and have loads of fun!"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(145deg, #ffffff, #f5f5f5)"
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4C39]/10 to-[#FFB573]/10 flex items-center justify-center flex-shrink-0">
                    <BsCheck2Circle className="w-6 h-6 text-[#FF4C39]" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Don'ts Section with Red Accent */}
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
                "MIA: Leaving your group without prior intimation would lead to confusion. Please inform your POC or a Trebound facilitator.",
                "Do not consume any kind of drugs/alcohol before or during participation in the team building activities.",
                "Do not ignore any medical issues if you suspect light fever, giddiness, vertigo, heatstroke etc. Inform the facilitator immediately!",
                "Avoid touching your eyes, nose or mouth before sanitizing your hands with sanitizer or soap.",
                "Do not leave your belongings unattended."
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-red-500"
                  style={{
                    background: "linear-gradient(145deg, #ffffff, #f5f5f5)"
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <BsXCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hashtag with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-24 py-12 px-6 rounded-2xl bg-gradient-to-r from-[#002B4F] to-[#0F4C75]"
          >
            <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">
              #TEAMSTHATPLAYTOGETHERSTAYTOGETHER
            </h3>
          </motion.div>

          {/* Offsite Preps Section with Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">Offsite Preps</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BsPerson />,
                  title: "CAP, Mask & Gloves",
                  description: "Carry a comfortable cap or a hat to shield yourselves from the sun and mask and gloves to maintain social distancing norms."
                },
                {
                  icon: <BsWater />,
                  title: "WATER BOTTLES",
                  description: "Although you will have drinking water available at the resort, do carry your own bottle for your own convenience."
                },
                {
                  icon: <BsPersonFill />,
                  title: "OUTDOOR ATTIRE",
                  description: "Considering the slew of the activities that you and your team will be involved in, comfortable clothing and footwear are recommended. It would be preferable that everyone stick to comfortable sports shoes."
                },
                {
                  icon: <BsCamera />,
                  title: "PHOTO ID",
                  description: "Please carry any of the government approved identification cards with you."
                },
                {
                  icon: <BsCapsule />,
                  title: "PERSONAL MEDICINES",
                  description: "If any of you have a medical condition or if there are certain medicines that you ought to take, please make sure you carry them with you and please do inform our facilitators in advance."
                },
                {
                  icon: <BsBag />,
                  title: "EXTRA SET OF CLOTHES",
                  description: "Including outdoor gear, having an extra set of clothes is always advisable considering the activities involved. Also, please do carry your own towels."
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
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact-form">
        <ContactSection />
      </div>
    </div>
  );
};

export default OutboundGuidelinesPage; 