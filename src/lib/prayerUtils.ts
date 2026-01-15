import { PrayerTime, HijriDate } from "@/types/prayer";

// Mock prayer times - in production these would be calculated based on location
export const getMockPrayerTimes = (): PrayerTime[] => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const prayers: PrayerTime[] = [
    { name: "Fajr", arabicName: "الفجر", time: "05:23" },
    { name: "Sunrise", arabicName: "الشروق", time: "06:45" },
    { name: "Dhuhr", arabicName: "الظهر", time: "12:15" },
    { name: "Asr", arabicName: "العصر", time: "15:30" },
    { name: "Maghrib", arabicName: "المغرب", time: "18:05" },
    { name: "Isha", arabicName: "العشاء", time: "19:30" },
  ];

  // Determine which prayer is next based on current time
  let foundNext = false;
  return prayers.map((prayer) => {
    const [hour, minute] = prayer.time.split(":").map(Number);
    const prayerMinutes = hour * 60 + minute;
    const currentMinutes = currentHour * 60 + currentMinute;

    if (!foundNext && prayerMinutes > currentMinutes) {
      foundNext = true;
      return { ...prayer, isNext: true };
    }

    return { ...prayer, isPassed: prayerMinutes <= currentMinutes };
  });
};

export const getHijriDate = (): HijriDate => {
  // Mock Hijri date - in production use a proper Islamic calendar library
  return {
    day: 14,
    month: "Jumada al-Thani",
    year: 1447,
  };
};

export const formatTimeUntilPrayer = (prayerTime: string): string => {
  const now = new Date();
  const [hour, minute] = prayerTime.split(":").map(Number);
  
  const prayerDate = new Date();
  prayerDate.setHours(hour, minute, 0, 0);
  
  if (prayerDate < now) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }
  
  const diff = prayerDate.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};
