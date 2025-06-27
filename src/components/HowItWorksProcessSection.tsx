import React from 'react';
import { motion } from 'framer-motion';

const defaultSteps = [
  {
    number: '1',
    title: 'You send us your requirement',
    description: 'We receive your requirements such as team size, tentative budget and dates so that we can make a proposal tailor-made for your needs.'
  },
  {
    number: '2',
    title: 'You get a detailed proposal',
    description: 'We provide all the comprehensive details such as pricing, a list of activities, functioning process and available slots to help you arrive at a decision without any confusion.'
  },
  {
    number: '3',
    title: 'We fix a date and time',
    description: 'Once you pick the set of activities, we lock the date and time based on your convenience.'
  },
  {
    number: '4',
    title: 'Build excitement with teasers',
    description: 'We will send some teaser posters to hype up the event and excite your team for the big day.'
  },
  {
    number: '5',
    title: 'Get ready with your backpacks',
    description: 'The day is finally here. Relax, forget everything about work for a while and have loads of fun while our facilitators take care of the hosting part.'
  },
];

interface HowItWorksProcessSectionProps {
  steps?: { number: string; title: string; description: string }[];
  heading?: string;
  subheading?: string;
}

const HowItWorksProcessSection: React.FC<HowItWorksProcessSectionProps> = ({
  steps = defaultSteps,
  heading = "Here's How It Works!",
  subheading = 'We make planning your team building session simple and effective',
}) => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-[#FF4C39] text-lg font-semibold">The Process</span>
        <h2 className="text-4xl font-bold text-[#313131] mt-2 mb-4">{heading}</h2>
        <p className="text-xl text-[#636363] max-w-2xl mx-auto">{subheading}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:border-[#FF4C39]/20"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center text-white text-2xl font-bold relative z-10">
                  {step.number}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff4c39]/20 to-[#ffb573]/20 rounded-full transform scale-110 blur-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#313131] mb-4 group-hover:text-[#FF4C39] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[#636363] leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksProcessSection; 