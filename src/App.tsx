import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GradientHero from './components/GradientHero';
import AIRecommendations from './components/AIRecommendations';
import AIChatbot from './components/AIChatbot';
import FeaturedActivities from './components/FeaturedActivities';
import FeaturedStays from './components/FeaturedStays';
import FeaturedBlog from './components/FeaturedBlog';
import SmartForm from './components/SmartForm';
import SchemaMarkup from './components/SchemaMarkup';
import { useOptimizedData } from './lib/performanceOptimizer';
import { mainThreadOptimizer } from './lib/mainThreadOptimizer';
// import PerformanceMonitor from './components/PerformanceMonitor';

function App() {
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>('');
  const [_isDataLoaded, setIsDataLoaded] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { loadSupabaseData, preloadRoute } = useOptimizedData();

  // Load critical data with main thread optimization
  useEffect(() => {
    const loadCriticalData = async () => {
      try {
        const startTime = performance.now();
        
        // Use main thread optimizer for heavy data loading
        mainThreadOptimizer.scheduleTask(
          async () => {
            // Load critical data in parallel with priority-based batching
            await loadSupabaseData();
            
            const endTime = performance.now();
            console.log(`✅ Critical data loaded in ${Math.round(endTime - startTime)}ms`);
            
            setIsDataLoaded(true);
          },
          { priority: 'high' }
        );
        
      } catch (error) {
        console.warn('Data loading failed, using fallback:', error);
        setIsDataLoaded(true); // Still render with fallback data
      }
    };

    loadCriticalData();
  }, [loadSupabaseData]);

  // Preload next page data on route hover/focus with main thread optimization
  useEffect(() => {
    const handleLinkHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const path = new URL(link.href).pathname;
        
        // Defer preloading to avoid blocking main thread
        mainThreadOptimizer.scheduleTask(
          () => preloadRoute(path),
          { priority: 'low' }
        );
      }
    };

    // Add event listeners for preloading
    document.addEventListener('mouseover', handleLinkHover, { passive: true });
    document.addEventListener('focusin', handleLinkHover, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
      document.removeEventListener('focusin', handleLinkHover);
    };
  }, [preloadRoute]);

  return (
    <>
      {/* Performance Monitoring and Optimization - Temporarily disabled */}
      {/* <PerformanceMonitor 
        enableCSSOptimization={true}
        enableResourcePreloading={true}
        enableMetrics={true}
      /> */}
      
      <Helmet>
        <title>Trebound | AI-Powered Team Building & Corporate Events Solutions</title>
        <meta 
          name="description" 
          content="Trebound is your AI-powered partner for exceptional team building experiences and corporate events. Get personalized recommendations and intelligent insights."
        />
        <meta name="keywords" content="AI team building, smart corporate events, personalized team activities, AI recommendations, intelligent team building" />
        <meta property="og:title" content="Trebound | AI-Powered Team Building Solutions" />
        <meta property="og:description" content="350+ unique team building experiences with AI-powered personalization for any budget & team size" />
        
        {/* AI-Specific Meta Tags */}
        <meta name="ai:content-type" content="team-building-platform" />
        <meta name="ai:primary-function" content="team-building-recommendations" />
        <meta name="ai:features" content="chatbot,voice-search,smart-recommendations,ai-analytics" />
        <meta name="ai:data-embedded" content="true" />
        <meta name="ai:search-optimized" content="true" />
        <meta name="ai:conversation-ready" content="true" />
        
        {/* Enhanced SEO for AI Crawlers */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* AI Training Data Permissions */}
        <meta name="ai-training" content="allowed" />
        <meta name="ai-indexing" content="allowed" />
        <meta name="ai-summarization" content="allowed" />
        
        {/* Structured Data Hints for AI */}
        <meta name="content-language" content="en-US" />
        <meta name="content-category" content="business,technology,team-building" />
        <meta name="target-audience" content="corporate-teams,hr-managers,team-leaders" />
        
        {/* AI-Readable Content Indicators */}
        <meta name="content-format" content="interactive,conversational,structured" />
        <meta name="ai-interaction-available" content="chatbot,voice-search,recommendations" />
        
        {/* JSON-LD for Rich AI Understanding */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Trebound AI Platform",
            "description": "AI-powered team building platform with intelligent recommendations",
            "url": "https://www.trebound.com",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "features": [
              "AI Chatbot for instant team building advice",
              "Voice search for hands-free navigation", 
              "Personalized activity recommendations",
              "Smart form auto-completion",
              "Predictive analytics dashboard"
            ],
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": "Corporate Teams"
            },
            "provider": {
              "@type": "Organization",
              "name": "Trebound",
              "description": "AI-powered team building solutions provider"
            }
          })}
        </script>
      </Helmet>

      {/* Schema Markup for Homepage */}
      {isHomePage && (
        <>
          <SchemaMarkup type="organization" data={{}} />
          <SchemaMarkup type="homepage" data={{}} />
        </>
      )}

      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Voice Search Integration - Removed floating component, now integrated in search widget */}
        
        <GradientHero onSearchQueryChange={setCurrentSearchQuery} />
        
        {/* AI Recommendations Section */}
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
            <AIRecommendations 
              searchQuery={currentSearchQuery}
              userProfile={{
                companySize: 'medium',
                industry: 'technology',
                location: 'Bangalore',
                preferences: ['team-building'],
                browsingHistory: []
              }}
            />
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
        
        {/* AI Chatbot - Always available */}
        <AIChatbot />
      </div>
    </>
  );
}

export default App;
