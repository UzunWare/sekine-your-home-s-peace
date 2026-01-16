import { MapPin, Settings, BookOpen, Volume2 } from 'lucide-react';
import { IdleLayoutProps } from './types';
import InvocationsButton from '@/components/InvocationsButton';

const ClassicLayout = ({
  currentTime,
  formatTime,
  formatDate,
  prayers,
  nextPrayer,
  timeUntilNextPrayer,
  hijriDate,
  quoteOfTheDay,
  settings,
  isMiniPlayerVisible,
  onNavigate,
  onOpenInvocationsDialog,
}: IdleLayoutProps) => {
  return (
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
            onClick={() => onNavigate('/quran')}
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Quran</span>
          </button>
          <button
            data-focusable="true"
            onClick={() => onNavigate('/settings')}
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

        {/* Action buttons */}
        <div className="mt-4 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            data-focusable="true"
            onClick={() => onNavigate('/player?type=adhan')}
            className="flex items-center gap-2 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 focus:ring-2 focus:ring-primary transition-all"
          >
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="text-sm sm:text-base lg:text-lg">Play Adhan</span>
          </button>
          <InvocationsButton onClick={onOpenInvocationsDialog} />
        </div>
      </main>

      {/* Prayer times grid */}
      <footer className={`flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 transition-all ${isMiniPlayerVisible ? 'mb-20 sm:mb-24' : ''}`}>
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
  );
};

export default ClassicLayout;
