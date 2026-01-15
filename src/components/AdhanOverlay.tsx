import { PrayerTime } from "@/types/prayer";
import { formatTimeUntilPrayer } from "@/lib/prayerUtils";
import { Volume2 } from "lucide-react";

interface AdhanOverlayProps {
  prayer: PrayerTime;
  onClose: () => void;
  isPlaying: boolean;
}

const AdhanOverlay = ({ prayer, onClose, isPlaying }: AdhanOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center p-8 max-w-2xl animate-fade-in">
        {/* Decorative top ornament */}
        <div className="flex items-center gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-2xl">☪</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Prayer name */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-arabic text-7xl text-gold text-shadow-gold animate-gentle-pulse">
            {prayer.arabicName}
          </h1>
          <h2 className="text-4xl font-light text-foreground uppercase tracking-[0.3em]">
            {prayer.name}
          </h2>
        </div>

        {/* Time */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-8xl font-light tabular-nums text-foreground">
            {prayer.time}
          </span>
          <span className="text-lg text-gold-soft">It's time to pray</span>
        </div>

        {/* Sound indicator */}
        {isPlaying && (
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gold/10 border border-gold/30">
            <Volume2 className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-gold-soft">Playing Adhan...</span>
          </div>
        )}

        {/* Decorative bottom ornament */}
        <div className="flex items-center gap-4 mt-8">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 px-8 py-3 rounded-full glass-card hover:bg-card/80 transition-all text-foreground/80 hover:text-foreground"
        >
          Return to Display
        </button>
      </div>
    </div>
  );
};

export default AdhanOverlay;
