import { ScreensaverLayoutProps } from './types';

const ClassicScreensaverLayout = ({
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
      {/* Top Section - Clock, Date, Hijri */}
      <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-none tabular-nums text-white/95 tracking-tight">
          {formatTime(currentTime)}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white/60 mt-1 sm:mt-2">{formatDate(currentTime)}</p>
        {settings.display.showHijriDate && hijriDate && (
          <p className="text-sm sm:text-base lg:text-lg text-primary/90 mt-1 font-arabic">
            {hijriDate.day} {hijriDate.month} {hijriDate.year} هـ
          </p>
        )}
      </div>

      {/* Top Right - Next Prayer Info */}
      {nextPrayer && timeUntilNextPrayer && (
        <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-10 text-right">
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest mb-0.5 sm:mb-1">Next Prayer</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90">{nextPrayer.name}</p>
          <p className="text-base sm:text-lg lg:text-xl text-primary mt-0.5 sm:mt-1">{nextPrayer.time}</p>
          <p className="text-sm sm:text-base lg:text-lg text-white/60 mt-0.5 sm:mt-1">in {timeUntilNextPrayer.formatted}</p>
        </div>
      )}

      {/* Center - Quote */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
        <div 
          className={`max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl text-center transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
        >
          {/* Arabic Text */}
          {currentQuote.arabic && (
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-arabic text-primary leading-loose mb-4 sm:mb-6 lg:mb-10 drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)]" dir="rtl">
              {currentQuote.arabic}
            </p>
          )}
          
          {/* English Quote */}
          <blockquote className="relative">
            <span className="absolute -top-4 sm:-top-6 lg:-top-8 -left-2 sm:-left-4 lg:-left-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary/20 font-quote leading-none select-none">"</span>
            
            <p className="font-quote text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed tracking-wide font-light italic px-4 sm:px-6 md:px-8 lg:px-12">
              {currentQuote.text}
            </p>
            
            <span className="absolute -bottom-8 sm:-bottom-10 lg:-bottom-12 -right-2 sm:-right-4 lg:-right-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary/20 font-quote leading-none select-none">"</span>
          </blockquote>
          
          {/* Source Attribution */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 mt-6 sm:mt-8 lg:mt-12">
            <div className="h-px w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <p className="font-serif text-sm sm:text-base md:text-lg lg:text-xl text-primary/80 tracking-widest uppercase">
              {currentQuote.source}
            </p>
            <div className="h-px w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicScreensaverLayout;
