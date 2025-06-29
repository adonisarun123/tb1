import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { BsCheckCircle, BsBuilding, BsPeople } from 'react-icons/bs';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import { bangaloreResorts } from '../../data/bangaloreResorts';
import { webhookService } from '../../lib/webhookService';
import PageWrapper from '../../components/PageWrapper';
// import { FiCheck, FiStar, FiMapPin, FiUsers, FiActivity, FiTrendingUp, FiAward, FiHeart } from 'react-icons/fi';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  teamSize: string;
  message: string;
}

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

interface ResortPreview {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface Destination {
  image: string;
  title: string;
  description: string;
}

// Helper function to extract plain text from HTML
const extractTextFromHtml = (html: string) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const BangaloreResortsPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '',
    message: ''
  });

  const features: Feature[] = [
    {
      title: "Exclusive Selection",
      description: "Only the best resorts make it to our list, ensuring your team experiences top-tier amenities.",
      icon: <BsCheckCircle className="text-[#FF4C39] text-2xl" />
    },
    {
      title: "Tailored Experiences",
      description: "You tell us what you need, we take care of the rest.",
      icon: <BsBuilding className="text-[#FF4C39] text-2xl" />
    },
    {
      title: "Commitment to Quality",
      description: "We promise settings that inspire and invigorate, fostering better communication, creativity, and collaboration among team members.",
      icon: <BsPeople className="text-[#FF4C39] text-2xl" />
    }
  ];

  const resortPreviews: ResortPreview[] = bangaloreResorts.slice(0, 3).map(resort => ({
    title: resort.title,
    subtitle: `${resort.capacity} People • ${resort.location}`,
    description: resort.description,
    image: resort.image
  }));

  const destinations: Destination[] = [
    {
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
      title: "Kerala",
      description: "God's own country awaits your team"
    },
    {
      image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66",
      title: "Hyderabad",
      description: "City of Pearls and Tech Hub"
    },
    {
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
      title: "Delhi",
      description: "Historical charm meets modern luxury"
    },
    {
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
      title: "Mumbai",
      description: "The city that never sleeps"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.phone.trim() || !formData.teamSize) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Send to n8n webhook (non-blocking)
      try {
        const webhookData = webhookService.prepareBangaloreResortsData({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          team_size: formData.teamSize,
          message: formData.message.trim()
        });
        
        // Send to webhook without waiting for response (fire and forget)
        webhookService.sendToWebhook(webhookData).catch(error => {
          console.error('N8N webhook failed (non-blocking):', error);
        });
      } catch (webhookError) {
        console.error('Error preparing webhook data (non-blocking):', webhookError);
      }

      // Submit to contact_submissions table
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/contact_submissions`,
        {
          method: 'POST',
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            work_email: formData.email.trim(),
            preferred_destination: 'Bangalore Resorts',
            phone: formData.phone.trim(),
            number_of_pax: parseInt(formData.teamSize.split('-')[0]) || 1, // Extract first number from team size
            more_details: `Company: ${formData.company.trim()}\nTeam Size: ${formData.teamSize}\nMessage: ${formData.message.trim()}`,
            activity_type: 'exploring',
            page_url: window.location.href,
            page_heading: 'Bangalore Resorts Access Form'
          })
        }
      );

      if (response.ok) {
        console.log('Form submitted successfully:', formData);
        // Clear form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          teamSize: '',
          message: ''
        });
        // Redirect to thank you page after successful submission
        navigate('/thank-you');
      } else {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to submit form: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('access-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Best Team Outing Resorts in Bangalore | Trebound</title>
        <meta 
          name="description" 
          content="Discover the perfect setting for your team outing in Bangalore. Access our curated list of 20+ premium resorts offering the ideal blend of comfort, activities, and amenities."
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
              backgroundImage: "url('/images/bangalore-resorts-hero.jpg')",
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
              Discover the Best Team Outing Resorts in Bangalore
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-300"
            >
              Looking for a great place for your team to relax and work together?
              We've picked out some of the best spots in Bangalore for just that.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={scrollToForm}
              className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
            >
              Access 20+ Curated Resorts
            </motion.button>
          </div>
        </div>
      </section>

      {/* Resort Previews Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">
              See Where Your Team Could Go Next
            </h2>
            <p className="text-gray-600 text-lg">
              We know you're busy, so here's a quick preview of some top spots...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resortPreviews.map((resort, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative pt-[75%]">
                  <img 
                    src={resort.image}
                    alt={resort.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#002B4F] mb-2">{resort.title}</h3>
                  <p className="text-[#FF4C39] font-medium mb-2">{resort.subtitle}</p>
                  <p className="text-gray-600">{extractTextFromHtml(resort.description) || resort.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Form Section */}
      <section id="access-form" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-6">
              Access to 20+ Curated Resorts For Team Outings In Bangalore
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              To view our exclusive list of team-building resorts,
              we require some basic information.
              This ensures that every recommendation is tailored to suit your team's specific needs and preferences.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                  required
                />
              </div>
              <select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                required
              >
                <option value="">Select Team Size</option>
                <option value="10-50">10-50 people</option>
                <option value="51-100">51-100 people</option>
                <option value="101-500">101-500 people</option>
                <option value="500+">500+ people</option>
              </select>
              <textarea
                name="message"
                placeholder="Additional Requirements (Optional)"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                rows={4}
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
              >
                Access Exclusive Resorts
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">
              Destinations Across India and Beyond
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We offer curated experiences across India including hotspots like Kerala, Hyderabad, Delhi, Mumbai, and even international destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {destinations.map((destination: Destination, index: number) => (
              <div key={index} className="group cursor-pointer" onClick={scrollToForm}>
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{destination.title}</h3>
                    <p className="text-gray-200 text-sm">{extractTextFromHtml(destination.description) || destination.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={scrollToForm}
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Trebound Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">
              Why Choose Trebound?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Simple, Fun, and Effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF4C39]/10 flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#002B4F] mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-4">
              Our Clients
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Trusted by companies across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-xl shadow-lg h-[250px]">
              <img 
                src="/images/Corporate team 1.jpg"
                alt="Team Building Activities"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg h-[250px]">
              <img 
                src="/images/Corporate team 2.webp"
                alt="Team Building Activities"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg h-[250px]">
              <img 
                src="/images/Corporate team 3.webp"
                alt="Team Building Activities"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg h-[250px]">
              <img 
                src="/images/Corporate team 4.webp"
                alt="Team Building Activities"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-6">
                Ready to Plan Your Team's Next Great Outing?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Finding the right place for your team outing shouldn't be hard.
                Let us help you plan a great event that your team will talk about for a long time.
              </p>
              <button
                onClick={scrollToForm}
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
              >
                Access Exclusive Resorts
              </button>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Team Planning and Collaboration"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact-form">
        <ContactSection />
      </div>
    </PageWrapper>
  );
};

export default BangaloreResortsPage; 