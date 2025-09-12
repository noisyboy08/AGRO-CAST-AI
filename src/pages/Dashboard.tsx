import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BarChart3, TrendingUp, Leaf, Zap, Globe, Calendar } from 'lucide-react';
import YieldChart from '../components/charts/YieldChart';
import EnergyEfficiencyChart from '../components/charts/EnergyEfficiencyChart';
import WeatherMap from '../components/maps/WeatherMap';
import MetricCard from '../components/MetricCard';
import CropHealthHeatmap from '../components/CropHealthHeatmap';
import CropStoryTimeline from '../components/CropStoryTimeline';
import GamifiedInsights from '../components/GamifiedInsights';
import CropDiseaseDetection from '../components/CropDiseaseDetection';
import SmartIrrigationAssistant from '../components/SmartIrrigationAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import EconomicInsights from '../components/EconomicInsights';
import Marketplace from '../components/Marketplace';

const Dashboard = () => {
  const { state } = useAppContext();

  const metrics = [
    {
      title: 'Total Predictions',
      value: state.predictions.length.toString(),
      icon: BarChart3,
      color: 'blue',
      trend: '+12%',
    },
    {
      title: 'Avg Yield Prediction',
      value: state.predictions.length > 0 
        ? (state.predictions.reduce((acc, p) => acc + p.predictedYield, 0) / state.predictions.length).toFixed(1) + ' t/ha'
        : '0 t/ha',
      icon: TrendingUp,
      color: 'green',
      trend: '+8%',
    },
    {
      title: 'Energy Efficiency',
      value: state.currentPrediction?.energyData?.efficiencyScore 
        ? state.currentPrediction.energyData.efficiencyScore.toFixed(1) + ' kg/kWh'
        : '0 kg/kWh',
      icon: Zap,
      color: 'orange',
      trend: '+15%',
    },
    {
      title: 'Sustainability Score',
      value: '87%',
      icon: Leaf,
      color: 'emerald',
      trend: '+5%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            Agricultural Intelligence Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Monitor your crop predictions, energy efficiency, and agricultural insights in real-time.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              color={metric.color}
              trend={metric.trend}
            />
          ))}
        </div>

        {/* Enhanced Dashboard with Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Crop Health</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
            <TabsTrigger value="disease">Disease Detection</TabsTrigger>
            <TabsTrigger value="market">Market Prices</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="gamified">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                    Crop Yield Trends
                  </h2>
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <YieldChart predictions={state.predictions} />
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                    Energy Efficiency Analysis
                  </h2>
                  <Zap className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <EnergyEfficiencyChart predictions={state.predictions} />
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  Agricultural Data Visualization
                </h2>
                <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <WeatherMap />
            </div>
          </TabsContent>

          <TabsContent value="health">
            <CropHealthHeatmap />
          </TabsContent>

          <TabsContent value="timeline">
            <CropStoryTimeline />
          </TabsContent>

          <TabsContent value="irrigation">
            <SmartIrrigationAssistant />
          </TabsContent>

          <TabsContent value="disease">
            <CropDiseaseDetection />
          </TabsContent>

          <TabsContent value="market">
            <EconomicInsights />
          </TabsContent>

          <TabsContent value="marketplace">
            <Marketplace />
          </TabsContent>

          <TabsContent value="gamified">
            <GamifiedInsights />
          </TabsContent>
        </Tabs>

        {/* Recent Predictions */}
        {state.predictions.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Recent Predictions
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Crop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Season
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Predicted Yield
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Energy Efficiency
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
                  {state.predictions.slice(-5).reverse().map((prediction, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {prediction.crop}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {prediction.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {prediction.season}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {prediction.predictedYield.toFixed(1)} t/ha
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {prediction.energyData?.efficiencyScore?.toFixed(1) || 'N/A'} kg/kWh
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;