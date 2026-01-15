import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { quotes } from '@/data/quotes';
import {
  ClassicScreensaverLayout,
  MinimalScreensaverLayout,
  QuoteFocusScreensaverLayout,
  PrayerFocusScreensaverLayout,
  AmbientScreensaverLayout,
  ScreensaverLayoutProps,
} from '@/components/screensaver-layouts';
import { ScreensaverLayout } from '@/types/app';

// Curated Unsplash images - nature, space, seas, mosques, sacred places, creation, peace
const unsplashImages = [
  // Mosques & Sacred Places
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&q=80',
  'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1920&q=80',
  'https://images.unsplash.com/photo-1545167496-28be8f7e23d6?w=1920&q=80',
  'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1920&q=80',
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&q=80',
  
  // Space & Galaxy
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
  'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&q=80',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
  'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80',
  
  // Oceans & Seas
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80',
  'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1920&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80',
  
  // Mountains & Nature
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80',
  
  // Desert & Sunrise/Sunset
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80',
  'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920&q=80',
  'https://images.unsplash.com/photo-1500534623283-b7a1ddb4fbbd?w=1920&q=80',
  'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1920&q=80',
  'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=1920&q=80',
];

// Map layout IDs to components
const screensaverLayoutComponents: Record<ScreensaverLayout, React.ComponentType<ScreensaverLayoutProps>> = {
  'classic': ClassicScreensaverLayout,
  'minimal': MinimalScreensaverLayout,
  'quote-focus': QuoteFocusScreensaverLayout,
  'prayer-focus': PrayerFocusScreensaverLayout,
  'ambient': AmbientScreensaverLayout,
};

const Screensaver = () => {
  const navigate = useNavigate();
  const { settings } = useApp();
  const { hijriDate, nextPrayer, timeUntilNextPrayer } = usePrayerTimes();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [bgIndex, setBgIndex] = useState(() => Math.floor(Math.random() * unsplashImages.length));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const currentQuote = quotes[quoteIndex];

  // Handle any key press or click to exit
  useEffect(() => {
    const handleExit = () => navigate('/idle');
    
    window.addEventListener('keydown', handleExit);
    window.addEventListener('click', handleExit);
    window.addEventListener('touchstart', handleExit);
    
    return () => {
      window.removeEventListener('keydown', handleExit);
      window.removeEventListener('click', handleExit);
      window.removeEventListener('touchstart', handleExit);
    };
  }, [navigate]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotate quotes and background together - randomly
  const rotateContent = useCallback(() => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setQuoteIndex(prev => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === prev && quotes.length > 1);
        return newIndex;
      });
      setBgIndex(prev => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * unsplashImages.length);
        } while (newIndex === prev && unsplashImages.length > 1);
        return newIndex;
      });
      
      setTimeout(() => setIsTransitioning(false), 100);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(rotateContent, 15000);
    return () => clearInterval(interval);
  }, [rotateContent]);

  // OLED protection - subtle drift
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
      });
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    if (settings.display.clockFormat === '12h') {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // Get the selected layout component
  const LayoutComponent = screensaverLayoutComponents[settings.display.screensaverLayout] || ClassicScreensaverLayout;

  // Props for the layout component
  const layoutProps: ScreensaverLayoutProps = {
    currentTime,
    formatTime,
    formatDate,
    nextPrayer,
    timeUntilNextPrayer,
    hijriDate,
    currentQuote,
    isTransitioning,
    settings,
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden cursor-none">
      {/* Background Image with Transition */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${unsplashImages[bgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'slowZoom 30s ease-in-out infinite alternate',
        }}
      />
      
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content Container with Drift and Layout Transition */}
      <div 
        key={settings.display.screensaverLayout}
        className="relative z-10 h-full flex flex-col transition-transform duration-[8000ms] ease-in-out animate-fade-in"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <LayoutComponent {...layoutProps} />
      </div>

      {/* Bottom - Subtle Exit Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 sm:gap-3 text-white/30 text-xs sm:text-sm">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-light tracking-wider">Press any key to exit</span>
        </div>
      </div>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default Screensaver;
