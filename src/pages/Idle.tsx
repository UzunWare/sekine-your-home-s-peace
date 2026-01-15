import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import { MapPin, Settings, BookOpen, Volume2, WifiOff } from 'lucide-react';
import { quotes } from '@/data/quotes';

const Idle = () => {
  const navigate = useNavigate();
  const { settings, appState, playerState } = useApp();
  const { prayers, hijriDate, nextPrayer, timeUntilNextPrayer } = usePrayerTimes();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 30000);
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
      <BackgroundSlideshow />
      
      {/* Offline indicator */}
      {!appState.isOnline && (
        <div className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-destructive/20 rounded-full">
          <WifiOff className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive">Offline</span>
        </div>
      )}

      {/* Main content with drift animation */}
      <div className="relative z-10 h-full flex flex-col p-12 animate-drift">
        {/* Header */}
        <header className="flex justify-between items-start">
          <div className="flex items-center gap-3 px-6 py-3 glass-card">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-lg">{settings.location.city || 'Set Location'}, {settings.location.country}</span>
          </div>
          
          <div className="flex gap-4">
            <button
              data-focusable="true"
              onClick={() => navigate('/quran')}
              className="flex items-center gap-3 px-6 py-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span>Quran</span>
            </button>
            <button
              data-focusable="true"
              onClick={() => navigate('/settings')}
              className="flex items-center gap-3 px-6 py-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </header>

        {/* Center content */}
        <main className="flex-1 flex flex-col items-center justify-center gap-8">
          {/* Time */}
          <div className="text-center">
            <h1 className="text-[12rem] font-extralight leading-none tabular-nums text-foreground">
              {formatTime(currentTime)}
            </h1>
            <p className="text-2xl text-muted-foreground mt-4">{formatDate(currentTime)}</p>
            {settings.display.showHijriDate && hijriDate && (
              <p className="text-xl text-primary mt-2 font-arabic">
                {hijriDate.day} {hijriDate.month} {hijriDate.year} AH
              </p>
            )}
          </div>

          {/* Next prayer */}
          {nextPrayer && timeUntilNextPrayer && (
            <div className="flex items-center gap-4 px-8 py-4 glass-card border-primary/30">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-xl">
                <span className="font-arabic text-2xl text-primary">{nextPrayer.arabicName}</span>
                <span className="mx-3 text-muted-foreground">•</span>
                <span>{nextPrayer.name} in {timeUntilNextPrayer.formatted}</span>
              </span>
            </div>
          )}

          {/* Quote */}
          {settings.display.showCentralQuote && (
            <div className="max-w-3xl text-center mt-8 animate-fade-in">
              {currentQuote.arabic && (
                <p className="text-3xl font-arabic text-primary mb-4 leading-relaxed">{currentQuote.arabic}</p>
              )}
              <p className="text-xl text-foreground/90 italic">"{currentQuote.text}"</p>
              <p className="text-sm text-muted-foreground mt-3">— {currentQuote.source}</p>
            </div>
          )}

          {/* Play Adhan button */}
          <button
            data-focusable="true"
            onClick={() => navigate('/adhan')}
            className="mt-8 flex items-center gap-4 px-8 py-4 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 focus:ring-2 focus:ring-primary transition-all"
          >
            <Volume2 className="w-6 h-6 text-primary" />
            <span className="text-lg">Play Adhan</span>
          </button>
        </main>

        {/* Prayer times grid */}
        <footer className="flex justify-center gap-4">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className={`px-6 py-4 rounded-xl transition-all ${
                prayer.isNext 
                  ? 'glass-card border-primary/50 gold-glow' 
                  : prayer.isPassed 
                    ? 'bg-card/30 opacity-50' 
                    : 'glass-card'
              }`}
            >
              <p className="text-sm text-muted-foreground">{prayer.name}</p>
              <p className="font-arabic text-lg text-primary">{prayer.arabicName}</p>
              <p className="text-xl tabular-nums mt-1">{prayer.time}</p>
            </div>
          ))}
        </footer>
      </div>

      {/* Floating player bar */}
      {playerState.isMinimized && playerState.currentTrack && (
        <div 
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card/95 backdrop-blur-xl border-t border-border cursor-pointer"
          onClick={() => navigate('/player')}
        >
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <span className="text-primary">{playerState.currentTrack.title}</span>
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${(playerState.progress / playerState.duration) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Footer brand */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <p className="text-xs text-muted-foreground/50">Sekine TV • Tranquility for your home</p>
      </div>
    </div>
  );
};

export default Idle;
