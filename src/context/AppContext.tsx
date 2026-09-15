import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockIssues, mockServices, mockBusinesses, mockResources } from '../data/mockData';

type AppContextType = {
  issues: any[];
  addIssue: (issue: any) => void;
  supportIssue: (id: string) => void;
  bookings: any[];
  addBooking: (booking: any) => void;
  savedBusinesses: string[];
  toggleSaveBusiness: (id: string) => void;
  services: any[];
  businesses: any[];
  resources: any[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [issues, setIssues] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [savedBusinesses, setSavedBusinesses] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    const localIssues = localStorage.getItem('localx_issues');
    if (localIssues) {
      setIssues(JSON.parse(localIssues));
    } else {
      setIssues(mockIssues);
      localStorage.setItem('localx_issues', JSON.stringify(mockIssues));
    }

    const localBookings = localStorage.getItem('localx_bookings');
    if (localBookings) {
      setBookings(JSON.parse(localBookings));
    }

    const localSaved = localStorage.getItem('localx_saved_biz');
    if (localSaved) {
      setSavedBusinesses(JSON.parse(localSaved));
    }
  }, []);

  const addIssue = (issue: any) => {
    const newIssues = [{ ...issue, id: `i${Date.now()}`, date: new Date().toISOString().split('T')[0], status: 'Reported', supporters: 1 }, ...issues];
    setIssues(newIssues);
    localStorage.setItem('localx_issues', JSON.stringify(newIssues));
  };

  const supportIssue = (id: string) => {
    const newIssues = issues.map(i => i.id === id ? { ...i, supporters: i.supporters + 1 } : i);
    setIssues(newIssues);
    localStorage.setItem('localx_issues', JSON.stringify(newIssues));
  };

  const addBooking = (booking: any) => {
    const newBookings = [{ ...booking, id: `bk${Date.now()}`, status: 'Confirmed' }, ...bookings];
    setBookings(newBookings);
    localStorage.setItem('localx_bookings', JSON.stringify(newBookings));
  };

  const toggleSaveBusiness = (id: string) => {
    let newSaved;
    if (savedBusinesses.includes(id)) {
      newSaved = savedBusinesses.filter(bId => bId !== id);
    } else {
      newSaved = [...savedBusinesses, id];
    }
    setSavedBusinesses(newSaved);
    localStorage.setItem('localx_saved_biz', JSON.stringify(newSaved));
  };

  return (
    <AppContext.Provider value={{
      issues, addIssue, supportIssue,
      bookings, addBooking,
      savedBusinesses, toggleSaveBusiness,
      services: mockServices,
      businesses: mockBusinesses,
      resources: mockResources
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
