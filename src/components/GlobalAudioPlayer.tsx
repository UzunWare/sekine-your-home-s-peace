import { useEffect, useRef, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';

/**
 * GlobalAudioPlayer - Persistent audio element that lives outside of routes
 * This component manages audio playback globally so that audio continues
 * playing even when navigating between pages (e.g., when minimizing player)
 */
const GlobalAudioPlayer = () => {
  const { playerState, setPlayerState } = useApp();
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentUrlRef = useRef<string>('');

  // Update audio source when it changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    const newUrl = playerState.audioUrl || '';
    
    // Only update if URL actually changed
    if (newUrl && newUrl !== currentUrlRef.current) {
      currentUrlRef.current = newUrl;
      audioRef.current.src = newUrl;
      audioRef.current.load();
      
      // Auto-play if isPlaying is true
      if (playerState.isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    } else if (!newUrl && currentUrlRef.current) {
      // URL was cleared - stop and reset
      currentUrlRef.current = '';
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  }, [playerState.audioUrl, playerState.isPlaying]);

  // Sync audio play/pause with playerState
  useEffect(() => {
    if (!audioRef.current || !playerState.audioUrl) return;

    if (playerState.isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [playerState.isPlaying, playerState.audioUrl]);

  // Handle time updates
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setPlayerState(prev => ({
        ...prev,
        progress: audioRef.current!.currentTime,
      }));
    }
  }, [setPlayerState]);

  // Handle metadata loaded
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setPlayerState(prev => ({
        ...prev,
        duration: audioRef.current!.duration,
      }));
    }
  }, [setPlayerState]);

  // Handle audio ended
  const handleEnded = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  }, [setPlayerState]);

  // Always render the audio element so the ref is available
  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

export default GlobalAudioPlayer;
