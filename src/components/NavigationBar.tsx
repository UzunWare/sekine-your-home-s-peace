import { Settings, Play, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
            <span className="text-primary-foreground font-arabic text-lg">س</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-foreground">Sekine TV</span>
            <span className="text-xs text-gold-soft italic">Tranquility for your home</span>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            data-focusable="true"
            onClick={() => navigate('/quran')}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 group"
          >
            <Book className="w-4 h-4 text-gold-soft group-hover:text-gold transition-colors" />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">Quran</span>
          </button>

          <button
            data-focusable="true"
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 group"
          >
            <Play className="w-4 h-4 text-gold-soft group-hover:text-gold transition-colors" />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">Play Adhan</span>
          </button>

          <button
            data-focusable="true"
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-card/80 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 group"
          >
            <Settings className="w-4 h-4 text-gold-soft group-hover:text-gold transition-colors" />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
