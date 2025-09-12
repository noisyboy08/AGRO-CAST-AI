interface EnergyInputData {
  irrigationHours: number;
  fertilizerUsage: number;
  energyType: string;
  equipmentPower: number;
  fuelConsumption: number;
  electricityCost: number;
  currentYield: number;
}

interface EnergyResults {
  efficiencyScore: number;
  totalEnergy: number;
  energyCost: number;
  co2Emissions: number;
  sustainabilityRating: number;
  recommendations: string[];
}

export function calculateEnergyEfficiency(data: EnergyInputData): EnergyResults {
  // Energy consumption calculations
  const irrigationEnergy = data.irrigationHours * (data.equipmentPower || 10); // kWh
  const fertilizerEnergy = data.fertilizerUsage * 0.03; // 0.03 kWh per kg fertilizer
  const fuelEnergy = data.fuelConsumption * 10.2; // 10.2 kWh per liter diesel
  
  const totalEnergy = irrigationEnergy + fertilizerEnergy + fuelEnergy;

  // Energy efficiency score (kg yield per kWh)
  const efficiencyScore = totalEnergy > 0 ? (data.currentYield * 1000) / totalEnergy : 0;

  // Cost calculations
  const electricityCost = data.electricityCost || 0.12;
  const energyCost = totalEnergy * electricityCost;

  // CO2 emissions (kg CO2 per kWh varies by energy type)
  const emissionFactors = {
    'grid': 0.5,
    'solar': 0.05,
    'wind': 0.02,
    'diesel': 0.8,
    'hybrid': 0.3,
  };
  
  const emissionFactor = emissionFactors[data.energyType as keyof typeof emissionFactors] || 0.5;
  const co2Emissions = totalEnergy * emissionFactor;

  // Sustainability rating (1-10 scale)
  let sustainabilityRating = 5;
  if (data.energyType === 'solar' || data.energyType === 'wind') {
    sustainabilityRating += 3;
  } else if (data.energyType === 'hybrid') {
    sustainabilityRating += 2;
  } else if (data.energyType === 'diesel') {
    sustainabilityRating -= 2;
  }
  
  if (efficiencyScore > 6) sustainabilityRating += 1;
  if (data.fertilizerUsage < 150) sustainabilityRating += 1;
  
  sustainabilityRating = Math.max(1, Math.min(10, sustainabilityRating));

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (data.energyType === 'grid' || data.energyType === 'diesel') {
    recommendations.push('Consider switching to renewable energy sources like solar or wind power');
  }
  
  if (data.irrigationHours > 150) {
    recommendations.push('Implement drip irrigation or precision watering to reduce irrigation hours');
  }
  
  if (data.fertilizerUsage > 200) {
    recommendations.push('Use soil testing to optimize fertilizer application and reduce waste');
  }
  
  if (efficiencyScore < 5) {
    recommendations.push('Consider upgrading to more efficient equipment to improve energy utilization');
  }
  
  recommendations.push('Schedule energy-intensive operations during off-peak hours to reduce costs');
  
  if (data.energyType !== 'solar') {
    recommendations.push('Install solar panels to reduce long-term energy costs and environmental impact');
  }

  return {
    efficiencyScore,
    totalEnergy,
    energyCost,
    co2Emissions,
    sustainabilityRating,
    recommendations,
  };
}