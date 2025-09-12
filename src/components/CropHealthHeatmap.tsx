import React, { useState } from 'react';
import { MapPin, Thermometer, Droplets, Leaf, AlertTriangle, CheckCircle } from 'lucide-react';

interface FieldData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  ndvi: number;
  soilMoisture: number;
  temperature: number;
  crop: string;
  predictedYield: number;
}

const CropHealthHeatmap = () => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const fields: FieldData[] = [
    {
      id: 'field1',
      name: 'North Field',
      lat: 42.5,
      lng: -93.2,
      health: 'excellent',
      ndvi: 0.85,
      soilMoisture: 75,
      temperature: 24,
      crop: 'Corn',
      predictedYield: 9.2
    },
    {
      id: 'field2',
      name: 'South Field',
      lat: 42.3,
      lng: -93.1,
      health: 'good',
      ndvi: 0.72,
      soilMoisture: 65,
      temperature: 26,
      crop: 'Soybeans',
      predictedYield: 3.8
    },
    {
      id: 'field3',
      name: 'East Field',
      lat: 42.4,
      lng: -92.9,
      health: 'warning',
      ndvi: 0.58,
      soilMoisture: 45,
      temperature: 28,
      crop: 'Wheat',
      predictedYield: 3.2
    },
    {
      id: 'field4',
      name: 'West Field',
      lat: 42.2,
      lng: -93.4,
      health: 'critical',
      ndvi: 0.42,
      soilMoisture: 35,
      temperature: 31,
      crop: 'Cotton',
      predictedYield: 1.8
    }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-emerald-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="h-4 w-4 text-white" />;
      case 'warning':
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-white" />;
      default:
        return <MapPin className="h-4 w-4 text-white" />;
    }
  };

  const selectedFieldData = fields.find(f => f.id === selectedField);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Crop Health Heatmap
        </h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">Excellent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">Good</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">Critical</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Visualization */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-80 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-lg overflow-hidden">
            {/* Mock Map Background */}
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Field Markers */}
            {fields.map((field) => (
              <div
                key={field.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${50 + (field.lng + 93) * 15}%`,
                  top: `${50 - (field.lat - 42.3) * 25}%`,
                }}
                onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
              >
                <div className={`relative ${selectedField === field.id ? 'scale-125' : 'hover:scale-110'} transition-transform duration-200`}>
                  <div className={`w-8 h-8 ${getHealthColor(field.health)} rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse`}>
                    {getHealthIcon(field.health)}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {field.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field Details Panel */}
        <div className="space-y-4">
          {selectedFieldData ? (
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 transition-colors duration-300">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {selectedFieldData.name}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">NDVI</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedFieldData.ndvi.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Soil Moisture</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedFieldData.soilMoisture}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Temperature</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedFieldData.temperature}°C
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {selectedFieldData.crop}
                    </span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedFieldData.predictedYield} t/ha
                    </span>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium text-center ${
                    selectedFieldData.health === 'excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    selectedFieldData.health === 'good' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' :
                    selectedFieldData.health === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {selectedFieldData.health.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center transition-colors duration-300">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Click on a field marker to view detailed health information
              </p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center transition-colors duration-300">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {fields.filter(f => f.health === 'excellent' || f.health === 'good').length}
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">Healthy Fields</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center transition-colors duration-300">
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {fields.filter(f => f.health === 'warning' || f.health === 'critical').length}
              </div>
              <div className="text-xs text-red-700 dark:text-red-300">Need Attention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropHealthHeatmap;