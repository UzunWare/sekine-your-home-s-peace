import { PrayerTime } from "@/types/prayer";
import PrayerCard from "./PrayerCard";

interface PrayerTimesGridProps {
  prayers: PrayerTime[];
}

const PrayerTimesGrid = ({ prayers }: PrayerTimesGridProps) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-6xl">
      {prayers.map((prayer, index) => (
        <div
          key={prayer.name}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PrayerCard prayer={prayer} />
        </div>
      ))}
    </div>
  );
};

export default PrayerTimesGrid;
