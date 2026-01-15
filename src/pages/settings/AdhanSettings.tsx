import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Volume2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { adhanStyles } from '@/data/reciters';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { VolumeLevel } from '@/types/app';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

const volumeLevels: { value: VolumeLevel; label: string }[] = [
  { value: 20, label: '20%' },
  { value: 40, label: '40%' },
  { value: 60, label: '60%' },
  { value: 80, label: '80%' },
  { value: 100, label: '100%' },
];

export default function AdhanSettings() {
  const { settings, updateSettings } = useApp();
  const [showStyleModal, setShowStyleModal] = useState(false);

  useTVNavigation({
    onBack: () => {
      if (showStyleModal) setShowStyleModal(false);
    },
  });

  const currentStyle = adhanStyles.find(s => s.id === settings.adhan.style);

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/settings"
          className="p-3 rounded-xl bg-card/50 hover:bg-card transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold">Adhan Settings</h1>
      </div>

      {/* Settings List */}
      <div className="max-w-2xl space-y-4">
        {/* Adhan Style */}
        <button
          onClick={() => setShowStyleModal(true)}
          className="w-full p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 text-left hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Adhan Style</h3>
              <p className="text-muted-foreground mt-1">
                {currentStyle?.name || 'Select a style'}
              </p>
              {currentStyle && (
                <p className="text-sm text-muted-foreground/70">
                  {currentStyle.origin}
                </p>
              )}
            </div>
            <ArrowLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
          </div>
        </button>

        {/* Volume Level */}
        <div className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
          <div className="flex items-center gap-4 mb-4">
            <Volume2 className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-medium">Volume Level</h3>
              <p className="text-muted-foreground text-sm">
                {settings.adhan.volume}%
              </p>
            </div>
          </div>
          <Slider
            value={[settings.adhan.volume]}
            onValueChange={([value]) => updateSettings('adhan', { volume: value as VolumeLevel })}
            min={20}
            max={100}
            step={20}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {volumeLevels.map((level) => (
              <span key={level.value}>{level.label}</span>
            ))}
          </div>
        </div>

        {/* Fade In */}
        <button
          onClick={() => updateSettings('adhan', { fadeIn: !settings.adhan.fadeIn })}
          className="w-full p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 text-left hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Fade In</h3>
              <p className="text-muted-foreground mt-1">
                Gradually increase volume at start
              </p>
            </div>
            <div className={`w-12 h-7 rounded-full transition-colors ${settings.adhan.fadeIn ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-5 h-5 rounded-full bg-white mt-1 transition-transform ${settings.adhan.fadeIn ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
          </div>
        </button>

        {/* Dua After Adhan */}
        <button
          onClick={() => updateSettings('adhan', { duaAfterAdhan: !settings.adhan.duaAfterAdhan })}
          className="w-full p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 text-left hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Dua After Adhan</h3>
              <p className="text-muted-foreground mt-1">
                Play supplication after the call to prayer
              </p>
            </div>
            <div className={`w-12 h-7 rounded-full transition-colors ${settings.adhan.duaAfterAdhan ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-5 h-5 rounded-full bg-white mt-1 transition-transform ${settings.adhan.duaAfterAdhan ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
          </div>
        </button>
      </div>

      {/* Adhan Style Selection Modal */}
      <Dialog open={showStyleModal} onOpenChange={setShowStyleModal}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Adhan Style</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {adhanStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => {
                  updateSettings('adhan', { style: style.id });
                  setShowStyleModal(false);
                }}
                className="w-full p-4 rounded-xl text-left hover:bg-accent transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div>
                  <p className="font-medium">{style.name}</p>
                  <p className="text-sm text-muted-foreground">{style.origin}</p>
                </div>
                {settings.adhan.style === style.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
