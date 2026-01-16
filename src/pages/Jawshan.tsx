import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Scroll, Play, Search } from 'lucide-react';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { useTranslation } from '@/lib/i18n';
import { jawshanSections, getAvailableSections, getTotalSections } from '@/data/jawshan';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const Jawshan = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const availableSections = getAvailableSections();
  const totalSections = getTotalSections();

  useTVNavigation({
    onBack: () => navigate('/idle'),
  });

  const handleSectionSelect = useCallback((sectionNumber: number) => {
    navigate(`/player?type=jawshan&section=${sectionNumber}`);
  }, [navigate]);

  const handleContinueReading = useCallback(() => {
    // TODO: Get last read section from settings
    const lastSection = 1;
    navigate(`/player?type=jawshan&section=${lastSection}`);
  }, [navigate]);

  // Filter sections based on search
  const filteredSections = jawshanSections.filter(section => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    // Search by section number or content
    return (
      section.sectionNumber.toString().includes(query) ||
      section.lines.some(line => 
        line.transliteration.toLowerCase().includes(query) ||
        line.translation.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <button
              data-focusable="true"
              onClick={() => navigate('/idle')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Scroll className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{t('jawshan.title')}</h1>
                <p className="text-sm text-muted-foreground">
                  {availableSections.length} {t('jawshan.of')} {totalSections} {t('jawshan.sectionsAvailable')}
                </p>
              </div>
            </div>
          </div>

          {/* Continue Reading Button */}
          <button
            data-focusable="true"
            onClick={handleContinueReading}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">{t('jawshan.continue')}</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 sm:px-6 pb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('jawshan.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Section Grid */}
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          {/* Quick section jump - 10 columns for sections 1-100 */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-6">
            {Array.from({ length: 10 }, (_, i) => i * 10 + 1).map(startSection => (
              <button
                key={startSection}
                data-focusable="true"
                onClick={() => handleSectionSelect(startSection)}
                className={`p-2 text-xs sm:text-sm rounded-lg border transition-all ${
                  availableSections.includes(startSection)
                    ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 text-amber-400'
                    : 'bg-muted/50 border-border text-muted-foreground opacity-50'
                }`}
                disabled={!availableSections.includes(startSection)}
              >
                {startSection}-{Math.min(startSection + 9, 100)}
              </button>
            ))}
          </div>

          {/* Detailed section cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSections.map(section => (
              <button
                key={section.sectionNumber}
                data-focusable="true"
                onClick={() => handleSectionSelect(section.sectionNumber)}
                className="group p-4 rounded-xl bg-card border border-border hover:border-amber-500/50 hover:bg-amber-500/5 transition-all text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                    {section.sectionNumber}
                  </div>
                  <span className="text-sm text-muted-foreground font-arabic" dir="rtl">
                    {section.arabicTitle}
                  </span>
                </div>
                
                {/* Preview of first line */}
                <p className="text-lg font-arabic text-foreground mb-1" dir="rtl">
                  {section.lines[0].arabic}
                </p>
                <p className="text-sm text-muted-foreground italic truncate">
                  {section.lines[0].transliteration}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-1">
                  {section.lines[0].translation}
                </p>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {section.lines.length} {t('jawshan.names')}
                  </span>
                  <Play className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </div>
              </button>
            ))}
          </div>

          {/* Empty state */}
          {filteredSections.length === 0 && (
            <div className="text-center py-12">
              <Scroll className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">{t('jawshan.noResults')}</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary hover:underline"
              >
                {t('jawshan.clearSearch')}
              </button>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer with keyboard hints */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <span>↑↓←→ {t('hint.navigate')}</span>
          <span>Enter {t('hint.selectPress')}</span>
          <span>Esc {t('hint.back')}</span>
        </div>
      </footer>
    </div>
  );
};

export default Jawshan;
