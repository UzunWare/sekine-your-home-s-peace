import { PrayerTime, HijriDate } from '@/types/prayer';
import { AppSettings, Quote } from '@/types/app';

export interface IdleLayoutProps {
  currentTime: Date;
  formatTime: (date: Date) => string;
  formatDate: (date: Date) => string;
  prayers: PrayerTime[];
  nextPrayer: PrayerTime | null;
  timeUntilNextPrayer: { hours: number; minutes: number; formatted: string } | null;
  hijriDate: HijriDate | null;
  quoteOfTheDay: Quote;
  settings: AppSettings;
  isOnline: boolean;
  isMiniPlayerVisible: boolean;
  onNavigate: (path: string) => void;
  onOpenInvocationsDialog: () => void;
}
