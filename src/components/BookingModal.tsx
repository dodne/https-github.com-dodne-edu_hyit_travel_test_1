import React, { useState } from 'react';
import { useTrips } from '../context/TripsContext';
import { X, Check, CreditCard, Users, Calendar, Bus } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { bookingDestination, closeBookingModal, addTrip, setActiveTab } = useTrips();
  const [passengers, setPassengers] = useState<number>(1);
  const [transitOption, setTransitOption] = useState<string>('직항 항공편 + 전용 셔틀');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!bookingDestination) return null;

  const totalPrice = bookingDestination.price * passengers;

  const handleConfirmBooking = () => {
    setIsSuccess(true);
    setTimeout(() => {
      addTrip({
        destinationId: bookingDestination.id,
        title: bookingDestination.name,
        location: bookingDestination.location,
        country: bookingDestination.country,
        startDate: '2024년 10월 25일',
        endDate: '10월 31일',
        price: totalPrice,
        priceDisplay: `₩${totalPrice.toLocaleString()}`,
        status: '예약 확정',
        image: bookingDestination.image,
        participantsCount: passengers,
        hotelNote: '5성급 부티크 호텔 예약 완료',
      });
      setIsSuccess(false);
      closeBookingModal();
      setActiveTab('myTrips');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-surface-container rounded-3xl border border-gray-200 dark:border-white/10 max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/10">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
              여행 빠른 예약
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {bookingDestination.name}
            </p>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
              예약이 성공적으로 확정되었습니다!
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              내 여행 메뉴로 이동하여 일정을 확인하고 실시간 교통 현황을 조회할 수 있습니다.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Passenger Selector */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>여행 인원 선택</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPassengers(num)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      passengers === num
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md'
                        : 'bg-gray-100 dark:bg-surface-container-high text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {num}명
                  </button>
                ))}
              </div>
            </div>

            {/* Transit Option Preference */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Bus className="w-4 h-4" />
                <span>실시간 이동 연계 수단 선택</span>
              </label>
              <select
                value={transitOption}
                onChange={(e) => setTransitOption(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white outline-none"
              >
                <option value="직항 항공편 + 전용 셔틀">직항 항공편 + 전용 셔틀 (기본)</option>
                <option value="고속철도 KTX/SBB 연계">고속철도 KTX/SBB 연계 패스</option>
                <option value="렌터카 / 프라이빗 드라이버">프라이빗 렌터카 / 전용 기사 서비스</option>
              </select>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 bg-gray-50 dark:bg-surface-container-high rounded-2xl border border-gray-200 dark:border-white/10 space-y-2">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>기본 상품가 (1인)</span>
                <span>{bookingDestination.priceDisplay}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>인원</span>
                <span>{passengers}명</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>실시간 세금 및 유류할증료</span>
                <span className="text-emerald-500 font-bold">포함 완료</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-white/10">
                <span>총 결제금액</span>
                <span className="text-primary dark:text-white">₩{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              onClick={handleConfirmBooking}
              className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>₩{totalPrice.toLocaleString()} 결제 및 예약 완료</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
