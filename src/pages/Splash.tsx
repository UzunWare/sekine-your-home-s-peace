import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import sekineLogo from '@/assets/sekine-logo.png';

const Splash = () => {
  const navigate = useNavigate();
  const { appState } = useApp();
  const [countdown, setCountdown] = useState(3);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      navigate(appState.isSetupComplete ? '/idle' : '/setup');
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate, appState.isSetupComplete]);

  const handleSkip = () => {
    navigate(appState.isSetupComplete ? '/idle' : '/setup');
  };

  return (
    <div 
      className="fixed inset-0 bg-background flex flex-col items-center justify-center overflow-hidden"
      onClick={handleSkip}
      onKeyDown={(e) => e.key === 'Enter' && handleSkip()}
      tabIndex={0}
      data-focusable="true"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      {/* Logo */}
      <div className={`transition-all duration-1000 ${showText ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <img src={sekineLogo} alt="Sekine TV" className="w-40 h-40 object-contain" />
      </div>

      {/* App name */}
      <h1 className={`mt-8 text-6xl font-light tracking-[0.5em] transition-all duration-1000 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="text-foreground">SEKINE</span>
        <span className="text-primary ml-4">TV</span>
      </h1>

      {/* Tagline */}
      <p className={`mt-6 text-xl tracking-[0.3em] text-muted-foreground transition-all duration-1000 delay-500 ${showText ? 'opacity-100' : 'opacity-0'}`}>
        TRANQUILITY FOR YOUR HOME
      </p>

      {/* Countdown */}
      <div className={`mt-16 flex flex-col items-center gap-4 transition-all duration-500 delay-700 ${showText ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center">
          <span className="text-2xl text-primary tabular-nums">{countdown}</span>
        </div>
        <p className="text-sm text-muted-foreground">Press SELECT to skip</p>
      </div>
    </div>
  );
};

export default Splash;
