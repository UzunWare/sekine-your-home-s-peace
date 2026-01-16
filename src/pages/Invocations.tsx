import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { useApp } from '@/contexts/AppContext';
import { getPrayerInvocations, Invocation } from '@/data/invocations';
import { ChevronLeft, ChevronRight, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import mosqueBg from '@/assets/mosque-background-1.jpg';

const Invocations = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { settings } = useApp();
  const prayerId = searchParams.get('prayer') || 'fajr';
  
  const prayerData = getPrayerInvocations(prayerId);
  const invocations = prayerData?.invocations || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentRepetition, setCurrentRepetition] = useState(1);
  
  const currentInvocation: Invocation | undefined = invocations[currentIndex];
  const totalInvocations = invocations.length;
  const progressPercent = totalInvocations > 0 ? ((currentIndex + 1) / totalInvocations) * 100 : 0;

  useTVNavigation({
    onBack: () => navigate('/idle'),
  });

  const goToNext = useCallback(() => {
    if (!currentInvocation) return;
    
    if (currentRepetition < currentInvocation.repetitions) {
      setCurrentRepetition(prev => prev + 1);
    } else {
      if (currentIndex < invocations.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setCurrentRepetition(1);
      }
    }
  }, [currentInvocation, currentRepetition, currentIndex, invocations.length]);

  const goToPrevious = useCallback(() => {
    if (currentRepetition > 1) {
      setCurrentRepetition(prev => prev - 1);
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        const prevInvocation = invocations[currentIndex - 1];
        setCurrentRepetition(prevInvocation?.repetitions || 1);
      }
    }
  }, [currentRepetition, currentIndex, invocations]);

  const resetCurrent = useCallback(() => {
    setCurrentRepetition(1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          resetCurrent();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, resetCurrent]);

  if (!prayerData || !currentInvocation) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">No invocations found</p>
          <Button onClick={() => navigate('/idle')} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mosqueBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6 sm:p-8 md:p-10 lg:p-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              data-focusable="true"
              variant="ghost"
              size="icon"
              onClick={() => navigate('/idle')}
              className="hover:bg-card/50"
            >
              <X className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-lg sm:text-xl font-medium">Invocations After Prayer</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-arabic text-primary">{prayerData.arabicName}</span>
                <span>•</span>
                <span>{prayerData.prayerName}</span>
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} of {totalInvocations}
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
          {/* Arabic text */}
          <div className="text-center mb-8">
            <p 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-arabic text-primary leading-relaxed drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]" 
              dir="rtl"
            >
              {currentInvocation.arabic}
            </p>
          </div>

          {/* Transliteration */}
          {settings.quran.showTransliteration && (
            <p className="text-lg sm:text-xl text-muted-foreground italic mb-4 text-center">
              {currentInvocation.transliteration}
            </p>
          )}

          {/* Translation */}
          <p className="text-base sm:text-lg text-foreground/80 text-center max-w-2xl mb-8">
            "{currentInvocation.translation}"
          </p>

          {/* Repetition counter */}
          {currentInvocation.repetitions > 1 && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex gap-1.5">
                {Array.from({ length: currentInvocation.repetitions }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i < currentRepetition 
                        ? 'bg-primary' 
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {currentRepetition} / {currentInvocation.repetitions}
              </span>
            </div>
          )}

          {/* Source */}
          {currentInvocation.source && (
            <p className="text-xs text-muted-foreground/60 mb-4">
              Source: {currentInvocation.source}
            </p>
          )}
        </main>

        {/* Progress bar */}
        <div className="mb-6">
          <Progress value={progressPercent} className="h-1.5" />
        </div>

        {/* Controls */}
        <footer className="flex justify-center items-center gap-4">
          <Button
            data-focusable="true"
            variant="outline"
            size="lg"
            onClick={goToPrevious}
            disabled={currentIndex === 0 && currentRepetition === 1}
            className="px-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          {currentInvocation.repetitions > 1 && (
            <Button
              data-focusable="true"
              variant="ghost"
              size="icon"
              onClick={resetCurrent}
              className="hover:bg-card/50"
              title="Reset repetitions"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          )}

          <Button
            data-focusable="true"
            variant="default"
            size="lg"
            onClick={goToNext}
            disabled={currentIndex === invocations.length - 1 && currentRepetition === currentInvocation.repetitions}
            className="px-6 bg-primary hover:bg-primary/90"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Invocations;
