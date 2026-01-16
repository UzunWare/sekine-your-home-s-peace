import { Play, Pause, Square, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/lib/i18n';

interface MiniPlayerProps {
  className?: string;
}

const MiniPlayer = ({ className = '' }: MiniPlayerProps) => {
  const navigate = useNavigate();
  const { playerState, setPlayerState } = useApp();
  const { t } = useTranslation();

  if (!playerState.isMinimized || !playerState.currentTrack) {
    return null;
  }

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayerState({
      isPlaying: false,
      isMinimized: false,
      contentType: null,
      currentTrack: null,
      audioUrl: undefined,
      progress: 0,
      duration: 0,
    });
  };

  const handleExpand = () => {
    setPlayerState(prev => ({ ...prev, isMinimized: false }));
    // Navigate back to player with the correct content type
    const searchParams = new URLSearchParams();
    if (playerState.contentType) {
      searchParams.set('type', playerState.contentType);
    }
    navigate(`/player?${searchParams.toString()}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = playerState.progress || 0;
  const duration = playerState.duration || 1;
  const progressPercent = (progress / duration) * 100;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 animate-fade-in ${className}`}
    >
      {/* Glass background with golden accent border */}
      <div 
        className="relative bg-card/90 backdrop-blur-xl border-t-2 border-primary/60"
        style={{
          boxShadow: '0 -10px 40px -10px hsl(var(--primary) / 0.3)',
        }}
      >
        {/* Progress bar at the top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted/50">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main content */}
        <button
          data-focusable="true"
          onClick={handleExpand}
          className="w-full p-4 sm:p-5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-all hover:bg-card/95"
        >
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            {/* Left: Track info */}
            <div className="flex-1 flex items-center gap-4 min-w-0">
              {/* Decorative icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 border border-primary/20">
                <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse" />
              </div>
              
              {/* Track details */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary capitalize">
                    {playerState.contentType === 'invocations' ? 'Dua' : 
                     playerState.contentType === 'adhan' ? 'Adhan' :
                     playerState.contentType || 'Quran'}
                  </span>
                  {playerState.currentVerseNumber && (
                    <span className="text-xs text-muted-foreground">
                      {t('quran.verse')} {playerState.currentVerseNumber}
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-foreground truncate mt-1">
                  {playerState.currentTrack.title}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {playerState.currentTrack.subtitle}
                </p>
              </div>
            </div>

            {/* Center: Arabic text preview (hidden on mobile) */}
            {playerState.currentTrack.arabicText && (
              <div className="hidden lg:block flex-1 text-center">
                <p 
                  className="font-uthmani text-xl text-primary truncate leading-relaxed"
                  dir="rtl"
                >
                  {playerState.currentTrack.arabicText}
                </p>
              </div>
            )}

            {/* Right: Controls and time */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Time display */}
              <span className="text-xs sm:text-sm text-muted-foreground tabular-nums hidden sm:block">
                {formatTime(progress)} / {formatTime(duration)}
              </span>

              {/* Play/Pause */}
              <button
                data-focusable="true"
                onClick={togglePlayPause}
                className="p-2.5 sm:p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card transition-all"
              >
                {playerState.isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
                )}
              </button>

              {/* Stop */}
              <button
                data-focusable="true"
                onClick={handleStop}
                className="p-2.5 sm:p-3 rounded-full hover:bg-destructive/20 text-destructive focus:ring-2 focus:ring-destructive transition-all"
              >
                <Square className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;
