import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import SchemaMarkup from '../SchemaMarkup';

interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
  category: string;
}

interface AIOptimizedFAQProps {
  faqs?: FAQ[];
  title?: string;
  description?: string;
  pageUrl?: string;
}

const defaultFAQs: FAQ[] = [
  {
    question: "How does Trebound's AI recommendation system work?",
    answer: "Our AI analyzes your company profile, team size, industry, and preferences to suggest the most suitable team building activities. The system uses machine learning algorithms to continuously improve recommendations based on user feedback and successful bookings.",
    keywords: ["AI recommendations", "machine learning", "personalization"],
    category: "AI Features"
  },
  {
    question: "What types of team building activities are available?",
    answer: "We offer 350+ unique activities including virtual team building, outdoor adventures, corporate training, indoor games, cooking challenges, escape rooms, sports activities, and customized corporate programs.",
    keywords: ["team building activities", "virtual", "outdoor", "corporate training"],
    category: "Activities"
  },
  {
    question: "Can the AI chatbot help with booking and pricing?",
    answer: "Yes! Our AI chatbot can provide instant pricing estimates, check availability, suggest alternatives, and even help initiate the booking process. It's available 24/7 and can handle complex queries about group sizes, locations, and special requirements.",
    keywords: ["AI chatbot", "booking", "pricing", "availability"],
    category: "AI Features"
  },
  {
    question: "How accurate are the AI-powered venue recommendations?",
    answer: "Our venue recommendation system has a 94% accuracy rate. The AI considers factors like location preferences, group size, budget, amenities required, and accessibility needs to suggest the perfect venues for your team outing.",
    keywords: ["venue recommendations", "accuracy", "location", "amenities"],
    category: "Venues"
  },
  {
    question: "Does Trebound support voice search for finding activities?",
    answer: "Absolutely! You can use voice search to find activities by simply speaking your requirements. Our natural language processing understands complex queries like 'Find outdoor team building activities for 25 people in Bangalore under 5000 budget'.",
    keywords: ["voice search", "natural language processing", "activity search"],
    category: "AI Features"
  },
  {
    question: "What locations does Trebound cover for team building events?",
    answer: "We operate across major Indian cities including Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune, and many more. Our AI system can suggest location-specific activities and venues based on your proximity and preferences.",
    keywords: ["locations", "cities", "Bangalore", "Mumbai", "Delhi", "Hyderabad"],
    category: "Coverage"
  },
  {
    question: "How does the smart form auto-completion work?",
    answer: "Our smart forms use AI to auto-complete company information, suggest relevant activity types based on your industry, and predict optimal group sizes and budget ranges. This reduces form filling time by 60% while improving accuracy.",
    keywords: ["smart forms", "auto-completion", "company information", "AI"],
    category: "AI Features"
  },
  {
    question: "Can I get customized team building programs for my specific industry?",
    answer: "Yes! Our AI analyzes industry-specific requirements and can recommend customized programs. Whether you're in tech, finance, healthcare, or manufacturing, we have tailored solutions that address your unique team development needs.",
    keywords: ["customized programs", "industry-specific", "tailored solutions"],
    category: "Customization"
  }
];

const AIOptimizedFAQ: React.FC<AIOptimizedFAQProps> = ({
  faqs = defaultFAQs,
  title = "Frequently Asked Questions",
  description = "Get instant answers about Trebound's AI-powered team building platform",
  pageUrl = "https://www.trebound.com"
}) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <>
      {/* Schema Markup for FAQ */}
      <SchemaMarkup 
        type="faq" 
        data={{
          url: pageUrl,
          faqs: faqs.map(faq => ({
            question: faq.question,
            answer: faq.answer
          }))
        }} 
      />

      <section className="py-16 bg-white" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              🤖 AI-Powered Support
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map(category => (
                <span
                  key={category}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => setSearchQuery(category)}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  aria-expanded={openFAQ === index}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
                      <div className="flex flex-wrap gap-1 ml-2">
                        {faq.keywords.slice(0, 2).map(keyword => (
                          <span key={keyword} className="text-xs text-gray-500">
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {openFAQ === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100"
                    >
                      <div className="px-6 py-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {/* Keywords for AI Understanding */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500 mb-2">Related topics:</p>
                          <div className="flex flex-wrap gap-2">
                            {faq.keywords.map(keyword => (
                              <span
                                key={keyword}
                                className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
                                onClick={() => setSearchQuery(keyword)}
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No FAQs found matching your search.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-orange-600 hover:text-orange-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}

          {/* AI Assistance CTA */}
          <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-4">
                Our AI chatbot is available 24/7 to provide instant, personalized answers
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with AI Assistant
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AIOptimizedFAQ; 