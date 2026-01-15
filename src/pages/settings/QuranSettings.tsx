import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { reciters } from '@/data/reciters';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { PlaybackSpeed } from '@/types/app';

type ScreenView = 'main' | 'reciter' | 'speed' | 'language';

const playbackSpeeds: { value: PlaybackSpeed; label: string }[] = [
  { value: 0.5, label: '0.5x (Slow)' },
  { value: 0.75, label: '0.75x' },
  { value: 1, label: '1.0x (Normal)' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 2, label: '2.0x (Fast)' },
];

const translationLanguages = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic Only' },
  { value: 'ur', label: 'Urdu' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'tr', label: 'Turkish' },
  { value: 'id', label: 'Indonesian' },
  { value: 'bn', label: 'Bengali' },
];

export default function QuranSettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();
  const [currentView, setCurrentView] = useState<ScreenView>('main');

  useTVNavigation({
    onBack: () => {
      if (currentView !== 'main') {
        setCurrentView('main');
      } else {
        navigate('/settings');
      }
    },
  });

  const currentReciter = reciters.find(r => r.id === settings.quran.defaultReciter);
  const currentSpeed = playbackSpeeds.find(s => s.value === settings.quran.playbackSpeed);
  const currentLanguage = translationLanguages.find(l => l.value === settings.quran.translationLanguage);

  // Full-screen reciter selection
  if (currentView === 'reciter') {
    return (
      <div className="fixed inset-0 bg-background flex flex-col">
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center gap-4">
            <button
              data-focusable="true"
              onClick={() => setCurrentView('main')}
              className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 sm:px-4 sm:py-3 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Select Reciter</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto py-4">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-2">
            {reciters.map((reciter, index) => {
              const isSelected = settings.quran.defaultReciter === reciter.id;
              return (
                <button
                  key={reciter.id}
                  data-focusable="true"
                  autoFocus={index === 0}
                  onClick={() => {
                    updateSettings('quran', { defaultReciter: reciter.id });
                    setCurrentView('main');
                  }}
                  className={`w-full p-5 sm:p-6 rounded-xl flex items-center justify-between transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                    isSelected ? 'bg-primary/10 border-2 border-primary' : 'glass-card hover:bg-card/80'
                  }`}
                >
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-medium">{reciter.name}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{reciter.nationality}</p>
                  </div>
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

        <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Use ↑↓ to navigate • SELECT to choose • BACK to return
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Full-screen speed selection
  if (currentView === 'speed') {
    return (
      <div className="fixed inset-0 bg-background flex flex-col">
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center gap-4">
            <button
              data-focusable="true"
              onClick={() => setCurrentView('main')}
              className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 sm:px-4 sm:py-3 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Playback Speed</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto py-4">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-2">
            {playbackSpeeds.map((speed, index) => {
              const isSelected = settings.quran.playbackSpeed === speed.value;
              return (
                <button
                  key={speed.value}
                  data-focusable="true"
                  autoFocus={index === 0}
                  onClick={() => {
                    updateSettings('quran', { playbackSpeed: speed.value });
                    setCurrentView('main');
                  }}
                  className={`w-full p-5 sm:p-6 rounded-xl flex items-center justify-between transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                    isSelected ? 'bg-primary/10 border-2 border-primary' : 'glass-card hover:bg-card/80'
                  }`}
                >
                  <span className="text-base sm:text-lg lg:text-xl font-medium">{speed.label}</span>
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

        <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Use ↑↓ to navigate • SELECT to choose • BACK to return
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Full-screen language selection
  if (currentView === 'language') {
    return (
      <div className="fixed inset-0 bg-background flex flex-col">
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center gap-4">
            <button
              data-focusable="true"
              onClick={() => setCurrentView('main')}
              className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 sm:px-4 sm:py-3 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Translation Language</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto py-4">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-2">
            {translationLanguages.map((lang, index) => {
              const isSelected = settings.quran.translationLanguage === lang.value;
              return (
                <button
                  key={lang.value}
                  data-focusable="true"
                  autoFocus={index === 0}
                  onClick={() => {
                    updateSettings('quran', { translationLanguage: lang.value });
                    setCurrentView('main');
                  }}
                  className={`w-full p-5 sm:p-6 rounded-xl flex items-center justify-between transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                    isSelected ? 'bg-primary/10 border-2 border-primary' : 'glass-card hover:bg-card/80'
                  }`}
                >
                  <span className="text-base sm:text-lg lg:text-xl font-medium">{lang.label}</span>
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

        <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Use ↑↓ to navigate • SELECT to choose • BACK to return
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Main settings view
  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center gap-4">
          <button
            data-focusable="true"
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 sm:px-4 sm:py-3 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Back</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Quran Settings</h1>
        </div>
      </header>

      {/* Settings List */}
      <main className="flex-1 overflow-auto py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-3">
          {/* Default Reciter */}
          <button
            data-focusable="true"
            autoFocus
            onClick={() => setCurrentView('reciter')}
            className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
          >
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">Default Reciter</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {currentReciter?.name || 'Select a reciter'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
          </button>

          {/* Playback Speed */}
          <button
            data-focusable="true"
            onClick={() => setCurrentView('speed')}
            className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
          >
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">Playback Speed</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {currentSpeed?.label || '1.0x'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
          </button>

          {/* Show Transliteration Toggle */}
          <button
            data-focusable="true"
            onClick={() => updateSettings('quran', { showTransliteration: !settings.quran.showTransliteration })}
            className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
          >
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">Show Transliteration</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Display romanized Arabic text</p>
            </div>
            <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.quran.showTransliteration ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.quran.showTransliteration ? 'translate-x-6' : ''}`} />
            </div>
          </button>

          {/* Translation Language */}
          <button
            data-focusable="true"
            onClick={() => setCurrentView('language')}
            className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
          >
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">Translation Language</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {currentLanguage?.label || 'English'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
          </button>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use ↑↓ to navigate • SELECT to toggle/open • BACK to return
          </p>
        </div>
      </footer>
    </div>
  );
}
