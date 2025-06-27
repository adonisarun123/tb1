import React from 'react';

const WhyChooseTreboundSection: React.FC = () => (
  <section className="py-20 bg-[#002B4F] text-white">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">Why Choose Trebound?</h2>
        <p className="text-lg text-gray-300 mb-8">Our team is playful, engaging, highly energetic and believes in teamwork. With 30+ years of combined experience, we help companies improve employee engagement and deliver exceptional support at every stage of your team building plan.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2 text-white">30+ Years of Experience</h3>
            <p className="text-gray-200">Our facilitators bring decades of expertise to ensure your offsite is a success.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2 text-white">Engagement & Creativity</h3>
            <p className="text-gray-200">We break down barriers, inspire, and promote creativity through our activities.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2 text-white">Great Support</h3>
            <p className="text-gray-200">Expect professional and personalized support from our team at all stages.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2 text-white">Fun & Intense Adventures</h3>
            <p className="text-gray-200">Increase participation, build trust, and have fun with unique team building activities.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseTreboundSection; 