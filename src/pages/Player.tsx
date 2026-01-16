import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { useTranslation, useLanguage } from '@/lib/i18n';
import { useQuranPlayer } from '@/hooks/useQuranAPI';
import { RECITERS_INFO } from '@/lib/quranAPI';
import { getSurahBackground } from '@/lib/surahBackgrounds';
import { getPrayerInvocations } from '@/data/invocations';
import { QuranContent, InvocationsContent, AdhanContent, PlayerControls } from '@/components/player';
import { adhanStyles } from '@/data/reciters';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { Loader2, AlertCircle } from 'lucide-react';
import mosqueBg from '@/assets/mosque-background-1.jpg';
import type { PlayerContentType } from '@/types/app';

type AdhanPhase = 'adhan' | 'dua';

type RepeatMode = 'off' | 'one' | 'all';

const Player = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { playerState, setPlayerState, settings } = useApp();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { nextPrayer } = usePrayerTimes();
  
  // Determine content type from URL
  const contentType = (searchParams.get('type') || 'quran') as PlayerContentType;
  
  // Quran-specific params
  const surahNumber = parseInt(searchParams.get('surah') || '1', 10);
  const reciterId = searchParams.get('reciter') || 'mishary';
  
  // Invocations-specific params
  const prayerId = searchParams.get('prayer') || 'fajr';
  const prayerData = useMemo(() => getPrayerInvocations(prayerId), [prayerId]);
  
  // Adhan-specific state
  const [adhanPhase, setAdhanPhase] = useState<AdhanPhase>('adhan');
  const currentAdhanStyle = adhanStyles.find(s => s.id === settings.adhan.style) || adhanStyles[0];
  
  // Fetch Quran data (only when contentType is 'quran')
  const { verses, timings, audioUrl: quranAudioUrl, chapterInfo, isLoading, error } = useQuranPlayer(
    contentType === 'quran' ? surahNumber : 0, // Skip fetching if not quran
    reciterId,
    language === 'ar' ? 'en' : language
  );
  
  // Audio URL based on content type
  const audioUrl = useMemo(() => {
    if (contentType === 'quran') return quranAudioUrl;
    if (contentType === 'invocations') return prayerData?.audioUrl ?? '';
    if (contentType === 'adhan') {
      // For adhan, we'd use actual audio files - for now return empty as placeholder
      // Phase-based audio would be: adhanPhase === 'adhan' ? adhanAudioUrl : duaAudioUrl
      return '';
    }
    return '';
  }, [contentType, quranAudioUrl, prayerData, adhanPhase]);
  
  // Local state
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  // Audio ref
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Get current verse and reciter info for Quran
  const currentVerse = verses[currentVerseIndex];
  const reciterInfo = RECITERS_INFO[reciterId] || { name: reciterId, arabicName: '' };
  
  // Get contextual background image
  const backgroundImage = useMemo(() => {
    if (contentType === 'quran') return getSurahBackground(surahNumber);
    return mosqueBg;
  }, [contentType, surahNumber]);

  useTVNavigation({
    onBack: () => handleMinimize(),
    onPlayPause: () => togglePlayPause(),
  });

  // Initialize player state when data loads
  useEffect(() => {
    if (contentType === 'quran' && chapterInfo && verses.length > 0) {
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
    } else if (contentType === 'invocations' && prayerData) {
      setPlayerState(prev => ({
        ...prev,
        contentType: 'invocations',
        currentTrack: {
          title: `${prayerData.prayerName} Invocations`,
          subtitle: prayerData.arabicName,
          arabicText: prayerData.invocations[0]?.arabic || '',
          translation: prayerData.invocations[0]?.translation || '',
        },
        isMinimized: false,
      }));
    } else if (contentType === 'adhan') {
      // Always set adhan state, use fallback if nextPrayer not available
      const prayerName = nextPrayer?.name || 'Prayer';
      const prayerArabicName = nextPrayer?.arabicName || 'الصلاة';
      setPlayerState(prev => ({
        ...prev,
        contentType: 'adhan',
        currentTrack: {
          title: `${prayerName} Adhan`,
          subtitle: currentAdhanStyle.name,
          arabicText: prayerArabicName,
          translation: adhanPhase === 'adhan' ? "It's time to pray" : 'Dua After Adhan',
        },
        isMinimized: false,
      }));
    }
  }, [contentType, chapterInfo, verses, reciterInfo.name, prayerData, nextPrayer, currentAdhanStyle.name, adhanPhase, setPlayerState]);

  // Update current verse based on audio timing (Quran only)
  useEffect(() => {
    if (contentType !== 'quran' || !timings.length || !audioRef.current) return;
    
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
  }, [contentType, currentTime, timings, verses, currentVerseIndex, setPlayerState]);

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
    if (contentType === 'quran') {
      if (repeatMode === 'all') {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      } else if (repeatMode === 'one') {
        if (timings[currentVerseIndex] && audioRef.current) {
          audioRef.current.currentTime = timings[currentVerseIndex].timestamp_from / 1000;
          audioRef.current.play();
        }
      } else {
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
      }
    } else if (contentType === 'adhan') {
      // Handle adhan phase transitions
      if (adhanPhase === 'adhan' && settings.adhan.duaAfterAdhan) {
        setAdhanPhase('dua');
        // Would load dua audio here
      } else {
        // Adhan complete, navigate based on mode
        if (settings.prayer.mode === 'mosque') {
          navigate('/iqamah');
        } else {
          handleStop();
        }
      }
    } else {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [contentType, repeatMode, currentVerseIndex, timings, adhanPhase, settings.adhan.duaAfterAdhan, settings.prayer.mode, navigate, setPlayerState]);

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
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

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

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Loading state (Quran only)
  if (contentType === 'quran' && isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Error state (Quran only)
  if (contentType === 'quran' && error) {
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

  // Invocations not found
  if (contentType === 'invocations' && !prayerData) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">No invocations found</p>
          <button
            data-focusable="true"
            onClick={() => navigate('/idle')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Hidden audio element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}

      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.4 
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background/90" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-5" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Render content based on type */}
        {contentType === 'quran' && (
          <QuranContent
            verses={verses}
            timings={timings}
            currentVerseIndex={currentVerseIndex}
            chapterInfo={chapterInfo}
            reciterInfo={reciterInfo}
            audioRef={audioRef}
            onVerseChange={setCurrentVerseIndex}
          />
        )}

        {contentType === 'invocations' && prayerData && (
          <InvocationsContent
            prayerData={prayerData}
            audioRef={audioRef}
            onClose={handleStop}
          />
        )}

        {contentType === 'adhan' && (
          <AdhanContent
            audioRef={audioRef}
            phase={adhanPhase}
            onPhaseChange={setAdhanPhase}
            onComplete={handleStop}
          />
        )}

        {/* Shared controls for audio-based content */}
        {audioUrl && contentType === 'quran' && (
          <PlayerControls
            contentType={contentType}
            audioRef={audioRef}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            repeatMode={repeatMode}
            canSkipPrev={currentVerseIndex > 0}
            canSkipNext={currentVerseIndex < verses.length - 1}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onToggleMute={toggleMute}
            onSkipPrev={() => skipToVerse('prev')}
            onSkipNext={() => skipToVerse('next')}
            onCycleRepeat={cycleRepeatMode}
            onMinimize={handleMinimize}
            onStop={handleStop}
          />
        )}

        {/* Audio controls for invocations (simpler) */}
        {audioUrl && contentType === 'invocations' && (
          <PlayerControls
            contentType={contentType}
            audioRef={audioRef}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onToggleMute={toggleMute}
            onMinimize={handleMinimize}
            onStop={handleStop}
          />
        )}

        {/* Adhan controls - minimal, show even without audio for simulated playback */}
        {contentType === 'adhan' && (
          <PlayerControls
            contentType={contentType}
            audioRef={audioRef}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onToggleMute={toggleMute}
            onMinimize={handleMinimize}
            onStop={handleStop}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
