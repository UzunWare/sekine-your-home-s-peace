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
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-12">
      {/* Progress indicator */}
      <div className="absolute top-12 right-12 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Step 5 of 6</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${step <= 5 ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-2xl">
        <Smartphone className="w-16 h-16 text-primary mb-6" />
        <h1 className="text-4xl font-light mb-4">Connect Your Account</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Pair with your account to control settings from your phone or computer
        </p>

        {/* Code display */}
        <div className="mb-8">
          {status === 'waiting' && (
            <>
              <div className="flex gap-3 mb-4">
                {code.split('').map((digit, i) => (
                  <div
                    key={i}
                    className="w-16 h-20 flex items-center justify-center text-4xl font-mono bg-card border-2 border-primary/30 rounded-xl"
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground">
                Code expires in <span className="text-primary font-mono">{formatTime(timeRemaining)}</span>
              </p>
            </>
          )}

          {status === 'expired' && (
            <div className="text-center">
              <p className="text-destructive text-xl mb-4">Code expired</p>
              <button
                data-focusable="true"
                onClick={regenerateCode}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary"
              >
                <RefreshCw className="w-5 h-5" />
                Generate New Code
              </button>
            </div>
          )}

          {status === 'paired' && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✓</span>
              </div>
              <p className="text-green-500 text-xl">Successfully Paired!</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="glass-card p-6 mb-8 text-left">
          <h3 className="font-medium mb-3">How to pair:</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Go to <span className="text-primary">sekine.tv/pair</span> on your phone or computer</li>
            <li>2. Sign in or create an account</li>
            <li>3. Enter the 6-digit code shown above</li>
            <li>4. Your device will be linked automatically</li>
          </ol>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            data-focusable="true"
            onClick={handleSkip}
            className="px-8 py-4 text-lg border border-border rounded-full hover:bg-card focus:ring-2 focus:ring-primary transition-all"
          >
            Skip for Now
          </button>
          <button
            data-focusable="true"
            onClick={() => navigate('/setup/complete')}
            className="px-8 py-4 text-lg bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all"
          >
            I've Entered the Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPairing;
