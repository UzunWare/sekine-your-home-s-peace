import { useQiblah } from '@/hooks/useQiblah';
import QiblahCompass from './QiblahCompass';
import { cn } from '@/lib/utils';

interface QiblahBadgeProps {
  className?: string;
  compact?: boolean;
}

const QiblahBadge = ({ className, compact = false }: QiblahBadgeProps) => {
  const { degrees, formatted, isValid } = useQiblah();

  if (!isValid) {
    return null;
  }

  if (compact) {
    return (
      <div 
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full",
          "bg-card/40 backdrop-blur-sm border border-border/30",
          "animate-fade-in",
          className
        )}
        style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}
      >
        <QiblahCompass degrees={degrees} size="sm" />
        <span className="text-xs text-foreground/70 tabular-nums font-medium">
          {formatted}
        </span>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-2xl",
        "bg-card/40 backdrop-blur-sm border border-border/30",
        "shadow-lg shadow-black/5",
        "animate-fade-in",
        className
      )}
      style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}
    >
      <QiblahCompass degrees={degrees} size="sm" />
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] uppercase tracking-widest text-primary/70 font-medium">
          Qiblah
        </span>
        <span className="text-sm text-foreground/90 font-medium tabular-nums">
          {formatted}
        </span>
      </div>
    </div>
  );
};

export default QiblahBadge;
