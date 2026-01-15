import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { useTranslation, useLanguage } from '@/lib/i18n';
import { useQuranPlayer } from '@/hooks/useQuranAPI';
import { RECITERS_INFO } from '@/lib/quranAPI';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Repeat1, 
  Minimize2, Square, Volume2, Loader2, AlertCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

type RepeatMode = 'off' | 'one' | 'all';

const Player = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { playerState, setPlayerState, settings } = useApp();
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // Get surah and reciter from URL params
  const surahNumber = parseInt(searchParams.get('surah') || '1', 10);
  const reciterId = searchParams.get('reciter') || 'mishary';
  
  // Fetch Quran data
  const { verses, timings, audioUrl, chapterInfo, isLoading, error } = useQuranPlayer(
    surahNumber,
    reciterId,
    language === 'ar' ? 'en' : language // Use English translation if Arabic is the UI language
  );
  
  // Local state
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  
  // Audio ref
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Get current verse
  const currentVerse = verses[currentVerseIndex];
  const reciterInfo = RECITERS_INFO[reciterId] || { name: reciterId, arabicName: '' };

  useTVNavigation({
    onBack: () => handleMinimize(),
    onPlayPause: () => togglePlayPause(),
  });

  // Initialize player state when data loads
  useEffect(() => {
    if (chapterInfo && verses.length > 0) {
      setPlayerState(prev => ({
        ...prev,
        contentType: 'quran',
        currentTrack: {
          title: `${chapterInfo.name_simple} (${chapterInfo.name_arabic})`,
          subtitle: reciterInfo.name,
          arabicText: verses[0]?.text_uthmani || '',
          translation: verses[0]?.translations?.[0]?.text || '',
        },
        isMinimized: false,
      }));
    }
  }, [chapterInfo, verses, reciterInfo.name, setPlayerState]);

  // Update current verse based on audio timing
  useEffect(() => {
    if (!timings.length || !audioRef.current) return;
    
    const currentTimeMs = currentTime * 1000;
    const verseIndex = timings.findIndex(
      (timing, index) => {
        const nextTiming = timings[index + 1];
        if (nextTiming) {
          return currentTimeMs >= timing.timestamp_from && currentTimeMs < nextTiming.timestamp_from;
        }
        return currentTimeMs >= timing.timestamp_from;
      }
    );
    
    if (verseIndex !== -1 && verseIndex !== currentVerseIndex) {
      setCurrentVerseIndex(verseIndex);
      
      // Update player state with current verse info
      const verse = verses[verseIndex];
      if (verse) {
        setPlayerState(prev => ({
          ...prev,
          currentTrack: {
            ...prev.currentTrack!,
            arabicText: verse.text_uthmani,
            translation: verse.translations?.[0]?.text || '',
          },
          currentVerseNumber: verse.verse_number,
        }));
      }
    }
  }, [currentTime, timings, verses, currentVerseIndex, setPlayerState]);

  // Audio event handlers
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setPlayerState(prev => ({
        ...prev,
        progress: audioRef.current!.currentTime,
      }));
    }
  }, [setPlayerState]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setPlayerState(prev => ({
        ...prev,
        duration: audioRef.current!.duration,
      }));
    }
  }, [setPlayerState]);

  const handleEnded = useCallback(() => {
    if (repeatMode === 'all') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === 'one') {
      // Go to previous verse start
      if (timings[currentVerseIndex] && audioRef.current) {
        audioRef.current.currentTime = timings[currentVerseIndex].timestamp_from / 1000;
        audioRef.current.play();
      }
    } else {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [repeatMode, currentVerseIndex, timings, setPlayerState]);

  // Play/pause control
  useEffect(() => {
    if (audioRef.current) {
      if (playerState.isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [playerState.isPlaying]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlayPause = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleMinimize = () => {
    setPlayerState(prev => ({ ...prev, isMinimized: true }));
    navigate('/idle');
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayerState({
      isPlaying: false,
      isMinimized: false,
      contentType: null,
      currentTrack: null,
      progress: 0,
      duration: 0,
    });
    navigate('/idle');
  };

  const skipToVerse = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? Math.min(currentVerseIndex + 1, verses.length - 1)
      : Math.max(currentVerseIndex - 1, 0);
    
    if (timings[newIndex] && audioRef.current) {
      audioRef.current.currentTime = timings[newIndex].timestamp_from / 1000;
      setCurrentVerseIndex(newIndex);
    }
  };

  const cycleRepeatMode = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'one';
      if (prev === 'one') return 'all';
      return 'off';
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-6">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <p className="text-foreground font-medium">{t('common.error')}</p>
          <p className="text-muted-foreground text-sm">{(error as Error).message}</p>
          <button
            data-focusable="true"
            onClick={() => navigate('/quran')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary transition-all"
          >
            {t('nav.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute inset-0 pattern-overlay opacity-5" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 text-xs sm:text-sm bg-primary/20 text-primary rounded-full capitalize">
              {t('quran.nowPlaying')}
            </span>
            {chapterInfo && (
              <span className="text-sm text-muted-foreground">
                {t('quran.surah')} {chapterInfo.name_simple}
              </span>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            {reciterInfo.name}
          </span>
        </header>

        {/* Main verse display */}
        <main className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          {currentVerse ? (
            <div className="w-full max-w-4xl text-center space-y-6 sm:space-y-8 px-4">
              {/* Verse indicator */}
              <div className="flex items-center justify-center gap-4">
                <button
                  data-focusable="true"
                  onClick={() => skipToVerse('prev')}
                  disabled={currentVerseIndex === 0}
                  className="p-2 rounded-full hover:bg-muted disabled:opacity-30 focus:ring-2 focus:ring-primary transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-muted-foreground">
                  {t('quran.verseOf', { current: currentVerse.verse_number, total: verses.length })}
                </span>
                <button
                  data-focusable="true"
                  onClick={() => skipToVerse('next')}
                  disabled={currentVerseIndex === verses.length - 1}
                  className="p-2 rounded-full hover:bg-muted disabled:opacity-30 focus:ring-2 focus:ring-primary transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Arabic text - Uthmanic font */}
              <div className="relative">
                <p 
                  className="font-uthmani text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.8] sm:leading-[2] text-shadow-gold transition-all duration-300"
                  dir="rtl"
                >
                  {currentVerse.text_uthmani}
                </p>
              </div>

              {/* Translation */}
              {currentVerse.translations?.[0] && (
                <div className="space-y-2">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
                    {currentVerse.translations[0].text.replace(/<[^>]*>/g, '')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    — {currentVerse.translations[0].resource_name || 'Saheeh International'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>{t('common.loading')}</p>
            </div>
          )}
        </main>

        {/* Progress bar */}
        <div className="w-full max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div 
            className="h-2 bg-muted rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              if (audioRef.current) {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                audioRef.current.currentTime = percent * duration;
              }
            }}
          >
            <div 
              className="h-full bg-primary transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6">
          {/* Repeat */}
          <button
            data-focusable="true"
            onClick={cycleRepeatMode}
            className={`p-3 sm:p-4 rounded-full transition-all focus:ring-2 focus:ring-primary ${
              repeatMode !== 'off' ? 'bg-primary/20 text-primary' : 'hover:bg-card'
            }`}
            title={repeatMode === 'off' ? t('player.repeatOff') : repeatMode === 'one' ? t('player.repeatOne') : t('player.repeatAll')}
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Repeat className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          {/* Previous verse */}
          <button
            data-focusable="true"
            onClick={() => skipToVerse('prev')}
            disabled={currentVerseIndex === 0}
            className="p-3 sm:p-4 rounded-full hover:bg-card transition-all focus:ring-2 focus:ring-primary disabled:opacity-30"
          >
            <SkipBack className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Play/Pause */}
          <button
            data-focusable="true"
            autoFocus
            onClick={togglePlayPause}
            className="p-5 sm:p-6 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all focus:ring-4 focus:ring-primary/50 gold-glow"
          >
            {playerState.isPlaying ? (
              <Pause className="w-8 h-8 sm:w-10 sm:h-10" />
            ) : (
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1" />
            )}
          </button>

          {/* Next verse */}
          <button
            data-focusable="true"
            onClick={() => skipToVerse('next')}
            disabled={currentVerseIndex === verses.length - 1}
            className="p-3 sm:p-4 rounded-full hover:bg-card transition-all focus:ring-2 focus:ring-primary disabled:opacity-30"
          >
            <SkipForward className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Minimize */}
          <button
            data-focusable="true"
            onClick={handleMinimize}
            className="p-3 sm:p-4 rounded-full hover:bg-card transition-all focus:ring-2 focus:ring-primary"
            title={t('player.minimize')}
          >
            <Minimize2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Stop */}
          <button
            data-focusable="true"
            onClick={handleStop}
            className="p-3 sm:p-4 rounded-full hover:bg-destructive/20 text-destructive transition-all focus:ring-2 focus:ring-destructive"
            title={t('player.stop')}
          >
            <Square className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-32 accent-primary"
          />
          <span className="text-xs text-muted-foreground w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
