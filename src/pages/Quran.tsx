import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, User, Search } from "lucide-react";
import { useState } from "react";
import { useTVNavigation } from "@/hooks/useTVNavigation";
import { useTranslation } from "@/lib/i18n";
import { surahs } from "@/data/surahs";
import { RECITERS_INFO } from "@/lib/quranAPI";
import { useApp } from "@/contexts/AppContext";

// Available reciters for selection
const reciters = [
  { id: "mishary", name: "Mishary Rashid Alafasy", arabicName: "مشاري راشد العفاسي" },
  { id: "sudais", name: "Abdul Rahman Al-Sudais", arabicName: "عبد الرحمن السديس" },
  { id: "minshawi", name: "Mohamed Siddiq al-Minshawi", arabicName: "محمد صديق المنشاوي" },
  { id: "husary", name: "Mahmoud Khalil Al-Husary", arabicName: "محمود خليل الحصري" },
  { id: "ghamdi", name: "Saad Al Ghamdi", arabicName: "سعد الغامدي" },
  { id: "ajmi", name: "Ahmed ibn Ali al-Ajmi", arabicName: "أحمد بن علي العجمي" },
];

const Quran = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { settings } = useApp();
  const [selectedReciter, setSelectedReciter] = useState(reciters[0].id);
  const [showReciterList, setShowReciterList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useTVNavigation({
    onBack: () => {
      if (showReciterList) {
        setShowReciterList(false);
      } else {
        navigate('/idle');
      }
    },
  });

  const handleSurahSelect = (surahNumber: number) => {
    // Navigate to player with surah and reciter info
    navigate(`/player?surah=${surahNumber}&reciter=${selectedReciter}`);
  };

  const currentReciter = reciters.find(r => r.id === selectedReciter);
  
  // Filter surahs based on search
  const filteredSurahs = surahs.filter(surah => 
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.arabicName.includes(searchQuery) ||
    surah.number.toString() === searchQuery
  );

  // Full-screen reciter selection
  if (showReciterList) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 py-4 sm:py-6 flex items-center gap-4">
            <button
              data-focusable="true"
              onClick={() => setShowReciterList(false)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('nav.back')}</span>
            </button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl sm:text-2xl font-semibold">{t('quran.selectReciter')}</h1>
          </div>
        </header>

        {/* Reciter List */}
        <main className="flex-1 overflow-auto py-4">
          <div className="max-w-4xl mx-auto px-6 space-y-2">
            {reciters.map((reciter, index) => {
              const isSelected = selectedReciter === reciter.id;
              return (
                <button
                  key={reciter.id}
                  data-focusable="true"
                  autoFocus={index === 0}
                  onClick={() => {
                    setSelectedReciter(reciter.id);
                    setShowReciterList(false);
                  }}
                  className={`w-full p-5 sm:p-6 rounded-xl flex items-center justify-between transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                    isSelected
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'glass-card hover:bg-card/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-lg sm:text-xl font-medium block">{reciter.name}</span>
                      <span className="text-sm text-muted-foreground font-arabic">{reciter.arabicName}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </main>

        {/* Footer hint */}
        <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              ↑↓ {t('hint.navigate')} • SELECT {t('hint.selectPress')} • BACK {t('hint.back')}
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            data-focusable="true"
            onClick={() => navigate('/idle')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-2 py-1 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('nav.back')}</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">{t('quran.title')}</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Reciter Selection Card */}
        <button
          data-focusable="true"
          onClick={() => setShowReciterList(true)}
          className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">{t('quran.reciter')}</h3>
              <p className="text-lg font-medium text-foreground">{currentReciter?.name}</p>
              <p className="text-sm text-primary font-arabic">{currentReciter?.arabicName}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Search (for non-TV use) */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
          />
        </div>

        {/* Surah List */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {t('quran.selectSurah')}
            <span className="text-sm text-muted-foreground ml-2">({filteredSurahs.length} {t('quran.surah')}s)</span>
          </h3>
          
          <div className="grid gap-2">
            {filteredSurahs.map((surah, index) => (
              <button
                key={surah.number}
                data-focusable="true"
                autoFocus={index === 0}
                onClick={() => handleSurahSelect(surah.number)}
                className="flex items-center gap-4 p-4 rounded-xl transition-all focus:ring-2 focus:ring-primary focus:outline-none bg-muted/30 hover:bg-muted/50 group"
              >
                {/* Surah number */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-focus:bg-primary group-focus:text-primary-foreground transition-colors">
                  <span className="text-sm font-semibold">{surah.number}</span>
                </div>
                
                {/* Surah info */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-medium">{surah.englishName}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {surah.revelationType === 'meccan' ? t('quran.meccan') : t('quran.medinan')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {surah.englishMeaning} • {surah.verseCount} {t('quran.verses')}
                  </p>
                </div>
                
                {/* Arabic name - Uthmanic font */}
                <span 
                  className="font-uthmani text-2xl text-primary shrink-0"
                  dir="rtl"
                >
                  {surah.arabicName}
                </span>
                
                {/* Play indicator */}
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-focus:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer hint */}
      <footer className="sticky bottom-0 border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            ↑↓ {t('hint.navigate')} • SELECT to play • BACK {t('hint.back')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Quran;
