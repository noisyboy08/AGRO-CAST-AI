import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import YieldPredictor from './pages/YieldPredictor';
import EnergyCalculator from './pages/EnergyCalculator';
import Insights from './pages/Insights';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { VoiceProvider } from './context/VoiceContext';
import EconomicInsights from './components/EconomicInsights';
import Marketplace from './components/Marketplace';

// PWA Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VoiceProvider>
          <AppProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <Navbar />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/yield-predictor" element={<YieldPredictor />} />
                  <Route path="/energy-calculator" element={<EnergyCalculator />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/market-prices" element={<EconomicInsights />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                </Routes>
              </div>
            </Router>
          </AppProvider>
        </VoiceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;