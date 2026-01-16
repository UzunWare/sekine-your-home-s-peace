import { Settings, BookOpen, HandHeart } from 'lucide-react';
import { IdleLayoutProps } from './types';

const PrayerFocusLayout = ({
  currentTime,
  formatTime,
  formatDate,
  prayers,
  hijriDate,
  quoteOfTheDay,
  settings,
  isMiniPlayerVisible,
  onNavigate,
  onOpenInvocationsDialog,
}: IdleLayoutProps) => {
  return (
    <div className={`relative z-10 h-full flex flex-col p-6 sm:p-8 md:p-10 transition-all ${isMiniPlayerVisible ? 'pb-24 sm:pb-28' : ''}`}>
      {/* Compact header */}
      <header className="flex justify-between items-center mb-6 lg:mb-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-light tabular-nums">
            {formatTime(currentTime)}
          </span>
          <span className="text-muted-foreground/50">•</span>
          <span className="text-sm sm:text-base text-muted-foreground">{formatDate(currentTime)}</span>
          {settings.display.showHijriDate && hijriDate && (
            <>
              <span className="text-muted-foreground/50">•</span>
              <span className="text-sm text-primary font-arabic">{hijriDate.day} {hijriDate.month}</span>
            </>
          )}
        </div>
        
        <div className="flex gap-2 sm:gap-3">
          <button
            data-focusable="true"
            onClick={onOpenInvocationsDialog}
            className="p-2 sm:p-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
          >
            <HandHeart className="w-5 h-5" />
          </button>
          <button
            data-focusable="true"
            onClick={() => onNavigate('/quran')}
            className="p-2 sm:p-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
          >
            <BookOpen className="w-5 h-5" />
          </button>
          <button
            data-focusable="true"
            onClick={() => onNavigate('/settings')}
            className="p-2 sm:p-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Large prayer cards grid */}
      <main className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto w-full">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              data-focusable="true"
              className={`flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 rounded-2xl transition-all cursor-pointer ${
                prayer.isNext 
                  ? 'glass-card border-2 border-primary/50 gold-glow scale-105' 
                  : prayer.isPassed 
                    ? 'bg-card/20 opacity-40' 
                    : 'glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary'
              }`}
              onClick={() => prayer.isNext && onNavigate('/adhan')}
            >
              <p className="font-arabic text-2xl sm:text-3xl lg:text-4xl text-primary mb-2">
                {prayer.arabicName}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-3">
                {prayer.name}
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl tabular-nums font-light">
                {prayer.time}
              </p>
              {prayer.isNext && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs sm:text-sm text-primary">Next Prayer</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Quote at bottom */}
      {settings.display.showCentralQuote && (
        <footer className="text-center mt-6 lg:mt-10 px-4">
          <p className="font-quote text-sm sm:text-base lg:text-lg text-foreground/70 italic max-w-2xl mx-auto">
            "{quoteOfTheDay.text}"
          </p>
          <p className="text-xs text-muted-foreground mt-2">— {quoteOfTheDay.source}</p>
        </footer>
      )}
    </div>
  );
};

export default PrayerFocusLayout;
