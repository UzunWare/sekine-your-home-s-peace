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
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-12">
      <div className="flex flex-col items-center text-center max-w-2xl">
        {status === 'paired' ? (
          <>
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl font-light mb-4">Device Paired</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your device is connected to your account
            </p>
            <div className="glass-card p-6 mb-8">
              <p className="text-muted-foreground">Device Name</p>
              <p className="text-xl">{settings.device.deviceName}</p>
            </div>
            <button
              data-focusable="true"
              onClick={handleUnpair}
              className="px-8 py-4 text-destructive border border-destructive/50 rounded-full hover:bg-destructive/10 focus:ring-2 focus:ring-destructive transition-all"
            >
              Unpair Device
            </button>
          </>
        ) : (
          <>
            <Smartphone className="w-16 h-16 text-primary mb-6" />
            <h1 className="text-4xl font-light mb-4">Pair Your Device</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Connect to your web dashboard to manage settings remotely
            </p>

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
                <p className="text-muted-foreground mb-8">
                  Code expires in <span className="text-primary font-mono">{formatTime(timeRemaining)}</span>
                </p>
              </>
            )}

            {status === 'expired' && (
              <div className="text-center mb-8">
                <p className="text-destructive text-xl mb-4">Code expired</p>
              </div>
            )}

            <div className="glass-card p-6 mb-8 text-left">
              <h3 className="font-medium mb-3">How to pair:</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Visit <span className="text-primary">sekine.tv/pair</span></li>
                <li>2. Sign in to your account</li>
                <li>3. Enter the code above</li>
              </ol>
            </div>

            <button
              data-focusable="true"
              onClick={regenerateCode}
              className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Regenerate Code
            </button>
          </>
        )}

        <button
          data-focusable="true"
          onClick={() => navigate('/settings')}
          className="mt-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Settings
        </button>
      </div>
    </div>
  );
};

export default Pairing;
