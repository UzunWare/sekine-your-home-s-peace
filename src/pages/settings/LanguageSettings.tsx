import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { useTVNavigation } from "@/hooks/useTVNavigation";
import { useLanguage, SUPPORTED_LANGUAGES, Language } from "@/lib/i18n";

const LanguageSettings = () => {
  const navigate = useNavigate();
  const { language, setLanguage, isRTL } = useLanguage();

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 sm:py-6 flex items-center gap-4">
          <button
            data-focusable="true"
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h1 className="text-xl sm:text-2xl font-semibold">Language</h1>
          </div>
        </div>
      </header>

      {/* Language List */}
      <main className="flex-1 overflow-auto py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-6 space-y-2">
          <p className="text-sm text-muted-foreground mb-4">
            Select your preferred language. This will change the entire app interface.
          </p>
          
          {SUPPORTED_LANGUAGES.map((lang, index) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                data-focusable="true"
                autoFocus={index === 0}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full p-4 sm:p-5 rounded-xl flex items-center justify-between transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                  isSelected
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'glass-card hover:bg-card/80'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <span className="text-lg font-semibold">{lang.code.toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{lang.name}</p>
                    <p className={`text-sm text-muted-foreground ${lang.rtl ? 'font-arabic' : ''}`}>
                      {lang.nativeName}
                      {lang.rtl && <span className="ml-2 text-xs text-primary">(RTL)</span>}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use ↑↓ to navigate • SELECT to choose • BACK to return
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LanguageSettings;
