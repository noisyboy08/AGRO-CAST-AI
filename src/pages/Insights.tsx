import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Lightbulb, TrendingUp, Leaf, Download, Share2, BarChart3, AlertCircle } from 'lucide-react';
import { generatePDFReport } from '../utils/reportGenerator';

const Insights = () => {
  const { state } = useAppContext();
  const [selectedInsight, setSelectedInsight] = useState('efficiency');

  const insights = [
    {
      id: 'efficiency',
      title: 'Energy Efficiency Optimization',
      icon: TrendingUp,
      color: 'blue',
      data: [
        {
          title: 'Solar vs Grid Power Impact',
          description: 'Switching to solar irrigation could improve efficiency by 35% and reduce costs by $120/ha',
          impact: 'High',
          savings: '$120/ha',
          recommendation: 'Consider installing solar panels for irrigation systems',
        },
        {
          title: 'Optimal Irrigation Timing',
          description: 'Early morning irrigation (5-7 AM) reduces energy consumption by 18%',
          impact: 'Medium',
          savings: '$45/ha',
          recommendation: 'Adjust irrigation schedule to cooler hours',
        },
      ]
    },
    {
      id: 'yield',
      title: 'Yield Optimization',
      icon: BarChart3,
      color: 'green',
      data: [
        {
          title: 'Precision Fertilizer Application',
          description: 'Variable rate fertilization can increase yield by 12% while reducing fertilizer use by 8%',
          impact: 'High',
          savings: '12% yield increase',
          recommendation: 'Implement precision agriculture technology',
        },
        {
          title: 'Crop Rotation Benefits',
          description: 'Rotating with legumes improves soil nitrogen and increases subsequent crop yields',
          impact: 'Medium',
          savings: '8% yield increase',
          recommendation: 'Plan 3-year rotation with nitrogen-fixing crops',
        },
      ]
    },
    {
      id: 'sustainability',
      title: 'Sustainability Improvements',
      icon: Leaf,
      color: 'emerald',
      data: [
        {
          title: 'Carbon Footprint Reduction',
          description: 'Implementing cover crops and no-till practices reduces CO₂ emissions by 25%',
          impact: 'High',
          savings: '2.5 tons CO₂/ha',
          recommendation: 'Adopt regenerative agriculture practices',
        },
        {
          title: 'Water Conservation',
          description: 'Drip irrigation systems reduce water usage by 40% compared to conventional sprinklers',
          impact: 'High',
          savings: '40% water reduction',
          recommendation: 'Upgrade to precision irrigation systems',
        },
      ]
    },
  ];

  const currentInsights = insights.find(i => i.id === selectedInsight);

  const handleDownloadReport = async () => {
    const reportData = {
      predictions: state.predictions,
      currentPrediction: state.currentPrediction,
      insights: insights,
      generatedAt: new Date().toISOString(),
    };
    
    await generatePDFReport(reportData);
  };

  const handleShareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AgriPredict Analysis Results',
          text: 'Check out my agricultural efficiency analysis results',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Results link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Lightbulb className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Smart Agricultural Insights
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered recommendations to optimize your farming operations
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleDownloadReport}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF Report
          </button>
          <button
            onClick={handleShareResults}
            className="flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Results
          </button>
        </div>

        {/* Insight Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <button
                key={insight.id}
                onClick={() => setSelectedInsight(insight.id)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedInsight === insight.id
                    ? `bg-${insight.color}-100 text-${insight.color}-700 shadow-md`
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {insight.title}
              </button>
            );
          })}
        </div>

        {/* Current Prediction Summary */}
        {state.currentPrediction && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Current Analysis Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-600">
                  {state.currentPrediction.predictedYield.toFixed(1)} t/ha
                </h3>
                <p className="text-gray-600">Predicted Yield</p>
                <p className="text-sm text-gray-500 mt-1">
                  {state.currentPrediction.crop} - {state.currentPrediction.season}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">
                  {state.currentPrediction.energyData?.efficiencyScore?.toFixed(1) || 'N/A'} kg/kWh
                </h3>
                <p className="text-gray-600">Energy Efficiency</p>
                <p className="text-sm text-gray-500 mt-1">
                  {state.currentPrediction.energyData?.energyType || 'Not calculated'}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600">
                  87%
                </h3>
                <p className="text-gray-600">Sustainability Score</p>
                <p className="text-sm text-gray-500 mt-1">
                  Above industry average
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-purple-600">
                  $340
                </h3>
                <p className="text-gray-600">Potential Savings</p>
                <p className="text-sm text-gray-500 mt-1">
                  Per hectare annually
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Insights */}
        {currentInsights && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentInsights.data.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.impact === 'High' 
                      ? 'bg-red-100 text-red-700' 
                      : item.impact === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {item.impact} Impact
                  </span>
                </div>

                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Potential Benefit:
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {item.savings}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                      Recommendation:
                    </h4>
                    <p className="text-sm text-blue-700">
                      {item.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Implementation Guide */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Implement These Insights?
            </h2>
            <p className="text-lg text-green-100 mb-6">
              Our team can help you implement these recommendations and track your progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-200">
                Schedule Consultation
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-700 transition-colors duration-200">
                Download Implementation Guide
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help implementing these recommendations?{' '}
            <a href="mailto:support@agripredict.com" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our experts
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;