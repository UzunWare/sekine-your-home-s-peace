import { ScreensaverLayoutProps } from './types';

const PrayerFocusScreensaverLayout = ({
  currentTime,
  formatTime,
  formatDate,
  nextPrayer,
  timeUntilNextPrayer,
  hijriDate,
  currentQuote,
  isTransitioning,
  settings,
}: ScreensaverLayoutProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Top Left - Small Time/Date */}
      <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extralight tabular-nums text-white/70 tracking-tight">
          {formatTime(currentTime)}
        </h1>
        <p className="text-sm sm:text-base text-white/40 mt-1">{formatDate(currentTime)}</p>
        {settings.display.showHijriDate && hijriDate && (
          <p className="text-xs sm:text-sm text-primary/60 mt-0.5 font-arabic">
            {hijriDate.day} {hijriDate.month} {hijriDate.year} هـ
          </p>
        )}
      </div>

      {/* Center - Large Next Prayer */}
      <div className="flex-1 flex items-center justify-center">
        {nextPrayer && timeUntilNextPrayer ? (
          <div 
            className={`text-center transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            <p className="text-sm sm:text-base lg:text-lg text-white/40 uppercase tracking-[0.3em] mb-2 sm:mb-4">
              Next Prayer
            </p>
            
            {/* Arabic Name */}
            <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-arabic text-primary mb-2 sm:mb-4 drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
              {nextPrayer.arabicName}
            </p>
            
            {/* English Name */}
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white/90 mb-4 sm:mb-6">
              {nextPrayer.name}
            </p>
            
            {/* Prayer Time */}
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tabular-nums text-primary mb-4 sm:mb-6">
              {nextPrayer.time}
            </p>
            
            {/* Countdown */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <span className="text-lg sm:text-xl md:text-2xl text-white/60">in</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 tabular-nums">
                {timeUntilNextPrayer.formatted}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-2xl text-white/50">No upcoming prayers</p>
        )}
      </div>

      {/* Bottom - Quote (Smaller) */}
      {currentQuote && (
        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 text-center max-w-2xl px-4">
          <p className="font-quote text-sm sm:text-base lg:text-lg text-white/50 italic line-clamp-2">
            "{currentQuote.text}"
          </p>
        </div>
      )}
    </div>
  );
};

export default PrayerFocusScreensaverLayout;
