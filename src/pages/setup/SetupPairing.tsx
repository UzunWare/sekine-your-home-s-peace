import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { Smartphone, RefreshCw } from 'lucide-react';

const generateCode = () => {
  return Math.random().toString().slice(2, 8);
};

const SetupPairing = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(generateCode());
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [status, setStatus] = useState<'waiting' | 'paired' | 'expired'>('waiting');

  useTVNavigation({
    onBack: () => navigate('/setup/calculation'),
  });

  // Countdown timer
  useEffect(() => {
    if (status !== 'waiting') return;
    
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const regenerateCode = () => {
    setCode(generateCode());
    setTimeRemaining(600);
    setStatus('waiting');
  };

  const handleSkip = () => {
    navigate('/setup/complete');
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
      {/* Progress indicator */}
      <div className="absolute top-6 sm:top-8 lg:top-12 right-6 sm:right-8 lg:right-12 flex items-center gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">Step 6 of 7</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${step <= 6 ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-lg lg:max-w-2xl">
        <Smartphone className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary mb-4 sm:mb-6" />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-4">Connect Your Account</h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8 px-4">
          Pair with your account to control settings from your phone or computer
        </p>

        {/* Code display */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          {status === 'waiting' && (
            <>
              <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
                {code.split('').map((digit, i) => (
                  <div
                    key={i}
                    className="w-10 h-14 sm:w-12 sm:h-16 lg:w-16 lg:h-20 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-mono bg-card border-2 border-primary/30 rounded-lg sm:rounded-xl"
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Code expires in <span className="text-primary font-mono">{formatTime(timeRemaining)}</span>
              </p>
            </>
          )}

          {status === 'expired' && (
            <div className="text-center">
              <p className="text-destructive text-lg sm:text-xl mb-3 sm:mb-4">Code expired</p>
              <button
                data-focusable="true"
                onClick={regenerateCode}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary"
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                Generate New Code
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="glass-card p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8 text-left w-full">
          <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">How to pair:</h3>
          <ol className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li>1. Go to <span className="text-primary">sekine.tv/pair</span></li>
            <li>2. Sign in or create an account</li>
            <li>3. Enter the 6-digit code shown above</li>
          </ol>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            data-focusable="true"
            onClick={handleSkip}
            className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border border-border rounded-full hover:bg-card focus:ring-2 focus:ring-primary transition-all"
          >
            Skip for Now
          </button>
          <button
            data-focusable="true"
            onClick={() => navigate('/setup/complete')}
            className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all"
          >
            I've Entered the Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPairing;
