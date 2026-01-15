import { Settings, Play, Book } from "lucide-react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
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
          <Link
            to="/quran"
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-card/80 transition-all duration-300 group"
          >
            <Book className="w-4 h-4 text-gold-soft group-hover:text-gold transition-colors" />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">Quran</span>
          </Link>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-card/80 transition-all duration-300 group">
            <Play className="w-4 h-4 text-gold-soft group-hover:text-gold transition-colors" />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">Play Adhan</span>
          </button>

          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-card/80 transition-all duration-300 group"
          >
            <Settings className="w-4 h-4 text-gold-soft group-hover:text-gold transition-colors" />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
