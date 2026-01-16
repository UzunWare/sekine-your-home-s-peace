import { RefObject, useCallback } from 'react';
import { useTranslation } from '@/lib/i18n';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import type { VerseWithTranslation, VerseTiming } from '@/types/quran';

interface QuranContentProps {
  verses: VerseWithTranslation[];
  timings: VerseTiming[];
  currentVerseIndex: number;
  chapterInfo?: {
    name_simple: string;
    name_arabic: string;
    translated_name?: { name: string };
    verses_count: number;
  };
  reciterInfo: { name: string; arabicName?: string };
  audioRef: RefObject<HTMLAudioElement>;
  onVerseChange: (index: number) => void;
}

const QuranContent = ({
  verses,
  timings,
  currentVerseIndex,
  chapterInfo,
  reciterInfo,
  audioRef,
  onVerseChange,
}: QuranContentProps) => {
  const { t } = useTranslation();
  const currentVerse = verses[currentVerseIndex];

  const skipToVerse = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? Math.min(currentVerseIndex + 1, verses.length - 1)
      : Math.max(currentVerseIndex - 1, 0);
    
    if (timings[newIndex] && audioRef.current) {
      audioRef.current.currentTime = timings[newIndex].timestamp_from / 1000;
      onVerseChange(newIndex);
    }
  }, [currentVerseIndex, verses.length, timings, audioRef, onVerseChange]);

  if (!currentVerse) {
    return (
      <div className="text-center text-muted-foreground">
        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin mx-auto mb-2 sm:mb-4" />
        <p className="text-sm sm:text-base">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
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

      {/* Main verse display */}
      <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-6 lg:px-12 xl:px-16 overflow-hidden min-h-0">
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

          {/* Arabic text */}
          <div className="w-full py-2 sm:py-4 lg:py-6">
            <p 
              className="font-uthmani text-primary leading-[1.8] sm:leading-[2] lg:leading-[2.2] text-shadow-gold transition-all duration-500"
              style={{ fontSize: 'clamp(1.5rem, 5vw + 0.5rem, 5rem)' }}
              dir="rtl"
            >
              {currentVerse.text_uthmani}
            </p>
          </div>

          {/* Translation */}
          {currentVerse.translations?.[0] && (
            <div className="w-full max-w-4xl space-y-2 sm:space-y-3 lg:space-y-4">
              <p 
                className="font-translation text-foreground/90 leading-relaxed italic tracking-wide"
                style={{ fontSize: 'clamp(1rem, 2.5vw + 0.25rem, 2rem)' }}
              >
                "{currentVerse.translations[0].text
                  .replace(/<[^>]*>/g, '')
                  .replace(/\d+/g, '')
                  .replace(/\s+/g, ' ')
                  .trim()}"
              </p>
              <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground/60 font-sans">
                — {currentVerse.translations[0].resource_name || 'Saheeh International'}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default QuranContent;
