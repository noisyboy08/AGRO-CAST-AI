import React from 'react';

interface Prediction {
  crop: string;
  predictedYield: number;
  season: string;
}

interface YieldChartProps {
  predictions: Prediction[];
}

const YieldChart: React.FC<YieldChartProps> = ({ predictions }) => {
  // Mock data for demonstration if no predictions
  const data = predictions.length > 0 ? predictions.slice(-6) : [
    { crop: 'Wheat', predictedYield: 4.2, season: 'Spring' },
    { crop: 'Corn', predictedYield: 8.1, season: 'Summer' },
    { crop: 'Rice', predictedYield: 6.5, season: 'Summer' },
    { crop: 'Soybeans', predictedYield: 3.8, season: 'Fall' },
    { crop: 'Barley', predictedYield: 5.2, season: 'Spring' },
    { crop: 'Cotton', predictedYield: 2.1, season: 'Summer' },
  ];

  const maxYield = Math.max(...data.map(d => d.predictedYield)) * 1.2;

  return (
    <div className="w-full h-64">
      <div className="flex items-end justify-between h-full pb-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 mx-1">
            <div className="w-full flex justify-center mb-2">
              <div
                className="bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-500 hover:from-green-700 hover:to-green-500"
                style={{
                  height: `${(item.predictedYield / maxYield) * 200}px`,
                  minHeight: '20px',
                  width: '100%',
                  maxWidth: '40px',
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-900">
                {item.predictedYield.toFixed(1)}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {item.crop}
              </p>
              <p className="text-xs text-gray-500">
                {item.season}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YieldChart;