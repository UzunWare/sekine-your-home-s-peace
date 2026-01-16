import { useState, useEffect, RefObject } from 'react';
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { adhanStyles } from '@/data/reciters';

type PlaybackPhase = 'adhan' | 'dua';

interface AdhanContentProps {
  audioRef: RefObject<HTMLAudioElement>;
  phase: PlaybackPhase;
  onPhaseChange: (phase: PlaybackPhase) => void;
  onComplete: () => void;
}

const AdhanContent = ({ audioRef, phase, onPhaseChange, onComplete }: AdhanContentProps) => {
  const { settings } = useApp();
  const { nextPrayer } = usePrayerTimes();
  
  const currentAdhanStyle = adhanStyles.find(s => s.id === settings.adhan.style) || adhanStyles[0];
  const prayer = nextPrayer || { name: 'Maghrib', arabicName: 'المغرب', time: '18:05' };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-6">
      {/* Decorative element */}
      <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-10">
        <div className="h-px w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-transparent to-primary/60" />
        <span className="text-3xl sm:text-4xl lg:text-5xl text-primary animate-pulse">☪</span>
        <div className="h-px w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-transparent to-primary/60" />
      </div>

      {/* Prayer name */}
      <h1 className="font-arabic text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary text-shadow-gold mb-3 sm:mb-5 animate-gentle-pulse">
        {prayer.arabicName}
      </h1>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 sm:mb-10">
        {prayer.name}
      </h2>

      {/* Prayer time */}
      <p className="text-5xl sm:text-6xl lg:text-7xl font-light tabular-nums mb-3 sm:mb-5">{prayer.time}</p>
      <p className="text-xl sm:text-2xl text-primary mb-8 sm:mb-12">
        {phase === 'adhan' ? "It's time to pray" : 'Dua After Adhan'}
      </p>

      {/* Phase indicator */}
      {settings.adhan.duaAfterAdhan && (
        <div className="flex items-center gap-4 mb-6">
          <span className={`text-base sm:text-lg ${phase === 'adhan' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
            Adhan
          </span>
          <div className="h-px w-10 bg-muted-foreground/30" />
          <span className={`text-base sm:text-lg ${phase === 'dua' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
            Dua
          </span>
        </div>
      )}

      {/* Reciter/Dua info */}
      <p className="text-base sm:text-lg text-muted-foreground text-center max-w-md">
        {phase === 'adhan' 
          ? `${currentAdhanStyle.name} • ${currentAdhanStyle.origin}` 
          : 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ...'
        }
      </p>

      {/* Dua translation */}
      {phase === 'dua' && (
        <p className="text-sm sm:text-base text-muted-foreground/70 text-center max-w-lg mt-4 italic">
          "O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor..."
        </p>
      )}
    </main>
  );
};

export default AdhanContent;
