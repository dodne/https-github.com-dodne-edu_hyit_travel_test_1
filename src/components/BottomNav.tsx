import React from 'react';
import { useTrips } from '../context/TripsContext';
import { Home, Map, PlaneTakeoff, User, Bus } from 'lucide-react';
import { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useTrips();

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      tab: 'explore',
      label: '홈',
      icon: <Home className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      tab: 'destinations',
      label: '여행지',
      icon: <Map className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      tab: 'myTrips',
      label: '내 여행',
      icon: <PlaneTakeoff className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      tab: 'traffic',
      label: '실시간 교통',
      icon: <Bus className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      tab: 'profile',
      label: '프로필',
      icon: <User className="w-5 h-5 md:w-6 md:h-6" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-white/95 dark:bg-[#0d0e12]/95 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 px-3 md:px-8 py-2 md:py-3 shadow-2xl">
      <div className="max-w-4xl mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'bg-primary/10 dark:bg-white/15 text-primary dark:text-white font-bold scale-105 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-[11px] md:text-xs tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
