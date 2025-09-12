import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Droplets, Sun, Leaf } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface TimelineData {
  week: number;
  date: string;
  yield: number;
  rainfall: number;
  temperature: number;
  ndvi: number;
  stage: string;
  events: string[];
}

const CropStoryTimeline = () => {
  const [selectedCrop, setSelectedCrop] = useState('corn');

  const timelineData: TimelineData[] = [
    {
      week: 1,
      date: 'Mar 15',
      yield: 0,
      rainfall: 25,
      temperature: 18,
      ndvi: 0.2,
      stage: 'Planting',
      events: ['Seeds planted', 'Soil preparation completed']
    },
    {
      week: 4,
      date: 'Apr 5',
      yield: 0.5,
      rainfall: 45,
      temperature: 22,
      ndvi: 0.35,
      stage: 'Germination',
      events: ['First shoots visible', 'Applied starter fertilizer']
    },
    {
      week: 8,
      date: 'May 3',
      yield: 1.2,
      rainfall: 35,
      temperature: 25,
      ndvi: 0.55,
      stage: 'Vegetative',
      events: ['Rapid growth phase', 'Weed control applied']
    },
    {
      week: 12,
      date: 'May 31',
      yield: 2.8,
      rainfall: 60,
      temperature: 28,
      ndvi: 0.75,
      stage: 'Tasseling',
      events: ['Tassels emerged', 'Peak water demand']
    },
    {
      week: 16,
      date: 'Jun 28',
      yield: 5.2,
      rainfall: 40,
      temperature: 30,
      ndvi: 0.82,
      stage: 'Silking',
      events: ['Silk emergence', 'Critical pollination period']
    },
    {
      week: 20,
      date: 'Jul 26',
      yield: 7.8,
      rainfall: 20,
      temperature: 32,
      ndvi: 0.78,
      stage: 'Grain Filling',
      events: ['Kernel development', 'Reduced irrigation']
    },
    {
      week: 24,
      date: 'Aug 23',
      yield: 9.2,
      rainfall: 15,
      temperature: 29,
      ndvi: 0.65,
      stage: 'Maturity',
      events: ['Harvest ready', 'Moisture content optimal']
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Planting': return 'bg-brown-500';
      case 'Germination': return 'bg-green-400';
      case 'Vegetative': return 'bg-green-600';
      case 'Tasseling': return 'bg-yellow-500';
      case 'Silking': return 'bg-orange-500';
      case 'Grain Filling': return 'bg-amber-600';
      case 'Maturity': return 'bg-emerald-700';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
          Crop Story Timeline
        </h2>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
        >
          <option value="corn">Corn - North Field</option>
          <option value="soybeans">Soybeans - South Field</option>
          <option value="wheat">Wheat - East Field</option>
        </select>
      </div>

      {/* Yield Progress Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Yield Development Over Time
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Area
                type="monotone"
                dataKey="yield"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline Events */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Growth Timeline & Events
        </h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200 dark:bg-emerald-800"></div>
          
          {timelineData.map((item, index) => (
            <div key={index} className="relative flex items-start space-x-4 pb-8">
              {/* Timeline Dot */}
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 ${getStageColor(item.stage)} rounded-full shadow-lg`}>
                <span className="text-white font-bold text-sm">W{item.week}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 bg-gray-50 dark:bg-slate-700 rounded-lg p-4 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.stage} - {item.date}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="h-4 w-4" />
                      <span>{item.yield.toFixed(1)} t/ha</span>
                    </div>
                  </div>
                </div>
                
                {/* Environmental Data */}
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {item.rainfall}mm rain
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {item.temperature}°C avg
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      NDVI {item.ndvi.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {/* Events */}
                <div className="space-y-1">
                  {item.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 text-center transition-colors duration-300">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {timelineData[timelineData.length - 1].yield} t/ha
          </div>
          <div className="text-sm text-emerald-700 dark:text-emerald-300">Final Yield</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center transition-colors duration-300">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {timelineData.reduce((sum, item) => sum + item.rainfall, 0)}mm
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Total Rainfall</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center transition-colors duration-300">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {Math.round(timelineData.reduce((sum, item) => sum + item.temperature, 0) / timelineData.length)}°C
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Avg Temperature</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center transition-colors duration-300">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.max(...timelineData.map(item => item.ndvi)).toFixed(2)}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Peak NDVI</div>
        </div>
      </div>
    </div>
  );
};

export default CropStoryTimeline;