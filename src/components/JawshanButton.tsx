import { Scroll } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface JawshanButtonProps {
  onClick: () => void;
  compact?: boolean;
}

const JawshanButton = ({ onClick, compact = false }: JawshanButtonProps) => {
  const { t } = useTranslation();

  if (compact) {
    return (
      <button
        data-focusable="true"
        onClick={onClick}
        className="p-3 text-amber-400/70 hover:text-amber-400 focus:ring-2 focus:ring-amber-400 rounded-lg transition-all"
        aria-label={t('jawshan.title')}
      >
        <Scroll className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      data-focusable="true"
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 glass-card text-amber-400 hover:bg-amber-500/20 focus:ring-2 focus:ring-amber-400 rounded-lg transition-all"
    >
      <Scroll className="w-4 h-4" />
      <span className="text-sm font-medium">{t('jawshan.title')}</span>
    </button>
  );
};

export default JawshanButton;
