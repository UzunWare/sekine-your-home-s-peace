import { ScreensaverLayoutProps } from './types';

const MinimalScreensaverLayout = ({
  currentTime,
  formatTime,
  nextPrayer,
  timeUntilNextPrayer,
  isTransitioning,
}: ScreensaverLayoutProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* Large Centered Time */}
      <div 
        className={`text-center transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-extralight leading-none tabular-nums text-white/95 tracking-tight">
          {formatTime(currentTime)}
        </h1>
      </div>

      {/* Subtle Next Prayer at Bottom */}
      {nextPrayer && timeUntilNextPrayer && (
        <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 text-center">
          <div className="flex items-center gap-3 sm:gap-4 text-white/40">
            <span className="text-sm sm:text-base uppercase tracking-widest">{nextPrayer.name}</span>
            <span className="text-primary/60">•</span>
            <span className="text-sm sm:text-base">{nextPrayer.time}</span>
            <span className="text-primary/60">•</span>
            <span className="text-sm sm:text-base text-white/30">{timeUntilNextPrayer.formatted}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalScreensaverLayout;
