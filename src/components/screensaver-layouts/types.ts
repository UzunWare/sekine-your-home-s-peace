import { PrayerTime, HijriDate } from '@/types/prayer';
import { AppSettings, Quote } from '@/types/app';

export interface ScreensaverLayoutProps {
  currentTime: Date;
  formatTime: (date: Date) => string;
  formatDate: (date: Date) => string;
  nextPrayer: PrayerTime | null;
  timeUntilNextPrayer: { hours: number; minutes: number; formatted: string } | null;
  hijriDate: HijriDate | null;
  currentQuote: Quote;
  isTransitioning: boolean;
  settings: AppSettings;
}
