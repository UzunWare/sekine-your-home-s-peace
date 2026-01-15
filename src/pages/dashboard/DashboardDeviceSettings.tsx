import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Tv, MapPin, Calculator, Volume2, Bell, Monitor, Moon, 
  BookOpen, Save, RefreshCw, Trash2, Power, Home, Building2, Image, Shield, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/layouts/DashboardLayout';

// Mock device data - Complete settings matching TV app
const deviceData = {
  id: '1',
  name: 'Living Room TV',
  status: 'online',
  location: {
    city: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    latitude: 51.5074,
    longitude: -0.1278,
  },
  settings: {
    // Language
    language: 'en',
    
    // Prayer settings
    calculationMethod: 'MWL',
    asrJuristic: 'standard',
    mode: 'home', // 'home' | 'mosque'
    
    // Mosque-specific settings
    jumuahEnabled: false,
    jumuahTime: '13:00',
    
    // Display settings
    clockFormat: '12h',
    showHijriDate: true,
    showCentralQuote: true,
    showSeconds: true,
    backgroundSlideshow: true,
    screensaverTimeout: '5m',
    screenBurnProtection: true,
    
    // Night mode
    nightModeEnabled: false,
    nightModeDimLevel: 30,
    
    // Adhan settings
    adhanEnabled: true,
    adhanStyle: 'makkah',
    adhanVolume: 80,
    adhanFadeIn: true,
    duaAfterAdhan: true,
    
    // Quran settings
    defaultReciter: 'mishary',
    playbackSpeed: 1,
    showTransliteration: false,
    translationLanguage: 'en',
    
    // Iqamah delays
    iqamahDelays: {
      fajr: 20,
      dhuhr: 15,
      asr: 15,
      maghrib: 5,
      isha: 15,
    },
  },
};

const calculationMethods = [
  { value: 'ISNA', label: 'ISNA (North America)' },
  { value: 'MWL', label: 'Muslim World League' },
  { value: 'UmmAlQura', label: 'Umm Al-Qura (Makkah)' },
  { value: 'Egyptian', label: 'Egyptian General Authority' },
  { value: 'Karachi', label: 'University of Karachi' },
  { value: 'Tehran', label: 'Institute of Geophysics, Tehran' },
  { value: 'Gulf', label: 'Gulf Region' },
  { value: 'Kuwait', label: 'Kuwait' },
];

const adhanStyles = [
  { value: 'makkah', label: 'Makkah Adhan' },
  { value: 'madinah', label: 'Madinah Adhan' },
  { value: 'alafasy', label: 'Mishary Rashid Alafasy' },
  { value: 'abdulbasit', label: 'Abdul Basit' },
];

const reciters = [
  { value: 'mishary', label: 'Mishary Rashid Alafasy' },
  { value: 'sudais', label: 'Abdul Rahman Al-Sudais' },
  { value: 'shuraim', label: 'Saud Al-Shuraim' },
  { value: 'minshawi', label: 'Mohamed Siddiq El-Minshawi' },
  { value: 'husary', label: 'Mahmoud Khalil Al-Husary' },
  { value: 'abdulbasit', label: 'Abdul Basit Abdul Samad' },
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

const appLanguages = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية (Arabic)' },
  { value: 'tr', label: 'Türkçe (Turkish)' },
  { value: 'ur', label: 'اردو (Urdu)' },
  { value: 'fr', label: 'Français (French)' },
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'ms', label: 'Bahasa Melayu' },
  { value: 'bn', label: 'বাংলা (Bengali)' },
];

const cities = [
  { value: 'london', label: 'London, United Kingdom', lat: 51.5074, lng: -0.1278, tz: 'Europe/London' },
  { value: 'dubai', label: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, tz: 'Asia/Dubai' },
  { value: 'istanbul', label: 'Istanbul, Turkey', lat: 41.0082, lng: 28.9784, tz: 'Europe/Istanbul' },
  { value: 'cairo', label: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357, tz: 'Africa/Cairo' },
  { value: 'mecca', label: 'Mecca, Saudi Arabia', lat: 21.4225, lng: 39.8262, tz: 'Asia/Riyadh' },
  { value: 'kualalumpur', label: 'Kuala Lumpur, Malaysia', lat: 3.1390, lng: 101.6869, tz: 'Asia/Kuala_Lumpur' },
  { value: 'jakarta', label: 'Jakarta, Indonesia', lat: -6.2088, lng: 106.8456, tz: 'Asia/Jakarta' },
  { value: 'newyork', label: 'New York, USA', lat: 40.7128, lng: -74.0060, tz: 'America/New_York' },
  { value: 'toronto', label: 'Toronto, Canada', lat: 43.6532, lng: -79.3832, tz: 'America/Toronto' },
];

const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const DashboardDeviceSettings = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(deviceData);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (path: string, value: any) => {
    setDevice(prev => {
      const newDevice = { ...prev };
      const keys = path.split('.');
      let current: any = newDevice;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newDevice;
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    // In real app, this would sync to backend
    setHasChanges(false);
    alert('Settings saved! Changes will sync to your TV.');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard/devices"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Tv className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{device.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  Online • {device.location.city}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync Now
            </Button>
            <Button 
              size="sm" 
              className="gap-2"
              disabled={!hasChanges}
              onClick={handleSave}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Device Info & Language */}
        <section className="glass-card p-6 space-y-6">
          <h2 className="text-lg font-medium text-foreground">Device Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Device Name</label>
              <Input 
                value={device.name}
                onChange={(e) => updateSetting('name', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Location</label>
              <Select 
                value="london"
                onValueChange={(v) => {
                  const city = cities.find(c => c.value === v);
                  if (city) {
                    updateSetting('location.city', city.label.split(',')[0]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Language Setting */}
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">App Language</h3>
                <p className="text-sm text-muted-foreground">Interface language for the TV app</p>
              </div>
            </div>
            <Select 
              value={device.settings.language}
              onValueChange={(v) => updateSetting('settings.language', v)}
            >
              <SelectTrigger className="w-full md:w-1/2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {appLanguages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* App Mode */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {device.settings.mode === 'home' ? (
                <Home className="w-5 h-5 text-primary" />
              ) : (
                <Building2 className="w-5 h-5 text-primary" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">App Mode</h2>
              <p className="text-sm text-muted-foreground">Choose between home and mosque mode</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => updateSetting('settings.mode', 'home')}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                device.settings.mode === 'home'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Home className="w-6 h-6 mb-2 text-primary" />
              <h3 className="font-medium">Home Mode</h3>
              <p className="text-sm text-muted-foreground">For personal use at home</p>
            </button>
            <button
              onClick={() => updateSetting('settings.mode', 'mosque')}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                device.settings.mode === 'mosque'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Building2 className="w-6 h-6 mb-2 text-primary" />
              <h3 className="font-medium">Mosque Mode</h3>
              <p className="text-sm text-muted-foreground">For mosque or community use</p>
            </button>
          </div>

          {/* Jumuah Settings - Only show in mosque mode */}
          {device.settings.mode === 'mosque' && (
            <div className="pt-4 border-t border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Enable Jumuah Prayer</p>
                  <p className="text-sm text-muted-foreground">Show Friday prayer time</p>
                </div>
                <Switch 
                  checked={device.settings.jumuahEnabled}
                  onCheckedChange={(v) => updateSetting('settings.jumuahEnabled', v)}
                />
              </div>
              {device.settings.jumuahEnabled && (
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Jumuah Time</label>
                  <Input 
                    type="time"
                    value={device.settings.jumuahTime}
                    onChange={(e) => updateSetting('settings.jumuahTime', e.target.value)}
                    className="w-40"
                  />
                </div>
              )}
            </div>
          )}
        </section>

        {/* Prayer Calculation */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Prayer Calculation</h2>
              <p className="text-sm text-muted-foreground">Configure how prayer times are calculated</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Calculation Method</label>
              <Select 
                value={device.settings.calculationMethod}
                onValueChange={(v) => updateSetting('settings.calculationMethod', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {calculationMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Asr Juristic Method</label>
              <Select 
                value={device.settings.asrJuristic}
                onValueChange={(v) => updateSetting('settings.asrJuristic', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (Shafi, Maliki, Hanbali)</SelectItem>
                  <SelectItem value="hanafi">Hanafi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Adhan Settings */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10">
              <Volume2 className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Adhan Settings</h2>
              <p className="text-sm text-muted-foreground">Configure the call to prayer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Enable Adhan</p>
                <p className="text-sm text-muted-foreground">Automatically play Adhan at prayer times</p>
              </div>
              <Switch 
                checked={device.settings.adhanEnabled}
                onCheckedChange={(v) => updateSetting('settings.adhanEnabled', v)}
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Adhan Style</label>
              <Select 
                value={device.settings.adhanStyle}
                onValueChange={(v) => updateSetting('settings.adhanStyle', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {adhanStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted-foreground">Volume</label>
                <span className="text-sm text-foreground font-medium">{device.settings.adhanVolume}%</span>
              </div>
              <Slider 
                value={[device.settings.adhanVolume]}
                onValueChange={(v) => updateSetting('settings.adhanVolume', v[0])}
                max={100}
                step={5}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Fade In</p>
                <p className="text-sm text-muted-foreground">Gradually increase volume at start</p>
              </div>
              <Switch 
                checked={device.settings.adhanFadeIn}
                onCheckedChange={(v) => updateSetting('settings.adhanFadeIn', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dua After Adhan</p>
                <p className="text-sm text-muted-foreground">Play supplication after the call to prayer</p>
              </div>
              <Switch 
                checked={device.settings.duaAfterAdhan}
                onCheckedChange={(v) => updateSetting('settings.duaAfterAdhan', v)}
              />
            </div>
          </div>
        </section>

        {/* Iqamah Settings */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald/10">
              <Bell className="w-5 h-5 text-emerald" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Iqamah Countdown</h2>
              <p className="text-sm text-muted-foreground">Time between Adhan and Iqamah for each prayer</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {prayers.map((prayer) => (
              <div key={prayer}>
                <label className="text-sm text-muted-foreground mb-2 block">{prayer}</label>
                <Select 
                  value={String(device.settings.iqamahDelays[prayer.toLowerCase() as keyof typeof device.settings.iqamahDelays])}
                  onValueChange={(v) => updateSetting(`settings.iqamahDelays.${prayer.toLowerCase()}`, parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25, 30].map((min) => (
                      <SelectItem key={min} value={String(min)}>{min} min</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </section>

        {/* Quran Settings */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald/10">
              <BookOpen className="w-5 h-5 text-emerald" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Quran Settings</h2>
              <p className="text-sm text-muted-foreground">Configure Quran recitation preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Default Reciter</label>
                <Select 
                  value={device.settings.defaultReciter}
                  onValueChange={(v) => updateSetting('settings.defaultReciter', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reciters.map((reciter) => (
                      <SelectItem key={reciter.value} value={reciter.value}>
                        {reciter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Playback Speed</label>
                <Select 
                  value={String(device.settings.playbackSpeed)}
                  onValueChange={(v) => updateSetting('settings.playbackSpeed', parseFloat(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1.0x (Normal)</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2.0x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Translation Language</label>
              <Select 
                value={device.settings.translationLanguage}
                onValueChange={(v) => updateSetting('settings.translationLanguage', v)}
              >
                <SelectTrigger className="w-full md:w-1/2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {translationLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Show Transliteration</p>
                <p className="text-sm text-muted-foreground">Display romanized Arabic text</p>
              </div>
              <Switch 
                checked={device.settings.showTransliteration}
                onCheckedChange={(v) => updateSetting('settings.showTransliteration', v)}
              />
            </div>
          </div>
        </section>

        {/* Display Settings */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sage/10">
              <Monitor className="w-5 h-5 text-sage" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Display Settings</h2>
              <p className="text-sm text-muted-foreground">Customize the TV display appearance</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Clock Format</label>
                <Select 
                  value={device.settings.clockFormat}
                  onValueChange={(v) => updateSetting('settings.clockFormat', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12 Hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24 Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Screensaver Timeout</label>
                <Select 
                  value={device.settings.screensaverTimeout}
                  onValueChange={(v) => updateSetting('settings.screensaverTimeout', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disabled">Disabled</SelectItem>
                    <SelectItem value="20s">20 seconds</SelectItem>
                    <SelectItem value="1m">1 minute</SelectItem>
                    <SelectItem value="5m">5 minutes</SelectItem>
                    <SelectItem value="10m">10 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Screen Layout</label>
                <Select 
                  value="classic"
                  onValueChange={(v) => updateSetting('settings.idleLayout', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="split">Split View</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="prayer-focus">Prayer Focus</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Show Hijri Date</p>
                <p className="text-sm text-muted-foreground">Display Islamic calendar date</p>
              </div>
              <Switch 
                checked={device.settings.showHijriDate}
                onCheckedChange={(v) => updateSetting('settings.showHijriDate', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Show Quote of the Day</p>
                <p className="text-sm text-muted-foreground">Display inspiring Islamic quotes</p>
              </div>
              <Switch 
                checked={device.settings.showCentralQuote}
                onCheckedChange={(v) => updateSetting('settings.showCentralQuote', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Show Seconds</p>
                <p className="text-sm text-muted-foreground">Display seconds in the clock</p>
              </div>
              <Switch 
                checked={device.settings.showSeconds}
                onCheckedChange={(v) => updateSetting('settings.showSeconds', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Background Slideshow</p>
                <p className="text-sm text-muted-foreground">Rotate background images automatically</p>
              </div>
              <Switch 
                checked={device.settings.backgroundSlideshow}
                onCheckedChange={(v) => updateSetting('settings.backgroundSlideshow', v)}
              />
            </div>
          </div>
        </section>

        {/* Screen Protection */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Screen Protection</h2>
              <p className="text-sm text-muted-foreground">Protect your TV screen from burn-in</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Screen Burn Protection</p>
              <p className="text-sm text-muted-foreground">Subtle element movement for OLED TVs</p>
            </div>
            <Switch 
              checked={device.settings.screenBurnProtection}
              onCheckedChange={(v) => updateSetting('settings.screenBurnProtection', v)}
            />
          </div>
        </section>

        {/* Night Mode */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10">
              <Moon className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Night Mode</h2>
              <p className="text-sm text-muted-foreground">Dim the display during night hours</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Enable Night Mode</p>
                <p className="text-sm text-muted-foreground">Automatically dim after Isha</p>
              </div>
              <Switch 
                checked={device.settings.nightModeEnabled}
                onCheckedChange={(v) => updateSetting('settings.nightModeEnabled', v)}
              />
            </div>

            {device.settings.nightModeEnabled && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-muted-foreground">Dim Level</label>
                  <span className="text-sm text-foreground font-medium">{device.settings.nightModeDimLevel}%</span>
                </div>
                <Slider 
                  value={[device.settings.nightModeDimLevel]}
                  onValueChange={(v) => updateSetting('settings.nightModeDimLevel', v[0])}
                  min={10}
                  max={50}
                  step={5}
                />
              </div>
            )}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="glass-card p-6 border-destructive/30">
          <h2 className="text-lg font-medium text-destructive mb-4">Danger Zone</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="gap-2">
              <Power className="w-4 h-4" />
              Restart Device
            </Button>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="w-4 h-4" />
              Remove Device
            </Button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardDeviceSettings;
