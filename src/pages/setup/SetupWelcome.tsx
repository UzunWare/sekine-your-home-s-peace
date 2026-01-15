import { useNavigate } from 'react-router-dom';
import { useTVNavigation } from '@/hooks/useTVNavigation';

const SetupWelcome = () => {
  const navigate = useNavigate();

  useTVNavigation({
    preventBackNavigation: true,
  });

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-12">
      {/* Progress indicator */}
      <div className="absolute top-12 right-12 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Step 1 of 6</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-2xl">
        {/* Logo */}
        <span className="text-8xl text-primary mb-8">☪</span>

        <h1 className="text-5xl font-light tracking-wide mb-4">
          Welcome to <span className="text-primary">Sekine TV</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Transform your television into a beautiful Islamic prayer display. 
          Get accurate prayer times, listen to the Adhan, and enjoy Quran recitations 
          - all designed for your home or mosque.
        </p>

        {/* Features */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center gap-3 p-6 glass-card">
            <span className="text-3xl">🕌</span>
            <span className="text-sm text-muted-foreground">Accurate Prayer Times</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 glass-card">
            <span className="text-3xl">📿</span>
            <span className="text-sm text-muted-foreground">Beautiful Adhan</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 glass-card">
            <span className="text-3xl">📖</span>
            <span className="text-sm text-muted-foreground">Quran Recitation</span>
          </div>
        </div>

        {/* Begin button */}
        <button
          data-focusable="true"
          autoFocus
          onClick={() => navigate('/setup/mode')}
          className="px-12 py-5 text-xl bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all"
        >
          Begin Setup
        </button>

        <p className="mt-6 text-sm text-muted-foreground">Press SELECT to continue</p>
      </div>
    </div>
  );
};

export default SetupWelcome;
