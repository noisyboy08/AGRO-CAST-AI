import React from 'react';

interface Prediction {
  crop: string;
  energyData?: {
    efficiencyScore: number;
    energyType: string;
  };
}

interface EnergyEfficiencyChartProps {
  predictions: Prediction[];
}

const EnergyEfficiencyChart: React.FC<EnergyEfficiencyChartProps> = ({ predictions }) => {
  // Mock data for demonstration
  const data = [
    { energyType: 'Solar', efficiency: 8.5, color: 'bg-yellow-500' },
    { energyType: 'Wind', efficiency: 7.8, color: 'bg-blue-500' },
    { energyType: 'Grid', efficiency: 5.2, color: 'bg-gray-500' },
    { energyType: 'Diesel', efficiency: 4.1, color: 'bg-red-500' },
    { energyType: 'Hybrid', efficiency: 7.2, color: 'bg-green-500' },
  ];

  const maxEfficiency = Math.max(...data.map(d => d.efficiency)) * 1.1;

  return (
    <div className="w-full h-64">
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-20 text-sm font-medium text-gray-700 text-right">
              {item.energyType}
            </div>
            <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} transition-all duration-1000 ease-out rounded-full flex items-center justify-end pr-3`}
                style={{
                  width: `${(item.efficiency / maxEfficiency) * 100}%`,
                }}
              >
                <span className="text-white text-xs font-semibold">
                  {item.efficiency} kg/kWh
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyEfficiencyChart;