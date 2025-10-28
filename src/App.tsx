import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import YieldPredictor from './pages/YieldPredictor';
import EnergyCalculator from './pages/EnergyCalculator';
import Insights from './pages/Insights';
import { AppProvider } from './context/AppContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
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

function VoiceActionsBridge() {
  const navigate = useNavigate();
  const { setTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<any>;
      const detail = ce.detail || {};
      if (detail.intent === 'navigate' && detail.payload?.to) {
        navigate(detail.payload.to);
      } else if (detail.intent === 'theme') {
        if (detail.payload?.mode) {
          setTheme(detail.payload.mode);
        } else {
          toggleTheme();
        }
      }
    };

    document.addEventListener('voice:command', handler as EventListener);
    return () => document.removeEventListener('voice:command', handler as EventListener);
  }, [navigate, setTheme, toggleTheme]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VoiceProvider>
          <AppProvider>
            <Router>
              <VoiceActionsBridge />
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