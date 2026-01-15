import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { MapPin, Settings, BookOpen, Volume2, WifiOff } from 'lucide-react';
import { getQuoteOfTheDay } from '@/data/dailyQuotes';
import MiniPlayer from '@/components/MiniPlayer';
import mosqueBg from '@/assets/mosque-background-1.jpg';

const getTimeoutMs = (timeout: string): number | null => {
  switch (timeout) {
    case '20s': return 20 * 1000;
    case '1m': return 60 * 1000;
    case '5m': return 5 * 60 * 1000;
    case '10m': return 10 * 60 * 1000;
    case 'disabled': return null;
    default: return 5 * 60 * 1000;
  }
};

const Idle = () => {
  const navigate = useNavigate();
  const { settings, appState, playerState } = useApp();
  const { prayers, hijriDate, nextPrayer, timeUntilNextPrayer } = usePrayerTimes();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quoteOfTheDay] = useState(() => getQuoteOfTheDay());
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Check if mini player is showing
  const isMiniPlayerVisible = playerState.isMinimized && playerState.currentTrack;

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  // Reset activity on any user interaction
  const resetActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Listen for any user activity
  useEffect(() => {
    const events = ['keydown', 'mousemove', 'mousedown', 'touchstart', 'click'];
    events.forEach(event => window.addEventListener(event, resetActivity));
    return () => {
      events.forEach(event => window.removeEventListener(event, resetActivity));
    };
  }, [resetActivity]);

  // Screensaver timeout
  useEffect(() => {
    const timeoutMs = getTimeoutMs(settings.display.screensaverTimeout);
    if (!timeoutMs) return;

    const checkTimeout = setInterval(() => {
      const elapsed = Date.now() - lastActivity;
      if (elapsed >= timeoutMs) {
        navigate('/screensaver');
      }
    }, 1000);

    return () => clearInterval(checkTimeout);
  }, [lastActivity, settings.display.screensaverTimeout, navigate]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    if (settings.display.clockFormat === '12h') {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mosqueBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      
      {/* Offline indicator */}
      {!appState.isOnline && (
        <div className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-destructive/20 rounded-full">
          <WifiOff className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive">Offline</span>
        </div>
      )}

      {/* Main content */}
      <div className={`relative z-10 h-full flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 transition-all ${isMiniPlayerVisible ? 'pb-24 sm:pb-28' : ''}`}>
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4">
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 glass-card">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-sm sm:text-base lg:text-lg">{settings.location.city || 'Set Location'}, {settings.location.country}</span>
          </div>
          
          <div className="flex gap-2 sm:gap-4">
            <button
              data-focusable="true"
              onClick={() => navigate('/quran')}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Quran</span>
            </button>
            <button
              data-focusable="true"
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Settings</span>
            </button>
          </div>
        </header>

        {/* Center content */}
        <main className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* Time */}
          <div className="text-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-extralight leading-none tabular-nums text-foreground">
              {formatTime(currentTime)}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mt-2 sm:mt-4">{formatDate(currentTime)}</p>
            {settings.display.showHijriDate && hijriDate && (
              <p className="text-base sm:text-lg lg:text-xl text-primary mt-1 sm:mt-2 font-arabic">
                {hijriDate.day} {hijriDate.month} {hijriDate.year} هـ
              </p>
            )}
          </div>

          {/* Next prayer */}
          {nextPrayer && timeUntilNextPrayer && (
            <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-8 py-2 sm:py-4 glass-card border-primary/30">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-base sm:text-lg lg:text-xl">
                <span className="font-arabic text-lg sm:text-xl lg:text-2xl text-primary">{nextPrayer.arabicName}</span>
                <span className="mx-2 sm:mx-3 text-muted-foreground">•</span>
                <span>{nextPrayer.name} in {timeUntilNextPrayer.formatted}</span>
              </span>
            </div>
          )}

          {/* Quote of the Day */}
          {settings.display.showCentralQuote && (
            <div className="max-w-2xl lg:max-w-4xl text-center mt-4 sm:mt-8 px-4">
              <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary/60 mb-3 sm:mb-6">Quote of the Day</p>
              {quoteOfTheDay.arabic && (
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-arabic text-primary mb-3 sm:mb-6 leading-relaxed drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]" dir="rtl">
                  {quoteOfTheDay.arabic}
                </p>
              )}
              <blockquote className="relative">
                <p className="font-quote text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 italic leading-relaxed px-4 sm:px-8">
                  "{quoteOfTheDay.text}"
                </p>
              </blockquote>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-4 font-serif tracking-wide">
                — {quoteOfTheDay.source}
              </p>
            </div>
          )}

          {/* Play Adhan button */}
          <button
            data-focusable="true"
            onClick={() => navigate('/adhan')}
            className="mt-4 sm:mt-8 flex items-center gap-2 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 focus:ring-2 focus:ring-primary transition-all"
          >
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="text-sm sm:text-base lg:text-lg">Play Adhan</span>
          </button>
        </main>

        {/* Prayer times grid */}
        <footer className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl transition-all ${
                prayer.isNext 
                  ? 'glass-card border-primary/50 gold-glow' 
                  : prayer.isPassed 
                    ? 'bg-card/30 opacity-50' 
                    : 'glass-card'
              }`}
            >
              <p className="text-xs sm:text-sm text-muted-foreground">{prayer.name}</p>
              <p className="font-arabic text-sm sm:text-base lg:text-lg text-primary">{prayer.arabicName}</p>
              <p className="text-base sm:text-lg lg:text-xl tabular-nums mt-0.5 sm:mt-1">{prayer.time}</p>
            </div>
          ))}
        </footer>
      </div>

      {/* Mini Player */}
      <MiniPlayer />

      {/* Footer brand - hide when mini player is visible */}
      {!isMiniPlayerVisible && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <p className="text-xs text-muted-foreground/50">Sekine TV • Tranquility for your home</p>
        </div>
      )}
    </div>
  );
};

export default Idle;
