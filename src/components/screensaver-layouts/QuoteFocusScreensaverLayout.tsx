import { ScreensaverLayoutProps } from './types';

const QuoteFocusScreensaverLayout = ({
  currentTime,
  formatTime,
  nextPrayer,
  timeUntilNextPrayer,
  currentQuote,
  isTransitioning,
}: ScreensaverLayoutProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Small Time in Top Right */}
      <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-10 text-right">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extralight tabular-nums text-white/70 tracking-tight">
          {formatTime(currentTime)}
        </h1>
      </div>

      {/* Large Centered Quote */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 md:px-20 lg:px-32">
        <div 
          className={`max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl text-center transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
        >
          {/* Large Arabic Text */}
          {currentQuote.arabic && (
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-arabic text-primary leading-loose mb-6 sm:mb-8 lg:mb-12 drop-shadow-[0_4px_30px_rgba(212,175,55,0.4)]" dir="rtl">
              {currentQuote.arabic}
            </p>
          )}
          
          {/* English Translation */}
          <p className="font-quote text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed tracking-wide font-light italic">
            {currentQuote.text}
          </p>
          
          {/* Source */}
          <p className="font-serif text-base sm:text-lg md:text-xl text-primary/70 tracking-widest uppercase mt-6 sm:mt-8 lg:mt-10">
            — {currentQuote.source}
          </p>
        </div>
      </div>

      {/* Next Prayer at Bottom */}
      {nextPrayer && timeUntilNextPrayer && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-center">
          <div className="flex items-center gap-3 text-white/30 text-sm sm:text-base">
            <span className="uppercase tracking-widest">{nextPrayer.name}</span>
            <span className="text-primary/50">in</span>
            <span>{timeUntilNextPrayer.formatted}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteFocusScreensaverLayout;
