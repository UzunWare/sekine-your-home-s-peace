import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { calculationMethods } from '@/data/reciters';
import { CalculationMethod, AsrJuristic } from '@/types/app';
import { Calculator, Check } from 'lucide-react';

const SetupCalculation = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();
  const [method, setMethod] = useState<CalculationMethod>(settings.prayer.calculationMethod);
  const [asrMethod, setAsrMethod] = useState<AsrJuristic>(settings.prayer.asrJuristic);

  useTVNavigation({
    onBack: () => navigate('/setup/location'),
  });

  const handleContinue = () => {
    updateSettings('prayer', { calculationMethod: method, asrJuristic: asrMethod });
    navigate('/setup/pairing');
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 overflow-auto">
      {/* Progress indicator */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-10 md:right-10 lg:top-12 lg:right-12 flex items-center gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">Step 4 of 6</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${step <= 4 ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center pt-8 sm:pt-12 md:pt-14 lg:pt-16 max-w-4xl mx-auto w-full">
        <Calculator className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary mb-3 sm:mb-4" />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-4">Prayer Calculation</h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8 text-center">
          Choose the calculation method used in your region
        </p>

        {/* Calculation Methods */}
        <div className="w-full mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 lg:mb-4">Calculation Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {calculationMethods.map((m) => (
              <button
                key={m.id}
                data-focusable="true"
                onClick={() => setMethod(m.id as CalculationMethod)}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                  method === m.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                } focus:ring-2 focus:ring-primary`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-medium">{m.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{m.description}</p>
                  </div>
                  {method === m.id && (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Asr Calculation */}
        <div className="w-full mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 lg:mb-4">Asr Calculation</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <button
              data-focusable="true"
              onClick={() => setAsrMethod('standard')}
              className={`p-4 sm:p-5 lg:p-6 rounded-xl border-2 transition-all text-left ${
                asrMethod === 'standard'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              } focus:ring-2 focus:ring-primary`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium">Standard</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Shafi, Maliki, Hanbali</p>
                </div>
                {asrMethod === 'standard' && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
              </div>
            </button>
            <button
              data-focusable="true"
              onClick={() => setAsrMethod('hanafi')}
              className={`p-4 sm:p-5 lg:p-6 rounded-xl border-2 transition-all text-left ${
                asrMethod === 'hanafi'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              } focus:ring-2 focus:ring-primary`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium">Hanafi</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Later Asr time</p>
                </div>
                {asrMethod === 'hanafi' && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
              </div>
            </button>
          </div>
        </div>

        {/* Continue button */}
        <button
          data-focusable="true"
          onClick={handleContinue}
          className="px-8 py-3 sm:px-10 sm:py-3.5 lg:px-12 lg:py-4 text-sm sm:text-base lg:text-lg bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SetupCalculation;
