import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, User, Search, Star, Play, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { useTVNavigation } from "@/hooks/useTVNavigation";
import { useTranslation } from "@/lib/i18n";
import { surahs } from "@/data/surahs";
import { juzData } from "@/data/juz";
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

type TabType = 'surahs' | 'juz' | 'favorites';

const FAVORITES_KEY = 'sekine-quran-favorites';

const Quran = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { settings } = useApp();
  const [selectedReciter, setSelectedReciter] = useState(reciters[0].id);
  const [showReciterList, setShowReciterList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>('surahs');
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (newFavorites: number[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const toggleFavorite = (surahNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(surahNumber)) {
      saveFavorites(favorites.filter(n => n !== surahNumber));
    } else {
      saveFavorites([...favorites, surahNumber]);
    }
  };

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
    navigate(`/player?surah=${surahNumber}&reciter=${selectedReciter}`);
  };

  const handleJuzSelect = (juzNumber: number) => {
    const juz = juzData.find(j => j.number === juzNumber);
    if (juz) {
      navigate(`/player?surah=${juz.startSurah}&verse=${juz.startVerse}&reciter=${selectedReciter}&juz=${juzNumber}`);
    }
  };

  const handlePlayAll = () => {
    if (activeTab === 'surahs') {
      navigate(`/player?surah=1&reciter=${selectedReciter}&mode=sequential`);
    } else if (activeTab === 'juz') {
      navigate(`/player?juz=1&reciter=${selectedReciter}&mode=sequential`);
    } else if (activeTab === 'favorites' && favorites.length > 0) {
      const sortedFavorites = [...favorites].sort((a, b) => a - b);
      navigate(`/player?surah=${sortedFavorites[0]}&reciter=${selectedReciter}&mode=favorites&playlist=${sortedFavorites.join(',')}`);
    }
  };

  const currentReciter = reciters.find(r => r.id === selectedReciter);
  
  // Filter surahs based on search and tab
  const filteredSurahs = surahs.filter(surah => {
    const matchesSearch = surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.arabicName.includes(searchQuery) ||
      surah.number.toString() === searchQuery;
    
    if (activeTab === 'favorites') {
      return matchesSearch && favorites.includes(surah.number);
    }
    return matchesSearch;
  });

  const favoriteSurahs = surahs.filter(s => favorites.includes(s.number));

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

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-muted/30 rounded-xl">
          <button
            data-focusable="true"
            onClick={() => setActiveTab('surahs')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all focus:ring-2 focus:ring-primary focus:outline-none ${
              activeTab === 'surahs'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>All Surahs</span>
          </button>
          <button
            data-focusable="true"
            onClick={() => setActiveTab('juz')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all focus:ring-2 focus:ring-primary focus:outline-none ${
              activeTab === 'juz'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Juz (30)</span>
          </button>
          <button
            data-focusable="true"
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all focus:ring-2 focus:ring-primary focus:outline-none ${
              activeTab === 'favorites'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === 'favorites' ? 'bg-primary-foreground/20' : 'bg-primary/20 text-primary'
              }`}>
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        {/* Play All Button */}
        {((activeTab === 'surahs') || (activeTab === 'juz') || (activeTab === 'favorites' && favorites.length > 0)) && (
          <button
            data-focusable="true"
            onClick={handlePlayAll}
            className="w-full glass-card p-4 flex items-center justify-center gap-3 text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span className="font-medium">
              {activeTab === 'surahs' && 'Play All Surahs'}
              {activeTab === 'juz' && 'Play All Juz'}
              {activeTab === 'favorites' && `Play ${favorites.length} Favorite${favorites.length > 1 ? 's' : ''}`}
            </span>
          </button>
        )}

        {/* Search (for non-TV use) */}
        {activeTab !== 'juz' && (
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
        )}

        {/* Content based on active tab */}
        {activeTab === 'surahs' && (
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
                  
                  {/* Favorite button */}
                  <button
                    data-focusable="true"
                    onClick={(e) => toggleFavorite(surah.number, e)}
                    className={`p-2 rounded-lg transition-all focus:ring-2 focus:ring-primary focus:outline-none ${
                      favorites.includes(surah.number)
                        ? 'text-gold'
                        : 'text-muted-foreground hover:text-gold'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${favorites.includes(surah.number) ? 'fill-current' : ''}`} />
                  </button>
                  
                  {/* Arabic name */}
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
        )}

        {activeTab === 'juz' && (
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Select Juz
              <span className="text-sm text-muted-foreground ml-2">(30 parts)</span>
            </h3>
            
            <div className="grid gap-2">
              {juzData.map((juz, index) => {
                const startSurah = surahs.find(s => s.number === juz.startSurah);
                const endSurah = surahs.find(s => s.number === juz.endSurah);
                
                return (
                  <button
                    key={juz.number}
                    data-focusable="true"
                    autoFocus={index === 0}
                    onClick={() => handleJuzSelect(juz.number)}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all focus:ring-2 focus:ring-primary focus:outline-none bg-muted/30 hover:bg-muted/50 group"
                  >
                    {/* Juz number */}
                    <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center shrink-0 group-focus:bg-emerald group-focus:text-white transition-colors">
                      <span className="text-sm font-semibold">{juz.number}</span>
                    </div>
                    
                    {/* Juz info */}
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-foreground font-medium">{juz.englishName}</p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {startSurah?.englishName} {juz.startVerse} → {endSurah?.englishName} {juz.endVerse}
                      </p>
                    </div>
                    
                    {/* Arabic name */}
                    <span 
                      className="font-arabic text-lg text-primary shrink-0"
                      dir="rtl"
                    >
                      {juz.arabicName}
                    </span>
                    
                    {/* Play indicator */}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-focus:text-primary transition-colors" />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'favorites' && (
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <Star className="w-5 h-5 text-gold" />
              Favorite Surahs
              <span className="text-sm text-muted-foreground ml-2">({favoriteSurahs.length})</span>
            </h3>
            
            {favoriteSurahs.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-foreground mb-2">No favorites yet</h4>
                <p className="text-sm text-muted-foreground">
                  Tap the star icon on any surah to add it to your favorites for quick access.
                </p>
              </div>
            ) : (
              <div className="grid gap-2">
                {favoriteSurahs.map((surah, index) => (
                  <button
                    key={surah.number}
                    data-focusable="true"
                    autoFocus={index === 0}
                    onClick={() => handleSurahSelect(surah.number)}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all focus:ring-2 focus:ring-primary focus:outline-none bg-muted/30 hover:bg-muted/50 group"
                  >
                    {/* Surah number */}
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-focus:bg-gold group-focus:text-white transition-colors">
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
                    
                    {/* Favorite button */}
                    <button
                      data-focusable="true"
                      onClick={(e) => toggleFavorite(surah.number, e)}
                      className="p-2 rounded-lg text-gold transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                    
                    {/* Arabic name */}
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
            )}
          </section>
        )}
      </main>

      {/* Footer hint */}
      <footer className="sticky bottom-0 border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            ↑↓ {t('hint.navigate')} • ★ to favorite • SELECT to play • BACK {t('hint.back')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Quran;
