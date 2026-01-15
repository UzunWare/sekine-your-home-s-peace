import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';

const calculationMethods = [
  { id: 'isna', name: 'ISNA', description: 'Islamic Society of North America' },
  { id: 'mwl', name: 'Muslim World League', description: 'Used in Europe, Far East, parts of America' },
  { id: 'egypt', name: 'Egyptian General Authority', description: 'Used in Africa, Syria, Lebanon' },
  { id: 'makkah', name: 'Umm Al-Qura (Makkah)', description: 'Used in Saudi Arabia' },
  { id: 'karachi', name: 'University of Karachi', description: 'Used in Pakistan, Bangladesh, India' },
  { id: 'tehran', name: 'Institute of Geophysics, Tehran', description: 'Used in Iran' },
  { id: 'jafari', name: 'Shia Ithna Ashari (Jafari)', description: 'Shia method' },
  { id: 'kuwait', name: 'Kuwait', description: 'Used in Kuwait' },
  { id: 'qatar', name: 'Qatar', description: 'Used in Qatar' },
  { id: 'singapore', name: 'Singapore', description: 'Used in Singapore' },
];

export default function CalculationSettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  const handleMethodSelect = (methodId: string) => {
    updateSettings('prayer', { calculationMethod: methodId as any });
    navigate('/settings');
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
            <Calculator className="w-6 h-6 text-teal" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Calculation Method</h1>
          </div>
        </div>
      </header>

      {/* Info */}
      <div className="max-w-4xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-4 pb-2">
        <p className="text-sm sm:text-base text-muted-foreground">
          Different calculation methods use varying angles for Fajr and Isha. Choose the one commonly used in your region.
        </p>
      </div>

      {/* Method List */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-4 pb-6 space-y-3">
          {calculationMethods.map((method, index) => {
            const isSelected = settings.prayer.calculationMethod === method.id;
            return (
              <button
                key={method.id}
                data-focusable="true"
                autoFocus={index === 0}
                onClick={() => handleMethodSelect(method.id)}
                className={`w-full p-4 sm:p-5 lg:p-6 rounded-xl flex items-center gap-4 transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                  isSelected
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'glass-card hover:bg-card/80'
                }`}
              >
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium">{method.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{method.description}</p>
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
