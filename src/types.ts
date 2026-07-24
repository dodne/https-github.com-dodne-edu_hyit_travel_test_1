export type ThemeMode = 'dark' | 'light';

export type ActiveTab = 'explore' | 'destinations' | 'myTrips' | 'traffic' | 'profile';

export interface ItineraryEvent {
  time: string;
  title: string;
  description: string;
  images?: string[];
}

export interface ItineraryDay {
  day: number;
  events: ItineraryEvent[];
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  price: number; // in KRW
  priceDisplay: string;
  rating: number;
  reviewCount: number;
  duration: string; // e.g. "6박 7일"
  image: string;
  category: '해변' | '산맥' | '도시' | '숲' | '캠핑' | '인기';
  tags: string[];
  badges?: string[];
  features?: string[];
  isPopular?: boolean;
  isEco?: boolean;
  isTrending?: boolean;
  description: string;
  itinerary: ItineraryDay[];
  highlights?: string[];
}

export interface Trip {
  id: string;
  destinationId?: string;
  title: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  price: number;
  priceDisplay: string;
  status: '예약 확정' | '대기 중' | '지난 여행';
  image: string;
  participantsCount: number;
  participantAvatars?: string[];
  hotelNote?: string;
  badge?: string;
}

export interface TrafficOption {
  type: 'flight' | 'train' | 'car' | 'ferry' | 'bus';
  name: string;
  duration: string;
  price: string;
  status: string; // e.g. "정시 운항", "해안 구간 정체", "원활"
  delayMinutes: number;
  notes: string;
}

export interface DestinationTraffic {
  id: string;
  name: string;
  location: string;
  status: '원활' | '서행' | '정체';
  congestionIndex: number; // 0-100
  temperature: string;
  weather: string;
  transitOptions: TrafficOption[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  membership: string;
  roleTag: string;
  stats: {
    destinationsCount: number;
    reviewsCount: number;
    savedCount: number;
    mileage: string;
  };
}
