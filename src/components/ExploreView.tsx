import React, { useState, useEffect } from 'react';
import { useTrips } from '../context/TripsContext';
import { Search, Star, Heart, ChevronRight, SunMedium, Mountain, Building2, Trees, Tent, Flame, Bus, RefreshCw } from 'lucide-react';
import { Destination } from '../types';

export const ExploreView: React.FC = () => {
  const {
    destinations,
    savedDestinationIds,
    toggleSaveDestination,
    openDestinationDetail,
    searchQuery,
    setSearchQuery,
    openAddTripModal,
    setActiveTab,
  } = useTrips();

  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [liveTrafficStatus, setLiveTrafficStatus] = useState<any[]>([]);
  const [isRefreshingTraffic, setIsRefreshingTraffic] = useState<boolean>(false);

  // Fetch real-time traffic status overview from server
  const fetchTrafficOverview = async () => {
    setIsRefreshingTraffic(true);
    try {
      const res = await fetch('/api/traffic/live');
      const json = await res.json();
      if (json.success && json.data) {
        setLiveTrafficStatus(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch live traffic:', err);
    } finally {
      setTimeout(() => setIsRefreshingTraffic(false), 500);
    }
  };

  useEffect(() => {
    fetchTrafficOverview();
  }, []);

  const categories = [
    { name: '전체', icon: <Flame className="w-4 h-4" /> },
    { name: '해변', icon: <SunMedium className="w-4 h-4" /> },
    { name: '산맥', icon: <Mountain className="w-4 h-4" /> },
    { name: '도시', icon: <Building2 className="w-4 h-4" /> },
    { name: '숲', icon: <Trees className="w-4 h-4" /> },
    { name: '캠핑', icon: <Tent className="w-4 h-4" /> },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === '전체' || dest.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const trendingDestinations = destinations.filter((d) => d.isTrending || d.isPopular);

  return (
    <div className="pb-32 pt-20 px-4 md:px-12 max-w-7xl mx-auto space-y-10">
      {/* Search Bar Section */}
      <section className="relative group">
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none text-gray-400 dark:text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="어디로 떠나고 싶으신가요?"
            className="w-full py-4 pl-12 pr-28 bg-white dark:bg-surface-container border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary dark:focus:ring-white/30 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
          />
          <button
            onClick={() => setSearchQuery(searchQuery)}
            className="absolute right-2.5 bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            검색
          </button>
        </div>
      </section>

      {/* Real-Time Live Traffic & Transit Quick Alert Banner */}
      <section className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 rounded-2xl p-4 md:p-5 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
              <Bus className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-bold text-blue-300 tracking-wider uppercase">실시간 교통 & 운항 정보</span>
              </div>
              <p className="text-sm md:text-base font-semibold text-white mt-0.5">
                {liveTrafficStatus[0]
                  ? `${liveTrafficStatus[0].name}: ${liveTrafficStatus[0].transitOptions?.[1]?.status || '정시 운항'} (${liveTrafficStatus[0].transitOptions?.[1]?.duration || '1시간 15분'})`
                  : '실시간 교통 상태 정보를 불러오는 중...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={fetchTrafficOverview}
              disabled={isRefreshingTraffic}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-all flex items-center gap-1 border border-white/10"
              title="교통 정보 새로고침"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingTraffic ? 'animate-spin' : ''}`} />
              <span>새로고침</span>
            </button>
            <button
              onClick={() => setActiveTab('traffic')}
              className="px-3.5 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer"
            >
              <span>교통 센터 보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories Chips */}
      <section>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pt-1">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shrink-0 transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-surface-container text-gray-700 dark:text-on-surface-variant border-gray-200 dark:border-outline-variant hover:border-gray-400 dark:hover:border-white/40'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Trending Now ("지금 뜨는 여행지") */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
              지금 뜨는 여행지
            </h2>
            <p className="text-gray-500 dark:text-on-surface-variant text-sm mt-0.5">
              가장 인기 있는 트렌디한 목적지
            </p>
          </div>
          <button
            onClick={() => setActiveCategory('전체')}
            className="text-gray-900 dark:text-white font-semibold text-sm flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>전체보기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel / Cards List */}
        <div className="flex gap-6 overflow-x-auto hide-scrollbar py-3 -mx-2 px-2">
          {trendingDestinations.map((item) => {
            const isSaved = savedDestinationIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="relative w-[280px] md:w-[340px] shrink-0 group cursor-pointer"
                onClick={() => openDestinationDetail(item)}
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative border border-gray-200 dark:border-outline-variant group-hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/20">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-white">{item.rating}</span>
                  </div>

                  {/* Content Info */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                    <p className="text-xs font-bold tracking-widest text-gray-300 uppercase mb-1">
                      {item.country}
                    </p>
                    <h3 className="text-xl font-bold text-white line-clamp-1 mb-2 font-['Plus_Jakarta_Sans']">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-lg font-bold text-white">{item.priceDisplay}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveDestination(item.id);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isSaved
                            ? 'bg-rose-500 text-white shadow-lg scale-110'
                            : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/40'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended for You ("당신을 위한 추천 여행") */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
          당신을 위한 추천 여행
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDestinations.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => openDestinationDetail(item)}
                className="flex gap-4 p-4 bg-gray-100 dark:bg-surface-container rounded-2xl border border-gray-200 dark:border-outline-variant hover:bg-gray-200 dark:hover:bg-surface-container-high transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                <div className="flex flex-col justify-between py-1 flex-grow">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-1 bg-gray-900/10 dark:bg-white/10 text-gray-900 dark:text-white rounded-md text-[11px] font-bold uppercase tracking-wider border border-gray-300 dark:border-white/20">
                        {item.tags[0] || '추천 여행'}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-900 dark:text-white">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-bold text-lg mt-2 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1 font-['Plus_Jakarta_Sans']">
                      {item.name}
                    </h4>
                    <p className="text-gray-600 dark:text-on-surface-variant text-xs line-clamp-1 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200 dark:border-white/5">
                    <span className="text-gray-900 dark:text-white font-bold text-base">
                      {item.priceDisplay}
                    </span>
                    <span className="text-gray-500 dark:text-on-surface-variant text-xs">
                      {item.badges?.[0] || '무료 취소 가능'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Action Button (+) */}
      <button
        onClick={openAddTripModal}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-30 border border-white/20 group cursor-pointer"
        title="새 일정 추가"
      >
        <span className="text-3xl font-light">+</span>
      </button>
    </div>
  );
};
