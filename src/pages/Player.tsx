import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { useTranslation, useLanguage } from '@/lib/i18n';
import { useQuranPlayer } from '@/hooks/useQuranAPI';
import { RECITERS_INFO } from '@/lib/quranAPI';
import { getSurahBackground } from '@/lib/surahBackgrounds';
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
  
  // Get contextual background image based on surah theme
  const backgroundImage = useMemo(() => getSurahBackground(surahNumber), [surahNumber]);

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
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Contextual background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.4 
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background/90" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-5" />

      {/* Content - Full height flex container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header - Surah Info - Fixed height */}
        <header className="shrink-0 flex items-center justify-between px-3 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <div className="flex flex-col gap-0.5 sm:gap-1">
            {chapterInfo && (
              <>
                <h1 className="font-quote text-lg sm:text-xl lg:text-2xl text-foreground leading-tight">
                  {chapterInfo.name_simple}
                </h1>
                <p className="font-quote text-[11px] sm:text-sm lg:text-base text-muted-foreground">
                  {chapterInfo.translated_name?.name} • {chapterInfo.verses_count} {t('quran.verses')}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col items-end gap-0.5 sm:gap-1">
            <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs bg-primary/20 text-primary rounded-full">
              {t('quran.nowPlaying')}
            </span>
            <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
              {reciterInfo.arabicName || reciterInfo.name}
            </span>
          </div>
        </header>

        {/* Main verse display - Flexible, takes remaining space */}
        <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-6 lg:px-12 xl:px-16 overflow-hidden min-h-0">
          {currentVerse ? (
            <div className="w-full max-w-6xl text-center flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
              {/* Verse indicator with navigation */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6">
                <button
                  data-focusable="true"
                  onClick={() => skipToVerse('prev')}
                  disabled={currentVerseIndex === 0}
                  className="p-1.5 sm:p-2 lg:p-3 rounded-full hover:bg-muted/50 disabled:opacity-30 focus:ring-2 focus:ring-primary transition-all"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
                <span className="text-xs sm:text-sm lg:text-base text-primary font-medium">
                  {t('quran.verseOf', { current: currentVerse.verse_number, total: verses.length })}
                </span>
                <button
                  data-focusable="true"
                  onClick={() => skipToVerse('next')}
                  disabled={currentVerseIndex === verses.length - 1}
                  className="p-1.5 sm:p-2 lg:p-3 rounded-full hover:bg-muted/50 disabled:opacity-30 focus:ring-2 focus:ring-primary transition-all"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
              </div>

              {/* Arabic text - Responsive sizing with clamp */}
              <div className="w-full py-2 sm:py-4 lg:py-6">
                <p 
                  className="font-uthmani text-primary leading-[1.8] sm:leading-[2] lg:leading-[2.2] text-shadow-gold transition-all duration-500"
                  style={{ fontSize: 'clamp(1.5rem, 5vw + 0.5rem, 5rem)' }}
                  dir="rtl"
                >
                  {currentVerse.text_uthmani}
                </p>
              </div>

              {/* Translation - Elegant serif font */}
              {currentVerse.translations?.[0] && (
                <div className="w-full max-w-4xl space-y-2 sm:space-y-3 lg:space-y-4">
                  <p 
                    className="font-translation text-foreground/90 leading-relaxed italic tracking-wide"
                    style={{ fontSize: 'clamp(1rem, 2.5vw + 0.25rem, 2rem)' }}
                  >
                    "{currentVerse.translations[0].text
                      .replace(/<[^>]*>/g, '') // Remove HTML tags
                      .replace(/\d+/g, '') // Remove verse numbers
                      .replace(/\s+/g, ' ') // Normalize whitespace
                      .trim()}"
                  </p>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground/60 font-sans">
                    — {currentVerse.translations[0].resource_name || 'Saheeh International'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin mx-auto mb-2 sm:mb-4" />
              <p className="text-sm sm:text-base">{t('common.loading')}</p>
            </div>
          )}
        </main>

        {/* Bottom controls container - Fixed height */}
        <footer className="shrink-0 px-3 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-5 space-y-2 sm:space-y-3 lg:space-y-4 bg-gradient-to-t from-background via-background/90 to-transparent">
          {/* Progress bar */}
          <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
            <div 
              className="h-1 sm:h-1.5 lg:h-2 bg-muted/50 rounded-full overflow-hidden cursor-pointer group"
              onClick={(e) => {
                if (audioRef.current) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  audioRef.current.currentTime = percent * duration;
                }
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

          {/* Main controls - Responsive sizing */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6">
            {/* Repeat */}
            <button
              data-focusable="true"
              onClick={cycleRepeatMode}
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

            {/* Previous verse */}
            <button
              data-focusable="true"
              onClick={() => skipToVerse('prev')}
              disabled={currentVerseIndex === 0}
              className="p-2 sm:p-3 rounded-full text-foreground hover:bg-muted/30 transition-all focus:ring-2 focus:ring-primary disabled:opacity-30"
            >
              <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </button>

            {/* Play/Pause - Prominent */}
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

            {/* Next verse */}
            <button
              data-focusable="true"
              onClick={() => skipToVerse('next')}
              disabled={currentVerseIndex === verses.length - 1}
              className="p-2 sm:p-3 rounded-full text-foreground hover:bg-muted/30 transition-all focus:ring-2 focus:ring-primary disabled:opacity-30"
            >
              <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </button>

            {/* Volume control - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <Volume2 className="w-4 h-4 lg:w-5 lg:h-5" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 lg:w-20 xl:w-24 accent-primary h-1 cursor-pointer"
              />
            </div>

            {/* Minimize */}
            <button
              data-focusable="true"
              onClick={handleMinimize}
              className="p-2 sm:p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all focus:ring-2 focus:ring-primary"
              title={t('player.minimize')}
            >
              <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Stop */}
            <button
              data-focusable="true"
              onClick={handleStop}
              className="p-2 sm:p-3 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all focus:ring-2 focus:ring-destructive"
              title={t('player.stop')}
            >
              <Square className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Player;
