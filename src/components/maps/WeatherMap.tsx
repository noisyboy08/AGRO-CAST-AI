import React, { useState } from 'react';
import { MapPin, CloudRain, Sun, Thermometer } from 'lucide-react';

const WeatherMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = [
    {
      id: 'iowa',
      name: 'Iowa, USA',
      lat: 42,
      lng: -93,
      temp: 22,
      rainfall: 850,
      ndvi: 0.75,
      soilMoisture: 65,
    },
    {
      id: 'nebraska',
      name: 'Nebraska, USA',
      lat: 41,
      lng: -100,
      temp: 24,
      rainfall: 580,
      ndvi: 0.68,
      soilMoisture: 45,
    },
    {
      id: 'kansas',
      name: 'Kansas, USA',
      lat: 38.5,
      lng: -98,
      temp: 26,
      rainfall: 680,
      ndvi: 0.71,
      soilMoisture: 52,
    },
    {
      id: 'illinois',
      name: 'Illinois, USA',
      lat: 40,
      lng: -89,
      temp: 21,
      rainfall: 920,
      ndvi: 0.78,
      soilMoisture: 72,
    },
  ];

  return (
    <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-green-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Location Markers */}
      {locations.map((location) => (
        <div
          key={location.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{
            left: `${50 + (location.lng + 96) * 2}%`,
            top: `${50 - (location.lat - 39) * 8}%`,
          }}
          onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
        >
          <div className={`relative ${selectedLocation === location.id ? 'scale-110' : 'hover:scale-105'} transition-transform duration-200`}>
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
            <MapPin className="absolute -top-8 -left-3 h-6 w-6 text-red-600" />
          </div>

          {/* Location Info Popup */}
          {selectedLocation === location.id && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 min-w-60 z-10 border">
              <h3 className="font-semibold text-gray-900 mb-3">{location.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span>Temperature</span>
                  </div>
                  <span className="font-medium">{location.temp}°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CloudRain className="h-4 w-4 text-blue-500" />
                    <span>Rainfall</span>
                  </div>
                  <span className="font-medium">{location.rainfall}mm</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-green-500" />
                    <span>NDVI</span>
                  </div>
                  <span className="font-medium">{location.ndvi}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-brown-500 rounded-sm" style={{backgroundColor: '#8B4513'}} />
                    <span>Soil Moisture</span>
                  </div>
                  <span className="font-medium">{location.soilMoisture}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 text-xs">
        <h4 className="font-semibold mb-2">Map Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Weather Stations</span>
          </div>
          <p className="text-gray-600 mt-2">Click markers for details</p>
        </div>
      </div>

      {/* Data Sources */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-lg p-3 text-xs text-gray-600">
        <p>Data sources:</p>
        <p>NASA POWER • Sentinel • USDA</p>
      </div>
    </div>
  );
};

export default WeatherMap;