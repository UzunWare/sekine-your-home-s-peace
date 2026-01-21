import { Check } from 'lucide-react';
import { colorThemes, type ColorThemeId } from '@/data/colorThemes';

interface ColorThemeSelectorProps {
  selectedId: ColorThemeId;
  onSelect: (id: ColorThemeId) => void;
}

export function ColorThemeSelector({ selectedId, onSelect }: ColorThemeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {colorThemes.map((theme) => {
        const isSelected = theme.id === selectedId;
        
        return (
          <button
            key={theme.id}
            data-focusable="true"
            onClick={() => onSelect(theme.id)}
            className={`relative p-4 rounded-xl transition-all focus:ring-2 focus:ring-primary focus:outline-none text-left ${
              isSelected
                ? 'ring-2 ring-primary bg-primary/10'
                : 'bg-muted/30 hover:bg-muted/50'
            }`}
          >
            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}

            {/* Color preview */}
            <div 
              className="w-full aspect-[16/10] rounded-lg mb-3 overflow-hidden border border-border/30"
              style={{ backgroundColor: theme.preview.background }}
            >
              {/* Accent bar */}
              <div 
                className="h-2 w-full"
                style={{ backgroundColor: theme.preview.primary }}
              />
              
              {/* Preview content */}
              <div className="p-3 flex items-center gap-2">
                {/* Primary circle */}
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: theme.preview.primary }}
                />
                {/* Secondary circle */}
                <div 
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: theme.preview.secondary }}
                />
                {/* Accent circle */}
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.preview.accent }}
                />
              </div>
              
              {/* Sample text lines */}
              <div className="px-3 space-y-1.5">
                <div 
                  className="h-2 w-3/4 rounded-full opacity-90"
                  style={{ backgroundColor: theme.preview.primary }}
                />
                <div 
                  className="h-1.5 w-1/2 rounded-full opacity-50"
                  style={{ backgroundColor: theme.preview.secondary }}
                />
              </div>
            </div>

            {/* Theme info */}
            <h4 className="font-medium text-foreground">{theme.name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{theme.description}</p>
          </button>
        );
      })}
    </div>
  );
}
