import React, { createContext, useContext, useState } from 'react';
import { ActiveTab, Destination, Trip } from '../types';
import { INITIAL_DESTINATIONS, INITIAL_TRIPS } from '../data/mockData';

interface TripsContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  destinations: Destination[];
  trips: Trip[];
  savedDestinationIds: string[];
  selectedDestination: Destination | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  bookingDestination: Destination | null;
  isAddTripModalOpen: boolean;
  
  toggleSaveDestination: (id: string) => void;
  openDestinationDetail: (dest: Destination) => void;
  closeDestinationDetail: () => void;
  openBookingModal: (dest: Destination) => void;
  closeBookingModal: () => void;
  openAddTripModal: () => void;
  closeAddTripModal: () => void;
  addTrip: (newTrip: Omit<Trip, 'id'>) => void;
  cancelTrip: (tripId: string) => void;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [destinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>(['positano-beach', 'santorini-sunset']);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [bookingDestination, setBookingDestination] = useState<Destination | null>(null);
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState<boolean>(false);

  const toggleSaveDestination = (id: string) => {
    setSavedDestinationIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openDestinationDetail = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const closeDestinationDetail = () => {
    setSelectedDestination(null);
  };

  const openBookingModal = (dest: Destination) => {
    setBookingDestination(dest);
  };

  const closeBookingModal = () => {
    setBookingDestination(null);
  };

  const openAddTripModal = () => {
    setIsAddTripModalOpen(true);
  };

  const closeAddTripModal = () => {
    setIsAddTripModalOpen(false);
  };

  const addTrip = (tripData: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: `trip-${Date.now()}`,
    };
    setTrips((prev) => [newTrip, ...prev]);
    setIsAddTripModalOpen(false);
  };

  const cancelTrip = (tripId: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  return (
    <TripsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        destinations,
        trips,
        savedDestinationIds,
        selectedDestination,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        bookingDestination,
        isAddTripModalOpen,
        toggleSaveDestination,
        openDestinationDetail,
        closeDestinationDetail,
        openBookingModal,
        closeBookingModal,
        openAddTripModal,
        closeAddTripModal,
        addTrip,
        cancelTrip,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
};
