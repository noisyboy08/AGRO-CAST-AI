import React, { useState } from 'react';
import { Droplets, Calendar, Clock, Thermometer, Cloud, Zap, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface IrrigationSchedule {
  day: string;
  date: string;
  time: string;
  duration: number;
  amount: number;
  reason: string;
  priority: 'low' | 'medium' | 'high';
}

interface WeatherForecast {
  day: string;
  date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

const SmartIrrigationAssistant = () => {
  const [selectedField, setSelectedField] = useState('north-field');
  const [irrigationMode, setIrrigationMode] = useState<'auto' | 'manual'>('auto');

  const irrigationSchedule: IrrigationSchedule[] = [
    {
      day: 'Today',
      date: 'Jan 15',
      time: '6:00 AM',
      duration: 45,
      amount: 25,
      reason: 'Soil moisture below optimal (45%)',
      priority: 'high'
    },
    {
      day: 'Tomorrow',
      date: 'Jan 16',
      time: '5:30 AM',
      duration: 30,
      amount: 18,
      reason: 'Maintain optimal moisture levels',
      priority: 'medium'
    },
    {
      day: 'Wednesday',
      date: 'Jan 17',
      time: 'Skip',
      duration: 0,
      amount: 0,
      reason: 'Rain forecast (15mm expected)',
      priority: 'low'
    },
    {
      day: 'Thursday',
      date: 'Jan 18',
      time: '6:15 AM',
      duration: 35,
      amount: 22,
      reason: 'Post-rain moisture adjustment',
      priority: 'medium'
    },
    {
      day: 'Friday',
      date: 'Jan 19',
      time: '5:45 AM',
      duration: 40,
      amount: 28,
      reason: 'High temperature forecast (32°C)',
      priority: 'high'
    }
  ];

  const weatherForecast: WeatherForecast[] = [
    { day: 'Today', date: 'Jan 15', temperature: 28, humidity: 65, rainfall: 0, windSpeed: 12 },
    { day: 'Tomorrow', date: 'Jan 16', temperature: 30, humidity: 58, rainfall: 0, windSpeed: 15 },
    { day: 'Wednesday', date: 'Jan 17', temperature: 26, humidity: 78, rainfall: 15, windSpeed: 8 },
    { day: 'Thursday', date: 'Jan 18', temperature: 29, humidity: 62, rainfall: 2, windSpeed: 10 },
    { day: 'Friday', date: 'Jan 19', temperature: 32, humidity: 55, rainfall: 0, windSpeed: 18 }
  ];

  const fieldData = {
    'north-field': {
      name: 'North Field - Corn',
      soilMoisture: 45,
      lastIrrigation: '2 days ago',
      nextIrrigation: 'Today 6:00 AM',
      totalWaterUsed: 1250,
      efficiency: 87
    },
    'south-field': {
      name: 'South Field - Soybeans',
      soilMoisture: 62,
      lastIrrigation: '1 day ago',
      nextIrrigation: 'Tomorrow 5:30 AM',
      totalWaterUsed: 980,
      efficiency: 92
    },
    'east-field': {
      name: 'East Field - Wheat',
      soilMoisture: 38,
      lastIrrigation: '3 days ago',
      nextIrrigation: 'Today 7:00 AM',
      totalWaterUsed: 1450,
      efficiency: 78
    }
  };

  const currentField = fieldData[selectedField as keyof typeof fieldData];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getMoistureColor = (moisture: number) => {
    if (moisture >= 60) return 'text-green-600 dark:text-green-400';
    if (moisture >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-blue-600" />
          Smart Irrigation Assistant
        </h2>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          >
            <option value="north-field">North Field - Corn</option>
            <option value="south-field">South Field - Soybeans</option>
            <option value="east-field">East Field - Wheat</option>
          </select>
          
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-slate-700 rounded-lg p-1 transition-colors duration-300">
            <button
              onClick={() => setIrrigationMode('auto')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                irrigationMode === 'auto'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Auto
            </button>
            <button
              onClick={() => setIrrigationMode('manual')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                irrigationMode === 'manual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Manual
            </button>
          </div>
        </div>
      </div>

      {/* Field Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className={`text-2xl font-bold ${getMoistureColor(currentField.soilMoisture)}`}>
              {currentField.soilMoisture}%
            </span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">Soil Moisture</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {currentField.efficiency}%
            </span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">Water Efficiency</p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {currentField.lastIrrigation}
            </span>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">Last Irrigation</p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
              {currentField.nextIrrigation}
            </span>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300">Next Irrigation</p>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="weather" className="flex items-center space-x-2">
            <Cloud className="h-4 w-4" />
            <span>Weather</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <div className="space-y-3">
            {irrigationSchedule.map((schedule, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg transition-colors duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    {schedule.time === 'Skip' ? (
                      <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {schedule.day} ({schedule.date})
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(schedule.priority)}`}>
                      {schedule.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{schedule.time}</span>
                    </span>
                    {schedule.duration > 0 && (
                      <>
                        <span>{schedule.duration} min</span>
                        <span>{schedule.amount}mm water</span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {schedule.reason}
                  </p>
                </div>
                
                {schedule.day === 'Today' && schedule.time !== 'Skip' && (
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                    Start Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {weatherForecast.map((forecast, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 text-center transition-colors duration-300"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {forecast.day}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {forecast.date}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span className="text-gray-900 dark:text-white">{forecast.temperature}°C</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-900 dark:text-white">{forecast.humidity}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <Cloud className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">{forecast.rainfall}mm</span>
                  </div>
                </div>
                
                {forecast.rainfall > 10 && (
                  <div className="mt-3 px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded text-xs text-blue-800 dark:text-blue-200">
                    Skip irrigation
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Water Usage Chart */}
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 transition-colors duration-300">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Weekly Water Usage
              </h4>
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const usage = [25, 30, 0, 22, 28, 20, 15][index];
                  return (
                    <div key={day} className="flex items-center space-x-3">
                      <span className="w-8 text-sm text-gray-600 dark:text-gray-300">{day}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-slate-600 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(usage / 30) * 100}%` }}
                        ></div>
                      </div>
                      <span className="w-12 text-sm text-gray-900 dark:text-white text-right">
                        {usage}mm
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Efficiency Metrics */}
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 transition-colors duration-300">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Efficiency Metrics
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Water Saved</span>
                  <span className="font-medium text-green-600 dark:text-green-400">320L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Energy Saved</span>
                  <span className="font-medium text-green-600 dark:text-green-400">45 kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Cost Savings</span>
                  <span className="font-medium text-green-600 dark:text-green-400">$28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Optimal Irrigations</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">18/20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 transition-colors duration-300">
            <h4 className="font-medium text-emerald-900 dark:text-emerald-300 mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Smart Recommendations
            </h4>
            <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Shift irrigation to 5:30 AM to reduce evaporation by 12%</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Install soil moisture sensors in East Field for 15% water savings</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Consider drip irrigation upgrade for 25% efficiency improvement</span>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartIrrigationAssistant;