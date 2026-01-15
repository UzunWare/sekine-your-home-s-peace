import { HijriDate } from "@/types/prayer";

interface DateDisplayProps {
  hijriDate: HijriDate;
}

const DateDisplay = ({ hijriDate }: DateDisplayProps) => {
  const gregorianDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
      {/* Gregorian date */}
      <p className="text-lg text-foreground/80 font-light">
        {gregorianDate}
      </p>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <span className="text-gold text-sm">✦</span>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      {/* Hijri date */}
      <p className="text-lg text-gold-soft font-arabic">
        {hijriDate.day} {hijriDate.month} {hijriDate.year} AH
      </p>
    </div>
  );
};

export default DateDisplay;
