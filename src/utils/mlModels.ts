interface CropPredictionData {
  crop: string;
  location: string;
  season: string;
  soilType: string;
  rainfall: string;
  temperature: string;
}

export function predictCropYield(data: CropPredictionData): number {
  // Simulated ML model logic
  const baseYields = {
    'Wheat': 4.5,
    'Rice': 6.2,
    'Corn': 8.5,
    'Soybeans': 3.2,
    'Barley': 4.8,
    'Cotton': 2.1,
    'Sugarcane': 12.5,
    'Potatoes': 25.0,
  };

  const seasonMultipliers = {
    'Spring': 1.0,
    'Summer': 1.1,
    'Fall': 0.9,
    'Winter': 0.7,
  };

  const soilMultipliers = {
    'Clay': 0.95,
    'Sandy': 0.85,
    'Loam': 1.1,
    'Silt': 1.05,
    'Peat': 1.15,
    'Chalky': 0.9,
  };

  let baseYield = baseYields[data.crop as keyof typeof baseYields] || 5.0;
  let seasonMultiplier = seasonMultipliers[data.season as keyof typeof seasonMultipliers] || 1.0;
  let soilMultiplier = data.soilType ? soilMultipliers[data.soilType as keyof typeof soilMultipliers] || 1.0 : 1.0;

  // Weather factors
  let weatherMultiplier = 1.0;
  if (data.rainfall) {
    const rainfall = parseFloat(data.rainfall);
    if (rainfall < 300) weatherMultiplier *= 0.7;
    else if (rainfall > 1200) weatherMultiplier *= 0.9;
    else weatherMultiplier *= 1.1;
  }

  if (data.temperature) {
    const temp = parseFloat(data.temperature);
    if (temp < 10 || temp > 35) weatherMultiplier *= 0.8;
    else if (temp >= 20 && temp <= 28) weatherMultiplier *= 1.1;
  }

  // Add some randomness to simulate model uncertainty
  const randomFactor = 0.9 + Math.random() * 0.2;

  return baseYield * seasonMultiplier * soilMultiplier * weatherMultiplier * randomFactor;
}