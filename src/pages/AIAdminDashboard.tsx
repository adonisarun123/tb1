import React from 'react';
import { Helmet } from 'react-helmet-async';
import AIAnalyticsDashboard from '../components/AIAnalyticsDashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AIAdminDashboard: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AI Analytics Dashboard | Trebound Admin Portal</title>
        <meta 
          name="description" 
          content="Comprehensive AI-powered analytics dashboard for Trebound administrators. Monitor user behavior, track conversions, and get intelligent insights."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-blue-100 text-lg font-medium mb-6">
                🤖 AI-Powered Analytics
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Intelligence <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Harness the power of AI to understand your customers, optimize conversions, and grow your business with data-driven insights.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">98.7%</div>
                  <div className="text-blue-100">AI Accuracy Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-green-400 mb-2">+34%</div>
                  <div className="text-blue-100">Conversion Increase</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-purple-400 mb-2">15.2M</div>
                  <div className="text-blue-100">Data Points Analyzed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Dashboard */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIAnalyticsDashboard />
          </div>
        </div>
        
        {/* AI Insights Summary */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Key AI <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
              </h2>
              <p className="text-lg text-gray-600">
                Machine learning-powered recommendations for business optimization
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                    🎯
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Personalization Engine</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our AI has identified 12 distinct customer personas and increased engagement by 67% through personalized recommendations.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Recommended Action</div>
                  <div className="text-blue-600 font-semibold">Focus on "Tech Startup" persona - highest conversion potential</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                    📈
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Conversion Optimization</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  AI-powered form optimization has reduced drop-off rates by 45% and improved lead quality scores significantly.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Recommended Action</div>
                  <div className="text-green-600 font-semibold">A/B test pricing display optimization for 23% conversion boost</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                    🗣️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Voice & Chat Analytics</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Voice search adoption is growing 89% month-over-month. Chatbot handles 78% of queries without human intervention.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Recommended Action</div>
                  <div className="text-purple-600 font-semibold">Expand voice search keywords for outdoor activities</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                    🚀
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Predictive Analytics</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  AI forecasts 156% growth in virtual team building demand for Q2. Algorithm predicts seasonal booking patterns with 94% accuracy.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Recommended Action</div>
                  <div className="text-orange-600 font-semibold">Prepare virtual activity inventory for projected demand spike</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default AIAdminDashboard; 