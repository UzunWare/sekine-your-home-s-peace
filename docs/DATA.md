# Data Structures Documentation

This document provides detailed documentation for all static data files and type definitions in the Sekine TV application.

---

## Table of Contents

- [Type Definitions](#type-definitions)
- [Static Data Files](#static-data-files)
- [Data Schemas](#data-schemas)

---

## Type Definitions

### App Types

**File:** `src/types/app.ts`

#### Location Settings

```typescript
interface LocationSettings {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}
```

#### Calculation Methods

```typescript
type CalculationMethod = 
  | 'MWL'      // Muslim World League
  | 'ISNA'     // Islamic Society of North America
  | 'Egypt'    // Egyptian General Authority of Survey
  | 'Makkah'   // Umm al-Qura University, Makkah
  | 'Karachi'  // University of Islamic Sciences, Karachi
  | 'Tehran'   // Institute of Geophysics, University of Tehran
  | 'Jafari';  // Shia Ithna Ashari, Leva Research Institute, Qum
```

#### Juristic Methods

```typescript
type JuristicMethod = 
  | 'Standard'  // Shafi, Maliki, Hanbali (shadow = object length)
  | 'Hanafi';   // Hanafi (shadow = 2 × object length)
```

#### Display Settings

```typescript
interface DisplaySettings {
  layout: IdleLayout;
  screensaverLayout: ScreensaverLayout;
  background: BackgroundTheme;
  clockFormat: '12h' | '24h';
  showHijriDate: boolean;
  showCentralQuote: boolean;
  screensaverTimeout: ScreensaverTimeout;
}

type IdleLayout = 
  | 'classic'
  | 'minimal'
  | 'split'
  | 'prayer-focus'
  | 'dashboard';

type ScreensaverLayout = 
  | 'classic'
  | 'minimal'
  | 'ambient'
  | 'prayer-focus'
  | 'quote-focus';

type BackgroundTheme = 
  | 'celestial'
  | 'desert'
  | 'light'
  | 'mountains'
  | 'ocean'
  | 'paradise';

type ScreensaverTimeout = 1 | 2 | 5 | 10 | 15 | 30 | 'never';
```

#### Player State

```typescript
type PlayerContentType = 
  | 'quran'
  | 'adhan'
  | 'invocations'
  | 'jawshan';

interface PlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  isMinimized: boolean;
  contentType: PlayerContentType | null;
  currentTrack: TrackInfo | null;
  volume: number;
  progress: number;
  duration: number;
}

interface TrackInfo {
  id: string;
  title: string;
  subtitle?: string;
  arabicTitle?: string;
}
```

#### Quote Type

```typescript
interface Quote {
  text: string;
  arabic?: string;
  source: string;
  category?: string;
}
```

---

### Prayer Types

**File:** `src/types/prayer.ts`

```typescript
interface Prayer {
  name: string;           // English name (Fajr, Dhuhr, etc.)
  arabicName: string;     // Arabic name (الفجر, الظهر, etc.)
  time: string;           // Formatted time string
  timestamp: Date;        // Full Date object
  isNext: boolean;        // Is this the next prayer?
  isPassed: boolean;      // Has this prayer time passed?
}

interface TimeUntil {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;      // e.g., "2h 30m" or "45m"
  totalMinutes: number;
}

interface HijriDate {
  day: number;
  month: string;          // Arabic month name
  monthNumber: number;
  year: number;
}

interface IqamahDelays {
  fajr: number;           // Minutes after adhan
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  jumuah: number;
}

interface PrayerAdjustments {
  fajr: number;           // Minutes to add/subtract
  sunrise: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}
```

---

### Quran Types

**File:** `src/types/quran.ts`

```typescript
interface Surah {
  number: number;
  name: string;           // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

interface Ayah {
  number: number;
  text: string;           // Arabic text
  numberInSurah: number;
  juz: number;
  page: number;
  audio?: string;         // Audio URL
}

interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  style: string;
  identifier: string;     // API identifier
}
```

---

## Static Data Files

### Surahs

**File:** `src/data/surahs.ts`

Complete list of 114 Quran surahs with metadata.

```typescript
interface SurahData {
  number: number;
  name: string;           // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export const surahs: SurahData[] = [
  {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    englishNameTranslation: "The Opening",
    numberOfAyahs: 7,
    revelationType: "Meccan"
  },
  {
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqara",
    englishNameTranslation: "The Cow",
    numberOfAyahs: 286,
    revelationType: "Medinan"
  },
  // ... 112 more surahs
];
```

**Usage:**
```typescript
import { surahs } from '@/data/surahs';

// Get surah by number
const alFatiha = surahs.find(s => s.number === 1);

// Filter Meccan surahs
const meccanSurahs = surahs.filter(s => s.revelationType === 'Meccan');
```

---

### Reciters

**File:** `src/data/reciters.ts`

List of available Quran reciters.

```typescript
interface ReciterData {
  id: string;
  name: string;
  arabicName: string;
  style: string;
  identifier: string;     // Used for API calls
  country?: string;
}

export const reciters: ReciterData[] = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري راشد العفاسي',
    style: 'Murattal',
    identifier: 'ar.alafasy',
    country: 'Kuwait'
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Abdul Samad',
    arabicName: 'عبد الباسط عبد الصمد',
    style: 'Murattal',
    identifier: 'ar.abdulbasitmurattal',
    country: 'Egypt'
  },
  {
    id: 'minshawi',
    name: 'Mohamed Siddiq El-Minshawi',
    arabicName: 'محمد صديق المنشاوي',
    style: 'Murattal',
    identifier: 'ar.minshawi',
    country: 'Egypt'
  },
  // ... more reciters
];
```

---

### Jawshan Kabir

**File:** `src/data/jawshan.ts`

Complete Jawshan Kabir supplication (100 sections).

```typescript
interface JawshanLine {
  arabic: string;
  transliteration: string;
  translation: string;
}

interface JawshanSection {
  number: number;
  lines: JawshanLine[];
  closingPhrase: {
    arabic: string;
    transliteration: string;
    translation: string;
  };
  audioUrl?: string;
}

export const jawshanSections: JawshanSection[] = [
  {
    number: 1,
    lines: [
      {
        arabic: "يا اللهُ يا رَحْمَنُ يا رَحِيمُ",
        transliteration: "Ya Allahu, Ya Rahmanu, Ya Raheem",
        translation: "O Allah, O Most Gracious, O Most Merciful"
      },
      {
        arabic: "يا عَفُوُّ يا غَفُورُ يا وَدُودُ",
        transliteration: "Ya Afuwwu, Ya Ghafoor, Ya Wadood",
        translation: "O Pardoner, O Forgiver, O Loving"
      },
      // ... 8 more lines (10 names per section)
    ],
    closingPhrase: {
      arabic: "سُبْحَانَكَ يَا لَا إِلَهَ إِلَّا أَنْتَ الْغَوْثَ الْغَوْثَ خَلِّصْنَا مِنَ النَّارِ يَا رَبِّ",
      transliteration: "Subhanaka ya la ilaha illa anta, al-ghawth al-ghawth, khallisna min an-nar ya Rabb",
      translation: "Glory be to You, there is no god but You! Help! Help! Save us from the Fire, O Lord!"
    }
  },
  // ... 99 more sections
];

// Helper functions
export function getSection(number: number): JawshanSection | undefined;
export function getTotalSections(): number;
export function searchSections(query: string): JawshanSection[];
```

---

### Invocations (Adhkar)

**File:** `src/data/invocations.ts`

Prayer-specific and daily invocations.

```typescript
interface Invocation {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  repetitions: number;
  audioUrl?: string;
}

interface InvocationCategory {
  id: string;
  name: string;
  arabicName: string;
  invocations: Invocation[];
}

export const invocationCategories: InvocationCategory[] = [
  {
    id: 'fajr',
    name: 'After Fajr',
    arabicName: 'بعد الفجر',
    invocations: [
      {
        id: 'fajr-1',
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
        transliteration: "Asbahna wa asbahal mulku lillah",
        translation: "We have reached the morning and the kingdom belongs to Allah",
        repetitions: 1
      },
      // ... more invocations
    ]
  },
  {
    id: 'morning',
    name: 'Morning Adhkar',
    arabicName: 'أذكار الصباح',
    invocations: [/* ... */]
  },
  {
    id: 'evening',
    name: 'Evening Adhkar',
    arabicName: 'أذكار المساء',
    invocations: [/* ... */]
  },
  // dhuhr, asr, maghrib, isha categories
];
```

---

### Daily Quotes

**File:** `src/data/dailyQuotes.ts`

Quote for each day of the year (366 quotes).

```typescript
interface DailyQuote {
  date: string;           // "MM-DD" format
  text: string;
  arabic?: string;
  source: string;
  category: 'quran' | 'hadith' | 'wisdom' | 'scholar';
}

export const dailyQuotes: DailyQuote[] = [
  {
    date: "01-01",
    text: "Indeed, with hardship comes ease.",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    source: "Quran 94:5",
    category: "quran"
  },
  {
    date: "01-02",
    text: "The best among you are those who have the best character.",
    arabic: "خَيْرُكُمْ أَحْسَنُكُمْ خُلُقًا",
    source: "Prophet Muhammad (ﷺ)",
    category: "hadith"
  },
  // ... 364 more quotes
];

// Get quote for a specific date
export function getQuoteForDate(date: Date): DailyQuote;
export function getQuoteOfTheDay(): DailyQuote;
```

---

### Juz Divisions

**File:** `src/data/juz.ts`

Quran juz (part) divisions.

```typescript
interface Juz {
  number: number;
  name: string;
  arabicName: string;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
}

export const juzDivisions: Juz[] = [
  {
    number: 1,
    name: "Alif Lam Meem",
    arabicName: "الم",
    startSurah: 1,
    startAyah: 1,
    endSurah: 2,
    endAyah: 141
  },
  {
    number: 2,
    name: "Sayaqool",
    arabicName: "سيقول",
    startSurah: 2,
    startAyah: 142,
    endSurah: 2,
    endAyah: 252
  },
  // ... 28 more juz
];
```

---

### General Quotes

**File:** `src/data/quotes.ts`

Additional quotes for various uses.

```typescript
interface Quote {
  id: string;
  text: string;
  arabic?: string;
  source: string;
  category: string;
  tags?: string[];
}

export const quotes: Quote[] = [
  {
    id: 'q1',
    text: "Be in this world as if you were a stranger or a traveler.",
    arabic: "كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ",
    source: "Prophet Muhammad (ﷺ)",
    category: "hadith",
    tags: ["dunya", "zuhd"]
  },
  // ... more quotes
];

export function getRandomQuote(): Quote;
export function getQuotesByCategory(category: string): Quote[];
```

---

## Data Schemas

### Settings Schema

Complete settings object stored in localStorage:

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
    adjustments: {
      fajr: number;
      sunrise: number;
      dhuhr: number;
      asr: number;
      maghrib: number;
      isha: number;
    };
  };
  
  mosque: {
    isEnabled: boolean;
    name: string;
    iqamahDelays: {
      fajr: number;
      dhuhr: number;
      asr: number;
      maghrib: number;
      isha: number;
      jumuah: number;
    };
  };
  
  display: {
    layout: IdleLayout;
    screensaverLayout: ScreensaverLayout;
    background: BackgroundTheme;
    clockFormat: '12h' | '24h';
    showHijriDate: boolean;
    showCentralQuote: boolean;
    screensaverTimeout: ScreensaverTimeout;
  };
  
  adhan: {
    enabled: boolean;
    enabledPrayers: {
      fajr: boolean;
      dhuhr: boolean;
      asr: boolean;
      maghrib: boolean;
      isha: boolean;
    };
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

### Default Values

```typescript
const defaultSettings: AppSettings = {
  location: {
    city: '',
    country: '',
    latitude: 0,
    longitude: 0,
    timezone: 'UTC',
  },
  prayer: {
    calculationMethod: 'MWL',
    juristicMethod: 'Standard',
    adjustments: {
      fajr: 0,
      sunrise: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0,
    },
  },
  mosque: {
    isEnabled: false,
    name: '',
    iqamahDelays: {
      fajr: 20,
      dhuhr: 15,
      asr: 15,
      maghrib: 5,
      isha: 15,
      jumuah: 30,
    },
  },
  display: {
    layout: 'classic',
    screensaverLayout: 'classic',
    background: 'celestial',
    clockFormat: '24h',
    showHijriDate: true,
    showCentralQuote: true,
    screensaverTimeout: 5,
  },
  adhan: {
    enabled: true,
    enabledPrayers: {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: true,
    },
    style: 'makkah',
    volume: 80,
  },
  quran: {
    defaultReciter: 'alafasy',
    playbackSpeed: 1,
    autoPlay: false,
  },
  device: {
    id: '',
    name: 'Sekine TV',
    isPaired: false,
  },
};
```

---

## localStorage Keys

| Key | Content |
|-----|---------|
| `sekine-settings` | Full AppSettings object |
| `sekine-app-state` | AppState (setup status, etc.) |
| `sekine-jawshan-progress` | Last read Jawshan section |
| `sekine-quran-progress` | Last played surah/verse |
