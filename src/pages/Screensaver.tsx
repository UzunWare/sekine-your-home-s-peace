import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { quotes } from '@/data/quotes';
import mosqueBg1 from '@/assets/mosque-background-1.jpg';
import mosqueBg2 from '@/assets/mosque-background-2.jpg';

const backgrounds = [mosqueBg1, mosqueBg2];

const Screensaver = () => {
  const navigate = useNavigate();
  const { settings } = useApp();
  const { hijriDate, nextPrayer, timeUntilNextPrayer } = usePrayerTimes();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [bgIndex, setBgIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Handle any key press to exit
  useEffect(() => {
    const handleKeyDown = () => navigate('/idle');
    const handleClick = () => navigate('/idle');
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [navigate]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Rotate backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgrounds.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // OLED protection - move content
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 40 - 20,
        y: Math.random() * 30 - 15,
      });
    }, 30000);
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
    <div className="fixed inset-0 bg-background overflow-hidden cursor-none">
      {/* Background with slow zoom */}
      <div 
        className="absolute inset-0 transition-opacity duration-2000"
        style={{
          backgroundImage: `url(${backgrounds[bgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'slowZoom 60s ease-in-out infinite alternate',
        }}
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Content with drift */}
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center transition-transform duration-[5000ms] ease-in-out"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {/* Time */}
        <h1 className="text-[10rem] font-extralight leading-none tabular-nums text-foreground/90">
          {formatTime(currentTime)}
        </h1>

        {/* Date */}
        <p className="text-2xl text-muted-foreground mt-4">{formatDate(currentTime)}</p>
        
        {settings.display.showHijriDate && hijriDate && (
          <p className="text-xl text-primary mt-2 font-arabic">
            {hijriDate.day} {hijriDate.month} {hijriDate.year} AH
          </p>
        )}

        {/* Next prayer */}
        {nextPrayer && timeUntilNextPrayer && (
          <div className="flex items-center gap-3 mt-8 px-6 py-3 bg-card/30 rounded-full">
            <span className="text-muted-foreground">{nextPrayer.name}</span>
            <span className="text-primary">{nextPrayer.time}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-primary">{timeUntilNextPrayer.formatted}</span>
          </div>
        )}

        {/* Quote */}
        <div className="max-w-2xl text-center mt-16 animate-fade-in">
          {currentQuote.arabic && (
            <p className="text-2xl font-arabic text-primary/80 mb-3">{currentQuote.arabic}</p>
          )}
          <p className="text-lg text-foreground/70 italic">"{currentQuote.text}"</p>
          <p className="text-sm text-muted-foreground/50 mt-2">— {currentQuote.source}</p>
        </div>
      </div>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Screensaver;
