import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tv, ArrowRight, CheckCircle2, Smartphone, Monitor, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/layouts/DashboardLayout';

const steps = [
  {
    icon: Tv,
    title: 'Open Sekine TV on your device',
    description: 'Launch the Sekine TV app on your Android TV or streaming device',
  },
  {
    icon: Monitor,
    title: 'Go to Settings → Pairing',
    description: 'Navigate to the Settings menu and select "Pair with Dashboard"',
  },
  {
    icon: Smartphone,
    title: 'Enter the 6-digit code',
    description: 'Type the pairing code shown on your TV screen below',
  },
];

const DashboardPair = () => {
  const [pairingCode, setPairingCode] = useState(['', '', '', '', '', '']);
  const [isPairing, setIsPairing] = useState(false);
  const [isPaired, setIsPaired] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...pairingCode];
    newCode[index] = value;
    setPairingCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pairingCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...pairingCode];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setPairingCode(newCode);
  };

  const handlePair = async () => {
    const code = pairingCode.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsPairing(true);
    
    // Simulate pairing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo, accept any code
    setIsPairing(false);
    setIsPaired(true);
  };

  const isCodeComplete = pairingCode.every(digit => digit !== '');

  if (isPaired) {
    return (
      <DashboardLayout>
        <div className="max-w-lg mx-auto py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Device Paired Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Your TV is now connected. You can manage its settings from the dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard/devices">
              <Button className="gap-2">
                <Tv className="w-4 h-4" />
                View My Devices
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => {
                setPairingCode(['', '', '', '', '', '']);
                setIsPaired(false);
              }}
            >
              Pair Another Device
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Tv className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">Pair Your TV</h1>
          <p className="text-muted-foreground mt-2">
            Connect your Sekine TV device to control it from this dashboard
          </p>
        </div>

        {/* Steps */}
        <div className="glass-card p-6">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground mt-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pairing Code Input */}
        <div className="glass-card p-8">
          <h2 className="text-lg font-medium text-foreground text-center mb-6">
            Enter Pairing Code
          </h2>
          
          <div className="flex justify-center gap-3 mb-6">
            {pairingCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold rounded-xl border-2 bg-muted/50 transition-all outline-none
                  ${digit ? 'border-primary bg-primary/5' : 'border-border'}
                  ${error ? 'border-destructive' : ''}
                  focus:border-primary focus:bg-primary/5`}
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-destructive text-center mb-4">{error}</p>
          )}

          <Button 
            className="w-full gap-2" 
            size="lg"
            disabled={!isCodeComplete || isPairing}
            onClick={handlePair}
          >
            {isPairing ? (
              <>
                <Wifi className="w-5 h-5 animate-pulse" />
                Connecting...
              </>
            ) : (
              <>
                Pair Device
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Can't find the code? Make sure your TV is on the pairing screen
          </p>
        </div>

        {/* Help Section */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Having trouble? Check our{' '}
            <a href="#" className="text-primary hover:underline">setup guide</a>
            {' '}or{' '}
            <a href="#" className="text-primary hover:underline">contact support</a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPair;
