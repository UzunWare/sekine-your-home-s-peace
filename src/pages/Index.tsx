import { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import CurrentTime from "@/components/CurrentTime";
import DateDisplay from "@/components/DateDisplay";
import LocationBadge from "@/components/LocationBadge";
import PrayerTimesGrid from "@/components/PrayerTimesGrid";
import AdhanOverlay from "@/components/AdhanOverlay";
import { getMockPrayerTimes, getHijriDate } from "@/lib/prayerUtils";
import { PrayerTime } from "@/types/prayer";

const Index = () => {
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [hijriDate] = useState(getHijriDate());
  const [showAdhan, setShowAdhan] = useState(false);
  const [activePrayer, setActivePrayer] = useState<PrayerTime | null>(null);

  useEffect(() => {
    // Update prayer times
    const updatePrayers = () => {
      setPrayers(getMockPrayerTimes());
    };

    updatePrayers();
    const interval = setInterval(updatePrayers, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Demo: Show Adhan overlay on click of next prayer
  const handleShowAdhan = (prayer: PrayerTime) => {
    setActivePrayer(prayer);
    setShowAdhan(true);
  };

  const nextPrayer = prayers.find((p) => p.isNext);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <BackgroundSlideshow />

      {/* Navigation */}
      <NavigationBar />

      {/* Main content - with screen burn protection drift */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-24 animate-drift">
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Location */}
          <LocationBadge location="London, United Kingdom" />

          {/* Current time */}
          <CurrentTime />

          {/* Date display */}
          <DateDisplay hijriDate={hijriDate} />

          {/* Next prayer indicator */}
          {nextPrayer && (
            <button
              onClick={() => handleShowAdhan(nextPrayer)}
              className="mt-4 flex items-center gap-3 px-6 py-3 rounded-full border border-gold/30 bg-gold/5 hover:bg-gold/10 transition-all duration-300 group"
            >
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold-soft group-hover:text-gold transition-colors">
                Next: <span className="font-arabic">{nextPrayer.arabicName}</span> ({nextPrayer.name}) at {nextPrayer.time}
              </span>
            </button>
          )}

          {/* Prayer times grid */}
          <div className="mt-8">
            <PrayerTimesGrid prayers={prayers} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 p-6">
        <div className="flex justify-center">
          <p className="text-xs text-muted-foreground/50">
            Sekine TV • Tranquility for your home
          </p>
        </div>
      </footer>

      {/* Adhan Overlay */}
      {showAdhan && activePrayer && (
        <AdhanOverlay
          prayer={activePrayer}
          onClose={() => setShowAdhan(false)}
          isPlaying={true}
        />
      )}
    </div>
  );
};

export default Index;
