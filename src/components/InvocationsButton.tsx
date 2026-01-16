import { HandHeart } from 'lucide-react';

interface InvocationsButtonProps {
  onClick: () => void;
  className?: string;
  compact?: boolean;
}

const InvocationsButton = ({ onClick, className = '', compact = false }: InvocationsButtonProps) => {
  if (compact) {
    return (
      <button
        data-focusable="true"
        onClick={onClick}
        className={`p-3 text-muted-foreground/40 hover:text-muted-foreground focus:ring-2 focus:ring-primary rounded-lg transition-all ${className}`}
      >
        <HandHeart className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      data-focusable="true"
      onClick={onClick}
      className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 focus:ring-2 focus:ring-primary transition-all ${className}`}
    >
      <HandHeart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
      <span className="text-xs sm:text-sm lg:text-base">Invocations</span>
    </button>
  );
};

export default InvocationsButton;
