import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { WifiOff } from 'lucide-react';
import { getQuoteOfTheDay } from '@/data/dailyQuotes';
import MiniPlayer from '@/components/MiniPlayer';
import PrayerSelectionDialog from '@/components/PrayerSelectionDialog';
import mosqueBg from '@/assets/mosque-background-1.jpg';
import {
  ClassicLayout,
  SplitLayout,
  MinimalLayout,
  PrayerFocusLayout,
  DashboardLayout,
} from '@/components/idle-layouts';
import type { IdleLayout } from '@/types/app';

const getTimeoutMs = (timeout: string): number | null => {
  switch (timeout) {
    case '20s': return 20 * 1000;
    case '1m': return 60 * 1000;
    case '5m': return 5 * 60 * 1000;
    case '10m': return 10 * 60 * 1000;
    case 'disabled': return null;
    default: return 5 * 60 * 1000;
  }
};

const layoutComponents: Record<IdleLayout, React.ComponentType<any>> = {
  'classic': ClassicLayout,
  'split': SplitLayout,
  'minimal': MinimalLayout,
  'prayer-focus': PrayerFocusLayout,
  'dashboard': DashboardLayout,
};

const Idle = () => {
  const navigate = useNavigate();
  const { settings, appState, playerState } = useApp();
  const { prayers, hijriDate, nextPrayer, timeUntilNextPrayer } = usePrayerTimes();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quoteOfTheDay] = useState(() => getQuoteOfTheDay());
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isInvocationsDialogOpen, setIsInvocationsDialogOpen] = useState(false);

  // Check if mini player is showing
  const isMiniPlayerVisible = playerState.isMinimized && playerState.currentTrack;

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  // Reset activity on any user interaction
  const resetActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Listen for any user activity
  useEffect(() => {
    const events = ['keydown', 'mousemove', 'mousedown', 'touchstart', 'click'];
    events.forEach(event => window.addEventListener(event, resetActivity));
    return () => {
      events.forEach(event => window.removeEventListener(event, resetActivity));
    };
  }, [resetActivity]);

  // Screensaver timeout
  useEffect(() => {
    const timeoutMs = getTimeoutMs(settings.display.screensaverTimeout);
    if (!timeoutMs) return;

    const checkTimeout = setInterval(() => {
      const elapsed = Date.now() - lastActivity;
      if (elapsed >= timeoutMs) {
        navigate('/screensaver');
      }
    }, 1000);

    return () => clearInterval(checkTimeout);
  }, [lastActivity, settings.display.screensaverTimeout, navigate]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    if (settings.display.clockFormat === '12h') {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleOpenInvocationsDialog = useCallback(() => {
    setIsInvocationsDialogOpen(true);
  }, []);

  const handleSelectPrayer = useCallback((prayerId: string) => {
    setIsInvocationsDialogOpen(false);
    navigate(`/invocations?prayer=${prayerId}`);
  }, [navigate]);

  // Get the selected layout component
  const LayoutComponent = layoutComponents[settings.display.idleLayout] || ClassicLayout;

  // Props for layout components
  const layoutProps = {
    currentTime,
    formatTime,
    formatDate,
    prayers,
    nextPrayer,
    timeUntilNextPrayer,
    hijriDate,
    quoteOfTheDay,
    settings,
    isOnline: appState.isOnline,
    isMiniPlayerVisible: !!isMiniPlayerVisible,
    onNavigate: handleNavigate,
    onOpenInvocationsDialog: handleOpenInvocationsDialog,
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mosqueBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      
      {/* Offline indicator */}
      {!appState.isOnline && (
        <div className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-destructive/20 rounded-full">
          <WifiOff className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive">Offline</span>
        </div>
      )}

      {/* Selected Layout with transition animation */}
      <div 
        key={settings.display.idleLayout} 
        className="animate-fade-in"
      >
        <LayoutComponent {...layoutProps} />
      </div>

      {/* Mini Player */}
      <MiniPlayer />

      {/* Footer brand - hide when mini player is visible */}
      {!isMiniPlayerVisible && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <p className="text-xs text-muted-foreground/50">Sekine TV • Tranquility for your home</p>
        </div>
      )}

      {/* Prayer Selection Dialog for Invocations */}
      <PrayerSelectionDialog
        open={isInvocationsDialogOpen}
        onOpenChange={setIsInvocationsDialogOpen}
        title="Invocations After Prayer"
        description="Select which prayer's invocations you'd like to recite"
        onSelectPrayer={handleSelectPrayer}
      />
    </div>
  );
};

export default Idle;
