import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { Home, Building2, Check } from 'lucide-react';

const SetupMode = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();
  const [selectedMode, setSelectedMode] = useState<'home' | 'mosque'>(settings.prayer.mode);

  useTVNavigation({
    onBack: () => navigate('/setup'),
  });

  const handleContinue = () => {
    updateSettings('prayer', { mode: selectedMode });
    navigate('/setup/location');
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 overflow-auto">
      {/* Progress indicator */}
      <div className="absolute top-6 sm:top-8 lg:top-12 right-6 sm:right-8 lg:right-12 flex items-center gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">Step 2 of 6</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${step <= 2 ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-3xl lg:max-w-4xl pt-12 sm:pt-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-4">Choose Your Mode</h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 lg:mb-12">
          Select how you'll be using Sekine TV
        </p>

        {/* Mode options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12 w-full">
          {/* Home Mode */}
          <button
            data-focusable="true"
            autoFocus={selectedMode === 'home'}
            onClick={() => setSelectedMode('home')}
            className={`relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${
              selectedMode === 'home'
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card hover:border-primary/50'
            } focus:ring-2 focus:ring-primary`}
          >
            {selectedMode === 'home' && (
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
            )}
            <Home className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary mb-2 sm:mb-4" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium mb-1 sm:mb-2">Home Mode</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-6">Perfect for personal and family use</p>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Automatic Adhan at prayer times
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Beautiful ambient display
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Quran recitation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Simple and peaceful
              </li>
            </ul>
          </button>

          {/* Mosque Mode */}
          <button
            data-focusable="true"
            autoFocus={selectedMode === 'mosque'}
            onClick={() => setSelectedMode('mosque')}
            className={`relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${
              selectedMode === 'mosque'
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card hover:border-primary/50'
            } focus:ring-2 focus:ring-primary`}
          >
            {selectedMode === 'mosque' && (
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
            )}
            <Building2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary mb-2 sm:mb-4" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium mb-1 sm:mb-2">Mosque Mode</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-6">Designed for prayer halls and musallas</p>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Adhan followed by Iqamah countdown
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Jumu'ah (Friday) prayer support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Congregation-focused display
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Configurable Iqamah delays
              </li>
            </ul>
          </button>
        </div>

        {/* Continue button */}
        <button
          data-focusable="true"
          onClick={handleContinue}
          className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 text-base sm:text-lg bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SetupMode;
