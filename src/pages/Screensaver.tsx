import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { quotes } from '@/data/quotes';

// Curated Unsplash images - nature, space, seas, mosques, sacred places, creation, peace
const unsplashImages = [
  // Mosques & Sacred Places
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&q=80', // Blue Mosque
  'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1920&q=80', // Mosque at sunset
  'https://images.unsplash.com/photo-1545167496-28be8f7e23d6?w=1920&q=80', // Mosque interior
  'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1920&q=80', // Grand Mosque
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&q=80', // Mosque silhouette
  
  // Space & Galaxy
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80', // Nebula
  'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&q=80', // Stars
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80', // Milky Way
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', // Earth from space
  'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80', // Galaxy
  
  // Oceans & Seas
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80', // Ocean waves
  'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1920&q=80', // Calm sea
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80', // Beach sunset
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80', // Underwater
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80', // Ocean horizon
  
  // Mountains & Nature
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Mountains
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80', // Mountain peak
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80', // Foggy forest
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&q=80', // Waterfall
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80', // Green hills
  
  // Desert & Sunrise/Sunset
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80', // Desert dunes
  'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920&q=80', // Desert sunset
  'https://images.unsplash.com/photo-1500534623283-b7a1ddb4fbbd?w=1920&q=80', // Golden hour
  'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1920&q=80', // Sunrise
  'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=1920&q=80', // Sunset clouds
];

const Screensaver = () => {
  const navigate = useNavigate();
  const { settings } = useApp();
  const { hijriDate, nextPrayer, timeUntilNextPrayer } = usePrayerTimes();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(Math.floor(Math.random() * unsplashImages.length));
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

  // Rotate quotes and background together
  const rotateContent = useCallback(() => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      // Change quote
      setQuoteIndex(prev => (prev + 1) % quotes.length);
      // Change background to a random different image
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
    const interval = setInterval(rotateContent, 15000); // Change every 15 seconds
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

      {/* Content Container with Drift */}
      <div 
        className="relative z-10 h-full flex flex-col transition-transform duration-[8000ms] ease-in-out"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {/* Top Section - Clock, Date, Hijri */}
        <div className="absolute top-8 left-10">
          <h1 className="text-7xl font-extralight leading-none tabular-nums text-white/95 tracking-tight">
            {formatTime(currentTime)}
          </h1>
          <p className="text-xl text-white/60 mt-2">{formatDate(currentTime)}</p>
          {settings.display.showHijriDate && hijriDate && (
            <p className="text-lg text-primary/90 mt-1 font-arabic">
              {hijriDate.day} {hijriDate.month} {hijriDate.year} هـ
            </p>
          )}
        </div>

        {/* Top Right - Next Prayer Info */}
        {nextPrayer && timeUntilNextPrayer && (
          <div className="absolute top-8 right-10 text-right">
            <p className="text-sm text-white/50 uppercase tracking-widest mb-1">Next Prayer</p>
            <p className="text-3xl font-light text-white/90">{nextPrayer.name}</p>
            <p className="text-xl text-primary mt-1">{nextPrayer.time}</p>
            <p className="text-lg text-white/60 mt-1">in {timeUntilNextPrayer.formatted}</p>
          </div>
        )}

        {/* Center - Quote */}
        <div className="flex-1 flex items-center justify-center px-16">
          <div 
            className={`max-w-4xl text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            {currentQuote.arabic && (
              <p className="text-4xl md:text-5xl font-arabic text-primary leading-relaxed mb-8 drop-shadow-lg">
                {currentQuote.arabic}
              </p>
            )}
            <p className="text-2xl md:text-3xl text-white/90 font-light italic leading-relaxed drop-shadow-md">
              "{currentQuote.text}"
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
              <p className="text-lg text-white/50 tracking-wide">
                {currentQuote.source}
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>
        </div>

        {/* Bottom - Quote Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {quotes.slice(0, Math.min(quotes.length, 10)).map((_, i) => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === quoteIndex % Math.min(quotes.length, 10)
                  ? 'bg-primary w-6'
                  : 'bg-white/30'
              }`}
            />
          ))}
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
