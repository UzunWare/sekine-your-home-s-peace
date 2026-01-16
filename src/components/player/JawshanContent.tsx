import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, RotateCcw, Scroll } from 'lucide-react';
import { JawshanSection, getTotalSections } from '@/data/jawshan';
import { useTranslation } from '@/lib/i18n';

interface JawshanContentProps {
  section: JawshanSection;
  onClose: () => void;
  onNextSection: () => void;
  onPrevSection: () => void;
}

const JawshanContent = ({
  section,
  onClose,
  onNextSection,
  onPrevSection,
}: JawshanContentProps) => {
  const { t } = useTranslation();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showClosingPhrase, setShowClosingPhrase] = useState(false);
  const totalSections = getTotalSections();

  // Reset line index when section changes
  useEffect(() => {
    setCurrentLineIndex(0);
    setShowClosingPhrase(false);
  }, [section.sectionNumber]);

  const goToNextLine = useCallback(() => {
    if (showClosingPhrase) {
      // If at closing phrase, go to next section
      onNextSection();
    } else if (currentLineIndex < section.lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    } else {
      // Show closing phrase after all lines
      setShowClosingPhrase(true);
    }
  }, [currentLineIndex, section.lines.length, showClosingPhrase, onNextSection]);

  const goToPrevLine = useCallback(() => {
    if (showClosingPhrase) {
      setShowClosingPhrase(false);
    } else if (currentLineIndex > 0) {
      setCurrentLineIndex(prev => prev - 1);
    } else {
      // Go to previous section
      onPrevSection();
    }
  }, [currentLineIndex, showClosingPhrase, onPrevSection]);

  const resetSection = () => {
    setCurrentLineIndex(0);
    setShowClosingPhrase(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNextLine();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevLine();
          break;
        case 'ArrowUp':
          e.preventDefault();
          onPrevSection();
          break;
        case 'ArrowDown':
          e.preventDefault();
          onNextSection();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          resetSection();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextLine, goToPrevLine, onNextSection, onPrevSection, onClose]);

  const currentLine = showClosingPhrase ? section.closingPhrase : section.lines[currentLineIndex];
  const progressPercentage = ((section.sectionNumber - 1) / totalSections) * 100 + 
    ((currentLineIndex + (showClosingPhrase ? 1 : 0)) / (section.lines.length + 1)) * (100 / totalSections);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <header className="flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Scroll className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground">
              {t('jawshan.title')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {section.arabicTitle} • {t('jawshan.section')} {section.sectionNumber} {t('jawshan.of')} {totalSections}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted/50 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Main content - current line */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Arabic */}
          <p 
            className={`font-arabic leading-relaxed ${
              showClosingPhrase 
                ? 'text-3xl sm:text-4xl md:text-5xl text-amber-400' 
                : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground'
            }`}
            dir="rtl"
          >
            {currentLine.arabic}
          </p>

          {/* Transliteration */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground italic">
            {currentLine.transliteration}
          </p>

          {/* Translation */}
          <p className="text-base sm:text-lg md:text-xl text-foreground/80">
            {currentLine.translation}
          </p>

          {/* Line indicator */}
          {!showClosingPhrase && (
            <div className="flex justify-center gap-1.5 pt-4">
              {section.lines.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentLineIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentLineIndex 
                      ? 'bg-primary w-6' 
                      : idx < currentLineIndex 
                        ? 'bg-primary/50' 
                        : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Go to line ${idx + 1}`}
                />
              ))}
              {/* Closing phrase indicator */}
              <button
                onClick={() => setShowClosingPhrase(true)}
                className={`w-2 h-2 rounded-full transition-all ${
                  showClosingPhrase ? 'bg-amber-400 w-6' : 'bg-muted-foreground/30'
                }`}
                aria-label="Go to closing phrase"
              />
            </div>
          )}

          {showClosingPhrase && (
            <p className="text-sm text-amber-400/70 pt-2">
              {t('jawshan.closingPhrase')}
            </p>
          )}
        </div>
      </main>

      {/* Navigation controls */}
      <footer className="p-4 sm:p-6">
        {/* Section progress bar */}
        <div className="max-w-md mx-auto mb-4">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{t('jawshan.section')} {section.sectionNumber}/{totalSections}</span>
            <span>{t('jawshan.line')} {currentLineIndex + 1}/{section.lines.length}</span>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onPrevSection}
            disabled={section.sectionNumber <= 1}
            className="p-3 rounded-full bg-muted/50 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous section"
          >
            <ChevronLeft className="w-5 h-5" />
            <ChevronLeft className="w-5 h-5 -ml-3" />
          </button>

          <button
            onClick={goToPrevLine}
            className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-all"
            aria-label="Previous line"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={resetSection}
            className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-all"
            aria-label="Reset section"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={goToNextLine}
            className="p-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            aria-label="Next line"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={onNextSection}
            disabled={section.sectionNumber >= totalSections}
            className="p-3 rounded-full bg-muted/50 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next section"
          >
            <ChevronRight className="w-5 h-5" />
            <ChevronRight className="w-5 h-5 -ml-3" />
          </button>
        </div>

        {/* Keyboard hints */}
        <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <span>← → {t('jawshan.navigateLines')}</span>
          <span>↑ ↓ {t('jawshan.navigateSections')}</span>
          <span>R {t('jawshan.reset')}</span>
        </div>
      </footer>
    </div>
  );
};

export default JawshanContent;
