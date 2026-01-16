import { RefObject } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/lib/i18n';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Repeat1, 
  Minimize2, Square, Volume2, VolumeX 
} from 'lucide-react';
import type { PlayerContentType } from '@/types/app';

type RepeatMode = 'off' | 'one' | 'all';

interface PlayerControlsProps {
  contentType: PlayerContentType;
  audioRef: RefObject<HTMLAudioElement>;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeatMode?: RepeatMode;
  canSkipPrev?: boolean;
  canSkipNext?: boolean;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onSkipPrev?: () => void;
  onSkipNext?: () => void;
  onCycleRepeat?: () => void;
  onMinimize: () => void;
  onStop: () => void;
}

const PlayerControls = ({
  contentType,
  audioRef,
  currentTime,
  duration,
  volume,
  isMuted,
  repeatMode = 'off',
  canSkipPrev = true,
  canSkipNext = true,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onSkipPrev,
  onSkipNext,
  onCycleRepeat,
  onMinimize,
  onStop,
}: PlayerControlsProps) => {
  const { playerState, setPlayerState } = useApp();
  const { t } = useTranslation();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const showRepeat = contentType === 'quran';
  const showSkipButtons = contentType === 'quran';
  const isAdhan = contentType === 'adhan';

  return (
    <footer className="shrink-0 px-3 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-5 space-y-2 sm:space-y-3 lg:space-y-4 bg-gradient-to-t from-background via-background/90 to-transparent">
      {/* Progress bar */}
      <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
        <div 
          className="h-1 sm:h-1.5 lg:h-2 bg-muted/50 rounded-full overflow-hidden cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            onSeek(percent * duration);
          }}
        >
          <div 
            className="h-full bg-primary rounded-full transition-all duration-100 group-hover:bg-primary/80"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main controls */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6">
        {/* Repeat (Quran only) */}
        {showRepeat && onCycleRepeat && (
          <button
            data-focusable="true"
            onClick={onCycleRepeat}
            className={`p-2 sm:p-3 rounded-full transition-all focus:ring-2 focus:ring-primary ${
              repeatMode !== 'off' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
            title={repeatMode === 'off' ? t('player.repeatOff') : repeatMode === 'one' ? t('player.repeatOne') : t('player.repeatAll')}
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        )}

        {/* Previous (Quran only) */}
        {showSkipButtons && onSkipPrev && (
          <button
            data-focusable="true"
            onClick={onSkipPrev}
            disabled={!canSkipPrev}
            className="p-2 sm:p-3 rounded-full text-foreground hover:bg-muted/30 transition-all focus:ring-2 focus:ring-primary disabled:opacity-30"
          >
            <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </button>
        )}

        {/* Play/Pause */}
        <button
          data-focusable="true"
          autoFocus
          onClick={togglePlayPause}
          className="p-4 sm:p-5 lg:p-6 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all focus:ring-4 focus:ring-primary/30 gold-glow shadow-lg"
        >
          {playerState.isPlaying ? (
            <Pause className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
          ) : (
            <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ml-0.5 sm:ml-1" />
          )}
        </button>

        {/* Next (Quran only) */}
        {showSkipButtons && onSkipNext && (
          <button
            data-focusable="true"
            onClick={onSkipNext}
            disabled={!canSkipNext}
            className="p-2 sm:p-3 rounded-full text-foreground hover:bg-muted/30 transition-all focus:ring-2 focus:ring-primary disabled:opacity-30"
          >
            <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </button>
        )}

        {/* Volume control */}
        <div className="hidden md:flex items-center gap-2 text-muted-foreground">
          <button
            data-focusable="true"
            onClick={onToggleMute}
            className="p-1 rounded hover:bg-muted/30 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 lg:w-5 lg:h-5" /> : <Volume2 className="w-4 h-4 lg:w-5 lg:h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="w-16 lg:w-20 xl:w-24 accent-primary h-1 cursor-pointer"
          />
        </div>

        {/* Minimize */}
        <button
          data-focusable="true"
          onClick={onMinimize}
          className="p-2 sm:p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all focus:ring-2 focus:ring-primary"
          title={t('player.minimize')}
        >
          <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Stop */}
        <button
          data-focusable="true"
          onClick={onStop}
          className="p-2 sm:p-3 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all focus:ring-2 focus:ring-destructive"
          title={t('player.stop')}
        >
          <Square className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </footer>
  );
};

export default PlayerControls;
