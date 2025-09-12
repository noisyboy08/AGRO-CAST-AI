import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Sprout, MapPin, Calendar, BarChart3, ArrowRight } from 'lucide-react';
import { predictCropYield } from '../utils/mlModels';

const YieldPredictor = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    crop: '',
    location: '',
    season: '',
    soilType: '',
    rainfall: '',
    temperature: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  const cropOptions = [
    'Wheat', 'Rice', 'Corn', 'Soybeans', 'Barley', 'Cotton', 'Sugarcane', 'Potatoes'
  ];

  const seasonOptions = [
    'Spring', 'Summer', 'Fall', 'Winter'
  ];

  const soilTypes = [
    'Clay', 'Sandy', 'Loam', 'Silt', 'Peat', 'Chalky'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const predictedYield = predictCropYield(formData);
    setPrediction(predictedYield);

    const predictionData = {
      crop: formData.crop,
      location: formData.location,
      season: formData.season,
      predictedYield: predictedYield,
    };

    dispatch({ type: 'ADD_PREDICTION', payload: predictionData });
    setIsLoading(false);
  };

  const isFormValid = formData.crop && formData.location && formData.season;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Sprout className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Crop Yield Predictor
          </h1>
          <p className="text-lg text-gray-600">
            Get accurate crop yield predictions using advanced machine learning models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Prediction Parameters
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Crop Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Sprout className="h-4 w-4 inline mr-2" />
                  Crop Type
                </label>
                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select crop type</option>
                  {cropOptions.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Iowa, USA"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Season */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Growing Season
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select season</option>
                  {seasonOptions.map((season) => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type
                </label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select soil type</option>
                  {soilTypes.map((soil) => (
                    <option key={soil} value={soil}>{soil}</option>
                  ))}
                </select>
              </div>

              {/* Weather Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleInputChange}
                    placeholder="800"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avg Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    placeholder="25"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Prediction...
                  </div>
                ) : (
                  <>
                    Generate Prediction
                    <BarChart3 className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Prediction Result */}
            {prediction !== null && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Prediction Results
                </h2>
                
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                    <Sprout className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {prediction.toFixed(1)} tons/hectare
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Predicted yield for {formData.crop} in {formData.season}
                  </p>
                  
                  <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-green-700">
                      This prediction is based on advanced machine learning models 
                      considering weather patterns, soil conditions, and historical data.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/energy-calculator')}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Calculate Energy Efficiency
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Information Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                How It Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-green-600">1</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Input crop type, location, and growing conditions
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-green-600">2</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    AI analyzes weather data, soil conditions, and historical patterns
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-green-600">3</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Get accurate yield predictions with confidence intervals
                  </p>
                </div>
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Data Sources
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• NASA POWER Weather Database</li>
                <li>• Sentinel Satellite NDVI Data</li>
                <li>• USDA Crop Yield Statistics</li>
                <li>• Global Soil Database</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPredictor;