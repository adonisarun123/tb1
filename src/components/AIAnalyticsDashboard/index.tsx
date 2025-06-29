import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiActivity, 
  FiMapPin, 
  FiCalendar,
  FiDollarSign,
  FiTarget,
  FiZap,
  FiEye,
  FiMousePointer,
  FiClock,
  FiBarChart,
  FiPieChart,
  FiRefreshCw,
  FiDownload,
  FiFilter,
  FiChevronUp,
  FiChevronDown
} from 'react-icons/fi';

interface AnalyticsData {
  totalUsers: number;
  conversionRate: number;
  averageEngagement: number;
  topActivities: Array<{
    name: string;
    views: number;
    conversions: number;
    revenue: number;
  }>;
  userBehavior: Array<{
    action: string;
    count: number;
    percentage: number;
  }>;
  geographicData: Array<{
    location: string;
    users: number;
    conversions: number;
  }>;
  aiInsights: Array<{
    title: string;
    description: string;
    confidence: number;
    impact: 'high' | 'medium' | 'low';
    recommendation: string;
  }>;
}

interface MetricCard {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

const AIAnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState<'overview' | 'behavior' | 'geography' | 'insights'>('overview');
  const [refreshing, setRefreshing] = useState(false);

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedTimeRange]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData: AnalyticsData = {
      totalUsers: 12847,
      conversionRate: 8.4,
      averageEngagement: 4.2,
      topActivities: [
        { name: 'Virtual Escape Room', views: 2340, conversions: 187, revenue: 467500 },
        { name: 'Cooking Workshop', views: 1890, conversions: 142, revenue: 497000 },
        { name: 'Outdoor Adventure', views: 1650, conversions: 98, revenue: 196000 }
      ],
      userBehavior: [
        { action: 'Search Activities', count: 8450, percentage: 65.8 },
        { action: 'View Activity Details', count: 5230, percentage: 40.7 },
        { action: 'Contact Form Started', count: 2140, percentage: 16.6 },
        { action: 'Contact Form Submitted', count: 1080, percentage: 8.4 }
      ],
      geographicData: [
        { location: 'Bangalore', users: 4230, conversions: 380 },
        { location: 'Mumbai', users: 2890, conversions: 245 },
        { location: 'Delhi', users: 2140, conversions: 198 }
      ],
      aiInsights: [
        {
          title: 'Peak Conversion Time',
          description: 'Friday afternoons show 23% higher conversion rates',
          confidence: 0.92,
          impact: 'high',
          recommendation: 'Increase marketing spend on Fridays and optimize content for afternoon traffic'
        },
        {
          title: 'Geographic Opportunity',
          description: 'Chennai market shows high engagement but low conversion',
          confidence: 0.87,
          impact: 'medium',
          recommendation: 'Test localized pricing and Tamil language content for Chennai users'
        }
      ]
    };
    
    setAnalyticsData(mockData);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAnalyticsData();
    setRefreshing(false);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getMetricCards = (): MetricCard[] => {
    if (!analyticsData) return [];
    
    return [
      {
        title: 'Total Users',
        value: formatNumber(analyticsData.totalUsers),
        change: 12.5,
        icon: <FiUsers size={24} />,
        color: 'from-blue-500 to-blue-600',
        trend: 'up'
      },
      {
        title: 'Conversion Rate',
        value: `${analyticsData.conversionRate}%`,
        change: 2.1,
        icon: <FiTarget size={24} />,
        color: 'from-green-500 to-green-600',
        trend: 'up'
      },
      {
        title: 'Avg. Engagement',
        value: `${analyticsData.averageEngagement} min`,
        change: -0.8,
        icon: <FiClock size={24} />,
        color: 'from-orange-500 to-orange-600',
        trend: 'down'
      },
      {
        title: 'Total Revenue',
        value: formatCurrency(analyticsData.topActivities.reduce((sum, activity) => sum + activity.revenue, 0)),
        change: 18.3,
        icon: <FiDollarSign size={24} />,
        color: 'from-purple-500 to-purple-600',
        trend: 'up'
      }
    ];
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4C39]"></div>
              <p className="text-gray-600 font-medium">Loading AI Analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-xl flex items-center justify-center">
                  <FiBarChart className="text-white" />
                </div>
                <span>AI Analytics Dashboard</span>
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time insights powered by artificial intelligence
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
              
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-[#FF4C39] text-white rounded-lg hover:bg-[#FF6B5A] disabled:opacity-50 transition-colors"
              >
                <FiRefreshCw className={refreshing ? 'animate-spin' : ''} size={16} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getMetricCards().map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${metric.color} p-4`}>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="text-white/80 text-sm">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div className="opacity-80">{metric.icon}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  {metric.trend === 'up' ? (
                    <FiChevronUp className="text-green-500" size={16} />
                  ) : metric.trend === 'down' ? (
                    <FiChevronDown className="text-red-500" size={16} />
                  ) : null}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' :
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-gray-500 text-sm">vs last period</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: <FiBarChart size={16} /> },
                { id: 'behavior', label: 'User Behavior', icon: <FiMousePointer size={16} /> },
                { id: 'geography', label: 'Geography', icon: <FiMapPin size={16} /> },
                { id: 'insights', label: 'AI Insights', icon: <FiZap size={16} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FF4C39] text-[#FF4C39]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'insights' && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Insights</h3>
                    <div className="space-y-4">
                      {analyticsData?.aiInsights.map((insight, index) => (
                        <motion.div
                          key={insight.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#FF4C39]"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <FiZap className="text-[#FF4C39]" size={20} />
                              <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                                {insight.impact.toUpperCase()} IMPACT
                              </span>
                              <span className="text-xs text-gray-500">
                                {Math.round(insight.confidence * 100)}% confidence
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{insight.description}</p>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-sm text-blue-800">
                              <strong>Recommendation:</strong> {insight.recommendation}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsDashboard; 