import React, { useState } from 'react';
import { useTrips } from '../context/TripsContext';
import { X, Calendar, MapPin, DollarSign, Image as ImageIcon } from 'lucide-react';

export const AddTripModal: React.FC = () => {
  const { isAddTripModalOpen, closeAddTripModal, addTrip } = useTrips();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('2024년 11월 15일');
  const [endDate, setEndDate] = useState('11월 20일');
  const [price, setPrice] = useState('1250000');
  const [hotelNote, setHotelNote] = useState('4성급 호텔 예약 진행중');
  const [image, setImage] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCv91U283UHyxPrK8RWziDlWCcNJZMTh37mLj-QCYZqdvc0T4vLttXCFvwWNK5oWiK1yiLtlT9Aszp1ShZlt8yh3PVaiDF3mmxiAPAE2hkOe5YOCnyhevuQP9BqvLa3f_3p6o-yYOMseUwhP1B94GB0Ke-q6Gdznjq65Li8M-n5-GDfBvlalrliolt91OZKBgVuBTyQDCBGwMJjSS5Nx_ouCtLkLONZO6E9rbxoX44Rqx1aG-LfnYla9-0sjb38aGz9ZJsvH6iaH1D7'
  );

  if (!isAddTripModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) return;

    const numPrice = parseInt(price, 10) || 1200000;

    addTrip({
      title,
      location,
      country: location.split(',')[1]?.trim() || '해외',
      startDate,
      endDate,
      price: numPrice,
      priceDisplay: `₩${numPrice.toLocaleString()}`,
      status: '예약 확정',
      image,
      participantsCount: 2,
      hotelNote,
    });

    setTitle('');
    setLocation('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-surface-container rounded-3xl border border-gray-200 dark:border-white/10 max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
            새 여행 일정 추가하기
          </h3>
          <button
            onClick={closeAddTripModal}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 block">
              여행 제목
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 스페인 바르셀로나 예술 투어"
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 block">
              목적지 및 도시
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 바르셀로나, 스페인"
                className="w-full pl-9 pr-4 py-2.5 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 block">
                시작일
              </label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 block">
                종료일
              </label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 block">
              예상 가격 (원)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 block">
              숙소 및 정보 메모
            </label>
            <input
              type="text"
              value={hotelNote}
              onChange={(e) => setHotelNote(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-surface-container-high rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeAddTripModal}
              className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 text-sm font-bold"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold shadow-lg hover:opacity-90"
            >
              일정 생성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
