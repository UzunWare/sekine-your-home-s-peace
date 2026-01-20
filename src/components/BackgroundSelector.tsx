import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  backgroundOptions, 
  BackgroundId, 
  BackgroundCategory 
} from '@/data/backgrounds';

interface BackgroundSelectorProps {
  selectedId: BackgroundId;
  onSelect: (id: BackgroundId) => void;
}

const categories: { id: BackgroundCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mosque', label: 'Mosques' },
  { id: 'nature', label: 'Nature' },
  { id: 'celestial', label: 'Celestial' },
];

export function BackgroundSelector({ selectedId, onSelect }: BackgroundSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<BackgroundCategory | 'all'>('all');

  const filteredBackgrounds = activeCategory === 'all' 
    ? backgroundOptions 
    : backgroundOptions.filter(bg => bg.category === activeCategory);

  return (
    <div className="space-y-4">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Background Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredBackgrounds.map((background) => {
          const isSelected = selectedId === background.id;
          
          return (
            <button
              key={background.id}
              onClick={() => onSelect(background.id)}
              className={cn(
                "group relative aspect-video rounded-xl overflow-hidden transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                isSelected 
                  ? "ring-2 ring-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]" 
                  : "hover:scale-105 hover:shadow-lg"
              )}
            >
              {/* Background Image */}
              <img
                src={background.image}
                alt={background.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Selected Checkmark */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              {/* Name Label */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-sm font-medium text-white truncate">
                  {background.name}
                </p>
                <p className="text-xs text-white/70 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {background.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
