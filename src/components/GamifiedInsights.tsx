import React, { useState } from 'react';
import { Trophy, Award, Star, Droplets, Leaf, Zap, Target, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  progress: number;
  maxProgress: number;
  earned: boolean;
  category: 'water' | 'sustainability' | 'efficiency' | 'yield';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  date: string;
  icon: React.ElementType;
  color: string;
}

const GamifiedInsights = () => {
  const [activeTab, setActiveTab] = useState<'badges' | 'achievements' | 'leaderboard'>('badges');

  const badges: Badge[] = [
    {
      id: 'water-saver',
      name: 'Water Saver',
      description: 'Reduce water usage by 20%',
      icon: Droplets,
      color: 'blue',
      progress: 85,
      maxProgress: 100,
      earned: false,
      category: 'water'
    },
    {
      id: 'eco-champion',
      name: 'Eco Champion',
      description: 'Achieve 90% sustainability score',
      icon: Leaf,
      color: 'green',
      progress: 100,
      maxProgress: 100,
      earned: true,
      category: 'sustainability'
    },
    {
      id: 'energy-master',
      name: 'Energy Master',
      description: 'Optimize energy efficiency above 8 kg/kWh',
      icon: Zap,
      color: 'yellow',
      progress: 75,
      maxProgress: 100,
      earned: false,
      category: 'efficiency'
    },
    {
      id: 'yield-optimizer',
      name: 'Yield Optimizer',
      description: 'Exceed predicted yield by 15%',
      icon: TrendingUp,
      color: 'purple',
      progress: 60,
      maxProgress: 100,
      earned: false,
      category: 'yield'
    },
    {
      id: 'precision-farmer',
      name: 'Precision Farmer',
      description: 'Use precision agriculture for 5 seasons',
      icon: Target,
      color: 'indigo',
      progress: 100,
      maxProgress: 100,
      earned: true,
      category: 'efficiency'
    },
    {
      id: 'carbon-neutral',
      name: 'Carbon Neutral',
      description: 'Achieve net-zero carbon footprint',
      icon: Leaf,
      color: 'emerald',
      progress: 45,
      maxProgress: 100,
      earned: false,
      category: 'sustainability'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'first-prediction',
      title: 'First Prediction',
      description: 'Made your first crop yield prediction',
      points: 100,
      date: '2024-01-15',
      icon: Star,
      color: 'yellow'
    },
    {
      id: 'water-efficiency',
      title: 'Water Efficiency Expert',
      description: 'Reduced irrigation water usage by 25%',
      points: 250,
      date: '2024-01-20',
      icon: Droplets,
      color: 'blue'
    },
    {
      id: 'solar-adoption',
      title: 'Solar Pioneer',
      description: 'Switched to solar-powered irrigation',
      points: 500,
      date: '2024-01-25',
      icon: Zap,
      color: 'yellow'
    },
    {
      id: 'yield-record',
      title: 'Record Breaker',
      description: 'Achieved highest yield in your region',
      points: 750,
      date: '2024-02-01',
      icon: Trophy,
      color: 'gold'
    }
  ];

  const leaderboardData = [
    { rank: 1, name: 'John Smith', points: 2450, badges: 8, location: 'Iowa, USA' },
    { rank: 2, name: 'Maria Garcia', points: 2180, badges: 7, location: 'Nebraska, USA' },
    { rank: 3, name: 'You', points: 1950, badges: 6, location: 'Kansas, USA' },
    { rank: 4, name: 'David Chen', points: 1820, badges: 5, location: 'Illinois, USA' },
    { rank: 5, name: 'Sarah Johnson', points: 1650, badges: 5, location: 'Minnesota, USA' }
  ];

  const getColorClasses = (color: string, earned: boolean = false) => {
    const opacity = earned ? '' : '50';
    switch (color) {
      case 'blue': return `bg-blue-${opacity || '500'} text-blue-${earned ? '700' : '400'}`;
      case 'green': return `bg-green-${opacity || '500'} text-green-${earned ? '700' : '400'}`;
      case 'yellow': return `bg-yellow-${opacity || '500'} text-yellow-${earned ? '700' : '400'}`;
      case 'purple': return `bg-purple-${opacity || '500'} text-purple-${earned ? '700' : '400'}`;
      case 'indigo': return `bg-indigo-${opacity || '500'} text-indigo-${earned ? '700' : '400'}`;
      case 'emerald': return `bg-emerald-${opacity || '500'} text-emerald-${earned ? '700' : '400'}`;
      case 'gold': return `bg-yellow-${opacity || '500'} text-yellow-${earned ? '700' : '400'}`;
      default: return `bg-gray-${opacity || '500'} text-gray-${earned ? '700' : '400'}`;
    }
  };

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const earnedBadges = badges.filter(badge => badge.earned).length;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Gamified Insights & Achievements
        </h2>
        
        {/* Points & Level Display */}
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {totalPoints}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {earnedBadges}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Badges</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-slate-700 rounded-lg p-1 transition-colors duration-300">
        {[
          { id: 'badges', label: 'Badges', icon: Award },
          { id: 'achievements', label: 'Achievements', icon: Star },
          { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                    badge.earned
                      ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg'
                      : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 hover:shadow-md'
                  }`}
                >
                  {badge.earned && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-white fill-current" />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-full ${getColorClasses(badge.color, badge.earned)}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${badge.earned ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                        {badge.name}
                      </h3>
                      <p className={`text-xs ${badge.earned ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}`}>
                        {badge.description}
                      </p>
                    </div>
                  </div>
                  
                  {!badge.earned && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 transition-colors duration-300"
              >
                <div className={`p-3 rounded-full ${getColorClasses(achievement.color, true)}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                    +{achievement.points}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">points</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${
                user.name === 'You'
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 shadow-md'
                  : 'bg-gray-50 dark:bg-slate-700 hover:shadow-md'
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                user.rank === 1 ? 'bg-yellow-500 text-white' :
                user.rank === 2 ? 'bg-gray-400 text-white' :
                user.rank === 3 ? 'bg-amber-600 text-white' :
                'bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-gray-300'
              }`}>
                {user.rank}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-semibold ${user.name === 'You' ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-900 dark:text-white'}`}>
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.location}
                </p>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-white">
                  {user.points.toLocaleString()} pts
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {user.badges} badges
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GamifiedInsights;