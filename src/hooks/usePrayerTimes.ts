import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { PrayerTime, HijriDate } from '@/types/prayer';

// Mock prayer time calculation - in production, use adhan-js library
function calculatePrayerTimes(latitude: number, longitude: number, date: Date): PrayerTime[] {
  // These are mock times - real implementation would use proper astronomical calculations
  const baseTimes = [
    { name: 'Fajr', arabicName: 'الفجر', hour: 5, minute: 23 },
    { name: 'Sunrise', arabicName: 'الشروق', hour: 6, minute: 45 },
    { name: 'Dhuhr', arabicName: 'الظهر', hour: 12, minute: 15 },
    { name: 'Asr', arabicName: 'العصر', hour: 15, minute: 30 },
    { name: 'Maghrib', arabicName: 'المغرب', hour: 18, minute: 5 },
    { name: 'Isha', arabicName: 'العشاء', hour: 19, minute: 30 },
  ];

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let foundNext = false;

  return baseTimes.map(prayer => {
    const prayerMinutes = prayer.hour * 60 + prayer.minute;
    const time = `${String(prayer.hour).padStart(2, '0')}:${String(prayer.minute).padStart(2, '0')}`;
    
    const isNext = !foundNext && prayerMinutes > currentMinutes;
    if (isNext) foundNext = true;
    
    return {
      name: prayer.name,
      arabicName: prayer.arabicName,
      time,
      isNext,
      isPassed: prayerMinutes <= currentMinutes,
    };
  });
}

// Hijri date conversion (simplified mock)
function calculateHijriDate(gregorianDate: Date): HijriDate {
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhul Qadah', 'Dhul Hijjah'
  ];
  
  // Simplified calculation - real implementation needs proper Islamic calendar library
  const jd = Math.floor((gregorianDate.getTime() / 86400000) + 2440587.5);
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l1 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l1) / 5316) * Math.floor((50 * l1) / 17719) + 
            Math.floor(l1 / 5670) * Math.floor((43 * l1) / 15238);
  const l2 = l1 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - 
             Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l2) / 709);
  const day = l2 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;

  return {
    day,
    month: hijriMonths[month - 1] || 'Jumada al-Thani',
    year,
  };
}

export function usePrayerTimes() {
  const { settings } = useApp();
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);

  useEffect(() => {
    const updatePrayers = () => {
      const date = new Date();
      const { latitude, longitude } = settings.location;
      setPrayers(calculatePrayerTimes(latitude, longitude, date));
      setHijriDate(calculateHijriDate(date));
    };

    updatePrayers();
    
    // Update every minute
    const interval = setInterval(updatePrayers, 60000);
    
    return () => clearInterval(interval);
  }, [settings.location]);

  const nextPrayer = useMemo(() => prayers.find(p => p.isNext), [prayers]);
  
  const timeUntilNextPrayer = useMemo(() => {
    if (!nextPrayer) return null;
    
    const now = new Date();
    const [hour, minute] = nextPrayer.time.split(':').map(Number);
    const prayerDate = new Date();
    prayerDate.setHours(hour, minute, 0, 0);
    
    if (prayerDate < now) {
      prayerDate.setDate(prayerDate.getDate() + 1);
    }
    
    const diff = prayerDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes, formatted: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m` };
  }, [nextPrayer]);

  return {
    prayers,
    hijriDate,
    nextPrayer,
    timeUntilNextPrayer,
  };
}
