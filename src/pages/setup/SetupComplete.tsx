import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { MapPin, Calculator, Home, Building2, Smartphone } from 'lucide-react';
import sekineLogo from '@/assets/sekine-logo.png';

const SetupComplete = () => {
  const navigate = useNavigate();
  const { settings, completeSetup } = useApp();

  useTVNavigation({
    preventBackNavigation: true,
  });

  const handleComplete = () => {
    completeSetup();
    navigate('/idle');
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-12">
      {/* Progress indicator */}
      <div className="absolute top-12 right-12 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Step 6 of 6</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-2xl">
        {/* Success logo */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
            <img src={sekineLogo} alt="Sekine TV" className="w-24 h-24 object-contain" />
          </div>
        </div>

        <h1 className="text-5xl font-light mb-4">Setup Complete!</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Sekine TV is ready to bring tranquility to your home
        </p>

        {/* Settings summary */}
        <div className="glass-card p-8 mb-12 w-full">
          <h2 className="text-lg font-medium mb-6 text-left">Your Settings</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              {settings.prayer.mode === 'home' ? (
                <Home className="w-8 h-8 text-primary" />
              ) : (
                <Building2 className="w-8 h-8 text-primary" />
              )}
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Mode</p>
                <p className="font-medium capitalize">{settings.prayer.mode} Mode</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{settings.location.city}, {settings.location.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calculator className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Calculation</p>
                <p className="font-medium">{settings.prayer.calculationMethod}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Smartphone className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Pairing</p>
                <p className="font-medium">{settings.device.isPaired ? 'Paired' : 'Not Paired'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complete button */}
        <button
          data-focusable="true"
          autoFocus
          onClick={handleComplete}
          className="px-16 py-5 text-xl bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all gold-glow"
        >
          Go to Dashboard
        </button>

        <p className="mt-6 text-sm text-muted-foreground">
          You can change these settings anytime
        </p>
      </div>
    </div>
  );
};

export default SetupComplete;
