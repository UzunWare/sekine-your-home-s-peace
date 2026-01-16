import { useNavigate } from 'react-router-dom';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { useLanguage, SUPPORTED_LANGUAGES, Language } from '@/lib/i18n';
import { Check, Globe } from 'lucide-react';

const SetupLanguage = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  useTVNavigation({
    preventBackNavigation: true,
  });

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    navigate('/setup/welcome');
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
      {/* Progress indicator */}
      <div className="absolute top-6 sm:top-8 lg:top-12 right-6 sm:right-8 lg:right-12 flex items-center gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">Step 1 of 7</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${step === 1 ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-3xl lg:max-w-4xl">
        <Globe className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary mb-4 sm:mb-6" />
        
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-4">
          Choose Your Language
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 lg:mb-12">
          Select the language you want to use
        </p>

        {/* Language grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full mb-6 sm:mb-8">
          {SUPPORTED_LANGUAGES.map((lang, index) => (
            <button
              key={lang.code}
              data-focusable="true"
              autoFocus={index === 0}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`relative p-4 sm:p-5 lg:p-6 rounded-xl border-2 transition-all text-left ${
                language === lang.code
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              } focus:ring-2 focus:ring-primary`}
            >
              {language === lang.code && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg sm:text-xl lg:text-2xl px-2 py-1 bg-muted rounded font-mono">
                  {lang.code.toUpperCase()}
                </span>
                {lang.rtl && (
                  <span className="text-[10px] sm:text-xs px-1.5 py-0.5 bg-primary/20 text-primary rounded">
                    RTL
                  </span>
                )}
              </div>
              
              <h3 className="text-base sm:text-lg lg:text-xl font-medium">{lang.name}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{lang.nativeName}</p>
            </button>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground">
          Press SELECT to choose a language
        </p>
      </div>
    </div>
  );
};

export default SetupLanguage;
