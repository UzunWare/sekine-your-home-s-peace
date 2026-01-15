import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Minus, Plus, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';

const delayOptions = [5, 10, 15, 20, 25, 30, 45, 60];

const prayers = [
  { id: 'fajr', name: 'Fajr', description: 'Pre-dawn prayer', recommended: '15-20 min' },
  { id: 'dhuhr', name: 'Dhuhr', description: 'Midday prayer', recommended: '10-15 min' },
  { id: 'asr', name: 'Asr', description: 'Afternoon prayer', recommended: '10-15 min' },
  { id: 'maghrib', name: 'Maghrib', description: 'Sunset prayer', recommended: '5-10 min' },
  { id: 'isha', name: 'Isha', description: 'Night prayer', recommended: '15-20 min' },
] as const;

export default function IqamahSettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  const adjustDelay = (prayerId: keyof typeof settings.mosque.iqamahDelays, delta: number) => {
    const currentValue = settings.mosque.iqamahDelays[prayerId];
    const currentIndex = delayOptions.indexOf(currentValue);
    const newIndex = Math.max(0, Math.min(delayOptions.length - 1, currentIndex + delta));
    
    updateSettings('mosque', {
      iqamahDelays: {
        ...settings.mosque.iqamahDelays,
        [prayerId]: delayOptions[newIndex],
      },
    });
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
            <Clock className="w-6 h-6 text-primary" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Iqamah Delays</h1>
          </div>
        </div>
      </header>

      {/* Info */}
      <div className="max-w-4xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-4 pb-2">
        <p className="text-sm sm:text-base text-muted-foreground">
          Time between Adhan and Iqamah. Use ←/→ or +/− buttons to adjust.
        </p>
      </div>

      {/* Prayer Delays */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-4 pb-6 space-y-3">
          {prayers.map((prayer, index) => {
            const currentValue = settings.mosque.iqamahDelays[prayer.id];
            return (
              <div
                key={prayer.id}
                className="glass-card p-4 sm:p-5 lg:p-6 flex items-center gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium">{prayer.name}</h3>
                  <p className="text-sm text-muted-foreground">{prayer.description}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Recommended: {prayer.recommended}</p>
                </div>
                
                {/* Stepper Control */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    data-focusable="true"
                    autoFocus={index === 0}
                    onClick={() => adjustDelay(prayer.id, -1)}
                    disabled={currentValue === delayOptions[0]}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-all focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  
                  <div className="w-20 sm:w-24 text-center">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{currentValue}</span>
                    <span className="text-sm sm:text-base text-muted-foreground ml-1">min</span>
                  </div>
                  
                  <button
                    data-focusable="true"
                    onClick={() => adjustDelay(prayer.id, 1)}
                    disabled={currentValue === delayOptions[delayOptions.length - 1]}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-all focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use ↑↓ to navigate • ←→ or SELECT to adjust • BACK to return
          </p>
        </div>
      </footer>
    </div>
  );
}
