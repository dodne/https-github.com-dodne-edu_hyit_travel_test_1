import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTrips } from '../context/TripsContext';
import { INITIAL_USER } from '../data/mockData';
import { Edit2, Bookmark, Compass, CreditCard, Settings, HelpCircle, LogOut, Sun, Moon, ChevronRight } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { savedDestinationIds, setActiveTab } = useTrips();

  return (
    <div className="pb-32 pt-20 px-4 md:px-12 max-w-4xl mx-auto space-y-10">
      {/* Hero Profile Section */}
      <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-6 md:gap-10 py-6">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gray-300 dark:border-outline-variant shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
            <img
              src={INITIAL_USER.avatar}
              alt={INITIAL_USER.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-1 right-1 bg-gray-900 dark:bg-white text-white dark:text-black p-2 rounded-full shadow-lg hover:scale-105 transition-transform border border-gray-400 dark:border-outline">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
            {INITIAL_USER.name}
          </h2>
          <p className="text-gray-500 dark:text-on-surface-variant text-base mt-1">
            {INITIAL_USER.email}
          </p>
          <div className="mt-4 flex gap-2">
            <span className="bg-gray-200 dark:bg-surface-container-highest text-gray-800 dark:text-on-surface px-3 py-1 rounded-lg text-xs font-bold border border-gray-300 dark:border-outline">
              {INITIAL_USER.membership}
            </span>
            <span className="bg-gray-100 dark:bg-surface-container-high text-gray-600 dark:text-on-surface-variant px-3 py-1 rounded-lg text-xs font-semibold border border-gray-200 dark:border-outline-variant">
              {INITIAL_USER.roleTag}
            </span>
          </div>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-outline-variant flex flex-col items-center justify-center text-center">
          <span className="text-gray-900 dark:text-primary font-bold text-2xl md:text-3xl font-['Plus_Jakarta_Sans']">
            {INITIAL_USER.stats.destinationsCount}
          </span>
          <span className="text-gray-500 dark:text-on-surface-variant text-xs mt-1">
            다녀온 여행지
          </span>
        </div>

        <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-outline-variant flex flex-col items-center justify-center text-center">
          <span className="text-gray-900 dark:text-primary font-bold text-2xl md:text-3xl font-['Plus_Jakarta_Sans']">
            {INITIAL_USER.stats.reviewsCount}
          </span>
          <span className="text-gray-500 dark:text-on-surface-variant text-xs mt-1">
            리뷰 작성
          </span>
        </div>

        <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-outline-variant flex flex-col items-center justify-center text-center">
          <span className="text-gray-900 dark:text-primary font-bold text-2xl md:text-3xl font-['Plus_Jakarta_Sans']">
            {savedDestinationIds.length}
          </span>
          <span className="text-gray-500 dark:text-on-surface-variant text-xs mt-1">
            저장된 장소
          </span>
        </div>

        <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-outline-variant flex flex-col items-center justify-center text-center">
          <span className="text-gray-900 dark:text-primary font-bold text-2xl md:text-3xl font-['Plus_Jakarta_Sans']">
            {INITIAL_USER.stats.mileage}
          </span>
          <span className="text-gray-500 dark:text-on-surface-variant text-xs mt-1">
            총 마일리지
          </span>
        </div>
      </section>

      {/* Options List */}
      <section className="bg-white dark:bg-surface-container rounded-2xl overflow-hidden border border-gray-200 dark:border-outline-variant shadow-sm">
        {/* Saved Destinations */}
        <button
          onClick={() => setActiveTab('explore')}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-surface-container-highest transition-all duration-150 border-b border-gray-100 dark:border-outline-variant cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-surface-container-highest flex items-center justify-center border border-gray-200 dark:border-outline">
              <Bookmark className="w-5 h-5 text-gray-800 dark:text-primary" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-on-surface text-base">
              저장된 여행지 ({savedDestinationIds.length})
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Travel Preferences */}
        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-surface-container-highest transition-all duration-150 border-b border-gray-100 dark:border-outline-variant cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-surface-container-highest flex items-center justify-center border border-gray-200 dark:border-outline">
              <Compass className="w-5 h-5 text-gray-800 dark:text-primary" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-on-surface text-base">
              여행 취향 설정
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Payment Methods */}
        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-surface-container-highest transition-all duration-150 border-b border-gray-100 dark:border-outline-variant cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-surface-container-highest flex items-center justify-center border border-gray-200 dark:border-outline">
              <CreditCard className="w-5 h-5 text-gray-800 dark:text-primary" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-on-surface text-base">
              결제 수단 관리
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Theme Settings (Dark / Light Mode Toggle) */}
        <div
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-surface-container-highest transition-all duration-150 border-b border-gray-100 dark:border-outline-variant cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-surface-container-highest flex items-center justify-center border border-gray-200 dark:border-outline">
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-on-surface text-base block">
                화면 모드 (다크/라이트)
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                현재: {theme === 'dark' ? '다크 모드' : '라이트 모드'}
              </span>
            </div>
          </div>
          <button className="px-3 py-1 bg-gray-200 dark:bg-white/10 text-xs font-bold rounded-lg">
            {theme === 'dark' ? '라이트로 변경' : '다크로 변경'}
          </button>
        </div>

        {/* Settings */}
        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-surface-container-highest transition-all duration-150 border-b border-gray-100 dark:border-outline-variant cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-surface-container-highest flex items-center justify-center border border-gray-200 dark:border-outline">
              <Settings className="w-5 h-5 text-gray-500 dark:text-on-surface-variant" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-on-surface text-base">
              앱 설정 & 알림
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Help Center */}
        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-surface-container-highest transition-all duration-150 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-surface-container-highest flex items-center justify-center border border-gray-200 dark:border-outline">
              <HelpCircle className="w-5 h-5 text-gray-500 dark:text-on-surface-variant" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-on-surface text-base">
              고객 센터 & 자주 묻는 질문
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </section>

      {/* Logout */}
      <div className="flex justify-center pt-4">
        <button className="flex items-center gap-2 text-rose-500 dark:text-rose-400 px-6 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors font-bold text-sm">
          <LogOut className="w-4 h-4" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};
