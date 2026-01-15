import { ScreensaverLayoutProps } from './types';

const AmbientScreensaverLayout = ({
  currentTime,
  formatTime,
  nextPrayer,
  timeUntilNextPrayer,
  isTransitioning,
}: ScreensaverLayoutProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* Floating Time - Slightly Off-Center */}
      <div 
        className={`transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: 'translate(10%, -5%)' }}
      >
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-thin leading-none tabular-nums text-white/80 tracking-tight">
          {formatTime(currentTime)}
        </h1>
      </div>

      {/* Extremely Subtle Next Prayer in Corner */}
      {nextPrayer && timeUntilNextPrayer && (
        <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 text-right">
          <p className="text-xs sm:text-sm text-white/20 uppercase tracking-widest">
            {nextPrayer.name}
          </p>
          <p className="text-sm sm:text-base text-white/15 mt-0.5">
            {timeUntilNextPrayer.formatted}
          </p>
        </div>
      )}
    </div>
  );
};

export default AmbientScreensaverLayout;
