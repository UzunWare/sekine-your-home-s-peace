import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { Play, Pause, SkipBack, SkipForward, Repeat, Minimize2, Square } from 'lucide-react';

const Player = () => {
  const navigate = useNavigate();
  const { playerState, setPlayerState } = useApp();
  const [isRepeat, setIsRepeat] = useState(false);

  useTVNavigation({
    onBack: () => handleMinimize(),
    onPlayPause: () => togglePlayPause(),
  });

  const togglePlayPause = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleMinimize = () => {
    setPlayerState(prev => ({ ...prev, isMinimized: true }));
    navigate('/idle');
  };

  const handleStop = () => {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mock data for display
  const mockTrack = playerState.currentTrack || {
    title: 'Surah Al-Fatiha',
    subtitle: 'Mishary Rashid Alafasy',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
  };

  const progress = playerState.progress || 45;
  const duration = playerState.duration || 180;

  return (
    <div className="fixed inset-0 bg-background">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
      <div className="absolute inset-0 pattern-overlay opacity-10" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-12">
        {/* Content type badge */}
        <div className="absolute top-12 left-12">
          <span className="px-4 py-2 text-sm bg-primary/20 text-primary rounded-full capitalize">
            {playerState.contentType || 'Quran'}
          </span>
        </div>

        {/* Main content area */}
        <div className="flex flex-col items-center text-center max-w-4xl mb-12">
          {/* Arabic text */}
          <p className="font-arabic text-6xl text-primary leading-relaxed mb-8 text-shadow-gold">
            {mockTrack.arabicText}
          </p>

          {/* Translation */}
          <p className="text-2xl text-foreground/90 italic mb-4">
            "{mockTrack.translation}"
          </p>

          {/* Track info */}
          <h2 className="text-3xl font-light mt-8">{mockTrack.title}</h2>
          <p className="text-lg text-muted-foreground">{mockTrack.subtitle}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden cursor-pointer">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${(progress / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            data-focusable="true"
            onClick={() => setIsRepeat(!isRepeat)}
            className={`p-4 rounded-full transition-all ${
              isRepeat ? 'bg-primary/20 text-primary' : 'hover:bg-card'
            } focus:ring-2 focus:ring-primary`}
          >
            <Repeat className="w-6 h-6" />
          </button>

          <button
            data-focusable="true"
            className="p-4 rounded-full hover:bg-card transition-all focus:ring-2 focus:ring-primary"
          >
            <SkipBack className="w-8 h-8" />
          </button>

          <button
            data-focusable="true"
            onClick={togglePlayPause}
            className="p-6 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all focus:ring-4 focus:ring-primary/50"
          >
            {playerState.isPlaying ? (
              <Pause className="w-10 h-10" />
            ) : (
              <Play className="w-10 h-10 ml-1" />
            )}
          </button>

          <button
            data-focusable="true"
            className="p-4 rounded-full hover:bg-card transition-all focus:ring-2 focus:ring-primary"
          >
            <SkipForward className="w-8 h-8" />
          </button>

          <button
            data-focusable="true"
            onClick={handleMinimize}
            className="p-4 rounded-full hover:bg-card transition-all focus:ring-2 focus:ring-primary"
          >
            <Minimize2 className="w-6 h-6" />
          </button>

          <button
            data-focusable="true"
            onClick={handleStop}
            className="p-4 rounded-full hover:bg-destructive/20 text-destructive transition-all focus:ring-2 focus:ring-destructive"
          >
            <Square className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
