import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const delayOptions = [
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 20, label: '20 minutes' },
  { value: 25, label: '25 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '60 minutes' },
];

const prayers = [
  { id: 'fajr', name: 'Fajr', description: 'Pre-dawn prayer' },
  { id: 'dhuhr', name: 'Dhuhr', description: 'Midday prayer' },
  { id: 'asr', name: 'Asr', description: 'Afternoon prayer' },
  { id: 'maghrib', name: 'Maghrib', description: 'Sunset prayer' },
  { id: 'isha', name: 'Isha', description: 'Night prayer' },
] as const;

export default function IqamahSettings() {
  const { settings, updateSettings } = useApp();

  useTVNavigation({});

  const handleDelayChange = (prayerId: keyof typeof settings.mosque.iqamahDelays, value: string) => {
    updateSettings('mosque', {
      iqamahDelays: {
        ...settings.mosque.iqamahDelays,
        [prayerId]: parseInt(value, 10),
      },
    });
  };

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
        <div>
          <h1 className="text-3xl font-bold">Iqamah Delays</h1>
          <p className="text-muted-foreground mt-1">
            Time between Adhan and Iqamah for each prayer
          </p>
        </div>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Info Card */}
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-4">
          <Clock className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm">
              These delays determine how long the Iqamah countdown will run after the Adhan completes.
              Adjust based on your congregation's needs.
            </p>
          </div>
        </div>

        {/* Prayer Delays */}
        {prayers.map((prayer) => (
          <div
            key={prayer.id}
            className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{prayer.name}</h3>
                <p className="text-sm text-muted-foreground">{prayer.description}</p>
              </div>
              <Select
                value={settings.mosque.iqamahDelays[prayer.id].toString()}
                onValueChange={(value) => handleDelayChange(prayer.id, value)}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {delayOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}

        {/* Typical Recommendations */}
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/30">
          <h4 className="font-medium mb-2">Typical Recommendations</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Fajr:</strong> 15-20 minutes (people coming from home)</li>
            <li>• <strong>Dhuhr/Asr:</strong> 10-15 minutes (workday prayers)</li>
            <li>• <strong>Maghrib:</strong> 5-10 minutes (sunset, people waiting)</li>
            <li>• <strong>Isha:</strong> 15-20 minutes (evening, more travel time)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
