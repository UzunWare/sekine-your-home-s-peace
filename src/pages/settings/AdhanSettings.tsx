import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Volume2, ChevronRight, Minus, Plus } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { adhanStyles } from '@/data/reciters';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { VolumeLevel } from '@/types/app';

const volumeLevels: VolumeLevel[] = [20, 40, 60, 80, 100];

export default function AdhanSettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();
  const [showStyleList, setShowStyleList] = useState(false);

  useTVNavigation({
    onBack: () => {
      if (showStyleList) {
        setShowStyleList(false);
      } else {
        navigate('/settings');
      }
    },
  });

  const currentStyle = adhanStyles.find(s => s.id === settings.adhan.style);

  const adjustVolume = (delta: number) => {
    const currentIndex = volumeLevels.indexOf(settings.adhan.volume);
    const newIndex = Math.max(0, Math.min(volumeLevels.length - 1, currentIndex + delta));
    updateSettings('adhan', { volume: volumeLevels[newIndex] });
  };

  // Full-screen style selection
  if (showStyleList) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center gap-4">
            <button
              data-focusable="true"
              onClick={() => setShowStyleList(false)}
              className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 sm:px-4 sm:py-3 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Select Adhan Style</h1>
          </div>
        </header>

        {/* Style List */}
        <main className="flex-1 overflow-auto py-4">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-2">
            {adhanStyles.map((style, index) => {
              const isSelected = settings.adhan.style === style.id;
              return (
                <button
                  key={style.id}
                  data-focusable="true"
                  autoFocus={index === 0}
                  onClick={() => {
                    updateSettings('adhan', { style: style.id });
                    setShowStyleList(false);
                  }}
                  className={`w-full p-5 sm:p-6 rounded-xl flex items-center justify-between transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                    isSelected
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'glass-card hover:bg-card/80'
                  }`}
                >
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-medium">{style.name}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{style.origin}</p>
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

        {/* Footer hint */}
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
          <div className="flex items-center gap-3">
            <Volume2 className="w-6 h-6 text-emerald-500" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Adhan Settings</h1>
          </div>
        </div>
      </header>

      {/* Settings List */}
      <main className="flex-1 overflow-auto py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-3">
          {/* Enable Adhan Toggle */}
          <button
            data-focusable="true"
            autoFocus
            onClick={() => updateSettings('adhan', { enabled: !settings.adhan.enabled })}
            className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
          >
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">Enable Adhan</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Automatically play Adhan at prayer times</p>
            </div>
            <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.adhan.enabled ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.adhan.enabled ? 'translate-x-6' : ''}`} />
            </div>
          </button>

          {/* Adhan Style - opens full-screen list */}
          <button
            data-focusable="true"
            onClick={() => setShowStyleList(true)}
            disabled={!settings.adhan.enabled}
            className={`w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all ${!settings.adhan.enabled ? 'opacity-50' : ''}`}
          >
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">Adhan Style</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {currentStyle?.name || 'Select a style'}
              </p>
              {currentStyle && (
                <p className="text-xs sm:text-sm text-muted-foreground/70">{currentStyle.origin}</p>
              )}
            </div>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
          </button>

          {/* Volume Level - TV-friendly stepper */}
          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-medium">Volume Level</h3>
                <p className="text-sm text-muted-foreground">Adhan playback volume</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  data-focusable="true"
                  onClick={() => adjustVolume(-1)}
                  disabled={settings.adhan.volume === volumeLevels[0]}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-all focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                
                <div className="w-16 sm:w-20 text-center">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{settings.adhan.volume}</span>
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                
                <button
                  data-focusable="true"
                  onClick={() => adjustVolume(1)}
                  disabled={settings.adhan.volume === volumeLevels[volumeLevels.length - 1]}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-all focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Fade In Toggle */}
          <button
            data-focusable="true"
            onClick={() => updateSettings('adhan', { fadeIn: !settings.adhan.fadeIn })}
            className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
          >
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">Fade In</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Gradually increase volume at start</p>
            </div>
            <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.adhan.fadeIn ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.adhan.fadeIn ? 'translate-x-6' : ''}`} />
            </div>
          </button>

          {/* Dua After Adhan Toggle */}
          <button
            data-focusable="true"
            onClick={() => updateSettings('adhan', { duaAfterAdhan: !settings.adhan.duaAfterAdhan })}
            className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
          >
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">Dua After Adhan</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Play supplication after the call to prayer</p>
            </div>
            <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.adhan.duaAfterAdhan ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.adhan.duaAfterAdhan ? 'translate-x-6' : ''}`} />
            </div>
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
