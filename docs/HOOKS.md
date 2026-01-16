# Hooks Documentation

This document provides detailed documentation for all custom React hooks in the Sekine TV application.

---

## Table of Contents

- [State Hooks](#state-hooks)
- [Calculation Hooks](#calculation-hooks)
- [API Hooks](#api-hooks)
- [Utility Hooks](#utility-hooks)

---

## State Hooks

### `useApp`

**File:** `src/contexts/AppContext.tsx`

The primary hook for accessing global application state.

**Returns:**
```typescript
interface AppContextType {
  settings: AppSettings;
  appState: AppState;
  playerState: PlayerState;
  updateSettings: (updates: Partial<AppSettings>) => void;
  setAppState: (state: Partial<AppState>) => void;
  setPlayerState: (state: Partial<PlayerState>) => void;
  completeSetup: () => void;
  resetApp: () => void;
}
```

**Usage:**
```typescript
import { useApp } from '@/contexts/AppContext';

const MyComponent = () => {
  const { settings, updateSettings, appState } = useApp();
  
  // Read settings
  console.log(settings.location.city);
  
  // Update settings
  updateSettings({
    location: { ...settings.location, city: 'New York' }
  });
  
  // Check app state
  if (!appState.isSetupComplete) {
    return <SetupWizard />;
  }
  
  return <MainApp />;
};
```

**Settings Structure:**
```typescript
interface AppSettings {
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  prayer: {
    calculationMethod: CalculationMethod;
    juristicMethod: JuristicMethod;
    adjustments: PrayerAdjustments;
  };
  mosque: {
    isEnabled: boolean;
    name: string;
    iqamahDelays: IqamahDelays;
  };
  display: {
    layout: IdleLayout;
    screensaverLayout: ScreensaverLayout;
    background: BackgroundTheme;
    clockFormat: '12h' | '24h';
    showHijriDate: boolean;
    showCentralQuote: boolean;
    screensaverTimeout: number;
  };
  adhan: {
    enabled: boolean;
    enabledPrayers: EnabledPrayers;
    style: AdhanStyle;
    volume: number;
  };
  quran: {
    defaultReciter: string;
    playbackSpeed: number;
    autoPlay: boolean;
  };
  device: {
    id: string;
    name: string;
    isPaired: boolean;
  };
}
```

---

### `useToast`

**File:** `src/hooks/use-toast.ts`

Hook for displaying toast notifications.

**Returns:**
```typescript
interface UseToastReturn {
  toast: (options: ToastOptions) => void;
  toasts: Toast[];
  dismiss: (id: string) => void;
}

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}
```

**Usage:**
```typescript
import { useToast } from '@/hooks/use-toast';

const MyComponent = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    // ... save logic
    toast({
      title: 'Settings saved',
      description: 'Your changes have been saved successfully.',
    });
  };
  
  const handleError = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong.',
      variant: 'destructive',
    });
  };
};
```

---

## Calculation Hooks

### `usePrayerTimes`

**File:** `src/hooks/usePrayerTimes.ts`

Calculates prayer times based on user location and settings.

**Parameters:**
```typescript
interface UsePrayerTimesOptions {
  latitude: number;
  longitude: number;
  timezone: string;
  calculationMethod: CalculationMethod;
  juristicMethod: JuristicMethod;
  date?: Date;
}
```

**Returns:**
```typescript
interface UsePrayerTimesReturn {
  prayers: Prayer[];
  nextPrayer: Prayer | null;
  timeUntilNextPrayer: TimeUntil | null;
  hijriDate: HijriDate;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

interface Prayer {
  name: string;
  arabicName: string;
  time: string;
  timestamp: Date;
  isNext: boolean;
  isPassed: boolean;
}

interface TimeUntil {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;  // e.g., "2h 30m"
}

interface HijriDate {
  day: number;
  month: string;
  year: number;
}
```

**Usage:**
```typescript
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useApp } from '@/contexts/AppContext';

const PrayerDisplay = () => {
  const { settings } = useApp();
  
  const {
    prayers,
    nextPrayer,
    timeUntilNextPrayer,
    hijriDate,
    isLoading,
  } = usePrayerTimes({
    latitude: settings.location.latitude,
    longitude: settings.location.longitude,
    timezone: settings.location.timezone,
    calculationMethod: settings.prayer.calculationMethod,
    juristicMethod: settings.prayer.juristicMethod,
  });
  
  if (isLoading) return <Loading />;
  
  return (
    <div>
      <h2>Next Prayer: {nextPrayer?.name}</h2>
      <p>In: {timeUntilNextPrayer?.formatted}</p>
      
      {prayers.map(prayer => (
        <PrayerCard key={prayer.name} prayer={prayer} />
      ))}
    </div>
  );
};
```

**Calculation Methods:**
| Method | Description |
|--------|-------------|
| `MWL` | Muslim World League |
| `ISNA` | Islamic Society of North America |
| `Egypt` | Egyptian General Authority |
| `Makkah` | Umm al-Qura, Makkah |
| `Karachi` | University of Islamic Sciences, Karachi |
| `Tehran` | Institute of Geophysics, Tehran |
| `Jafari` | Shia Ithna Ashari |

---

### `useQiblah`

**File:** `src/hooks/useQiblah.ts`

Calculates the Qiblah direction from the user's location.

**Returns:**
```typescript
interface QiblahData {
  degrees: number;     // Bearing in degrees (0-360) from true north
  cardinal: string;    // Cardinal direction (N, NE, E, SE, S, SW, W, NW)
  formatted: string;   // Formatted string like "135° SE"
  isValid: boolean;    // False if location is not set (0,0)
}
```

**Usage:**
```typescript
import { useQiblah } from '@/hooks/useQiblah';

const QiblahDisplay = () => {
  const { degrees, cardinal, formatted, isValid } = useQiblah();
  
  if (!isValid) {
    return <p>Please set your location to see Qiblah direction</p>;
  }
  
  return (
    <div>
      <p>Qiblah: {formatted}</p>
      <QiblahCompass degrees={degrees} />
    </div>
  );
};
```

**Calculation Formula:**

The hook uses the spherical bearing formula:

```typescript
// Kaaba coordinates
const KAABA_LAT = 21.4225;  // °N
const KAABA_LON = 39.8262;  // °E

// Convert to radians
const φ1 = lat * (Math.PI / 180);
const φ2 = KAABA_LAT * (Math.PI / 180);
const Δλ = (KAABA_LON - lon) * (Math.PI / 180);

// Calculate bearing
const x = Math.cos(φ2) * Math.sin(Δλ);
const y = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
const bearing = Math.atan2(x, y) * (180 / Math.PI);

// Normalize to 0-360°
const normalized = (bearing + 360) % 360;
```

**Example Results:**
| City | Qiblah Direction |
|------|------------------|
| New York | ~58° (ENE) |
| London | ~119° (ESE) |
| Tokyo | ~293° (WNW) |
| Sydney | ~278° (W) |
| Istanbul | ~150° (SSE) |
| Dubai | ~257° (WSW) |

---

## API Hooks

### `useQuranAPI`

**File:** `src/hooks/useQuranAPI.ts`

Hook for fetching Quran data from the Al-Quran Cloud API.

**Returns:**
```typescript
interface UseQuranAPIReturn {
  getSurah: (surahNumber: number, edition?: string) => Promise<Surah>;
  getSurahAudio: (surahNumber: number, reciter: string) => Promise<AudioSurah>;
  getVerse: (surahNumber: number, verseNumber: number) => Promise<Verse>;
  isLoading: boolean;
  error: Error | null;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  ayahs: Ayah[];
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audio?: string;
}
```

**Usage:**
```typescript
import { useQuranAPI } from '@/hooks/useQuranAPI';

const QuranPlayer = ({ surahNumber, reciter }: Props) => {
  const { getSurah, getSurahAudio, isLoading, error } = useQuranAPI();
  const [surah, setSurah] = useState<Surah | null>(null);
  
  useEffect(() => {
    const loadSurah = async () => {
      const data = await getSurah(surahNumber);
      const audio = await getSurahAudio(surahNumber, reciter);
      setSurah({ ...data, audioUrls: audio });
    };
    loadSurah();
  }, [surahNumber, reciter]);
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return <SurahDisplay surah={surah} />;
};
```

---

## Utility Hooks

### `useTVNavigation`

**File:** `src/hooks/useTVNavigation.ts`

Handles keyboard and TV remote navigation.

**Parameters:**
```typescript
interface UseTVNavigationOptions {
  onSelect?: () => void;
  onBack?: () => void;
  onPlayPause?: () => void;
  enabled?: boolean;
}
```

**Returns:**
```typescript
interface UseTVNavigationReturn {
  focusedElement: HTMLElement | null;
  focusNext: () => void;
  focusPrevious: () => void;
  focusUp: () => void;
  focusDown: () => void;
}
```

**Usage:**
```typescript
import { useTVNavigation } from '@/hooks/useTVNavigation';

const TVPage = () => {
  const navigate = useNavigate();
  
  useTVNavigation({
    onSelect: () => {
      // Handle enter/select key
      document.activeElement?.click();
    },
    onBack: () => {
      navigate(-1);
    },
    onPlayPause: () => {
      // Toggle audio playback
      togglePlayback();
    },
    enabled: true,
  });
  
  return (
    <div>
      <button data-focusable="true">Button 1</button>
      <button data-focusable="true">Button 2</button>
    </div>
  );
};
```

**Keyboard Mappings:**
| Key | Action |
|-----|--------|
| `ArrowLeft` | Focus previous horizontal element |
| `ArrowRight` | Focus next horizontal element |
| `ArrowUp` | Focus element above |
| `ArrowDown` | Focus element below |
| `Enter` / `Space` | Trigger `onSelect` |
| `Escape` / `Backspace` | Trigger `onBack` |
| `P` | Trigger `onPlayPause` |
| `M` | Toggle mute (if implemented) |

---

### `useMobile`

**File:** `src/hooks/use-mobile.tsx`

Detects mobile viewport for responsive adjustments.

**Returns:**
```typescript
{
  isMobile: boolean;  // true if viewport width < 768px
}
```

**Usage:**
```typescript
import { useMobile } from '@/hooks/use-mobile';

const ResponsiveComponent = () => {
  const { isMobile } = useMobile();
  
  return (
    <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
};
```

---

### `useTranslation`

**File:** `src/lib/i18n.ts`

Hook for accessing internationalization functions.

**Returns:**
```typescript
interface UseTranslationReturn {
  t: (key: string, params?: Record<string, string | number>) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  languageInfo: LanguageInfo;
}
```

**Usage:**
```typescript
import { useTranslation } from '@/lib/i18n';

const LocalizedComponent = () => {
  const { t, language, setLanguage, isRTL } = useTranslation();
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <h1>{t('prayer.fajr')}</h1>
      <p>{t('quran.verseOf', { current: 5, total: 10 })}</p>
      
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value as Language)}
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};
```

**Translation Keys:**

See `src/lib/i18n.ts` for all available translation keys. Key categories:
- `nav.*` - Navigation labels
- `common.*` - Common UI text
- `prayer.*` - Prayer names and labels
- `quran.*` - Quran-related text
- `player.*` - Media player controls
- `settings.*` - Settings labels
- `time.*` - Time-related text
- `jawshan.*` - Jawshan Kabir text
- `hint.*` - UI hints

---

## Hook Composition Example

Here's an example combining multiple hooks:

```typescript
import { useApp } from '@/contexts/AppContext';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useQiblah } from '@/hooks/useQiblah';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { useTranslation } from '@/lib/i18n';

const IdleScreen = () => {
  const { settings } = useApp();
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();
  
  const {
    prayers,
    nextPrayer,
    timeUntilNextPrayer,
    hijriDate,
  } = usePrayerTimes({
    latitude: settings.location.latitude,
    longitude: settings.location.longitude,
    timezone: settings.location.timezone,
    calculationMethod: settings.prayer.calculationMethod,
    juristicMethod: settings.prayer.juristicMethod,
  });
  
  const { formatted: qiblahDirection } = useQiblah();
  
  useTVNavigation({
    onBack: () => navigate('/settings'),
    enabled: true,
  });
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <h1>{t('idle.nextPrayer')}: {nextPrayer?.name}</h1>
      <p>{timeUntilNextPrayer?.formatted}</p>
      <p>Qiblah: {qiblahDirection}</p>
      
      {prayers.map(prayer => (
        <div key={prayer.name}>
          <span>{prayer.arabicName}</span>
          <span>{prayer.time}</span>
        </div>
      ))}
    </div>
  );
};
```
