import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Volume2, BookOpen } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

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

const Quran = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState(surahs[0]);
  const [selectedReciter, setSelectedReciter] = useState(reciters[0].id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl font-semibold text-foreground">Quran Recitation</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Now Playing Card */}
        <section className="glass-card p-8 space-y-6">
          <div className="flex flex-col items-center text-center gap-4">
            {/* Decorative icon */}
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center gold-glow">
              <BookOpen className="w-10 h-10 text-primary-foreground" />
            </div>

            {/* Surah info */}
            <div className="space-y-2">
              <h2 className="font-arabic text-5xl text-gold text-shadow-gold">
                {selectedSurah.arabicName}
              </h2>
              <p className="text-2xl text-foreground">{selectedSurah.name}</p>
              <p className="text-sm text-muted-foreground">
                Surah {selectedSurah.number} • {selectedSurah.verses} Verses
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md space-y-2">
              <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>2:34</span>
                <span>7:45</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button className="p-3 rounded-full hover:bg-muted/50 transition-colors">
                <SkipBack className="w-6 h-6 text-foreground" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 rounded-full gradient-gold gold-glow hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                )}
              </button>
              <button className="p-3 rounded-full hover:bg-muted/50 transition-colors">
                <SkipForward className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3 w-full max-w-xs">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
            </div>
          </div>
        </section>

        {/* Reciter Selection */}
        <section className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-medium text-foreground">Reciter</h3>
          <Select value={selectedReciter} onValueChange={setSelectedReciter}>
            <SelectTrigger className="w-full bg-muted/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {reciters.map((reciter) => (
                <SelectItem key={reciter.id} value={reciter.id}>
                  {reciter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {/* Surah List */}
        <section className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-medium text-foreground">Select Surah</h3>
          <div className="grid gap-2">
            {surahs.map((surah) => (
              <button
                key={surah.number}
                onClick={() => setSelectedSurah(surah)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
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
