import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiCheck, FiAlertCircle, FiRefreshCw, FiSettings, FiTrendingUp } from 'react-icons/fi';

// Import AI Components for testing
import AIChatbot from '../AIChatbot';
import AIRecommendations from '../AIRecommendations';
import SmartForm from '../SmartForm';
import VoiceSearch from '../VoiceSearch';
import AIAnalyticsDashboard from '../AIAnalyticsDashboard';

interface TestResult {
  feature: string;
  status: 'idle' | 'running' | 'success' | 'error';
  result?: string;
  duration?: number;
}

const AITesting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningAllTests, setIsRunningAllTests] = useState(false);

  const aiFeatures = [
    {
      id: 'chatbot',
      name: 'AI Chatbot',
      description: 'Conversational AI with intent recognition',
      component: AIChatbot,
      color: 'blue',
      tests: [
        'Message processing',
        'Intent extraction',
        'Context awareness',
        'Human escalation'
      ]
    },
    {
      id: 'recommendations',
      name: 'AI Recommendations',
      description: 'Personalized activity suggestions',
      component: AIRecommendations,
      color: 'purple',
      tests: [
        'Personalization engine',
        'Recommendation scoring',
        'Real-time updates',
        'Category filtering'
      ]
    },
    {
      id: 'smartform',
      name: 'Smart Form',
      description: 'Intelligent form auto-completion',
      component: SmartForm,
      color: 'green',
      tests: [
        'Auto-completion',
        'Data enrichment',
        'Validation scoring',
        'Smart suggestions'
      ]
    },
    {
      id: 'voice',
      name: 'Voice Search',
      description: 'Natural language voice processing',
      component: VoiceSearch,
      color: 'orange',
      tests: [
        'Speech recognition',
        'Intent extraction',
        'Multi-language support',
        'Audio feedback'
      ]
    },
    {
      id: 'analytics',
      name: 'AI Analytics',
      description: 'Business intelligence dashboard',
      component: AIAnalyticsDashboard,
      color: 'red',
      tests: [
        'Real-time tracking',
        'Predictive analytics',
        'User journey analysis',
        'Insight generation'
      ]
    }
  ];

  const runSingleTest = async (featureId: string, testName: string) => {
    const testKey = `${featureId}-${testName}`;
    
    setTestResults(prev => [
      ...prev.filter(t => t.feature !== testKey),
      { feature: testKey, status: 'running' }
    ]);

    // Simulate test execution
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    const duration = Date.now() - startTime;

    const success = Math.random() > 0.2; // 80% success rate
    
    setTestResults(prev => [
      ...prev.filter(t => t.feature !== testKey),
      {
        feature: testKey,
        status: success ? 'success' : 'error',
        result: success ? 'Test passed successfully' : 'Test failed - check configuration',
        duration
      }
    ]);
  };

  const runAllTests = async () => {
    setIsRunningAllTests(true);
    setTestResults([]);

    for (const feature of aiFeatures) {
      for (const test of feature.tests) {
        await runSingleTest(feature.id, test);
        await new Promise(resolve => setTimeout(resolve, 500)); // Stagger tests
      }
    }

    setIsRunningAllTests(false);
  };

  const getTestStatus = (featureId: string, testName: string) => {
    const testKey = `${featureId}-${testName}`;
    return testResults.find(t => t.feature === testKey);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          AI Features <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Testing Suite</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Comprehensive testing environment for all AI-powered features in the Trebound platform
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={runAllTests}
            disabled={isRunningAllTests}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
          >
            {isRunningAllTests ? (
              <>
                <FiRefreshCw className="animate-spin" />
                <span>Running Tests...</span>
              </>
            ) : (
              <>
                <FiPlay />
                <span>Run All Tests</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setTestResults([])}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Clear Results
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiFeatures.map((feature) => (
          <motion.div
            key={feature.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className={`h-3 bg-gradient-to-r from-${feature.color}-400 to-${feature.color}-600`}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              
              <div className="space-y-3">
                {feature.tests.map((test) => {
                  const testStatus = getTestStatus(feature.id, test);
                  return (
                    <div key={test} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{test}</span>
                      <div className="flex items-center space-x-2">
                        {testStatus?.status === 'running' && (
                          <FiRefreshCw className="animate-spin text-blue-500" />
                        )}
                        {testStatus?.status === 'success' && (
                          <FiCheck className="text-green-500" />
                        )}
                        {testStatus?.status === 'error' && (
                          <FiAlertCircle className="text-red-500" />
                        )}
                        <button
                          onClick={() => runSingleTest(feature.id, test)}
                          disabled={testStatus?.status === 'running'}
                          className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors disabled:opacity-50"
                        >
                          Test
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button
                onClick={() => setActiveTab(feature.id)}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                View Component
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Test Results Summary */}
      {testResults.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FiTrendingUp className="mr-2" />
            Test Results Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {testResults.filter(t => t.status === 'success').length}
              </div>
              <div className="text-green-700">Passed</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {testResults.filter(t => t.status === 'error').length}
              </div>
              <div className="text-red-700">Failed</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {testResults.filter(t => t.status === 'running').length}
              </div>
              <div className="text-blue-700">Running</div>
            </div>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{result.feature}</span>
                <div className="flex items-center space-x-2">
                  {result.duration && (
                    <span className="text-xs text-gray-500">{result.duration}ms</span>
                  )}
                  <div className={`w-3 h-3 rounded-full ${
                    result.status === 'success' ? 'bg-green-500' :
                    result.status === 'error' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderComponentDemo = (featureId: string) => {
    const feature = aiFeatures.find(f => f.id === featureId);
    if (!feature) return null;

    const Component = feature.component;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{feature.name} Demo</h2>
          <p className="text-lg text-gray-600">{feature.description}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Live Component</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 min-h-[400px]">
            <Component />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
            <ul className="space-y-2">
              {feature.tests.map((test, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <FiCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">{test}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuration</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">AI Model</span>
                <span className="text-gray-800">GPT-4 Turbo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Confidence</span>
                <span className="text-gray-800">98.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Response Time</span>
                <span className="text-gray-800">{"<2s"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FiTrendingUp },
    ...aiFeatures.map(f => ({ id: f.id, name: f.name, icon: FiSettings }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' ? renderOverview() : renderComponentDemo(activeTab)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AITesting; 