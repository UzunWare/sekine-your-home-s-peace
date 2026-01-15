import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Tv, MapPin, Calculator, Volume2, Bell, Monitor, Moon, 
  BookOpen, Save, RefreshCw, Trash2, Power
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/layouts/DashboardLayout';

// Mock device data
const deviceData = {
  id: '1',
  name: 'Living Room TV',
  status: 'online',
  location: {
    city: 'London',
    country: 'United Kingdom',
  },
  settings: {
    calculationMethod: 'MWL',
    asrJuristic: 'standard',
    clockFormat: '12h',
    showHijriDate: true,
    showCentralQuote: true,
    screensaverTimeout: '5m',
    adhanEnabled: true,
    adhanStyle: 'makkah',
    adhanVolume: 80,
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
  { value: 'MWL', label: 'Muslim World League' },
  { value: 'ISNA', label: 'ISNA (North America)' },
  { value: 'Egypt', label: 'Egyptian General Authority' },
  { value: 'Makkah', label: 'Umm Al-Qura (Makkah)' },
  { value: 'Karachi', label: 'University of Karachi' },
  { value: 'Tehran', label: 'Institute of Geophysics, Tehran' },
];

const adhanStyles = [
  { value: 'makkah', label: 'Makkah Adhan' },
  { value: 'madinah', label: 'Madinah Adhan' },
  { value: 'alafasy', label: 'Mishary Rashid Alafasy' },
  { value: 'abdulbasit', label: 'Abdul Basit' },
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

        {/* Device Name */}
        <section className="glass-card p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Device Info</h2>
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
              <Input 
                value={`${device.location.city}, ${device.location.country}`}
                onChange={(e) => {}}
                disabled
              />
            </div>
          </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <SelectItem value="1m">1 minute</SelectItem>
                    <SelectItem value="5m">5 minutes</SelectItem>
                    <SelectItem value="10m">10 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
