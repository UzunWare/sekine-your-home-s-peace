export interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  isNext?: boolean;
  isPassed?: boolean;
}

export interface HijriDate {
  day: number;
  month: string;
  year: number;
}

export interface Settings {
  location: string;
  calculationMethod: string;
  adhanEnabled: boolean;
  adhanReciter: string;
  iqamahCountdown: number;
}
