// App-wide types for Sekine TV

export type AppMode = 'home' | 'mosque';

export type CalculationMethod = 
  | 'ISNA'
  | 'MWL'
  | 'UmmAlQura'
  | 'Egyptian'
  | 'Karachi'
  | 'Tehran'
  | 'Gulf'
  | 'Kuwait'
  | 'isna'
  | 'mwl'
  | 'egypt'
  | 'makkah'
  | 'karachi'
  | 'tehran'
  | 'jafari'
  | 'kuwait'
  | 'qatar'
  | 'singapore';

export type AsrJuristic = 'standard' | 'hanafi';

export type ClockFormat = '12h' | '24h';

export type ScreensaverTimeout = 'disabled' | '20s' | '1m' | '5m' | '10m';

export type IdleLayout = 'classic' | 'split' | 'minimal' | 'prayer-focus' | 'dashboard';

export type ScreensaverLayout = 'classic' | 'minimal' | 'quote-focus' | 'prayer-focus' | 'ambient';

export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;

export type VolumeLevel = 20 | 40 | 60 | 80 | 100;

export interface LocationSettings {
  city: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

export interface PrayerSettings {
  calculationMethod: CalculationMethod;
  asrJuristic: AsrJuristic;
  mode: AppMode;
}

export interface MosqueSettings {
  jumuahEnabled: boolean;
  jumuahTime: string;
  iqamahDelays: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
}

export type BackgroundId = 
  | 'mosque-1' 
  | 'mosque-2' 
  | 'celestial' 
  | 'desert' 
  | 'mountains' 
  | 'ocean' 
  | 'paradise' 
  | 'light';

export interface DisplaySettings {
  clockFormat: ClockFormat;
  showHijriDate: boolean;
  showCentralQuote: boolean;
  showSeconds: boolean;
  backgroundSlideshow: boolean;
  screensaverTimeout: ScreensaverTimeout;
  backgroundId: BackgroundId;
  oledProtection: boolean;
  nightMode: boolean;
  nightModeBrightness: number;
  idleLayout: IdleLayout;
  screensaverLayout: ScreensaverLayout;
}

export interface AdhanSettings {
  enabled: boolean;
  style: string;
  volume: VolumeLevel;
  fadeIn: boolean;
  duaAfterAdhan: boolean;
}

export interface QuranSettings {
  defaultReciter: string;
  playbackSpeed: PlaybackSpeed;
  showTransliteration: boolean;
  translationLanguage: string;
}

export interface DeviceSettings {
  deviceName: string;
  isPaired: boolean;
  pairingCode: string | null;
}

export interface AppSettings {
  location: LocationSettings;
  prayer: PrayerSettings;
  mosque: MosqueSettings;
  display: DisplaySettings;
  adhan: AdhanSettings;
  quran: QuranSettings;
  device: DeviceSettings;
}

export interface AppState {
  isSetupComplete: boolean;
  isOnline: boolean;
  currentScreen: string;
}

// Quran-related types
export interface Surah {
  number: number;
  arabicName: string;
  englishName: string;
  englishMeaning: string;
  verseCount: number;
  revelationType: 'meccan' | 'medinan';
}

export interface Reciter {
  id: string;
  name: string;
  nationality: string;
  origin?: string;
}

export interface AdhanStyle {
  id: string;
  name: string;
  origin: string;
}

// Player types - unified media player content types
export type PlayerContentType = 'quran' | 'adhan' | 'invocations' | 'jawshan';

export interface PlayerState {
  isPlaying: boolean;
  isMinimized: boolean;
  contentType: PlayerContentType | null;
  currentTrack: {
    title: string;
    subtitle: string;
    arabicText?: string;
    translation?: string;
  } | null;
  audioUrl?: string;
  progress: number;
  duration: number;
  currentVerseNumber?: number;
}

// Quote type
export interface Quote {
  id: string;
  arabic?: string;
  text: string;
  source: string;
}
