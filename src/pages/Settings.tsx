import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calculator, Volume2, Monitor, Bell, Moon, ChevronRight, Globe, BookOpen, Home, Building2, Sun } from "lucide-react";
import { useTVNavigation } from "@/hooks/useTVNavigation";
import { useApp } from "@/contexts/AppContext";
import { useLanguage, SUPPORTED_LANGUAGES } from "@/lib/i18n";

const Settings = () => {
  const navigate = useNavigate();
  const { settings } = useApp();
  const { language } = useLanguage();

  useTVNavigation({
    onBack: () => navigate('/idle'),
  });

  const currentLanguage = SUPPORTED_LANGUAGES.find(l => l.code === language);

  const settingsGroups = [
    {
      icon: Globe,
      title: "Language",
      description: currentLanguage?.nativeName || "English",
      route: "/settings/language",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: MapPin,
      title: "Location",
      description: `${settings.location.city || 'Not set'}, ${settings.location.country || 'Select location'}`,
      route: "/settings/location",
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      icon: settings.prayer.mode === 'home' ? Home : Building2,
      title: "App Mode",
      description: settings.prayer.mode === 'home' ? 'Home Mode' : 'Mosque Mode',
      route: "/settings/mode",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Calculator,
      title: "Calculation Method",
      description: settings.prayer.calculationMethod || "ISNA (North America)",
      route: "/settings/calculation",
      color: "text-emerald-light",
      bgColor: "bg-emerald/10",
    },
    {
      icon: Sun,
      title: "Asr Calculation",
      description: settings.prayer.asrJuristic === 'hanafi' ? 'Hanafi' : 'Standard (Shafi, Maliki, Hanbali)',
      route: "/settings/asr",
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      icon: Volume2,
      title: "Adhan Settings",
      description: settings.adhan.enabled ? `Volume ${settings.adhan.volume}%` : 'Disabled',
      route: "/settings/adhan",
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      icon: Bell,
      title: "Iqamah Countdown",
      description: "Configure delays for each prayer",
      route: "/settings/iqamah",
      color: "text-emerald-light",
      bgColor: "bg-emerald/10",
    },
    {
      icon: Monitor,
      title: "Display Settings",
      description: "Screen, clock format, screensaver",
      route: "/settings/display",
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      icon: Moon,
      title: "Night Mode",
      description: settings.display.nightMode ? "Enabled" : "Disabled",
      route: "/settings/night",
      color: "text-emerald-light",
      bgColor: "bg-emerald/10",
    },
    {
      icon: BookOpen,
      title: "Quran Settings",
      description: "Reciter and translation preferences",
      route: "/settings/quran",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center gap-4">
          <button
            data-focusable="true"
            autoFocus
            onClick={() => navigate('/idle')}
            className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 sm:px-4 sm:py-3 transition-colors text-sm sm:text-base lg:text-lg"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Back</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Settings</h1>
        </div>
      </header>

      {/* Content - Simple list for easy D-pad navigation */}
      <main className="flex-1 overflow-auto py-6 sm:py-8 lg:py-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-3 sm:space-y-4">
          {settingsGroups.map((item) => (
            <button
              key={item.title}
              data-focusable="true"
              onClick={() => navigate(item.route)}
              className="w-full glass-card p-4 sm:p-5 lg:p-6 flex items-center gap-4 sm:gap-5 lg:gap-6 hover:bg-card/80 focus:ring-2 focus:ring-primary focus:bg-primary/10 focus:outline-none transition-all text-left group"
            >
              <div className={`p-3 sm:p-4 rounded-xl ${item.bgColor}`}>
                <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg lg:text-xl font-medium text-foreground group-focus:text-primary transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground truncate">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-foreground group-focus:text-primary transition-colors" />
            </button>
          ))}

          {/* Device Pairing - Special item */}
          <button
            data-focusable="true"
            onClick={() => navigate('/pairing')}
            className="w-full glass-card p-4 sm:p-5 lg:p-6 flex items-center gap-4 sm:gap-5 lg:gap-6 hover:bg-card/80 focus:ring-2 focus:ring-primary focus:bg-primary/10 focus:outline-none transition-all text-left group border-primary/30"
          >
            <div className="p-3 sm:p-4 rounded-xl bg-primary/10">
              <Monitor className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg lg:text-xl font-medium text-foreground group-focus:text-primary transition-colors">
                Device Pairing
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground truncate">
                {settings.device.isPaired ? `Paired as ${settings.device.deviceName}` : 'Connect to web dashboard'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-foreground group-focus:text-primary transition-colors" />
          </button>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-5 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use ↑↓ to navigate • SELECT to open • BACK to return
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
