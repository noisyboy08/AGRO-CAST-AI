import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Zap, Settings, Calculator, TrendingUp, ArrowRight } from 'lucide-react';
import { calculateEnergyEfficiency } from '../utils/energyCalculator';

const EnergyCalculator = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [energyData, setEnergyData] = useState({
    irrigationHours: '',
    fertilizerUsage: '',
    energyType: '',
    equipmentPower: '',
    fuelConsumption: '',
    electricityCost: '',
  });
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const energyTypes = [
    { value: 'grid', label: 'Grid Electricity' },
    { value: 'solar', label: 'Solar Power' },
    { value: 'diesel', label: 'Diesel Generator' },
    { value: 'wind', label: 'Wind Power' },
    { value: 'hybrid', label: 'Hybrid System' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEnergyData({
      ...energyData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const calculationResults = calculateEnergyEfficiency({
      ...energyData,
      irrigationHours: parseFloat(energyData.irrigationHours),
      fertilizerUsage: parseFloat(energyData.fertilizerUsage),
      equipmentPower: parseFloat(energyData.equipmentPower || '0'),
      fuelConsumption: parseFloat(energyData.fuelConsumption || '0'),
      electricityCost: parseFloat(energyData.electricityCost || '0'),
      currentYield: state.currentPrediction?.predictedYield || 5.5,
    });

    setResults(calculationResults);

    // Update context with energy data
    dispatch({
      type: 'UPDATE_ENERGY_DATA',
      payload: {
        irrigationHours: parseFloat(energyData.irrigationHours),
        fertilizerUsage: parseFloat(energyData.fertilizerUsage),
        energyType: energyData.energyType,
        efficiencyScore: calculationResults.efficiencyScore,
      }
    });

    setIsLoading(false);
  };

  const isFormValid = energyData.irrigationHours && energyData.fertilizerUsage && energyData.energyType;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Energy Efficiency Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Optimize your agricultural energy consumption and calculate efficiency metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Energy Input Parameters
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Energy Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Zap className="h-4 w-4 inline mr-2" />
                    Primary Energy Source
                  </label>
                  <select
                    name="energyType"
                    value={energyData.energyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select energy source</option>
                    {energyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Irrigation and Equipment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Irrigation Hours/Season
                    </label>
                    <input
                      type="number"
                      name="irrigationHours"
                      value={energyData.irrigationHours}
                      onChange={handleInputChange}
                      placeholder="120"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment Power (kW)
                    </label>
                    <input
                      type="number"
                      name="equipmentPower"
                      value={energyData.equipmentPower}
                      onChange={handleInputChange}
                      placeholder="15"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Fertilizer and Fuel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Settings className="h-4 w-4 inline mr-2" />
                      Fertilizer Usage (kg/ha)
                    </label>
                    <input
                      type="number"
                      name="fertilizerUsage"
                      value={energyData.fertilizerUsage}
                      onChange={handleInputChange}
                      placeholder="200"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuel Consumption (L/ha)
                    </label>
                    <input
                      type="number"
                      name="fuelConsumption"
                      value={energyData.fuelConsumption}
                      onChange={handleInputChange}
                      placeholder="50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Electricity Cost ($/kWh)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="electricityCost"
                    value={energyData.electricityCost}
                    onChange={handleInputChange}
                    placeholder="0.12"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Calculating Efficiency...
                    </div>
                  ) : (
                    <>
                      Calculate Energy Efficiency
                      <Calculator className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results && (
              <>
                {/* Efficiency Score */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Energy Efficiency Score
                  </h3>
                  <div className="text-center py-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                    <h4 className="text-3xl font-bold text-orange-600 mb-2">
                      {results.efficiencyScore.toFixed(1)}
                    </h4>
                    <p className="text-gray-600">kg yield per kWh</p>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Energy Breakdown
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Energy Consumption:</span>
                      <span className="font-semibold">{results.totalEnergy.toFixed(1)} kWh/ha</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Energy Cost:</span>
                      <span className="font-semibold">${results.energyCost.toFixed(2)}/ha</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">CO₂ Emissions:</span>
                      <span className="font-semibold">{results.co2Emissions.toFixed(1)} kg CO₂/ha</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sustainability Rating:</span>
                      <span className={`font-semibold px-2 py-1 rounded text-sm ${
                        results.sustainabilityRating >= 8 ? 'bg-green-100 text-green-800' :
                        results.sustainabilityRating >= 6 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {results.sustainabilityRating}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">
                    Optimization Recommendations
                  </h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Next Steps
                  </h3>
                  <button
                    onClick={() => navigate('/insights')}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    View Detailed Insights
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </>
            )}

            {/* Information Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Energy Efficiency Metrics
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-900">kg yield/kWh:</strong> Measures how much crop yield is produced per unit of energy consumed.
                </div>
                <div>
                  <strong className="text-gray-900">Total Energy:</strong> Includes irrigation, fertilization, equipment operation, and processing.
                </div>
                <div>
                  <strong className="text-gray-900">Sustainability Rating:</strong> Overall environmental impact score considering renewable energy use and emissions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyCalculator;