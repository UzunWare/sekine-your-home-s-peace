import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Volume2, BookOpen, Check, Minus, Plus, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTVNavigation } from "@/hooks/useTVNavigation";

const reciters = [
  { id: "mishary", name: "Mishary Rashid Alafasy" },
  { id: "sudais", name: "Abdul Rahman Al-Sudais" },
  { id: "shuraim", name: "Saud Al-Shuraim" },
  { id: "minshawi", name: "Mohamed Siddiq El-Minshawi" },
];

const surahs = [
  { number: 1, name: "Al-Fatiha", arabicName: "الفاتحة", verses: 7 },
  { number: 2, name: "Al-Baqarah", arabicName: "البقرة", verses: 286 },
  { number: 36, name: "Ya-Sin", arabicName: "يس", verses: 83 },
  { number: 55, name: "Ar-Rahman", arabicName: "الرحمن", verses: 78 },
  { number: 67, name: "Al-Mulk", arabicName: "الملك", verses: 30 },
  { number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", verses: 4 },
  { number: 113, name: "Al-Falaq", arabicName: "الفلق", verses: 5 },
  { number: 114, name: "An-Nas", arabicName: "الناس", verses: 6 },
];

const volumeLevels = [0, 20, 40, 60, 80, 100];

const Quran = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState(surahs[0]);
  const [selectedReciter, setSelectedReciter] = useState(reciters[0].id);
  const [showReciterList, setShowReciterList] = useState(false);
  const [volume, setVolume] = useState(80);

  useTVNavigation({
    onBack: () => {
      if (showReciterList) {
        setShowReciterList(false);
      } else {
        navigate('/idle');
      }
    },
    onPlayPause: () => setIsPlaying(!isPlaying),
  });

  const adjustVolume = (delta: number) => {
    const currentIndex = volumeLevels.indexOf(volume);
    const newIndex = Math.max(0, Math.min(volumeLevels.length - 1, currentIndex + delta));
    setVolume(volumeLevels[newIndex]);
  };

  const currentReciter = reciters.find(r => r.id === selectedReciter);

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
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl sm:text-2xl font-semibold">Select Reciter</h1>
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
                  <span className="text-lg sm:text-xl font-medium">{reciter.name}</span>
                  {isSelected && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary-foreground" />
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
              Use ↑↓ to navigate • SELECT to choose • BACK to return
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
            <span>Back</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl font-semibold text-foreground">Quran Recitation</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Now Playing Card */}
        <section className="glass-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col items-center text-center gap-4">
            {/* Decorative icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full gradient-gold flex items-center justify-center gold-glow">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>

            {/* Surah info */}
            <div className="space-y-2">
              <h2 className="font-arabic text-4xl sm:text-5xl text-gold text-shadow-gold">
                {selectedSurah.arabicName}
              </h2>
              <p className="text-xl sm:text-2xl text-foreground">{selectedSurah.name}</p>
              <p className="text-sm text-muted-foreground">
                Surah {selectedSurah.number} • {selectedSurah.verses} Verses
              </p>
            </div>

            {/* Progress bar - visual only, not focusable */}
            <div className="w-full max-w-md space-y-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-primary rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>2:34</span>
                <span>7:45</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                data-focusable="true"
                className="p-3 sm:p-4 rounded-full hover:bg-muted/50 focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
              >
                <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </button>
              <button
                data-focusable="true"
                autoFocus
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 sm:p-5 rounded-full gradient-gold gold-glow hover:scale-105 focus:ring-4 focus:ring-primary/50 focus:outline-none transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground ml-1" />
                )}
              </button>
              <button
                data-focusable="true"
                className="p-3 sm:p-4 rounded-full hover:bg-muted/50 focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
              >
                <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </button>
            </div>

            {/* Volume - TV-friendly stepper */}
            <div className="flex items-center gap-3 w-full max-w-xs">
              <button
                data-focusable="true"
                onClick={() => adjustVolume(-1)}
                disabled={volume === 0}
                className="p-3 rounded-xl bg-muted/50 hover:bg-muted focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-30 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="flex-1 flex items-center gap-2 justify-center">
                <Volume2 className="w-5 h-5 text-muted-foreground" />
                <span className="text-lg font-medium w-12 text-center">{volume}%</span>
              </div>
              <button
                data-focusable="true"
                onClick={() => adjustVolume(1)}
                disabled={volume === 100}
                className="p-3 rounded-xl bg-muted/50 hover:bg-muted focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-30 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Reciter Selection - TV-friendly button */}
        <button
          data-focusable="true"
          onClick={() => setShowReciterList(true)}
          className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
        >
          <div>
            <h3 className="text-base sm:text-lg font-medium text-foreground">Reciter</h3>
            <p className="text-muted-foreground">{currentReciter?.name}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Surah List */}
        <section className="glass-card p-5 sm:p-6 space-y-4">
          <h3 className="text-lg font-medium text-foreground">Select Surah</h3>
          <div className="grid gap-2">
            {surahs.map((surah) => (
              <button
                key={surah.number}
                data-focusable="true"
                onClick={() => setSelectedSurah(surah)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all focus:ring-2 focus:ring-primary focus:outline-none ${
                  selectedSurah.number === surah.number
                    ? "bg-gold/10 border border-gold/30"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedSurah.number === surah.number ? "gradient-gold" : "bg-muted"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      selectedSurah.number === surah.number ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {surah.number}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-foreground font-medium">{surah.name}</p>
                  <p className="text-sm text-muted-foreground">{surah.verses} verses</p>
                </div>
                <span className="font-arabic text-xl text-gold-soft">{surah.arabicName}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Quran;
