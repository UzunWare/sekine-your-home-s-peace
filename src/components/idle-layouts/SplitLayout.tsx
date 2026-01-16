import { MapPin, Settings, BookOpen, Volume2 } from 'lucide-react';
import { IdleLayoutProps } from './types';
import InvocationsButton from '@/components/InvocationsButton';
import JawshanButton from '@/components/JawshanButton';

const SplitLayout = ({
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
  onOpenJawshan,
}: IdleLayoutProps) => {
  return (
    <div className={`relative z-10 h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 transition-all ${isMiniPlayerVisible ? 'pb-24 sm:pb-28 md:pb-32' : ''}`}>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 glass-card">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <span className="text-sm sm:text-base">{settings.location.city || 'Set Location'}</span>
        </div>
        
        <div className="flex gap-2 sm:gap-4">
          <button
            data-focusable="true"
            onClick={() => onNavigate('/quran')}
            className="flex items-center gap-2 px-4 py-2 sm:py-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Quran</span>
          </button>
          <button
            data-focusable="true"
            onClick={() => onNavigate('/settings')}
            className="flex items-center gap-2 px-4 py-2 sm:py-3 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Settings</span>
          </button>
        </div>
      </header>

      {/* Two-column layout */}
      <main className="flex-1 flex gap-6 lg:gap-10">
        {/* Left column - Time, date, quote */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight leading-none tabular-nums text-foreground">
              {formatTime(currentTime)}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mt-3">{formatDate(currentTime)}</p>
            {settings.display.showHijriDate && hijriDate && (
              <p className="text-base sm:text-lg text-primary mt-2 font-arabic">
                {hijriDate.day} {hijriDate.month} {hijriDate.year} هـ
              </p>
            )}
          </div>

          {/* Quote of the Day */}
          {settings.display.showCentralQuote && (
            <div className="max-w-lg text-center lg:text-left mt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary/60 mb-4">Quote of the Day</p>
              {quoteOfTheDay.arabic && (
                <p className="text-lg sm:text-xl lg:text-2xl font-arabic text-primary mb-4 leading-relaxed" dir="rtl">
                  {quoteOfTheDay.arabic}
                </p>
              )}
              <p className="font-quote text-base sm:text-lg text-foreground/90 italic leading-relaxed">
                "{quoteOfTheDay.text}"
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 font-serif tracking-wide">
                — {quoteOfTheDay.source}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              data-focusable="true"
              onClick={() => onNavigate('/player?type=adhan')}
              className="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 focus:ring-2 focus:ring-primary transition-all"
            >
              <Volume2 className="w-5 h-5 text-primary" />
              <span className="text-sm sm:text-base">Play Adhan</span>
            </button>
            <InvocationsButton onClick={onOpenInvocationsDialog} />
            <JawshanButton onClick={onOpenJawshan} />
          </div>
        </div>

        {/* Right column - Prayer list */}
        <div className="w-80 lg:w-96 flex flex-col justify-center gap-3">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all ${
                prayer.isNext 
                  ? 'glass-card border-primary/50 gold-glow' 
                  : prayer.isPassed 
                    ? 'bg-card/30 opacity-50' 
                    : 'glass-card'
              }`}
            >
              <div className="flex items-center gap-4">
                {prayer.isNext && (
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
                <div>
                  <p className="font-arabic text-lg text-primary">{prayer.arabicName}</p>
                  <p className="text-sm text-muted-foreground">{prayer.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl tabular-nums font-medium">{prayer.time}</p>
                {prayer.isNext && timeUntilNextPrayer && (
                  <p className="text-xs text-primary">in {timeUntilNextPrayer.formatted}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SplitLayout;
