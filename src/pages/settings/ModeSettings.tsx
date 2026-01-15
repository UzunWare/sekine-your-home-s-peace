import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Building2, Check, Clock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { AppMode } from '@/types/app';

export default function ModeSettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  const handleModeSelect = (mode: AppMode) => {
    updateSettings('prayer', { mode });
  };

  const adjustJumuahHour = (delta: number) => {
    const [hours, minutes] = settings.mosque.jumuahTime.split(':').map(Number);
    const newHours = Math.max(10, Math.min(15, hours + delta));
    updateSettings('mosque', { jumuahTime: `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}` });
  };

  const adjustJumuahMinutes = (delta: number) => {
    const [hours, minutes] = settings.mosque.jumuahTime.split(':').map(Number);
    const newMinutes = (minutes + delta + 60) % 60;
    updateSettings('mosque', { jumuahTime: `${String(hours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}` });
  };

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
            {settings.prayer.mode === 'home' ? (
              <Home className="w-6 h-6 text-primary" />
            ) : (
              <Building2 className="w-6 h-6 text-primary" />
            )}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">App Mode</h1>
          </div>
        </div>
      </header>

      {/* Settings List */}
      <main className="flex-1 overflow-auto py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Choose between home and mosque mode. Mosque mode enables additional features like Jumuah prayer and Iqamah countdowns.
          </p>

          {/* Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              data-focusable="true"
              autoFocus
              onClick={() => handleModeSelect('home')}
              className={`p-5 sm:p-6 rounded-xl flex items-start gap-4 transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                settings.prayer.mode === 'home'
                  ? 'bg-primary/10 border-2 border-primary'
                  : 'glass-card hover:bg-card/80'
              }`}
            >
              <div className={`p-3 rounded-xl ${settings.prayer.mode === 'home' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Home className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Home Mode</h3>
                  {settings.prayer.mode === 'home' && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">For personal use at home. Shows prayer times and Quran player.</p>
              </div>
            </button>

            <button
              data-focusable="true"
              onClick={() => handleModeSelect('mosque')}
              className={`p-5 sm:p-6 rounded-xl flex items-start gap-4 transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                settings.prayer.mode === 'mosque'
                  ? 'bg-primary/10 border-2 border-primary'
                  : 'glass-card hover:bg-card/80'
              }`}
            >
              <div className={`p-3 rounded-xl ${settings.prayer.mode === 'mosque' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Mosque Mode</h3>
                  {settings.prayer.mode === 'mosque' && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">For mosque or community use. Includes Jumuah and Iqamah features.</p>
              </div>
            </button>
          </div>

          {/* Mosque-specific settings */}
          {settings.prayer.mode === 'mosque' && (
            <div className="space-y-3 pt-4 border-t border-border/50">
              <h3 className="text-lg font-medium text-foreground">Mosque Settings</h3>
              
              {/* Jumuah Toggle */}
              <button
                data-focusable="true"
                onClick={() => updateSettings('mosque', { jumuahEnabled: !settings.mosque.jumuahEnabled })}
                className="w-full glass-card p-5 sm:p-6 flex items-center justify-between text-left focus:ring-2 focus:ring-primary focus:outline-none hover:bg-card/80 transition-all"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-medium">Enable Jumuah Prayer</h3>
                  <p className="text-sm text-muted-foreground">Show Friday prayer time on the display</p>
                </div>
                <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${settings.mosque.jumuahEnabled ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.mosque.jumuahEnabled ? 'translate-x-6' : ''}`} />
                </div>
              </button>

              {/* Jumuah Time */}
              {settings.mosque.jumuahEnabled && (
                <div className="glass-card p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="text-base sm:text-lg font-medium">Jumuah Time</h3>
                        <p className="text-sm text-muted-foreground">Set the Friday prayer time</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4">
                    {/* Hours */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        data-focusable="true"
                        onClick={() => adjustJumuahHour(1)}
                        className="w-12 h-12 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        <span className="text-xl">+</span>
                      </button>
                      <span className="text-3xl font-bold text-primary w-16 text-center">
                        {settings.mosque.jumuahTime.split(':')[0]}
                      </span>
                      <button
                        data-focusable="true"
                        onClick={() => adjustJumuahHour(-1)}
                        className="w-12 h-12 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        <span className="text-xl">−</span>
                      </button>
                    </div>
                    
                    <span className="text-3xl font-bold text-muted-foreground">:</span>
                    
                    {/* Minutes */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        data-focusable="true"
                        onClick={() => adjustJumuahMinutes(5)}
                        className="w-12 h-12 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        <span className="text-xl">+</span>
                      </button>
                      <span className="text-3xl font-bold text-primary w-16 text-center">
                        {settings.mosque.jumuahTime.split(':')[1]}
                      </span>
                      <button
                        data-focusable="true"
                        onClick={() => adjustJumuahMinutes(-5)}
                        className="w-12 h-12 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        <span className="text-xl">−</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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
