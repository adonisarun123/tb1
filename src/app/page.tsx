import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Dynamically import the AI Search Widget to avoid SSR issues
const AISearchWidget = dynamic(() => import('../components/AISearchWidget'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
          <div className="flex items-center p-4">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-xl animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex-shrink-0 ml-4 w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
});

export const metadata: Metadata = {
  title: 'Trebound - AI-Powered Team Building Discovery',
  description: 'Discover perfect team building activities with our AI-powered search. Find from 350+ unique experiences including virtual escape rooms, outdoor adventures, and corporate retreats.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative container-custom py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo/Brand */}
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent mb-4">
                Trebound
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-medium">
                AI-Powered Team Building Discovery
              </p>
            </div>

            {/* Main Headline */}
            <div className="mb-12">
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Perfect Team Building
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Experiences with AI
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover from 350+ unique team building activities, premium venues, and unforgettable experiences. 
                Our AI understands your needs and finds the perfect match.
              </p>
            </div>

            {/* AI Search Widget */}
            <div className="mb-16">
              <AISearchWidget />
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">350+</div>
                <div className="text-gray-600">Unique Activities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600">Premium Venues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
                <div className="text-gray-600">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
                <div className="text-gray-600">Happy Teams</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Trebound?
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI with curated experiences to deliver exactly what your team needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Matching</h4>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI understands your team's unique needs and preferences to recommend the perfect activities and venues.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Curated Experiences</h4>
              <p className="text-gray-600 leading-relaxed">
                Every activity and venue is carefully selected and verified to ensure exceptional quality and memorable experiences.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Instant Results</h4>
              <p className="text-gray-600 leading-relaxed">
                Get personalized recommendations in seconds. No more endless browsing or guesswork - just perfect matches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF4C39] to-[#FFB573]">
        <div className="container-custom text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Build Stronger Teams?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of companies who trust Trebound to deliver exceptional team building experiences.
          </p>
          <button className="bg-white text-[#FF4C39] px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Start Your Search
          </button>
        </div>
      </section>
    </div>
  );
} 