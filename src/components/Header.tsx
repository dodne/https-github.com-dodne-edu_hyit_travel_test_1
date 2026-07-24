import React from 'react';
import { useTrips } from '../context/TripsContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Bell, Compass, PlaneTakeoff, User, Bus } from 'lucide-react';
import { INITIAL_USER } from '../data/mockData';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useTrips();
  const { theme, toggleTheme } = useTheme();

  const getTitle = () => {
    switch (activeTab) {
      case 'explore':
        return { text: '탐색', icon: <Compass className="w-6 h-6 text-primary dark:text-white" /> };
      case 'destinations':
        return { text: '인기 여행지', icon: <Compass className="w-6 h-6 text-primary dark:text-white" /> };
      case 'myTrips':
        return { text: '내 여행', icon: <PlaneTakeoff className="w-6 h-6 text-primary dark:text-white" /> };
      case 'traffic':
        return { text: '실시간 교통 센터', icon: <Bus className="w-6 h-6 text-primary dark:text-white" /> };
      case 'profile':
        return { text: '프로필', icon: <User className="w-6 h-6 text-primary dark:text-white" /> };
      default:
        return { text: '탐색', icon: <Compass className="w-6 h-6 text-primary dark:text-white" /> };
    }
  };

  const { text, icon } = getTitle();

  return (
    <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-200 px-4 md:px-12 py-3.5 flex justify-between items-center">
      {/* Title & Icon */}
      <div 
        onClick={() => setActiveTab('explore')}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/10 group-hover:scale-105 transition-transform">
          {icon}
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
            {text}
          </h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium -mt-0.5 hidden sm:block">
            Vibrant Odyssey Travel
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 md:gap-3.5">
        {/* Dark/Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}
          className="p-2.5 rounded-full bg-gray-100 dark:bg-surface-container-high hover:bg-gray-200 dark:hover:bg-surface-container-highest text-gray-700 dark:text-gray-300 transition-all active:scale-95 border border-gray-200 dark:border-white/10 flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600" />
          )}
        </button>

        {/* Notifications */}
        <button className="p-2.5 rounded-full bg-gray-100 dark:bg-surface-container-high hover:bg-gray-200 dark:hover:bg-surface-container-highest text-gray-700 dark:text-gray-300 transition-all active:scale-95 border border-gray-200 dark:border-white/10 flex items-center justify-center relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
        </button>

        {/* User Profile Avatar */}
        <div 
          onClick={() => setActiveTab('profile')}
          className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-white/20 cursor-pointer hover:ring-2 hover:ring-primary transition-all active:scale-95 shadow-sm"
        >
          <img
            src={INITIAL_USER.avatar}
            alt={INITIAL_USER.name}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    </header>
  );
};
