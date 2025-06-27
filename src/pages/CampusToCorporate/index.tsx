import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BsCheckCircle, BsLaptop, BsPeople, BsBarChart } from 'react-icons/bs';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';

interface Module {
  number: number;
  title: string;
  topics: string[];
}

interface Methodology {
  title: string;
  icon: JSX.Element;
  description: string;
}

interface Testimonial {
  text: string;
  author: string;
  position: string;
  company: string;
}

const CampusToCorporatePage: React.FC = () => {
  const modules: Module[] = [
    {
      number: 1,
      title: "Building a Corporate Persona",
      topics: [
        "Understanding Nuances of Success in Corporate World",
        "Identifying Work Behaviors that Help You Succeed",
        "Workplace Etiquettes"
      ]
    },
    {
      number: 2,
      title: "Defining Our Personal Brand at Workplace",
      topics: [
        "Enhancing Self-Awareness",
        "Know Self, Know Others",
        "Johari window – from Unknown to Known"
      ]
    },
    {
      number: 3,
      title: "Strengthening Personal Effectiveness",
      topics: [
        "Limiting Behaviors and Empowering Behaviors",
        "Getting the First Impression Right",
        "The Credibility Window"
      ]
    },
    {
      number: 4,
      title: "Developing Personal Leadership",
      topics: [
        "Problem or Solution Mindset",
        "Recognizing Personal Strengths",
        "4 Drivers of Personal Leadership"
      ]
    },
    {
      number: 5,
      title: "Working with Other Generations",
      topics: [
        "Understanding Team Cohesion",
        "Know about Generational Values",
        "Managing Conflicts Effectively"
      ]
    },
    {
      number: 6,
      title: "Taking Initiative",
      topics: [
        "Importance of Taking Lead",
        "7 Key Ownership Behaviors",
        "Accountability Mental Models"
      ]
    },
    {
      number: 7,
      title: "Managing Complexities & Solving Problems",
      topics: [
        "Big Picture Thinking",
        "Root Cause Analysis",
        "PDSA Cycle"
      ]
    },
    {
      number: 8,
      title: "Effective Communication for Success",
      topics: [
        "Communicating with Different Personality Styles",
        "Using Diplomacy and Tact",
        "Actively Listening"
      ]
    }
  ];

  const objectives: string[] = [
    "Building personal effectiveness as young intern/employee",
    "Cultivating an adaptive mindset",
    "Demonstrating initiative and ownership at workplace",
    "Manage interpersonal interactions with maturity",
    "Developing a strong work ethics",
    "Aligning behavior and work style to organizational needs"
  ];

  const methodologies: Methodology[] = [
    {
      title: "Simulations",
      icon: <BsLaptop className="text-3xl text-[#FF4C39]" />,
      description: "Real-world scenarios for practical learning"
    },
    {
      title: "Role Plays",
      icon: <BsPeople className="text-3xl text-[#FF4C39]" />,
      description: "Interactive sessions for better understanding"
    },
    {
      title: "Demonstrations",
      icon: <BsBarChart className="text-3xl text-[#FF4C39]" />,
      description: "Visual learning for complex concepts"
    },
    {
      title: "Exercises",
      icon: <BsCheckCircle className="text-3xl text-[#FF4C39]" />,
      description: "Hands-on practice for skill development"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      text: "For both our interns and new hires, Trebound's training programs have been invaluable. The sessions are well-crafted to align with Cipla's core competencies, and the positive feedback from participants, especially those from top-tier institutes, speaks volumes about its effectiveness.",
      author: "Kruti Pancholi",
      position: "Sr HR Manager - Pan India Campus Recruitment",
      company: "Cipla"
    },
    {
      text: "We've partnered with Trebound for our Campus to Corporate training for three straight years, and the experience has been exceptional. The program captures TVS leadership competencies perfectly, and even our new hires from tier 1 institutes admired its design and depth.",
      author: "Sai",
      position: "L&D Leader",
      company: "TVS"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Campus To Corporate Training Program | Trebound</title>
        <meta 
          name="description" 
          content="Transform your new hires into effective corporate professionals with our comprehensive Campus to Corporate training program. Develop essential workplace skills and mindset."
        />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#002B4F] to-[#0F4C75] overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0">
          <motion.div 
            className="w-full h-full object-cover opacity-20"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002B4F]/90 via-[#002B4F]/80 to-[#0F4C75]/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Campus To Corporate
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-300"
            >
              Indoctrinating your org's culture in new hires
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href="#contact-form"
                className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
              >
                Download Brochure
              </a>
              <a 
                href="#modules"
                className="bg-white text-[#002B4F] px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
              >
                View Modules
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-8">
                Problem Statement
              </h2>
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <p className="text-lg text-gray-700 mb-6">
                  Integration of Gen Z into the workplace can indeed present challenges for the HR/L&D teams. 
                  The reason being young interns/new hires come on board with a different set of work behaviors and motivators.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Their personal expectations from workplace and what the organization expects from them can often find itself at cross roads.
                </p>
                <p className="text-lg text-gray-700">
                  Campus to corporate transition can be difficult for Gen Zs too. This is due to a combination of factors such as lack of experience, 
                  varied cultural differences, instant gratification orientation, strong emphasis on individualism, personal expression, 
                  high degree of autonomy and individuality.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Corporate Culture Challenge"
                className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Indoctrinating Corporate Culture Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-6">
                Indoctrinating Corporate Culture in new Hires
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto mb-8"></div>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Our course helps GenZ's to make a smooth transition by learning about success parameters in an organizational setting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Etiquette & Rules"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-bold text-[#002B4F] mb-4">Etiquette & Rules of Behavior</h3>
                <p className="text-gray-600">Learn essential workplace etiquette and behavioral norms that foster professional relationships.</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Professional Conduct"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-bold text-[#002B4F] mb-4">Professional Conduct</h3>
                <p className="text-gray-600">Develop the mindset and behaviors expected in a corporate environment.</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Dealing With Colleagues"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-bold text-[#002B4F] mb-4">Dealing With Colleagues</h3>
                <p className="text-gray-600">Master interpersonal skills and learn to navigate workplace relationships effectively.</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Digital Etiquette"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-bold text-[#002B4F] mb-4">Digital Etiquette</h3>
                <p className="text-gray-600">Navigate digital communication and collaboration tools professionally.</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1573497161079-f3fd25cc6b90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Communication Styles"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-bold text-[#002B4F] mb-4">Communication Styles</h3>
                <p className="text-gray-600">Learn to adapt your communication style to different workplace scenarios.</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Time Management"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-bold text-[#002B4F] mb-4">Time Management</h3>
                <p className="text-gray-600">Develop effective time management and prioritization skills.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Objectives Section with Vector Image */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-12">
                Course Objectives
              </h2>
              <div className="space-y-6">
                {objectives.map((objective, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <BsCheckCircle className="text-[#FF4C39] text-xl" />
                      </div>
                      <p className="text-gray-700">{objective}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Course Objectives"
                className="rounded-2xl shadow-lg w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-12 text-center">
            Content Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {modules.map((module) => (
              <div 
                key={module.number}
                className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-8 h-8 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full flex items-center justify-center font-bold">
                    {module.number}
                  </span>
                  <h3 className="font-bold text-[#002B4F]">{module.title}</h3>
                </div>
                <ul className="space-y-2">
                  {module.topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <BsCheckCircle className="text-[#FF4C39] text-sm mt-1.5" />
                      <span className="text-gray-700 text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Methodology Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">
              Training Methodology
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Participants will be immersed in intensive practice sessions during the workshop. 
              They will engage in the application of frameworks and tools shared through the journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {methodologies.map((method, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-[#002B4F] mb-4">{method.title}</h3>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-12 text-center">
            Client's Speak
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-[#002B4F]">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.position}</p>
                  <p className="text-[#FF4C39]">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See Our Impact Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-6">
                See Our Impact
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto mb-8"></div>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Watch how our programs transform new hires into confident corporate professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg h-[400px]">
                <iframe
                  src="https://www.youtube.com/embed/Zf8XxxNkalA"
                  title="Campus to Corporate Training Video 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg h-[400px]">
                <iframe
                  src="https://www.youtube.com/embed/4PAGqXMpDZA"
                  title="Campus to Corporate Training Video 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-6">
              Ready to transform your new hires into effective corporate professionals?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Enroll in our Campus to Corporate Program today and equip your team with the skills 
              and mindset needed for success in today's dynamic workplace.
            </p>
            <a 
              href="#contact-form"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact-form">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CampusToCorporatePage; 