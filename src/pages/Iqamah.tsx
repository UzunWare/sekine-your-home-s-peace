import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useTVNavigation } from '@/hooks/useTVNavigation';

const Iqamah = () => {
  const navigate = useNavigate();
  const { settings } = useApp();
  const { nextPrayer } = usePrayerTimes();
  
  const prayer = nextPrayer || { name: 'Maghrib', arabicName: 'المغرب' };
  const prayerKey = prayer.name.toLowerCase() as keyof typeof settings.mosque.iqamahDelays;
  const delayMinutes = settings.mosque.iqamahDelays[prayerKey] || 15;
  
  const [timeRemaining, setTimeRemaining] = useState(delayMinutes * 60);
  const [isWarning, setIsWarning] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  useTVNavigation({
    onBack: () => navigate('/idle'),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Play notification sound and navigate
          navigate('/idle');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    setIsWarning(timeRemaining <= 300); // 5 minutes
    setIsUrgent(timeRemaining <= 60); // 1 minute
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center transition-colors duration-1000 ${
      isUrgent ? 'bg-destructive/20' : isWarning ? 'bg-primary/10' : 'bg-background'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Prayer name */}
        <h2 className="text-2xl tracking-[0.2em] uppercase text-muted-foreground mb-2">
          {prayer.name} Prayer
        </h2>
        <h1 className="font-arabic text-6xl text-primary mb-12">
          {prayer.arabicName}
        </h1>

        {/* Countdown */}
        <div className={`relative ${isUrgent ? 'animate-pulse' : ''}`}>
          <div className={`text-[14rem] font-extralight leading-none tabular-nums ${
            isUrgent ? 'text-destructive' : isWarning ? 'text-primary' : 'text-foreground'
          }`}>
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Label */}
        <p className={`text-3xl mt-8 ${
          isUrgent ? 'text-destructive' : 'text-muted-foreground'
        }`}>
          {isUrgent ? 'Iqamah starting now!' : `Iqamah in ${Math.ceil(timeRemaining / 60)} minute${Math.ceil(timeRemaining / 60) !== 1 ? 's' : ''}`}
        </p>

        {/* Decorative element */}
        <div className="flex items-center gap-4 mt-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/40" />
          <span className="text-2xl text-primary">☪</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        {/* Instructions */}
        <p className="text-muted-foreground mt-8">
          Please prepare for prayer
        </p>
      </div>

      {/* Back hint */}
      <div className="absolute bottom-12">
        <p className="text-sm text-muted-foreground">Press BACK to return to display</p>
      </div>
    </div>
  );
};

export default Iqamah;
