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
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12">
      {/* Progress indicator */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-10 md:right-10 lg:top-12 lg:right-12 flex items-center gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">Step 6 of 6</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-2xl">
        {/* Success logo */}
        <div className="relative mb-4 sm:mb-6 lg:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-primary/10 rounded-full flex items-center justify-center">
            <img src={sekineLogo} alt="Sekine TV" className="w-14 h-14 sm:w-18 sm:h-18 lg:w-24 lg:h-24 object-contain" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-2 sm:mb-3 lg:mb-4">Setup Complete!</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-12">
          Sekine TV is ready to bring tranquility to your home
        </p>

        {/* Settings summary */}
        <div className="glass-card p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12 w-full">
          <h2 className="text-sm sm:text-base lg:text-lg font-medium mb-3 sm:mb-4 lg:mb-6 text-left">Your Settings</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              {settings.prayer.mode === 'home' ? (
                <Home className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
              ) : (
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
              )}
              <div className="text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">Mode</p>
                <p className="text-sm sm:text-base font-medium capitalize">{settings.prayer.mode} Mode</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
              <div className="text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                <p className="text-sm sm:text-base font-medium">{settings.location.city}, {settings.location.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
              <div className="text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">Calculation</p>
                <p className="text-sm sm:text-base font-medium">{settings.prayer.calculationMethod}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
              <div className="text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">Pairing</p>
                <p className="text-sm sm:text-base font-medium">{settings.device.isPaired ? 'Paired' : 'Not Paired'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complete button */}
        <button
          data-focusable="true"
          autoFocus
          onClick={handleComplete}
          className="px-10 py-3 sm:px-12 sm:py-4 lg:px-16 lg:py-5 text-base sm:text-lg lg:text-xl bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all gold-glow"
        >
          Go to Dashboard
        </button>

        <p className="mt-4 sm:mt-5 lg:mt-6 text-xs sm:text-sm text-muted-foreground">
          You can change these settings anytime
        </p>
      </div>
    </div>
  );
};

export default SetupComplete;
