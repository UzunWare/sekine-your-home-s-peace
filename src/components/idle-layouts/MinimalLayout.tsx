import { Settings } from 'lucide-react';
import { IdleLayoutProps } from './types';

const MinimalLayout = ({
  currentTime,
  formatTime,
  nextPrayer,
  timeUntilNextPrayer,
  isMiniPlayerVisible,
  onNavigate,
}: IdleLayoutProps) => {
  // Format time without seconds for minimal look
  const formatMinimalTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  };

  return (
    <div className={`relative z-10 h-full flex flex-col p-6 sm:p-8 transition-all ${isMiniPlayerVisible ? 'pb-24 sm:pb-28' : ''}`}>
      {/* Subtle settings button */}
      <header className="flex justify-end">
        <button
          data-focusable="true"
          onClick={() => onNavigate('/settings')}
          className="p-3 text-muted-foreground/40 hover:text-muted-foreground focus:ring-2 focus:ring-primary rounded-lg transition-all"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Center - Large time */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8">
        <h1 className="text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-thin leading-none tabular-nums text-foreground tracking-tight">
          {formatMinimalTime(currentTime)}
        </h1>
      </main>

      {/* Bottom - Subtle next prayer indicator */}
      <footer className="flex justify-center pb-8">
        {nextPrayer && timeUntilNextPrayer && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm sm:text-base font-light tracking-wide">
              {nextPrayer.name} in {timeUntilNextPrayer.formatted}
            </span>
          </div>
        )}
      </footer>
    </div>
  );
};

export default MinimalLayout;
