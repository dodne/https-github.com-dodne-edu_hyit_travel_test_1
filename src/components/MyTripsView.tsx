import React, { useState } from 'react';
import { useTrips } from '../context/TripsContext';
import { Calendar, MapPin, CheckCircle2, Clock, ChevronRight, Bus, Trash2 } from 'lucide-react';
import { Trip } from '../types';

export const MyTripsView: React.FC = () => {
  const { trips, openAddTripModal, openDestinationDetail, destinations, cancelTrip, setActiveTab } = useTrips();
  const [activeTabType, setActiveTabType] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingTrips = trips.filter((t) => t.status !== '지난 여행');
  const pastTrips = trips.filter((t) => t.status === '지난 여행');

  const currentList = activeTabType === 'upcoming' ? upcomingTrips : pastTrips;

  const handleTripDetailClick = (trip: Trip) => {
    const matchingDest = destinations.find((d) => d.id === trip.destinationId);
    if (matchingDest) {
      openDestinationDetail(matchingDest);
    } else {
      // Fallback
      openDestinationDetail(destinations[0]);
    }
  };

  return (
    <div className="pb-32 pt-20 px-4 md:px-12 max-w-5xl mx-auto space-y-8">
      {/* Tab Switcher */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTabType('upcoming')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
            activeTabType === 'upcoming'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-surface-container text-gray-700 dark:text-on-surface-variant border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-surface-container-high'
          }`}
        >
          예정된 여행 ({upcomingTrips.length})
        </button>
        <button
          onClick={() => setActiveTabType('past')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
            activeTabType === 'past'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-surface-container text-gray-700 dark:text-on-surface-variant border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-surface-container-high'
          }`}
        >
          지난 여행 ({pastTrips.length})
        </button>
      </div>

      {/* Schedule Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
          {activeTabType === 'upcoming' ? '다가오는 일정' : '완료된 지난 일정'}
        </h2>

        {currentList.length === 0 ? (
          <div className="text-center py-12 bg-gray-100 dark:bg-surface-container rounded-2xl border border-gray-200 dark:border-white/10">
            <p className="text-gray-500 dark:text-gray-400">등록된 여행 일정이 없습니다.</p>
            <button
              onClick={openAddTripModal}
              className="mt-4 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:opacity-90"
            >
              + 새로운 여행 일정 추가하기
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {currentList.map((trip) => {
              const isConfirmed = trip.status === '예약 확정';
              const isPending = trip.status === '대기 중';

              return (
                <div
                  key={trip.id}
                  className="bg-gray-100 dark:bg-surface-container rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 group hover:border-gray-400 dark:hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Banner */}
                    <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Status Tag */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg flex items-center gap-1.5 border border-white/10 shadow-sm">
                        {isConfirmed && (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                            <span className="text-xs font-bold text-white">예약 확정</span>
                          </>
                        )}
                        {isPending && (
                          <>
                            <Clock className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold text-amber-300">대기 중</span>
                          </>
                        )}
                        {!isConfirmed && !isPending && (
                          <span className="text-xs font-bold text-gray-300">지난 여행</span>
                        )}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
                            {trip.title}
                          </h3>
                          <span className="text-lg font-bold text-gray-900 dark:text-white shrink-0">
                            {trip.priceDisplay}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-gray-600 dark:text-on-surface-variant text-sm mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-primary dark:text-white" />
                            <span>
                              {trip.startDate} - {trip.endDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-primary dark:text-white" />
                            <span>{trip.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-white/5">
                        <div className="flex items-center gap-2">
                          {trip.participantAvatars && trip.participantAvatars.length > 0 && (
                            <div className="flex -space-x-2 mr-2">
                              {trip.participantAvatars.map((av, idx) => (
                                <img
                                  key={idx}
                                  src={av}
                                  alt="참가자"
                                  className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-container object-cover grayscale"
                                />
                              ))}
                              {trip.participantsCount > 2 && (
                                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-container bg-gray-200 dark:bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-gray-700 dark:text-on-surface-variant">
                                  +{trip.participantsCount - trip.participantAvatars.length}
                                </div>
                              )}
                            </div>
                          )}

                          {trip.hotelNote && (
                            <span className="text-xs font-semibold text-gray-600 dark:text-on-surface-variant bg-gray-200 dark:bg-surface-container-high px-2.5 py-1 rounded-md">
                              {trip.hotelNote}
                            </span>
                          )}
                          {trip.badge && (
                            <span className="text-xs font-bold text-gray-900 dark:text-white bg-gray-900/10 dark:bg-white/10 px-2.5 py-1 rounded-md border border-gray-300 dark:border-white/20">
                              {trip.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveTab('traffic')}
                            className="px-3.5 py-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1 transition-all"
                            title="실시간 교통/경로 보기"
                          >
                            <Bus className="w-3.5 h-3.5" />
                            <span>실시간 교통</span>
                          </button>

                          <button
                            onClick={() => handleTripDetailClick(trip)}
                            className="px-5 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-md"
                          >
                            상세 보기
                          </button>

                          <button
                            onClick={() => cancelTrip(trip.id)}
                            className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                            title="일정 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Floating Action Button */}
      <button
        onClick={openAddTripModal}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-30 border border-white/20"
        title="새 일정 추가"
      >
        <span className="text-3xl font-light">+</span>
      </button>
    </div>
  );
};
