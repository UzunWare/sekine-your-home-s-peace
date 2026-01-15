import { Check } from 'lucide-react';
import { ScreensaverLayout } from '@/types/app';

interface ScreensaverLayoutPreviewCardProps {
  layoutId: ScreensaverLayout;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ScreensaverLayoutPreviewCard = ({
  layoutId,
  title,
  description,
  isSelected,
  onSelect,
}: ScreensaverLayoutPreviewCardProps) => {
  return (
    <button
      data-focusable="true"
      onClick={onSelect}
      className={`
        relative w-full text-left rounded-xl overflow-hidden transition-all duration-200
        border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
        ${isSelected 
          ? 'border-primary shadow-lg shadow-primary/20' 
          : 'border-border/50 hover:border-border'
        }
      `}
    >
      {/* Dark Thumbnail Preview */}
      <div className="aspect-video bg-black/90 relative overflow-hidden">
        <ScreensaverLayoutThumbnail layoutId={layoutId} />
        
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="p-3 bg-card">
        <h3 className={`font-medium text-sm sm:text-base ${isSelected ? 'text-primary' : 'text-foreground'}`}>
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1">
          {description}
        </p>
      </div>
    </button>
  );
};

// CSS-only miniature visual representations
const ScreensaverLayoutThumbnail = ({ layoutId }: { layoutId: ScreensaverLayout }) => {
  switch (layoutId) {
    case 'classic':
      return (
        <div className="absolute inset-2 flex flex-col">
          {/* Top left time */}
          <div className="flex justify-between">
            <div>
              <div className="w-10 h-2 bg-white/70 rounded-sm mb-1" />
              <div className="w-6 h-1 bg-white/30 rounded-sm" />
            </div>
            {/* Top right prayer */}
            <div className="text-right">
              <div className="w-6 h-1 bg-white/30 rounded-sm mb-1 ml-auto" />
              <div className="w-8 h-1.5 bg-white/50 rounded-sm ml-auto" />
            </div>
          </div>
          {/* Center quote */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-1">
              <div className="w-16 h-2 bg-primary/60 rounded-sm mx-auto" />
              <div className="w-14 h-1 bg-white/40 rounded-sm mx-auto" />
              <div className="w-10 h-1 bg-white/40 rounded-sm mx-auto" />
            </div>
          </div>
        </div>
      );

    case 'minimal':
      return (
        <div className="absolute inset-2 flex flex-col items-center justify-center">
          {/* Large centered time */}
          <div className="w-20 h-4 bg-white/80 rounded-sm mb-4" />
          {/* Subtle bottom info */}
          <div className="absolute bottom-2 w-12 h-1 bg-white/20 rounded-sm" />
        </div>
      );

    case 'quote-focus':
      return (
        <div className="absolute inset-2 flex flex-col">
          {/* Small top right time */}
          <div className="flex justify-end">
            <div className="w-6 h-1.5 bg-white/50 rounded-sm" />
          </div>
          {/* Large centered quote */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-20 h-3 bg-primary/70 rounded-sm mx-auto" />
              <div className="w-16 h-1.5 bg-white/50 rounded-sm mx-auto" />
              <div className="w-12 h-1 bg-white/30 rounded-sm mx-auto" />
            </div>
          </div>
          {/* Bottom prayer */}
          <div className="flex justify-center">
            <div className="w-10 h-1 bg-white/20 rounded-sm" />
          </div>
        </div>
      );

    case 'prayer-focus':
      return (
        <div className="absolute inset-2 flex flex-col">
          {/* Top left time */}
          <div>
            <div className="w-6 h-1.5 bg-white/50 rounded-sm mb-0.5" />
            <div className="w-4 h-1 bg-white/30 rounded-sm" />
          </div>
          {/* Center prayer */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-1">
              <div className="w-4 h-1 bg-white/30 rounded-sm mx-auto" />
              <div className="w-12 h-3 bg-primary/70 rounded-sm mx-auto" />
              <div className="w-10 h-2 bg-white/60 rounded-sm mx-auto" />
              <div className="w-14 h-2.5 bg-primary/50 rounded-sm mx-auto" />
              <div className="w-8 h-1.5 bg-white/20 rounded-sm mx-auto mt-1" />
            </div>
          </div>
          {/* Bottom quote */}
          <div className="flex justify-center">
            <div className="w-14 h-1 bg-white/15 rounded-sm" />
          </div>
        </div>
      );

    case 'ambient':
      return (
        <div className="absolute inset-2 flex items-center justify-center">
          {/* Floating time - slightly off center */}
          <div className="w-16 h-3 bg-white/60 rounded-sm" style={{ transform: 'translate(10%, -10%)' }} />
          {/* Very subtle corner info */}
          <div className="absolute bottom-2 right-2">
            <div className="w-4 h-0.5 bg-white/10 rounded-sm mb-0.5" />
            <div className="w-3 h-0.5 bg-white/5 rounded-sm" />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default ScreensaverLayoutPreviewCard;
