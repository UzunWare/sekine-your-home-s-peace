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
    <div className="fixed inset-0 bg-background flex flex-col p-12 overflow-auto">
      {/* Progress indicator */}
      <div className="absolute top-12 right-12 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Step 4 of 6</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${step <= 4 ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center pt-16 max-w-4xl mx-auto w-full">
        <Calculator className="w-12 h-12 text-primary mb-4" />
        <h1 className="text-4xl font-light mb-4">Prayer Calculation</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Choose the calculation method used in your region
        </p>

        {/* Calculation Methods */}
        <div className="w-full mb-8">
          <h2 className="text-xl mb-4">Calculation Method</h2>
          <div className="grid grid-cols-2 gap-3">
            {calculationMethods.map((m) => (
              <button
                key={m.id}
                data-focusable="true"
                onClick={() => setMethod(m.id as CalculationMethod)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  method === m.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                } focus:ring-2 focus:ring-primary`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.description}</p>
                  </div>
                  {method === m.id && (
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Asr Calculation */}
        <div className="w-full mb-8">
          <h2 className="text-xl mb-4">Asr Calculation</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              data-focusable="true"
              onClick={() => setAsrMethod('standard')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                asrMethod === 'standard'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              } focus:ring-2 focus:ring-primary`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Standard</h3>
                  <p className="text-sm text-muted-foreground">Shafi, Maliki, Hanbali</p>
                </div>
                {asrMethod === 'standard' && <Check className="w-5 h-5 text-primary" />}
              </div>
            </button>
            <button
              data-focusable="true"
              onClick={() => setAsrMethod('hanafi')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                asrMethod === 'hanafi'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              } focus:ring-2 focus:ring-primary`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Hanafi</h3>
                  <p className="text-sm text-muted-foreground">Later Asr time</p>
                </div>
                {asrMethod === 'hanafi' && <Check className="w-5 h-5 text-primary" />}
              </div>
            </button>
          </div>
        </div>

        {/* Continue button */}
        <button
          data-focusable="true"
          onClick={handleContinue}
          className="px-12 py-4 text-lg bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SetupCalculation;
