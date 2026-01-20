import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Monitor, Check, Image } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { BackgroundSelector } from '@/components/BackgroundSelector';
import type { BackgroundId } from '@/types/app';

export default function DisplaySettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  const toggleSetting = (key: keyof typeof settings.display) => {
    updateSettings('display', { [key]: !settings.display[key] });
  };

  const setClockFormat = (format: '12h' | '24h') => {
    updateSettings('display', { clockFormat: format });
  };

  const setScreensaverTimeout = (timeout: '20s' | '1m' | '5m' | '10m' | 'disabled') => {
    updateSettings('display', { screensaverTimeout: timeout });
  };

  const setBackgroundId = (id: BackgroundId) => {
    updateSettings('display', { backgroundId: id });
  };

  const screensaverOptions = [
    { value: 'disabled' as const, label: 'Disabled' },
    { value: '20s' as const, label: '20 seconds' },
    { value: '1m' as const, label: '1 minute' },
    { value: '5m' as const, label: '5 minutes' },
    { value: '10m' as const, label: '10 minutes' },
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
            <Monitor className="w-6 h-6 text-gold" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Display Settings</h1>
          </div>
        </div>
      </header>

      {/* Settings List */}
      <main className="flex-1 overflow-auto py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-3">
          {/* Clock Format */}
          <div className="glass-card p-4 sm:p-5 lg:p-6">
            <h3 className="text-base sm:text-lg font-medium mb-4">Clock Format</h3>
            <div className="flex gap-3">
              <button
                data-focusable="true"
                autoFocus
                onClick={() => setClockFormat('12h')}
                className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-3 transition-all focus:ring-2 focus:ring-primary focus:outline-none ${
                  settings.display.clockFormat === '12h'
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <span className="text-lg font-medium">12-Hour</span>
                <span className="text-muted-foreground">(2:30 PM)</span>
                {settings.display.clockFormat === '12h' && <Check className="w-5 h-5 text-primary" />}
              </button>
              <button
                data-focusable="true"
                onClick={() => setClockFormat('24h')}
                className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-3 transition-all focus:ring-2 focus:ring-primary focus:outline-none ${
                  settings.display.clockFormat === '24h'
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <span className="text-lg font-medium">24-Hour</span>
                <span className="text-muted-foreground">(14:30)</span>
                {settings.display.clockFormat === '24h' && <Check className="w-5 h-5 text-primary" />}
              </button>
            </div>
          </div>

          {/* Toggle Settings */}
          <button
            data-focusable="true"
            onClick={() => toggleSetting('showHijriDate')}
            className="w-full glass-card p-4 sm:p-5 lg:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-card/80"
          >
            <div>
              <h3 className="text-base sm:text-lg font-medium">Show Hijri Date</h3>
              <p className="text-sm text-muted-foreground">Display Islamic calendar date</p>
            </div>
            <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.display.showHijriDate ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.display.showHijriDate ? 'translate-x-6' : ''}`} />
            </div>
          </button>

          <button
            data-focusable="true"
            onClick={() => toggleSetting('showCentralQuote')}
            className="w-full glass-card p-4 sm:p-5 lg:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-card/80"
          >
            <div>
              <h3 className="text-base sm:text-lg font-medium">Show Quote of the Day</h3>
              <p className="text-sm text-muted-foreground">Display inspirational quote on idle screen</p>
            </div>
            <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.display.showCentralQuote ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.display.showCentralQuote ? 'translate-x-6' : ''}`} />
            </div>
          </button>

          <button
            data-focusable="true"
            onClick={() => toggleSetting('showSeconds')}
            className="w-full glass-card p-4 sm:p-5 lg:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-card/80"
          >
            <div>
              <h3 className="text-base sm:text-lg font-medium">Show Seconds</h3>
              <p className="text-sm text-muted-foreground">Display seconds in the clock</p>
            </div>
            <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.display.showSeconds ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.display.showSeconds ? 'translate-x-6' : ''}`} />
            </div>
          </button>

          <button
            data-focusable="true"
            onClick={() => toggleSetting('backgroundSlideshow')}
            className="w-full glass-card p-4 sm:p-5 lg:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-card/80"
          >
            <div>
              <h3 className="text-base sm:text-lg font-medium">Background Slideshow</h3>
              <p className="text-sm text-muted-foreground">Rotate background images automatically</p>
            </div>
            <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.display.backgroundSlideshow ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.display.backgroundSlideshow ? 'translate-x-6' : ''}`} />
            </div>
          </button>

          <button
            data-focusable="true"
            onClick={() => toggleSetting('oledProtection')}
            className="w-full glass-card p-4 sm:p-5 lg:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-card/80"
          >
            <div>
              <h3 className="text-base sm:text-lg font-medium">Screen Burn Protection</h3>
              <p className="text-sm text-muted-foreground">Subtle element movement for OLED TVs</p>
            </div>
            <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.display.oledProtection ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.display.oledProtection ? 'translate-x-6' : ''}`} />
            </div>
          </button>

          {/* Screensaver Timeout */}
          <div className="glass-card p-4 sm:p-5 lg:p-6">
            <h3 className="text-base sm:text-lg font-medium mb-4">Screensaver Timeout</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {screensaverOptions.map((option) => (
                <button
                  key={option.value}
                  data-focusable="true"
                  onClick={() => setScreensaverTimeout(option.value)}
                  className={`p-3 sm:p-4 rounded-xl text-center transition-all focus:ring-2 focus:ring-primary focus:outline-none ${
                    settings.display.screensaverTimeout === option.value
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <span className="text-sm sm:text-base font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Background Image Selection */}
          <div className="glass-card p-4 sm:p-5 lg:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Image className="w-5 h-5 text-primary" />
              <div>
                <h3 className="text-base sm:text-lg font-medium">Background Image</h3>
                <p className="text-sm text-muted-foreground">Choose a background for the idle screen</p>
              </div>
            </div>
            <BackgroundSelector
              selectedId={settings.display.backgroundId}
              onSelect={setBackgroundId}
            />
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
