import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';
import { adhanStyles } from '@/data/reciters';

const Adhan = () => {
  const navigate = useNavigate();
  const { settings } = useApp();
  const { nextPrayer } = usePrayerTimes();
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentAdhanStyle = adhanStyles.find(s => s.id === settings.adhan.style) || adhanStyles[0];
  const duration = 180; // 3 minutes mock duration

  useTVNavigation({
    onBack: () => navigate('/idle'),
  });

  // Simulate adhan playback
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= duration) {
          setIsComplete(true);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  // Handle completion
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        if (settings.prayer.mode === 'mosque') {
          navigate('/iqamah');
        } else {
          navigate('/idle');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, settings.prayer.mode, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const prayer = nextPrayer || { name: 'Maghrib', arabicName: 'المغرب', time: '18:05' };

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Decorative element */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-primary/60" />
          <span className="text-4xl text-primary animate-pulse">☪</span>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-primary/60" />
        </div>

        {/* Prayer name */}
        <h1 className="font-arabic text-8xl text-primary text-shadow-gold mb-4 animate-gentle-pulse">
          {prayer.arabicName}
        </h1>
        <h2 className="text-4xl font-light tracking-[0.3em] uppercase mb-8">
          {prayer.name}
        </h2>

        {/* Time */}
        <p className="text-6xl font-light tabular-nums mb-4">{prayer.time}</p>
        <p className="text-xl text-primary mb-12">It's time to pray</p>

        {/* Progress bar */}
        <div className="w-96 mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000"
              style={{ width: `${(progress / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Reciter info */}
        <p className="text-muted-foreground mb-12">
          {currentAdhanStyle.name} • {currentAdhanStyle.origin}
        </p>

        {/* Controls */}
        <div className="flex gap-6">
          <button
            data-focusable="true"
            onClick={() => setIsMuted(!isMuted)}
            className="p-4 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary rounded-full transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-8 h-8" />
            ) : (
              <Volume2 className="w-8 h-8 text-primary" />
            )}
          </button>
          <button
            data-focusable="true"
            onClick={() => navigate('/idle')}
            className="flex items-center gap-3 px-8 py-4 glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary rounded-full transition-all"
          >
            <SkipForward className="w-6 h-6" />
            <span>Skip</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adhan;
