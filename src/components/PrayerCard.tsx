import { PrayerTime } from "@/types/prayer";
import { formatTimeUntilPrayer } from "@/lib/prayerUtils";

interface PrayerCardProps {
  prayer: PrayerTime;
}

const PrayerCard = ({ prayer }: PrayerCardProps) => {
  const isActive = prayer.isNext;
  const isPassed = prayer.isPassed;
  const isSunrise = prayer.name === "Sunrise";

  return (
    <div
      className={`
        prayer-card relative overflow-hidden transition-all duration-500
        ${isActive ? "prayer-card-active scale-105" : ""}
        ${isPassed && !isActive ? "opacity-50" : ""}
        ${isSunrise ? "border-teal/30" : ""}
      `}
    >
      {/* Active glow effect */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-col items-center gap-2">
        {/* Arabic name */}
        <span className={`font-arabic text-2xl ${isActive ? "text-gold animate-gentle-pulse" : "text-cream-muted"}`}>
          {prayer.arabicName}
        </span>

        {/* English name */}
        <span className={`text-sm font-medium uppercase tracking-wider ${isActive ? "text-gold-soft" : "text-muted-foreground"}`}>
          {prayer.name}
        </span>

        {/* Time */}
        <span className={`text-3xl font-light tabular-nums ${isActive ? "text-foreground text-shadow-gold" : "text-foreground/80"}`}>
          {prayer.time}
        </span>

        {/* Countdown for next prayer */}
        {isActive && (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs text-gold-soft font-medium">
              in {formatTimeUntilPrayer(prayer.time)}
            </span>
          </div>
        )}

        {/* Sunrise indicator */}
        {isSunrise && (
          <span className="text-xs text-teal-soft mt-1">End of Fajr</span>
        )}
      </div>
    </div>
  );
};

export default PrayerCard;
