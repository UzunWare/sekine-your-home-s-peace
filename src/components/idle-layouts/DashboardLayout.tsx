import { Settings, BookOpen, HandHeart, Scroll, Clock, Star, Sparkles } from 'lucide-react';
import { IdleLayoutProps } from './types';
import QiblahBadge from '@/components/QiblahBadge';
import bgDashboardPremium from '@/assets/bg-dashboard-premium.jpg';

const DashboardLayout = ({
  currentTime,
  formatTime,
  formatDate,
  prayers,
  nextPrayer,
  timeUntilNextPrayer,
  hijriDate,
  quoteOfTheDay,
  settings,
  isMiniPlayerVisible,
  onNavigate,
  onOpenInvocationsDialog,
  onOpenJawshan,
}: IdleLayoutProps) => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Premium Background with built-in image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgDashboardPremium})` }}
      />
      
      {/* Layered gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      
      {/* Subtle animated glow accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-gentle-pulse" />
      
      {/* Main Content */}
      <div className={`relative z-10 h-screen flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 transition-all ${isMiniPlayerVisible ? 'pb-28 sm:pb-32' : ''}`}>
        
        {/* Top Bar - Qiblah & Status */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">Live</span>
          </div>
          <QiblahBadge compact />
        </div>

        {/* Hero Section - Time Display */}
        <div className="flex-shrink-0 mb-8">
          <div className="flex items-end gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary/80 mb-2 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Current Time
              </p>
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extralight tabular-nums text-foreground tracking-tight">
                {formatTime(currentTime)}
              </h1>
            </div>
            <div className="pb-4 border-l border-border/30 pl-6">
              <p className="text-lg text-muted-foreground mb-1">{formatDate(currentTime)}</p>
              {settings.display.showHijriDate && hijriDate && (
                <p className="text-base text-primary font-arabic">
                  {hijriDate.day} {hijriDate.month} {hijriDate.year} هـ
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid - Next Prayer Hero + Prayer Times */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-0">
          
          {/* Left Column - Next Prayer Hero Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 rounded-3xl overflow-hidden group">
              {/* Card background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
              <div className="absolute inset-0 bg-card/40 backdrop-blur-2xl" />
              <div className="absolute inset-[1px] rounded-3xl border border-primary/20" />
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-full" />
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-primary/60" />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Next Prayer</span>
                  </div>
                  
                  {nextPrayer && timeUntilNextPrayer ? (
                    <>
                      <p className="font-arabic text-4xl sm:text-5xl lg:text-6xl text-primary mb-2 leading-tight">
                        {nextPrayer.arabicName}
                      </p>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
                        {nextPrayer.name}
                      </h2>
                    </>
                  ) : (
                    <p className="text-2xl text-muted-foreground">No upcoming prayers</p>
                  )}
                </div>
                
                {nextPrayer && timeUntilNextPrayer && (
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl sm:text-6xl lg:text-7xl font-extralight tabular-nums text-foreground">
                        {nextPrayer.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-primary/20">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-lg text-primary font-medium">
                        in {timeUntilNextPrayer.formatted}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Prayer Times Grid + Quote */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6">
            
            {/* Prayer Times Grid */}
            <div className="grid grid-cols-5 gap-2 lg:gap-3">
              {prayers.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`relative group p-3 lg:p-4 rounded-2xl text-center transition-all duration-300 ${
                    prayer.isNext 
                      ? 'bg-primary/15 border border-primary/40 scale-105' 
                      : prayer.isPassed 
                        ? 'bg-card/20 border border-border/20 opacity-50' 
                        : 'bg-card/40 border border-border/30 hover:bg-card/60'
                  }`}
                >
                  {prayer.isNext && (
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse" />
                  )}
                  <div className="relative">
                    <p className="font-arabic text-sm lg:text-base text-primary mb-1">{prayer.arabicName}</p>
                    <p className="text-[10px] lg:text-xs uppercase tracking-wider text-muted-foreground mb-2">{prayer.name}</p>
                    <p className="text-lg lg:text-xl tabular-nums font-medium text-foreground">{prayer.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Card */}
            {settings.display.showCentralQuote && (
              <div className="flex-1 relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-card/30 backdrop-blur-xl" />
                <div className="absolute inset-[1px] rounded-3xl border border-border/30" />
                
                <div className="relative h-full flex flex-col justify-center p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-[1px] bg-gradient-to-r from-primary to-transparent" />
                    <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Wisdom</span>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />
                  </div>
                  
                  {quoteOfTheDay.arabic && (
                    <p className="text-xl sm:text-2xl lg:text-3xl font-arabic text-primary text-center mb-4 leading-relaxed" dir="rtl">
                      {quoteOfTheDay.arabic}
                    </p>
                  )}
                  <p className="text-base sm:text-lg text-foreground/90 italic text-center leading-relaxed mb-3">
                    "{quoteOfTheDay.text}"
                  </p>
                  <p className="text-sm text-muted-foreground text-center">
                    — {quoteOfTheDay.source}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex-shrink-0 flex justify-center gap-3 mt-6">
          {[
            { icon: Scroll, label: 'Jawshan', onClick: onOpenJawshan, accent: true },
            { icon: HandHeart, label: 'Invocations', onClick: onOpenInvocationsDialog },
            { icon: BookOpen, label: 'Quran', onClick: () => onNavigate('/quran') },
            { icon: Settings, label: 'Settings', onClick: () => onNavigate('/settings') },
          ].map((item) => (
            <button
              key={item.label}
              data-focusable="true"
              onClick={item.onClick}
              className={`group relative flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 ${
                item.accent 
                  ? 'bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/50' 
                  : 'bg-card/40 border border-border/30 hover:bg-card/60 hover:border-border/50'
              }`}
            >
              <item.icon className={`w-4 h-4 ${item.accent ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`} />
              <span className={`text-sm font-medium ${item.accent ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
