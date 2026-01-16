import { cn } from '@/lib/utils';

interface QiblahCompassProps {
  degrees: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDegrees?: boolean;
}

const sizeConfig = {
  sm: { dimension: 48, strokeWidth: 1.5, fontSize: 6, arrowScale: 0.7 },
  md: { dimension: 80, strokeWidth: 2, fontSize: 8, arrowScale: 1 },
  lg: { dimension: 140, strokeWidth: 2.5, fontSize: 11, arrowScale: 1.4 },
};

const QiblahCompass = ({ 
  degrees, 
  size = 'md', 
  className,
  showDegrees = false 
}: QiblahCompassProps) => {
  const config = sizeConfig[size];
  const { dimension, strokeWidth, fontSize, arrowScale } = config;
  const center = dimension / 2;
  const radius = (dimension / 2) - 6;
  const innerRadius = radius - 8;

  // Generate tick marks
  const ticks = [];
  for (let i = 0; i < 360; i += 15) {
    const isMajor = i % 45 === 0;
    const isCardinal = i % 90 === 0;
    const tickLength = isCardinal ? 6 : isMajor ? 4 : 2;
    const angle = (i - 90) * (Math.PI / 180);
    const x1 = center + (radius - tickLength) * Math.cos(angle);
    const y1 = center + (radius - tickLength) * Math.sin(angle);
    const x2 = center + radius * Math.cos(angle);
    const y2 = center + radius * Math.sin(angle);
    
    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={cn(
          isCardinal ? 'stroke-foreground/60' : 'stroke-foreground/20'
        )}
        strokeWidth={isCardinal ? strokeWidth : strokeWidth * 0.6}
        strokeLinecap="round"
      />
    );
  }

  // Cardinal direction positions
  const cardinals = [
    { label: 'N', angle: -90, color: 'fill-primary' },
    { label: 'E', angle: 0, color: 'fill-foreground/50' },
    { label: 'S', angle: 90, color: 'fill-foreground/50' },
    { label: 'W', angle: 180, color: 'fill-foreground/50' },
  ];

  return (
    <div 
      className={cn("relative", className)}
      style={{ width: dimension, height: dimension }}
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        className="drop-shadow-lg"
      >
        {/* Definitions for gradients and filters */}
        <defs>
          {/* Outer ring gradient */}
          <linearGradient id={`ringGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Arrow gradient */}
          <linearGradient id={`arrowGradient-${size}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(43 80% 65%)" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id={`glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Inner shadow */}
          <filter id={`innerShadow-${size}`}>
            <feOffset dx="0" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite operator="out" in="SourceGraphic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend mode="normal" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Background circle with glass effect */}
        <circle
          cx={center}
          cy={center}
          r={radius + 2}
          className="fill-card/80"
          filter={`url(#innerShadow-${size})`}
        />

        {/* Decorative inner ring */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          className="fill-none stroke-foreground/10"
          strokeWidth={strokeWidth * 0.5}
        />

        {/* Outer ring with gradient */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#ringGradient-${size})`}
          strokeWidth={strokeWidth * 1.5}
        />

        {/* Tick marks */}
        {ticks}

        {/* Cardinal directions */}
        {cardinals.map(({ label, angle, color }) => {
          const labelRadius = innerRadius - (size === 'sm' ? 4 : 8);
          const angleRad = angle * (Math.PI / 180);
          const x = center + labelRadius * Math.cos(angleRad);
          const y = center + labelRadius * Math.sin(angleRad);
          
          return (
            <text
              key={label}
              x={x}
              y={y}
              className={cn(color, "font-semibold")}
              fontSize={fontSize}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {label}
            </text>
          );
        })}

        {/* Qiblah arrow group - rotates to point at Qiblah direction */}
        <g 
          transform={`rotate(${degrees}, ${center}, ${center})`}
          filter={`url(#glow-${size})`}
        >
          {/* Arrow body */}
          <path
            d={`
              M ${center} ${center - innerRadius + 4}
              L ${center + 4 * arrowScale} ${center - 6 * arrowScale}
              L ${center + 2 * arrowScale} ${center - 6 * arrowScale}
              L ${center + 2 * arrowScale} ${center + 8 * arrowScale}
              L ${center - 2 * arrowScale} ${center + 8 * arrowScale}
              L ${center - 2 * arrowScale} ${center - 6 * arrowScale}
              L ${center - 4 * arrowScale} ${center - 6 * arrowScale}
              Z
            `}
            fill={`url(#arrowGradient-${size})`}
            className="drop-shadow-md"
          />
          
          {/* Kaaba symbol at arrow tip */}
          <rect
            x={center - 3 * arrowScale}
            y={center - innerRadius - 1}
            width={6 * arrowScale}
            height={6 * arrowScale}
            rx={1}
            className="fill-primary"
          />
        </g>

        {/* Center dot */}
        <circle
          cx={center}
          cy={center}
          r={3 * arrowScale}
          className="fill-foreground/30"
        />
        <circle
          cx={center}
          cy={center}
          r={1.5 * arrowScale}
          className="fill-primary"
        />

        {/* Degree reading */}
        {showDegrees && size !== 'sm' && (
          <text
            x={center}
            y={center + innerRadius / 2 + 4}
            className="fill-foreground/60"
            fontSize={fontSize - 1}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {Math.round(degrees)}°
          </text>
        )}
      </svg>
    </div>
  );
};

export default QiblahCompass;
