import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { reciters } from '@/data/reciters';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { PlaybackSpeed } from '@/types/app';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const playbackSpeeds: { value: PlaybackSpeed; label: string }[] = [
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1, label: '1.0x' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 2, label: '2.0x' },
];

const translationLanguages = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic Only' },
  { value: 'ur', label: 'Urdu' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'tr', label: 'Turkish' },
  { value: 'id', label: 'Indonesian' },
  { value: 'bn', label: 'Bengali' },
];

export default function QuranSettings() {
  const { settings, updateSettings } = useApp();
  const [showReciterModal, setShowReciterModal] = useState(false);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useTVNavigation({
    onBack: () => {
      if (showReciterModal) setShowReciterModal(false);
      else if (showSpeedModal) setShowSpeedModal(false);
      else if (showLanguageModal) setShowLanguageModal(false);
    },
  });

  const currentReciter = reciters.find(r => r.id === settings.quran.defaultReciter);
  const currentSpeed = playbackSpeeds.find(s => s.value === settings.quran.playbackSpeed);
  const currentLanguage = translationLanguages.find(l => l.value === settings.quran.translationLanguage);

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
        <h1 className="text-3xl font-bold">Quran Settings</h1>
      </div>

      {/* Settings List */}
      <div className="max-w-2xl space-y-4">
        {/* Default Reciter */}
        <button
          onClick={() => setShowReciterModal(true)}
          className="w-full p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 text-left hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Default Reciter</h3>
              <p className="text-muted-foreground mt-1">
                {currentReciter?.name || 'Select a reciter'}
              </p>
            </div>
            <ArrowLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
          </div>
        </button>

        {/* Playback Speed */}
        <button
          onClick={() => setShowSpeedModal(true)}
          className="w-full p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 text-left hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Playback Speed</h3>
              <p className="text-muted-foreground mt-1">
                {currentSpeed?.label || '1.0x'}
              </p>
            </div>
            <ArrowLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
          </div>
        </button>

        {/* Show Transliteration */}
        <button
          onClick={() => updateSettings('quran', { showTransliteration: !settings.quran.showTransliteration })}
          className="w-full p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 text-left hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Show Transliteration</h3>
              <p className="text-muted-foreground mt-1">
                Display romanized Arabic text
              </p>
            </div>
            <div className={`w-12 h-7 rounded-full transition-colors ${settings.quran.showTransliteration ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-5 h-5 rounded-full bg-white mt-1 transition-transform ${settings.quran.showTransliteration ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
          </div>
        </button>

        {/* Translation Language */}
        <button
          onClick={() => setShowLanguageModal(true)}
          className="w-full p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 text-left hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Translation Language</h3>
              <p className="text-muted-foreground mt-1">
                {currentLanguage?.label || 'English'}
              </p>
            </div>
            <ArrowLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
          </div>
        </button>
      </div>

      {/* Reciter Selection Modal */}
      <Dialog open={showReciterModal} onOpenChange={setShowReciterModal}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Reciter</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {reciters.map((reciter) => (
              <button
                key={reciter.id}
                onClick={() => {
                  updateSettings('quran', { defaultReciter: reciter.id });
                  setShowReciterModal(false);
                }}
                className="w-full p-4 rounded-xl text-left hover:bg-accent transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div>
                  <p className="font-medium">{reciter.name}</p>
                  <p className="text-sm text-muted-foreground">{reciter.nationality}</p>
                </div>
                {settings.quran.defaultReciter === reciter.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Speed Selection Modal */}
      <Dialog open={showSpeedModal} onOpenChange={setShowSpeedModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Playback Speed</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {playbackSpeeds.map((speed) => (
              <button
                key={speed.value}
                onClick={() => {
                  updateSettings('quran', { playbackSpeed: speed.value });
                  setShowSpeedModal(false);
                }}
                className="w-full p-4 rounded-xl text-left hover:bg-accent transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <p className="font-medium">{speed.label}</p>
                {settings.quran.playbackSpeed === speed.value && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Language Selection Modal */}
      <Dialog open={showLanguageModal} onOpenChange={setShowLanguageModal}>
        <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Translation Language</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {translationLanguages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => {
                  updateSettings('quran', { translationLanguage: lang.value });
                  setShowLanguageModal(false);
                }}
                className="w-full p-4 rounded-xl text-left hover:bg-accent transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <p className="font-medium">{lang.label}</p>
                {settings.quran.translationLanguage === lang.value && (
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
