import { useApp } from '@/contexts/AppContext';

const DynamicBackground = () => {
  const { settings } = useApp();
  const theme = settings.display.colorTheme;

  // Theme-specific gradient colors using CSS variables
  const getThemeColors = () => {
    switch (theme) {
      case 'midnight-azure':
        return {
          primary: 'hsl(210 60% 55%)',
          secondary: 'hsl(215 45% 25%)',
          accent: 'hsl(200 70% 50%)',
          glow: 'hsl(210 70% 40%)',
        };
      case 'desert-sand':
        return {
          primary: 'hsl(18 55% 50%)',
          secondary: 'hsl(35 40% 30%)',
          accent: 'hsl(25 60% 55%)',
          glow: 'hsl(30 50% 35%)',
        };
      default: // emerald-gold
        return {
          primary: 'hsl(43 60% 45%)',
          secondary: 'hsl(160 55% 22%)',
          accent: 'hsl(45 70% 50%)',
          glow: 'hsl(160 40% 25%)',
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient layer */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, ${colors.secondary}15 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, ${colors.primary}10 0%, transparent 45%),
            radial-gradient(ellipse 50% 60% at 60% 80%, ${colors.glow}12 0%, transparent 40%),
            linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)
          `
        }}
      />

      {/* Animated aurora mesh */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-[150%] h-[150%] -left-[25%] -top-[25%] animate-aurora-slow"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg,
                ${colors.primary}08 60deg,
                transparent 120deg,
                ${colors.secondary}06 180deg,
                transparent 240deg,
                ${colors.accent}05 300deg,
                transparent 360deg
              )
            `,
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] animate-aurora-medium"
          style={{
            background: `
              conic-gradient(from 180deg at 40% 60%, 
                transparent 0deg,
                ${colors.glow}10 90deg,
                transparent 180deg,
                ${colors.primary}08 270deg,
                transparent 360deg
              )
            `,
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large ambient orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full animate-float-slow opacity-20"
          style={{
            background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)`,
            top: '10%',
            left: '15%',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full animate-float-medium opacity-15"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}40 0%, transparent 70%)`,
            top: '50%',
            right: '10%',
            filter: 'blur(50px)',
          }}
        />
        <div 
          className="absolute w-72 h-72 rounded-full animate-float-fast opacity-25"
          style={{
            background: `radial-gradient(circle, ${colors.accent}25 0%, transparent 70%)`,
            bottom: '15%',
            left: '30%',
            filter: 'blur(45px)',
          }}
        />
        
        {/* Small accent orbs */}
        <div 
          className="absolute w-32 h-32 rounded-full animate-float-medium opacity-30"
          style={{
            background: `radial-gradient(circle, ${colors.primary}50 0%, transparent 70%)`,
            top: '30%',
            right: '25%',
            filter: 'blur(25px)',
          }}
        />
        <div 
          className="absolute w-24 h-24 rounded-full animate-float-slow opacity-35"
          style={{
            background: `radial-gradient(circle, ${colors.glow}60 0%, transparent 70%)`,
            bottom: '35%',
            left: '10%',
            filter: 'blur(20px)',
          }}
        />
        <div 
          className="absolute w-40 h-40 rounded-full animate-float-fast opacity-20"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}45 0%, transparent 70%)`,
            top: '60%',
            left: '55%',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* Geometric pattern overlay - Islamic-inspired */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geometric" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              {/* Eight-pointed star pattern */}
              <g fill="none" stroke="currentColor" strokeWidth="0.5">
                <polygon points="60,10 70,35 95,35 75,55 85,80 60,65 35,80 45,55 25,35 50,35" />
                <circle cx="60" cy="60" r="20" />
                <circle cx="60" cy="60" r="35" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric)" className="text-foreground" />
        </svg>
      </div>

      {/* Subtle grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top and bottom gradient fade for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-60" />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / 0.5) 100%)'
        }}
      />

      {/* Shimmer line accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute h-px w-[200%] animate-shimmer opacity-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.primary}60, transparent)`,
            top: '25%',
            left: '-50%',
          }}
        />
        <div 
          className="absolute h-px w-[200%] animate-shimmer-delayed opacity-15"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.accent}50, transparent)`,
            top: '75%',
            left: '-50%',
          }}
        />
      </div>

      {/* Noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default DynamicBackground;
