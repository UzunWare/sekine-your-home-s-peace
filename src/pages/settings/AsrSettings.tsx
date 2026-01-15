import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Sun } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { AsrJuristic } from '@/types/app';

const asrMethods: { id: AsrJuristic; name: string; description: string }[] = [
  {
    id: 'standard',
    name: 'Standard (Shafi, Maliki, Hanbali)',
    description: 'Shadow equals the length of an object plus its noon shadow',
  },
  {
    id: 'hanafi',
    name: 'Hanafi',
    description: 'Shadow equals twice the length of an object plus its noon shadow',
  },
];

export default function AsrSettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  const handleMethodSelect = (method: AsrJuristic) => {
    updateSettings('prayer', { asrJuristic: method });
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
            <Sun className="w-6 h-6 text-gold" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Asr Calculation</h1>
          </div>
        </div>
      </header>

      {/* Method List */}
      <main className="flex-1 overflow-auto py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Select the juristic method for calculating Asr prayer time. This affects when Asr begins based on shadow length.
          </p>

          {asrMethods.map((method, index) => {
            const isSelected = settings.prayer.asrJuristic === method.id;
            return (
              <button
                key={method.id}
                data-focusable="true"
                autoFocus={index === 0}
                onClick={() => handleMethodSelect(method.id)}
                className={`w-full p-5 sm:p-6 rounded-xl flex items-center justify-between transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                  isSelected
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'glass-card hover:bg-card/80'
                }`}
              >
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium">{method.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">{method.description}</p>
                </div>
                {isSelected && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 ml-4">
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
