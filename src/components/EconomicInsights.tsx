import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart3, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

interface MarketPrice {
  crop: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  market: string;
  lastUpdated: string;
}

interface PriceHistory {
  date: string;
  price: number;
}

const EconomicInsights = () => {
  const [selectedCrop, setSelectedCrop] = useState('corn');
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for market prices
    const fetchMarketData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPrices: MarketPrice[] = [
        {
          crop: 'corn',
          currentPrice: 185,
          previousPrice: 178,
          change: 7,
          changePercent: 3.9,
          market: 'Chicago Board of Trade',
          lastUpdated: new Date().toISOString()
        },
        {
          crop: 'wheat',
          currentPrice: 220,
          previousPrice: 235,
          change: -15,
          changePercent: -6.4,
          market: 'Kansas City Board of Trade',
          lastUpdated: new Date().toISOString()
        },
        {
          crop: 'soybeans',
          currentPrice: 450,
          previousPrice: 445,
          change: 5,
          changePercent: 1.1,
          market: 'Chicago Board of Trade',
          lastUpdated: new Date().toISOString()
        },
        {
          crop: 'rice',
          currentPrice: 320,
          previousPrice: 315,
          change: 5,
          changePercent: 1.6,
          market: 'Chicago Rice Exchange',
          lastUpdated: new Date().toISOString()
        }
      ];

      const mockHistory: PriceHistory[] = [
        { date: 'Jan', price: 165 },
        { date: 'Feb', price: 172 },
        { date: 'Mar', price: 168 },
        { date: 'Apr', price: 175 },
        { date: 'May', price: 182 },
        { date: 'Jun', price: 178 },
        { date: 'Jul', price: 185 }
      ];

      setMarketPrices(mockPrices);
      setPriceHistory(mockHistory);
      setIsLoading(false);
    };

    fetchMarketData();
  }, []);

  const selectedPriceData = marketPrices.find(p => p.crop === selectedCrop);
  const profitForecast = selectedPriceData ? (selectedPriceData.currentPrice * 8.5).toFixed(0) : '0'; // Assuming 8.5 tons/ha yield

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-green-600" />
          Economic Insights & Market Prices
        </h2>
        
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 transition-colors duration-300"
        >
          <option value="corn">Corn</option>
          <option value="wheat">Wheat</option>
          <option value="soybeans">Soybeans</option>
          <option value="rice">Rice</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Current Price Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {marketPrices.map((price, index) => (
              <motion.div
                key={price.crop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  selectedCrop === price.crop
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-slate-600 hover:border-green-300 dark:hover:border-green-700'
                }`}
                onClick={() => setSelectedCrop(price.crop)}
              >
                <div className="text-center">
                  <h3 className="font-medium text-gray-900 dark:text-white capitalize mb-2">
                    {price.crop}
                  </h3>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    ${price.currentPrice}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    per ton
                  </div>
                  <div className={`flex items-center justify-center text-sm ${
                    price.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    <TrendingUp className={`h-3 w-3 mr-1 ${price.change < 0 ? 'rotate-180' : ''}`} />
                    {price.changePercent > 0 ? '+' : ''}{price.changePercent}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Price Chart */}
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 transition-colors duration-300">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Price Trend - {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    fontSize={12}
                    label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Profit Forecast */}
          {selectedPriceData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-300">
                    Profit Forecast
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-700 dark:text-green-300">Current Price:</span>
                    <span className="font-bold text-green-900 dark:text-green-100">
                      ${selectedPriceData.currentPrice}/ton
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700 dark:text-green-300">Expected Yield:</span>
                    <span className="font-bold text-green-900 dark:text-green-100">8.5 tons/ha</span>
                  </div>
                  <div className="border-t border-green-200 dark:border-green-800 pt-3">
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Revenue per Hectare:</span>
                      <span className="text-2xl font-bold text-green-900 dark:text-green-100">
                        ${profitForecast}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                    Market Insights
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-blue-800 dark:text-blue-200">
                      {selectedPriceData.change >= 0 ? 'Prices are trending upward' : 'Prices are declining'} 
                      {' '}({selectedPriceData.changePercent > 0 ? '+' : ''}{selectedPriceData.changePercent}% this week)
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-blue-800 dark:text-blue-200">
                      {selectedPriceData.change >= 0 
                        ? 'Consider holding harvest for better prices' 
                        : 'Good time to sell existing inventory'}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-blue-800 dark:text-blue-200">
                      Market: {selectedPriceData.market}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Market Summary */}
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 transition-colors duration-300">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Today's Market Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Top Performers</h4>
                <ul className="space-y-1">
                  {marketPrices
                    .filter(p => p.change > 0)
                    .sort((a, b) => b.changePercent - a.changePercent)
                    .slice(0, 2)
                    .map(price => (
                      <li key={price.crop} className="flex justify-between text-green-600 dark:text-green-400">
                        <span className="capitalize">{price.crop}</span>
                        <span>+{price.changePercent}%</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Market Declines</h4>
                <ul className="space-y-1">
                  {marketPrices
                    .filter(p => p.change < 0)
                    .sort((a, b) => a.changePercent - b.changePercent)
                    .slice(0, 2)
                    .map(price => (
                      <li key={price.crop} className="flex justify-between text-red-600 dark:text-red-400">
                        <span className="capitalize">{price.crop}</span>
                        <span>{price.changePercent}%</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EconomicInsights;