import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, BarChart3, Calculator, Lightbulb, Home, Sun, Moon, DollarSign, ShoppingCart, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import VoiceAssistant from './VoiceAssistant';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';

const Navbar = () => {
  const location = useLocation();
  const { actualTheme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/yield-predictor', label: 'Yield Predictor', icon: Sprout },
    { path: '/energy-calculator', label: 'Energy Calculator', icon: Calculator },
    { path: '/market-prices', label: 'Market Prices', icon: DollarSign },
    { path: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
    { path: '/insights', label: 'Insights', icon: Lightbulb },
  ];

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg transition-colors duration-300">
                <Sprout className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">AgriPredict</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {actualTheme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            
            {/* Voice Assistant */}
            <VoiceAssistant />
            
            {/* User Profile or Login */}
            {user ? (
              <UserProfile />
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden md:block">Sign In</span>
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">
                <BarChart3 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
};

export default Navbar;