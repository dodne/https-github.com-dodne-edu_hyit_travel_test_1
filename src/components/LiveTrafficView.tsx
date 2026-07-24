import React, { useState, useEffect } from 'react';
import { Bus, Plane, Train, Car, Ship, Sparkles, RefreshCw, AlertCircle, Clock, MapPin, DollarSign, Search, Navigation } from 'lucide-react';

export const LiveTrafficView: React.FC = () => {
  const [origin, setOrigin] = useState<string>('인천국제공항(ICN)');
  const [destination, setDestination] = useState<string>('이탈리아 포지타노');
  const [departureTime, setDepartureTime] = useState<string>('현재 출발');
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  const fetchLiveTraffic = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/traffic/live?destination=${encodeURIComponent(destination)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setTrafficData(json.data);
      }
    } catch (err) {
      console.error('Error fetching traffic:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiRouteSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/traffic-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          departureTime,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setAiAnalysis(json);
      }
    } catch (err) {
      console.error('Error fetching AI traffic analysis:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveTraffic();
    handleAiRouteSearch();
  }, []);

  return (
    <div className="pb-32 pt-20 px-4 md:px-12 max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 md:p-8 rounded-3xl border border-blue-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Bus className="w-3.5 h-3.5" />
              <span>실시간 관제 & 경로 엔진</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-['Plus_Jakarta_Sans']">
              실시간 교통정보 및 소요시간/비교 센터
            </h2>
            <p className="text-sm text-gray-300 max-w-xl">
              실시간 항공, 고속철도, 도로 정체 지수 및 예상 비용(원화)을 한눈에 파악하고 AI 기반 최적 이동 경로를 도출하세요.
            </p>
          </div>

          <button
            onClick={fetchLiveTraffic}
            disabled={isLoading}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-white/20 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>실시간 교통 갱신</span>
          </button>
        </div>
      </section>

      {/* Real-time Route Planner Input Form */}
      <section className="bg-white dark:bg-surface-container p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-md">
        <form onSubmit={handleAiRouteSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5 block">
              출발지 (Origin)
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="예: 인천국제공항(ICN)"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5 block">
              목적지 (Destination)
            </label>
            <div className="relative">
              <Navigation className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="예: 이탈리아 포지타노"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5 block">
              출발 시각
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <select
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="현재 출발">현재 즉시 출발</option>
                <option value="오전 출발 (08:00)">오전 출발 (08:00)</option>
                <option value="오후 출발 (14:00)">오후 출발 (14:00)</option>
                <option value="저녁 출발 (20:00)">저녁 출발 (20:00)</option>
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isAiLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isAiLoading ? '분석 중...' : '실시간 경로 계산'}</span>
            </button>
          </div>
        </form>
      </section>

      {/* AI Real-time Route Analysis Results */}
      {aiAnalysis && (
        <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-6 md:p-8 rounded-2xl border border-indigo-500/30 text-white shadow-xl space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans']">
              AI 실시간 분석 리포트 ({origin} → {destination})
            </h3>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <p className="text-base text-gray-100 font-semibold">{aiAnalysis.summary}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10 text-xs">
              <div>
                <span className="text-gray-400 block">총 소요시간</span>
                <span className="text-emerald-400 font-bold text-sm">{aiAnalysis.estimatedDuration}</span>
              </div>
              <div>
                <span className="text-gray-400 block">예상 통행/이동 비용</span>
                <span className="text-amber-300 font-bold text-sm">₩{aiAnalysis.estimatedCostKRW?.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-400 block">도로/수송 혼잡도</span>
                <span className="text-blue-300 font-bold text-sm">{aiAnalysis.congestionLevel}</span>
              </div>
            </div>
          </div>

          {/* Detailed Routes Comparison */}
          {aiAnalysis.routes && aiAnalysis.routes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                이동 수단별 소요시간 & 가격 실시간 비교
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiAnalysis.routes.map((r: any, rIdx: number) => (
                  <div key={rIdx} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded">
                        {r.mode}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">{r.congestion}</span>
                    </div>
                    <h5 className="font-bold text-sm text-white">{r.name}</h5>
                    <p className="text-xs text-gray-300">{r.description}</p>
                    <div className="flex justify-between items-center pt-2 text-xs font-bold border-t border-white/10">
                      <span className="text-amber-300">{r.price}</span>
                      <span className="text-white">소요: {r.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Live Destination Traffic Cards */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
          주요 여행지별 실시간 교통/운항 현황
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {trafficData.map((destTraffic) => (
            <div
              key={destTraffic.id}
              className="bg-white dark:bg-surface-container rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
                      {destTraffic.name}
                    </h4>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        destTraffic.status === '원활'
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      교통 {destTraffic.status} (혼잡지수 {destTraffic.congestionIndex})
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {destTraffic.location} • 현지 날씨 {destTraffic.weather} ({destTraffic.temperature})
                  </p>
                </div>
              </div>

              {/* Transit Options Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destTraffic.transitOptions?.map((opt: any, optIdx: number) => (
                  <div
                    key={optIdx}
                    className="p-4 bg-gray-50 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/5 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg shrink-0 mt-0.5">
                        {opt.type === 'flight' && <Plane className="w-4 h-4" />}
                        {opt.type === 'train' && <Train className="w-4 h-4" />}
                        {opt.type === 'car' && <Car className="w-4 h-4" />}
                        {opt.type === 'ferry' && <Ship className="w-4 h-4" />}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                          {opt.name}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {opt.notes}
                        </p>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 inline-block">
                          상태: {opt.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-gray-900 dark:text-white block">
                        {opt.price}
                      </span>
                      <span className="text-xs text-blue-500 dark:text-blue-300 font-medium">
                        {opt.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
