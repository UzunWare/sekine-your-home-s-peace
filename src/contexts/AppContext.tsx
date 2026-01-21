import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AppSettings, AppState, PlayerState } from '@/types/app';

const defaultSettings: AppSettings = {
  location: {
    city: '',
    country: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    latitude: 0,
    longitude: 0,
  },
  prayer: {
    calculationMethod: 'ISNA',
    asrJuristic: 'standard',
    mode: 'home',
  },
  mosque: {
    jumuahEnabled: false,
    jumuahTime: '13:00',
    iqamahDelays: {
      fajr: 20,
      dhuhr: 15,
      asr: 15,
      maghrib: 5,
      isha: 15,
    },
  },
  display: {
    clockFormat: '12h',
    showHijriDate: true,
    showCentralQuote: true,
    showSeconds: true,
    backgroundSlideshow: true,
    screensaverTimeout: '5m',
    backgroundId: 'mosque-1',
    oledProtection: true,
    nightMode: false,
    nightModeBrightness: 25,
    idleLayout: 'classic',
    screensaverLayout: 'classic',
    colorTheme: 'emerald-gold',
  },
  adhan: {
    enabled: true,
    style: 'makkah',
    volume: 80,
    fadeIn: true,
    duaAfterAdhan: true,
  },
  quran: {
    defaultReciter: 'mishary',
    playbackSpeed: 1,
    showTransliteration: false,
    translationLanguage: 'en',
  },
  device: {
    deviceName: 'Sekine TV',
    isPaired: false,
    pairingCode: null,
  },
};

const defaultAppState: AppState = {
  isSetupComplete: false,
  isOnline: navigator.onLine,
  currentScreen: '/',
};

const defaultPlayerState: PlayerState = {
  isPlaying: false,
  isMinimized: false,
  contentType: null,
  currentTrack: null,
  progress: 0,
  duration: 0,
};

interface AppContextType {
  settings: AppSettings;
  updateSettings: <K extends keyof AppSettings>(
    category: K,
    updates: Partial<AppSettings[K]>
  ) => void;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  completeSetup: () => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'sekine-tv-settings';
const STATE_KEY = 'sekine-tv-state';

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STATE_KEY);
      return stored ? { ...defaultAppState, ...JSON.parse(stored) } : defaultAppState;
    } catch {
      return defaultAppState;
    }
  });

  const [playerState, setPlayerState] = useState<PlayerState>(defaultPlayerState);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Persist app state
  useEffect(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify(appState));
  }, [appState]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setAppState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setAppState(prev => ({ ...prev, isOnline: false }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateSettings = useCallback(<K extends keyof AppSettings>(
    category: K,
    updates: Partial<AppSettings[K]>
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], ...updates },
    }));
  }, []);

  const completeSetup = useCallback(() => {
    setAppState(prev => ({ ...prev, isSetupComplete: true }));
  }, []);

  const resetApp = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STATE_KEY);
    setSettings(defaultSettings);
    setAppState(defaultAppState);
    setPlayerState(defaultPlayerState);
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        appState,
        setAppState,
        playerState,
        setPlayerState,
        completeSetup,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
