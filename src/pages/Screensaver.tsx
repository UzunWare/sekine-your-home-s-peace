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
      // Change quote to a random different quote
      setQuoteIndex(prev => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === prev && quotes.length > 1);
        return newIndex;
      });
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
        <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-none tabular-nums text-white/95 tracking-tight">
            {formatTime(currentTime)}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/60 mt-1 sm:mt-2">{formatDate(currentTime)}</p>
          {settings.display.showHijriDate && hijriDate && (
            <p className="text-sm sm:text-base lg:text-lg text-primary/90 mt-1 font-arabic">
              {hijriDate.day} {hijriDate.month} {hijriDate.year} هـ
            </p>
          )}
        </div>

        {/* Top Right - Next Prayer Info */}
        {nextPrayer && timeUntilNextPrayer && (
          <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-10 text-right">
            <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest mb-0.5 sm:mb-1">Next Prayer</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90">{nextPrayer.name}</p>
            <p className="text-base sm:text-lg lg:text-xl text-primary mt-0.5 sm:mt-1">{nextPrayer.time}</p>
            <p className="text-sm sm:text-base lg:text-lg text-white/60 mt-0.5 sm:mt-1">in {timeUntilNextPrayer.formatted}</p>
          </div>
        )}

        {/* Center - Quote */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
          <div 
            className={`max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl text-center transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
          >
            {/* Arabic Text */}
            {currentQuote.arabic && (
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-arabic text-primary leading-loose mb-4 sm:mb-6 lg:mb-10 drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)]" dir="rtl">
                {currentQuote.arabic}
              </p>
            )}
            
            {/* English Quote */}
            <blockquote className="relative">
              {/* Decorative Opening Quote */}
              <span className="absolute -top-4 sm:-top-6 lg:-top-8 -left-2 sm:-left-4 lg:-left-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary/20 font-quote leading-none select-none">"</span>
              
              <p className="font-quote text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed tracking-wide font-light italic px-4 sm:px-6 md:px-8 lg:px-12">
                {currentQuote.text}
              </p>
              
              {/* Decorative Closing Quote */}
              <span className="absolute -bottom-8 sm:-bottom-10 lg:-bottom-12 -right-2 sm:-right-4 lg:-right-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary/20 font-quote leading-none select-none">"</span>
            </blockquote>
            
            {/* Source Attribution */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 mt-6 sm:mt-8 lg:mt-12">
              <div className="h-px w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <p className="font-serif text-sm sm:text-base md:text-lg lg:text-xl text-primary/80 tracking-widest uppercase">
                {currentQuote.source}
              </p>
              <div className="h-px w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Bottom - Subtle Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 sm:gap-3 text-white/30 text-xs sm:text-sm">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-light tracking-wider">Press any key to exit</span>
          </div>
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
