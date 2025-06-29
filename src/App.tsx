import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Navbar from './components/Navbar';
import GradientHero from './components/GradientHero';
import FeaturedActivities from './components/FeaturedActivities';
import FeaturedStays from './components/FeaturedStays';
import FeaturedBlog from './components/FeaturedBlog';
import Footer from './components/Footer';
// AI Components - Re-enabled after fixing environment variables
import AIChatbot from './components/AIChatbot';
// import VoiceSearch from './components/VoiceSearch'; // Removed - integrated into AISearchWidget
import AIRecommendations from './components/AIRecommendations';
import SmartForm from './components/SmartForm';

function App() {
  // State to manage search query for AI recommendations
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>('');

  return (
    <>
      <Helmet>
        <title>Trebound | AI-Powered Team Building & Corporate Events Solutions</title>
        <meta 
          name="description" 
          content="Trebound is your AI-powered partner for exceptional team building experiences and corporate events. Get personalized recommendations and intelligent insights."
        />
        <meta name="keywords" content="AI team building, smart corporate events, personalized team activities, AI recommendations, intelligent team building" />
        <meta property="og:title" content="Trebound | AI-Powered Team Building Solutions" />
        <meta property="og:description" content="350+ unique team building experiences with AI-powered personalization for any budget & team size" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Voice Search Integration - Removed floating component, now integrated in search widget */}
        
        <GradientHero onSearchQueryChange={setCurrentSearchQuery} />
        
        {/* AI Recommendations Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 text-lg font-medium mb-6">
                🤖 AI-Powered Recommendations
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Personalized Just <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">For You</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI analyzes your team's preferences and needs to suggest the perfect activities
              </p>
            </div>
            <AIRecommendations searchQuery={currentSearchQuery} />
          </div>
        </section>
        
        <FeaturedActivities />
        <FeaturedStays />
        <FeaturedBlog />
        
        {/* AI-Powered Smart Form Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Smart <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Consultation</span>
              </h2>
              <p className="text-lg text-gray-600">
                AI-powered form that adapts to your needs and provides instant recommendations
              </p>
            </div>
            <SmartForm />
          </div>
        </section>
        
        <Footer />
        
        {/* AI Chatbot - Always Available */}
        <AIChatbot />
      </div>
    </>
  );
}

export default App;
