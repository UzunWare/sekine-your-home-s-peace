import { Check } from 'lucide-react';
import { IdleLayout } from '@/types/app';

interface LayoutPreviewCardProps {
  layoutId: IdleLayout;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}

const LayoutPreviewCard = ({
  layoutId,
  title,
  description,
  isSelected,
  onSelect,
}: LayoutPreviewCardProps) => {
  return (
    <button
      data-focusable="true"
      onClick={onSelect}
      className={`relative flex flex-col p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
        isSelected
          ? 'border-primary bg-primary/5 gold-glow'
          : 'border-border hover:border-primary/50 bg-card/50'
      }`}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}

      {/* Preview thumbnail */}
      <div className="aspect-video w-full rounded-lg bg-background/80 border border-border/50 mb-3 p-2 overflow-hidden">
        <LayoutThumbnail layoutId={layoutId} />
      </div>

      {/* Label */}
      <h3 className={`text-sm sm:text-base font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
        {title}
      </h3>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </button>
  );
};

const LayoutThumbnail = ({ layoutId }: { layoutId: IdleLayout }) => {
  switch (layoutId) {
    case 'classic':
      return (
        <div className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-1">
            <div className="w-4 h-1 rounded bg-primary/40" />
            <div className="flex gap-0.5">
              <div className="w-1.5 h-1.5 rounded bg-muted-foreground/30" />
              <div className="w-1.5 h-1.5 rounded bg-muted-foreground/30" />
            </div>
          </div>
          {/* Time */}
          <div className="flex-1 flex flex-col items-center justify-center gap-1">
            <div className="w-12 h-3 rounded bg-foreground/60" />
            <div className="w-8 h-1 rounded bg-muted-foreground/40" />
            <div className="w-10 h-1.5 rounded bg-primary/40" />
          </div>
          {/* Prayer grid */}
          <div className="flex justify-center gap-1">
            <div className="w-3 h-2 rounded bg-muted-foreground/20" />
            <div className="w-3 h-2 rounded bg-primary/50" />
            <div className="w-3 h-2 rounded bg-muted-foreground/20" />
            <div className="w-3 h-2 rounded bg-muted-foreground/20" />
            <div className="w-3 h-2 rounded bg-muted-foreground/20" />
          </div>
        </div>
      );

    case 'split':
      return (
        <div className="w-full h-full flex gap-1">
          {/* Left side */}
          <div className="flex-1 flex flex-col justify-center items-center gap-1">
            <div className="w-10 h-3 rounded bg-foreground/60" />
            <div className="w-6 h-1 rounded bg-muted-foreground/40" />
            <div className="w-8 h-1 rounded bg-primary/40 mt-1" />
          </div>
          {/* Right side - prayer list */}
          <div className="w-8 flex flex-col gap-0.5 justify-center">
            <div className="w-full h-1.5 rounded bg-muted-foreground/20" />
            <div className="w-full h-1.5 rounded bg-primary/50" />
            <div className="w-full h-1.5 rounded bg-muted-foreground/20" />
            <div className="w-full h-1.5 rounded bg-muted-foreground/20" />
            <div className="w-full h-1.5 rounded bg-muted-foreground/20" />
          </div>
        </div>
      );

    case 'minimal':
      return (
        <div className="w-full h-full flex flex-col">
          {/* Settings icon */}
          <div className="flex justify-end">
            <div className="w-1 h-1 rounded bg-muted-foreground/20" />
          </div>
          {/* Large time */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-16 h-5 rounded bg-foreground/60" />
          </div>
          {/* Subtle next prayer */}
          <div className="flex justify-center">
            <div className="w-8 h-1 rounded bg-muted-foreground/30" />
          </div>
        </div>
      );

    case 'prayer-focus':
      return (
        <div className="w-full h-full flex flex-col gap-1">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <div className="w-4 h-1 rounded bg-foreground/40" />
              <div className="w-3 h-1 rounded bg-muted-foreground/30" />
            </div>
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded bg-muted-foreground/30" />
              <div className="w-1 h-1 rounded bg-muted-foreground/30" />
            </div>
          </div>
          {/* Prayer cards grid */}
          <div className="flex-1 grid grid-cols-3 gap-0.5 py-1">
            <div className="rounded bg-muted-foreground/20" />
            <div className="rounded bg-primary/50 ring-1 ring-primary/50" />
            <div className="rounded bg-muted-foreground/20" />
            <div className="rounded bg-muted-foreground/20" />
            <div className="rounded bg-muted-foreground/20" />
            <div className="rounded bg-transparent" />
          </div>
          {/* Quote */}
          <div className="w-full h-1 rounded bg-muted-foreground/20" />
        </div>
      );

    case 'dashboard':
      return (
        <div className="w-full h-full flex flex-col gap-0.5">
          {/* Top row */}
          <div className="flex gap-0.5 h-6">
            <div className="flex-1 rounded bg-muted-foreground/20 flex items-center justify-center">
              <div className="w-6 h-2 rounded bg-foreground/40" />
            </div>
            <div className="flex-1 rounded bg-primary/30 flex items-center justify-center">
              <div className="w-4 h-2 rounded bg-primary/60" />
            </div>
          </div>
          {/* Prayer row */}
          <div className="flex gap-0.5">
            <div className="flex-1 h-2 rounded bg-muted-foreground/20" />
            <div className="flex-1 h-2 rounded bg-muted-foreground/20" />
            <div className="flex-1 h-2 rounded bg-muted-foreground/20" />
            <div className="flex-1 h-2 rounded bg-muted-foreground/20" />
            <div className="flex-1 h-2 rounded bg-muted-foreground/20" />
          </div>
          {/* Quote tile */}
          <div className="flex-1 rounded bg-muted-foreground/15 flex items-center justify-center">
            <div className="w-10 h-1 rounded bg-muted-foreground/30" />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default LayoutPreviewCard;
