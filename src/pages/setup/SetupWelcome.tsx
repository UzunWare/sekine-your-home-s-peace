import { useNavigate } from 'react-router-dom';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import sekineLogo from '@/assets/sekine-logo.png';

const SetupWelcome = () => {
  const navigate = useNavigate();

  useTVNavigation({
    preventBackNavigation: true,
  });

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
      {/* Progress indicator */}
      <div className="absolute top-6 sm:top-8 lg:top-12 right-6 sm:right-8 lg:right-12 flex items-center gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">Step 1 of 6</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${step === 1 ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-xl lg:max-w-2xl">
        {/* Logo */}
        <img src={sekineLogo} alt="Sekine TV" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain mb-4 sm:mb-6 lg:mb-8" />

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-2 sm:mb-4">
          Welcome to <span className="text-primary">Sekine TV</span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-12 leading-relaxed px-4">
          Transform your television into a beautiful Islamic prayer display. 
          Get accurate prayer times, listen to the Adhan, and enjoy Quran recitations 
          - all designed for your home or mosque.
        </p>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 w-full">
          <div className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 lg:p-6 glass-card">
            <span className="text-xl sm:text-2xl lg:text-3xl">🕌</span>
            <span className="text-xs sm:text-sm text-muted-foreground text-center">Accurate Prayer Times</span>
          </div>
          <div className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 lg:p-6 glass-card">
            <span className="text-xl sm:text-2xl lg:text-3xl">📿</span>
            <span className="text-xs sm:text-sm text-muted-foreground text-center">Beautiful Adhan</span>
          </div>
          <div className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 lg:p-6 glass-card">
            <span className="text-xl sm:text-2xl lg:text-3xl">📖</span>
            <span className="text-xs sm:text-sm text-muted-foreground text-center">Quran Recitation</span>
          </div>
        </div>

        {/* Begin button */}
        <button
          data-focusable="true"
          autoFocus
          onClick={() => navigate('/setup/mode')}
          className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all"
        >
          Begin Setup
        </button>

        <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">Press SELECT to continue</p>
      </div>
    </div>
  );
};

export default SetupWelcome;
