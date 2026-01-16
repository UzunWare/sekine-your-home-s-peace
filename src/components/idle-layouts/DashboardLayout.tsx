import { Settings, BookOpen, HandHeart } from 'lucide-react';
import { IdleLayoutProps } from './types';

const DashboardLayout = ({
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
    <div className={`relative z-10 h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 transition-all ${isMiniPlayerVisible ? 'pb-24 sm:pb-28 md:pb-32' : ''}`}>
      {/* Top row - Time and Next Prayer tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
        {/* Time tile */}
        <div className="glass-card p-6 lg:p-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Current Time</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tabular-nums text-foreground">
            {formatTime(currentTime)}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">{formatDate(currentTime)}</p>
          {settings.display.showHijriDate && hijriDate && (
            <p className="text-sm text-primary mt-1 font-arabic">
              {hijriDate.day} {hijriDate.month} {hijriDate.year} هـ
            </p>
          )}
        </div>

        {/* Next prayer tile */}
        <div className="glass-card p-6 lg:p-8 border-primary/30 gold-glow">
          <p className="text-xs uppercase tracking-widest text-primary mb-2">Next Prayer</p>
          {nextPrayer && timeUntilNextPrayer ? (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <p className="font-arabic text-3xl sm:text-4xl lg:text-5xl text-primary">
                  {nextPrayer.arabicName}
                </p>
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light mb-1">{nextPrayer.name}</p>
              <p className="text-lg text-muted-foreground">at {nextPrayer.time}</p>
              <p className="text-xl text-primary mt-2">in {timeUntilNextPrayer.formatted}</p>
            </>
          ) : (
            <p className="text-xl text-muted-foreground">No upcoming prayers</p>
          )}
        </div>
      </div>

      {/* Prayer times row */}
      <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-4 lg:mb-6">
        {prayers.map((prayer) => (
          <div
            key={prayer.name}
            className={`flex-1 min-w-[120px] max-w-[160px] p-4 lg:p-5 rounded-xl text-center transition-all ${
              prayer.isNext 
                ? 'glass-card border-primary/50' 
                : prayer.isPassed 
                  ? 'bg-card/30 opacity-50' 
                  : 'glass-card'
            }`}
          >
            <p className="text-xs text-muted-foreground">{prayer.name}</p>
            <p className="font-arabic text-base text-primary">{prayer.arabicName}</p>
            <p className="text-lg lg:text-xl tabular-nums font-medium mt-1">{prayer.time}</p>
          </div>
        ))}
      </div>

      {/* Quote tile */}
      {settings.display.showCentralQuote && (
        <div className="glass-card p-5 lg:p-6 flex-1 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-primary/60 mb-3 text-center">Quote of the Day</p>
          {quoteOfTheDay.arabic && (
            <p className="text-xl sm:text-2xl lg:text-3xl font-arabic text-primary text-center mb-3 leading-relaxed" dir="rtl">
              {quoteOfTheDay.arabic}
            </p>
          )}
          <p className="font-quote text-base sm:text-lg lg:text-xl text-foreground/90 italic text-center leading-relaxed px-4">
            "{quoteOfTheDay.text}"
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground text-center mt-3 font-serif tracking-wide">
            — {quoteOfTheDay.source}
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-end gap-2 sm:gap-3 mt-4">
        <button
          data-focusable="true"
          onClick={onOpenInvocationsDialog}
          className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
        >
          <HandHeart className="w-4 h-4" />
          <span className="text-sm">Invocations</span>
        </button>
        <button
          data-focusable="true"
          onClick={() => onNavigate('/quran')}
          className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">Quran</span>
        </button>
        <button
          data-focusable="true"
          onClick={() => onNavigate('/settings')}
          className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary transition-all"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
