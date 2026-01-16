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
    <div className={`relative z-10 h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 transition-all ${isMiniPlayerVisible ? 'pb-28 sm:pb-32 md:pb-36' : 'pb-16 sm:pb-20'}`}>
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
      <main className="flex-1 flex flex-col items-center justify-center gap-2 sm:gap-4 lg:gap-6 overflow-hidden">
        {/* Time */}
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-extralight leading-none tabular-nums text-foreground">
            {formatTime(currentTime)}
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground mt-1 sm:mt-2">{formatDate(currentTime)}</p>
          {settings.display.showHijriDate && hijriDate && (
            <p className="text-sm sm:text-base lg:text-lg text-primary mt-0.5 sm:mt-1 font-arabic">
              {hijriDate.day} {hijriDate.month} {hijriDate.year} هـ
            </p>
          )}
        </div>

        {/* Next prayer */}
        {nextPrayer && timeUntilNextPrayer && (
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-1.5 sm:py-3 glass-card border-primary/30">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm sm:text-base lg:text-lg">
              <span className="font-arabic text-base sm:text-lg lg:text-xl text-primary">{nextPrayer.arabicName}</span>
              <span className="mx-1.5 sm:mx-2 text-muted-foreground">•</span>
              <span>{nextPrayer.name} in {timeUntilNextPrayer.formatted}</span>
            </span>
          </div>
        )}

        {/* Quote of the Day */}
        {settings.display.showCentralQuote && (
          <div className="max-w-xl lg:max-w-3xl text-center mt-2 sm:mt-4 px-2 sm:px-4">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary/60 mb-2 sm:mb-4">Quote of the Day</p>
            {quoteOfTheDay.arabic && (
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-arabic text-primary mb-2 sm:mb-4 leading-relaxed drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]" dir="rtl">
                {quoteOfTheDay.arabic}
              </p>
            )}
            <blockquote className="relative">
              <p className="font-quote text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 italic leading-relaxed px-2 sm:px-6">
                "{quoteOfTheDay.text}"
              </p>
            </blockquote>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-3 font-serif tracking-wide">
              — {quoteOfTheDay.source}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-2 sm:mt-4 lg:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            data-focusable="true"
            onClick={() => onNavigate('/player?type=adhan')}
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 focus:ring-2 focus:ring-primary transition-all"
          >
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-xs sm:text-sm lg:text-base">Play Adhan</span>
          </button>
          <InvocationsButton onClick={onOpenInvocationsDialog} />
        </div>
      </main>

      {/* Prayer times grid */}
      <footer className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3 mt-4 sm:mt-6">
        {prayers.map((prayer) => (
          <div
            key={prayer.name}
            className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 rounded-lg sm:rounded-xl transition-all ${
              prayer.isNext 
                ? 'glass-card border-primary/50 gold-glow' 
                : prayer.isPassed 
                  ? 'bg-card/30 opacity-50' 
                  : 'glass-card'
            }`}
          >
            <p className="text-[10px] sm:text-xs text-muted-foreground">{prayer.name}</p>
            <p className="font-arabic text-xs sm:text-sm lg:text-base text-primary">{prayer.arabicName}</p>
            <p className="text-sm sm:text-base lg:text-lg tabular-nums mt-0.5">{prayer.time}</p>
          </div>
        ))}
      </footer>
    </div>
  );
};

export default ClassicLayout;
