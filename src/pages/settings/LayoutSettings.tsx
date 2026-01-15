import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Monitor, Moon } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import LayoutPreviewCard from '@/components/layout-previews/LayoutPreviewCard';
import ScreensaverLayoutPreviewCard from '@/components/layout-previews/ScreensaverLayoutPreviewCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { IdleLayout, ScreensaverLayout } from '@/types/app';

const idleLayoutOptions: { id: IdleLayout; title: string; description: string }[] = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Centered time with prayer grid footer',
  },
  {
    id: 'split',
    title: 'Split View',
    description: 'Two columns with vertical prayer list',
  },
  {
    id: 'minimal',
    title: 'Minimal',
    description: 'Clean, distraction-free design',
  },
  {
    id: 'prayer-focus',
    title: 'Prayer Focus',
    description: 'Large prayer cards in a grid',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Tile-based information layout',
  },
];

const screensaverLayoutOptions: { id: ScreensaverLayout; title: string; description: string }[] = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Time, next prayer, centered quote',
  },
  {
    id: 'minimal',
    title: 'Minimal',
    description: 'Large time with subtle next prayer',
  },
  {
    id: 'quote-focus',
    title: 'Quote Focus',
    description: 'Prominent Arabic quotes',
  },
  {
    id: 'prayer-focus',
    title: 'Prayer Focus',
    description: 'Next prayer countdown prominent',
  },
  {
    id: 'ambient',
    title: 'Ambient',
    description: 'Ultra-minimal floating time',
  },
];

const LayoutSettings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  const handleIdleLayoutSelect = (layoutId: IdleLayout) => {
    updateSettings('display', { idleLayout: layoutId });
  };

  const handleScreensaverLayoutSelect = (layoutId: ScreensaverLayout) => {
    updateSettings('display', { screensaverLayout: layoutId });
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center gap-4">
          <button
            data-focusable="true"
            autoFocus
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 sm:px-4 sm:py-3 transition-colors text-sm sm:text-base lg:text-lg"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Back</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Screen Layout</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto py-6 sm:py-8 lg:py-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <Tabs defaultValue="idle" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 sm:mb-8">
              <TabsTrigger 
                value="idle" 
                data-focusable="true" 
                className="gap-2 text-sm sm:text-base"
              >
                <Monitor className="w-4 h-4" />
                Idle Screen
              </TabsTrigger>
              <TabsTrigger 
                value="screensaver" 
                data-focusable="true" 
                className="gap-2 text-sm sm:text-base"
              >
                <Moon className="w-4 h-4" />
                Screensaver
              </TabsTrigger>
            </TabsList>

            <TabsContent value="idle">
              <p className="text-muted-foreground mb-6 sm:mb-8">
                Choose how your idle screen appears. Select a layout that suits your preference.
              </p>

              {/* Idle Layout grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {idleLayoutOptions.map((layout) => (
                  <LayoutPreviewCard
                    key={layout.id}
                    layoutId={layout.id}
                    title={layout.title}
                    description={layout.description}
                    isSelected={settings.display.idleLayout === layout.id}
                    onSelect={() => handleIdleLayoutSelect(layout.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="screensaver">
              <p className="text-muted-foreground mb-6 sm:mb-8">
                Choose how your screensaver appears. Screensavers display on rotating backgrounds.
              </p>

              {/* Screensaver Layout grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {screensaverLayoutOptions.map((layout) => (
                  <ScreensaverLayoutPreviewCard
                    key={layout.id}
                    layoutId={layout.id}
                    title={layout.title}
                    description={layout.description}
                    isSelected={settings.display.screensaverLayout === layout.id}
                    onSelect={() => handleScreensaverLayoutSelect(layout.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-5 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use ↑↓←→ to navigate • SELECT to choose • TAB to switch • BACK to return
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LayoutSettings;
