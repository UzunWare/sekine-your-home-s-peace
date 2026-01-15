import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { Smartphone, RefreshCw, CheckCircle } from 'lucide-react';

const generateCode = () => {
  return Math.random().toString().slice(2, 8);
};

const Pairing = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();
  const [code, setCode] = useState(generateCode());
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [status, setStatus] = useState<'waiting' | 'paired' | 'expired'>(
    settings.device.isPaired ? 'paired' : 'waiting'
  );

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

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

  const handleUnpair = () => {
    updateSettings('device', { isPaired: false, pairingCode: null });
    setStatus('waiting');
    regenerateCode();
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12">
      <div className="flex flex-col items-center text-center max-w-2xl">
        {status === 'paired' ? (
          <>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-3 lg:mb-4">Device Paired</h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8">
              Your device is connected to your account
            </p>
            <div className="glass-card p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
              <p className="text-sm sm:text-base text-muted-foreground">Device Name</p>
              <p className="text-lg sm:text-xl">{settings.device.deviceName}</p>
            </div>
            <button
              data-focusable="true"
              onClick={handleUnpair}
              className="px-6 py-3 sm:px-7 sm:py-3.5 lg:px-8 lg:py-4 text-sm sm:text-base text-destructive border border-destructive/50 rounded-full hover:bg-destructive/10 focus:ring-2 focus:ring-destructive transition-all"
            >
              Unpair Device
            </button>
          </>
        ) : (
          <>
            <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-primary mb-4 sm:mb-5 lg:mb-6" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-3 lg:mb-4">Pair Your Device</h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8">
              Connect to your web dashboard to manage settings remotely
            </p>

            {status === 'waiting' && (
              <>
                <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {code.split('').map((digit, i) => (
                    <div
                      key={i}
                      className="w-10 h-12 sm:w-12 sm:h-16 lg:w-16 lg:h-20 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-mono bg-card border-2 border-primary/30 rounded-lg sm:rounded-xl"
                    >
                      {digit}
                    </div>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 lg:mb-8">
                  Code expires in <span className="text-primary font-mono">{formatTime(timeRemaining)}</span>
                </p>
              </>
            )}

            {status === 'expired' && (
              <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                <p className="text-destructive text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">Code expired</p>
              </div>
            )}

            <div className="glass-card p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6 lg:mb-8 text-left">
              <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">How to pair:</h3>
              <ol className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>1. Visit <span className="text-primary">sekine.tv/pair</span></li>
                <li>2. Sign in to your account</li>
                <li>3. Enter the code above</li>
              </ol>
            </div>

            <button
              data-focusable="true"
              onClick={regenerateCode}
              className="flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 lg:px-8 lg:py-4 text-sm sm:text-base bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              Regenerate Code
            </button>
          </>
        )}

        <button
          data-focusable="true"
          onClick={() => navigate('/settings')}
          className="mt-6 sm:mt-7 lg:mt-8 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Settings
        </button>
      </div>
    </div>
  );
};

export default Pairing;
