import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Zap, BarChart3, Target, CheckCircle, Users } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Sprout,
      title: 'Crop Yield Prediction',
      description: 'AI-powered predictions using weather data, soil conditions, and historical patterns.',
    },
    {
      icon: Zap,
      title: 'Energy Efficiency',
      description: 'Calculate and optimize energy consumption for sustainable farming practices.',
    },
    {
      icon: BarChart3,
      title: 'Interactive Dashboard',
      description: 'Visualize data with interactive maps, charts, and comprehensive analytics.',
    },
    {
      icon: Target,
      title: 'Smart Recommendations',
      description: 'Get actionable insights to improve yield and reduce energy consumption.',
    },
  ];

  const benefits = [
    'Increase crop yield by up to 25%',
    'Reduce energy consumption by 30%',
    'Make data-driven farming decisions',
    'Optimize resource allocation',
    'Sustainable agriculture practices',
    'Real-time monitoring capabilities',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-800 dark:from-emerald-800 dark:via-emerald-900 dark:to-blue-900 text-white py-20 transition-colors duration-300">
        <div className="absolute inset-0 bg-black bg-opacity-20 dark:bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              AI-Powered Crop Yield &<br />
              <span className="text-emerald-300 dark:text-emerald-200">Energy Efficiency</span> Predictor
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 dark:text-emerald-50 max-w-3xl mx-auto">
              Revolutionize agriculture with intelligent predictions, energy optimization, 
              and sustainable farming insights powered by advanced AI models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-semibold rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/yield-predictor"
                className="inline-flex items-center px-8 py-4 border-2 border-white dark:border-slate-300 text-white dark:text-slate-100 font-semibold rounded-lg hover:bg-white dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200"
              >
                Try Predictor
                <Sprout className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Comprehensive Agricultural Intelligence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Our platform combines cutting-edge AI with real-world agricultural data 
              to provide actionable insights for modern farming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-600 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full mb-4 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-emerald-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Transform Your Agricultural Operations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
                Join thousands of farmers and agricultural businesses who are already 
                using our platform to optimize their operations and increase profitability.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 transition-colors duration-300" />
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:text-center">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg transition-colors duration-300">
                <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  Join 10,000+ Farmers
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                  Experience the power of AI-driven agriculture and start making 
                  smarter decisions today.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 dark:bg-slate-950 text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Revolutionize Your Farming?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-8 transition-colors duration-300">
            Get started with our comprehensive agricultural intelligence platform 
            and see immediate results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/yield-predictor"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 dark:bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Predicting
              <Sprout className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-600 dark:border-gray-500 text-gray-300 dark:text-gray-400 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-slate-800 transition-all duration-200"
            >
              View Dashboard
              <BarChart3 className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;