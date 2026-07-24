import React, { useState, useEffect } from 'react';
import { useTrips } from '../context/TripsContext';
import { ArrowLeft, Share2, Heart, Star, Clock, MapPin, CheckCircle, Bus, Car, Plane, Train, Ship, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { Destination } from '../types';

export const TripDetailView: React.FC = () => {
  const { selectedDestination, closeDestinationDetail, openBookingModal, toggleSaveDestination, savedDestinationIds, destinations, openDestinationDetail } = useTrips();
  const [activeDay, setActiveDay] = useState<number>(1);
  const [trafficData, setTrafficData] = useState<any>(null);
  const [isTrafficLoading, setIsTrafficLoading] = useState<boolean>(false);
  const [aiRouteAdvice, setAiRouteAdvice] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  const dest = selectedDestination || destinations[0];
  const isSaved = savedDestinationIds.includes(dest.id);

  // Fetch destination specific live traffic
  const fetchLiveTraffic = async () => {
    setIsTrafficLoading(true);
    try {
      const res = await fetch(`/api/traffic/live?destination=${encodeURIComponent(dest.country || dest.name)}`);
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setTrafficData(json.data[0]);
      }
    } catch (err) {
      console.error('Failed to load detail traffic:', err);
    } finally {
      setIsTrafficLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveTraffic();
  }, [dest]);

  // Query Gemini AI for real-time travel & route optimization
  const requestAiRouteAnalysis = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/traffic-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: '인천국제공항 (ICN)',
          destination: dest.name,
          travelMode: '전체 (최적 비교)',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setAiRouteAdvice(json);
      }
    } catch (err) {
      console.error('AI Route Analysis Error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const currentItineraryDay = dest.itinerary.find((i) => i.day === activeDay) || dest.itinerary[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-container-lowest text-gray-900 dark:text-white pb-32">
      {/* Top Floating Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-surface-container-lowest/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-4 md:px-12 py-3.5 flex justify-between items-center transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={closeDestinationDetail}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-surface-container-high hover:bg-gray-200 dark:hover:bg-surface-container-highest transition-all active:scale-95"
            title="뒤로 가기"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
          </button>
          <h1 className="text-lg md:text-xl font-bold font-['Plus_Jakarta_Sans']">
            {dest.name}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-surface-container-high hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleSaveDestination(dest.id)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              isSaved
                ? 'bg-rose-500 text-white'
                : 'bg-gray-100 dark:bg-surface-container-high text-gray-700 dark:text-gray-300'
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] md:h-[520px] overflow-hidden">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {dest.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-white text-black dark:bg-white/10 dark:text-white backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 font-['Plus_Jakarta_Sans'] leading-tight">
              {dest.name}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">{dest.rating}</span>
                <span>({dest.reviewCount} 리뷰)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{dest.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{dest.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-12 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column (Main Details) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section className="bg-white dark:bg-surface-container p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-['Plus_Jakarta_Sans']">
                여행 설명
              </h3>
              <p className="text-gray-700 dark:text-on-surface-variant text-base md:text-lg leading-relaxed">
                {dest.description}
              </p>
            </section>

            {/* REAL-TIME TRAFFIC & TRANSPORTATION MODULE */}
            <section className="bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-slate-900/30 p-6 md:p-8 rounded-2xl border border-blue-500/30 shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Bus className="w-5 h-5 text-blue-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
                      실시간 교통 & 경로 상태
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-blue-200 mt-1">
                    현지 실시간 교통 흐름, 소요시간 및 가격 정보
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchLiveTraffic}
                    disabled={isTrafficLoading}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-lg transition-all flex items-center gap-1 border border-white/20"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTrafficLoading ? 'animate-spin' : ''}`} />
                    <span>실시간 갱신</span>
                  </button>

                  <button
                    onClick={requestAiRouteAnalysis}
                    disabled={isAiLoading}
                    className="px-3.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                    <span>AI 최적 경로 계산</span>
                  </button>
                </div>
              </div>

              {/* Traffic Condition Overview Badge */}
              {trafficData && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div>
                    <span className="text-xs text-gray-400 block">현재 도로 교통</span>
                    <span className={`text-sm font-bold ${
                      trafficData.status === '원활' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {trafficData.status} (혼잡도 {trafficData.congestionIndex}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">현지 날씨</span>
                    <span className="text-sm font-bold text-white">
                      {trafficData.temperature} / {trafficData.weather}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">최적 이동 수단</span>
                    <span className="text-sm font-bold text-blue-300">
                      {trafficData.transitOptions?.[0]?.name || '고속철도/페리 추천'}
                    </span>
                  </div>
                </div>
              )}

              {/* Transit Options List */}
              <div className="space-y-3">
                {trafficData?.transitOptions?.map((opt: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/80 dark:bg-surface-container rounded-xl border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
                        {opt.type === 'flight' && <Plane className="w-5 h-5" />}
                        {opt.type === 'car' && <Car className="w-5 h-5" />}
                        {opt.type === 'ferry' && <Ship className="w-5 h-5" />}
                        {opt.type === 'train' && <Train className="w-5 h-5" />}
                        {opt.type === 'bus' && <Bus className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                            {opt.name}
                          </h4>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            opt.status.includes('정체') ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {opt.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {opt.notes}
                        </p>
                      </div>
                    </div>

                    <div className="text-right sm:self-center shrink-0">
                      <span className="text-sm font-bold text-gray-900 dark:text-white block">
                        {opt.price}
                      </span>
                      <span className="text-xs text-blue-500 dark:text-blue-300 font-medium">
                        예상 소요시간: {opt.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Route Advice Output */}
              {isAiLoading && (
                <div className="p-4 bg-blue-500/10 rounded-xl text-center text-sm font-medium text-blue-300 animate-pulse">
                  Gemini AI가 최신 교통 통행량, 기상 조건 및 환승 시간을 분석하고 있습니다...
                </div>
              )}

              {aiRouteAdvice && !isAiLoading && (
                <div className="p-5 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-xl border border-purple-500/30 text-white space-y-3">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>AI 추천 실시간 경로 분석</span>
                  </div>
                  <p className="text-sm text-gray-200 font-medium">
                    {aiRouteAdvice.summary}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-white/10">
                    <div>
                      <span className="text-gray-400 block">총 소요시간</span>
                      <span className="font-bold text-emerald-400">{aiRouteAdvice.estimatedDuration}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">예상 비용</span>
                      <span className="font-bold text-amber-300">₩{aiRouteAdvice.estimatedCostKRW?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">혼잡도</span>
                      <span className="font-bold text-blue-300">{aiRouteAdvice.congestionLevel}</span>
                    </div>
                  </div>
                  {aiRouteAdvice.trafficTips && (
                    <ul className="text-xs text-gray-300 space-y-1 pt-2 list-disc list-inside">
                      {aiRouteAdvice.trafficTips.map((tip: string, idx: number) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </section>

            {/* Itinerary Section */}
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
                  여행 일정
                </h3>
                <span className="text-xs text-gray-500 dark:text-on-surface-variant">
                  현지 사정에 따라 변동될 수 있습니다.
                </span>
              </div>

              {/* Day Tabs */}
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {dest.itinerary.map((it) => {
                  const isActive = activeDay === it.day;
                  return (
                    <button
                      key={it.day}
                      onClick={() => setActiveDay(it.day)}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm shrink-0 transition-all ${
                        isActive
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg scale-105'
                          : 'bg-gray-100 dark:bg-surface-container-high text-gray-700 dark:text-on-surface-variant hover:bg-gray-200 dark:hover:bg-surface-container-highest'
                      }`}
                    >
                      {it.day}일차
                    </button>
                  );
                })}
              </div>

              {/* Timeline Items */}
              <div className="space-y-6 relative border-l border-gray-300 dark:border-white/10 ml-4 pl-8 py-2">
                {currentItineraryDay?.events.map((event, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white dark:bg-surface-container-low p-6 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-all shadow-sm"
                  >
                    <div className="absolute -left-[41px] top-8 w-4 h-4 rounded-full bg-gray-900 dark:bg-white border-4 border-gray-50 dark:border-surface-container-lowest"></div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 block">
                      {event.time}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-['Plus_Jakarta_Sans']">
                      {event.title}
                    </h4>
                    <p className="text-gray-600 dark:text-on-surface-variant text-sm leading-relaxed">
                      {event.description}
                    </p>

                    {event.images && event.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {event.images.map((imgUrl, imgIdx) => (
                          <img
                            key={imgIdx}
                            src={imgUrl}
                            alt="일정 이미지"
                            className="rounded-xl h-32 w-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Sticky Price Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Box */}
              <div className="bg-white dark:bg-surface-container-high p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-2xl space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-500 dark:text-on-surface-variant text-sm font-medium">
                    1인 기준 가격
                  </span>
                  <div className="text-right">
                    <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white block font-['Plus_Jakarta_Sans']">
                      {dest.priceDisplay}
                    </span>
                    <span className="text-xs text-gray-400">모든 세금 포함</span>
                  </div>
                </div>

                {/* Inclusions List */}
                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-white/10 text-sm">
                  {dest.badges?.map((badge, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3 text-gray-700 dark:text-on-surface-variant">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{badge}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 text-gray-700 dark:text-on-surface-variant">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>실시간 교통 안내 & 전용 셔틀 지원</span>
                  </div>
                </div>

                {/* Booking Action */}
                <button
                  onClick={() => openBookingModal(dest)}
                  className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-xl cursor-pointer"
                >
                  지금 예약하기
                </button>

                <p className="text-center text-xs text-gray-500 dark:text-on-surface-variant">
                  무료 취소 기한: 출발 14일 전까지
                </p>
              </div>

              {/* Highlights Chips */}
              {dest.highlights && (
                <div className="bg-gray-100 dark:bg-surface-container-low p-6 rounded-2xl border border-gray-200 dark:border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    투어 포인트
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dest.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-full text-xs font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Recommended Destinations */}
        <section className="max-w-7xl mx-auto px-4 md:px-12 mt-16 space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
            비슷한 추천 여행지
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {destinations
              .filter((d) => d.id !== dest.id)
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => openDestinationDetail(item)}
                  className="relative group overflow-hidden rounded-2xl h-72 border border-gray-200 dark:border-white/10 cursor-pointer shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <h4 className="font-bold text-lg font-['Plus_Jakarta_Sans']">
                      {item.name}
                    </h4>
                    <p className="text-gray-300 text-sm">{item.priceDisplay}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};
