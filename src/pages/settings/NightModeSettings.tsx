import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';

export default function NightModeSettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  const toggleNightMode = () => {
    updateSettings('display', { nightMode: !settings.display.nightMode });
  };

  const setBrightness = (level: number) => {
    updateSettings('display', { nightModeBrightness: level });
  };

  const brightnessLevels = [
    { value: 10, label: '10%', description: 'Very dim' },
    { value: 25, label: '25%', description: 'Dim' },
    { value: 40, label: '40%', description: 'Low' },
    { value: 50, label: '50%', description: 'Medium' },
  ];

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
            <Moon className="w-6 h-6 text-teal" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Night Mode</h1>
          </div>
        </div>
      </header>

      {/* Settings */}
      <main className="flex-1 overflow-auto py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          {/* Enable/Disable */}
          <button
            data-focusable="true"
            autoFocus
            onClick={toggleNightMode}
            className="w-full glass-card p-5 sm:p-6 lg:p-8 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-card/80"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-medium">Enable Night Mode</h3>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Automatically dim the display after Isha prayer
              </p>
            </div>
            <div className={`w-16 h-9 rounded-full transition-colors flex items-center px-1 ${settings.display.nightMode ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-7 h-7 rounded-full bg-white transition-transform ${settings.display.nightMode ? 'translate-x-7' : ''}`} />
            </div>
          </button>

          {/* Brightness Level */}
          {settings.display.nightMode && (
            <div className="glass-card p-5 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-medium mb-2">Night Brightness</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Select how dim the screen should be during night hours
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {brightnessLevels.map((level) => {
                  const isSelected = settings.display.nightModeBrightness === level.value;
                  return (
                    <button
                      key={level.value}
                      data-focusable="true"
                      onClick={() => setBrightness(level.value)}
                      className={`p-4 sm:p-5 rounded-xl flex flex-col items-center gap-2 transition-all focus:ring-2 focus:ring-primary focus:outline-none ${
                        isSelected
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-muted/30 hover:bg-muted/50'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl font-light">{level.label}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">{level.description}</span>
                      {isSelected && <Check className="w-5 h-5 text-primary mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="glass-card p-5 sm:p-6 bg-teal/5 border-teal/20">
            <div className="flex items-start gap-4">
              <Moon className="w-6 h-6 text-teal shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">How Night Mode Works</h4>
                <p className="text-sm text-muted-foreground">
                  Night mode activates automatically after Isha prayer and deactivates at Fajr. 
                  This helps reduce eye strain and screen brightness during sleeping hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use ↑↓ to navigate • SELECT to toggle • BACK to return
          </p>
        </div>
      </footer>
    </div>
  );
}
