import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TripsProvider, useTrips } from './context/TripsContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExploreView } from './components/ExploreView';
import { MyTripsView } from './components/MyTripsView';
import { TripDetailView } from './components/TripDetailView';
import { LiveTrafficView } from './components/LiveTrafficView';
import { ProfileView } from './components/ProfileView';
import { AddTripModal } from './components/AddTripModal';
import { BookingModal } from './components/BookingModal';

const AppContent: React.FC = () => {
  const { activeTab, selectedDestination } = useTrips();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0e12] text-gray-900 dark:text-white transition-colors duration-200 selection:bg-blue-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main View rendering based on activeTab */}
      <main className="min-h-screen">
        {selectedDestination ? (
          <TripDetailView />
        ) : (
          <>
            {(activeTab === 'explore' || activeTab === 'destinations') && <ExploreView />}
            {activeTab === 'myTrips' && <MyTripsView />}
            {activeTab === 'traffic' && <LiveTrafficView />}
            {activeTab === 'profile' && <ProfileView />}
          </>
        )}
      </main>

      {/* Global Modals */}
      <AddTripModal />
      <BookingModal />

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <TripsProvider>
        <AppContent />
      </TripsProvider>
    </ThemeProvider>
  );
}
