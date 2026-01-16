# API Documentation

This document provides detailed documentation for all APIs used in the Sekine TV application, including external services and internal utility functions.

---

## Table of Contents

- [External APIs](#external-apis)
- [Internal Utilities](#internal-utilities)
- [Data Flow](#data-flow)

---

## External APIs

### Al-Quran Cloud API

**Base URL:** `https://api.alquran.cloud/v1`

The primary API for fetching Quran data, including Arabic text, translations, and audio.

#### Endpoints

##### Get Surah

```http
GET /surah/{surahNumber}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| surahNumber | number | Surah number (1-114) |

**Response:**
```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "number": 1,
    "name": "سُورَةُ ٱلْفَاتِحَةِ",
    "englishName": "Al-Fatiha",
    "englishNameTranslation": "The Opening",
    "revelationType": "Meccan",
    "numberOfAyahs": 7,
    "ayahs": [
      {
        "number": 1,
        "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        "numberInSurah": 1,
        "juz": 1,
        "manzil": 1,
        "page": 1,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      },
      // ... more ayahs
    ]
  }
}
```

---

##### Get Surah with Edition

```http
GET /surah/{surahNumber}/{edition}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| surahNumber | number | Surah number (1-114) |
| edition | string | Edition identifier |

**Common Editions:**
| Edition | Description |
|---------|-------------|
| `quran-uthmani` | Uthmani script Arabic |
| `en.sahih` | Sahih International English |
| `en.pickthall` | Pickthall English |
| `ar.alafasy` | Mishary Alafasy audio |
| `ar.abdulbasitmurattal` | Abdul Basit audio |

**Example:**
```http
GET /surah/1/en.sahih
```

**Response includes translation:**
```json
{
  "data": {
    "ayahs": [
      {
        "number": 1,
        "text": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        "numberInSurah": 1
      }
    ]
  }
}
```

---

##### Get Surah Audio

```http
GET /surah/{surahNumber}/{reciterEdition}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| surahNumber | number | Surah number (1-114) |
| reciterEdition | string | Reciter audio edition |

**Reciter Editions:**
| Edition | Reciter |
|---------|---------|
| `ar.alafasy` | Mishary Rashid Alafasy |
| `ar.abdulbasitmurattal` | Abdul Basit (Murattal) |
| `ar.minshawi` | Mohamed El-Minshawi |
| `ar.husary` | Mahmoud Khalil Al-Husary |
| `ar.abdulsamad` | Abdul Samad |

**Response:**
```json
{
  "data": {
    "ayahs": [
      {
        "number": 1,
        "audio": "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/1",
        "audioSecondary": ["..."],
        "text": "...",
        "numberInSurah": 1
      }
    ]
  }
}
```

---

##### Get Specific Ayah

```http
GET /ayah/{reference}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| reference | string | Ayah reference (e.g., "2:255" for Al-Baqara:255) |

**Example:**
```http
GET /ayah/2:255
```

---

##### Get Multiple Editions

```http
GET /surah/{surahNumber}/editions/{edition1},{edition2}
```

Get multiple editions (Arabic + translation + audio) in one request.

**Example:**
```http
GET /surah/1/editions/quran-uthmani,en.sahih,ar.alafasy
```

---

#### Usage in Application

**File:** `src/lib/quranAPI.ts`

```typescript
const API_BASE = 'https://api.alquran.cloud/v1';

export async function fetchSurah(
  surahNumber: number,
  edition: string = 'quran-uthmani'
): Promise<Surah> {
  const response = await fetch(`${API_BASE}/surah/${surahNumber}/${edition}`);
  const data = await response.json();
  
  if (data.code !== 200) {
    throw new Error(data.status);
  }
  
  return data.data;
}

export async function fetchSurahWithAudio(
  surahNumber: number,
  reciter: string
): Promise<SurahWithAudio> {
  const [arabic, translation, audio] = await Promise.all([
    fetchSurah(surahNumber, 'quran-uthmani'),
    fetchSurah(surahNumber, 'en.sahih'),
    fetchSurah(surahNumber, reciter),
  ]);
  
  return {
    ...arabic,
    ayahs: arabic.ayahs.map((ayah, i) => ({
      ...ayah,
      translation: translation.ayahs[i].text,
      audio: audio.ayahs[i].audio,
    })),
  };
}
```

---

## Internal Utilities

### Prayer Time Calculation

**File:** `src/lib/prayerUtils.ts`

Prayer times are calculated client-side using astronomical formulas.

#### Calculation Methods

| Method | Fajr Angle | Isha Angle | Description |
|--------|------------|------------|-------------|
| MWL | 18° | 17° | Muslim World League |
| ISNA | 15° | 15° | Islamic Society of North America |
| Egypt | 19.5° | 17.5° | Egyptian General Authority |
| Makkah | 18.5° | 90min | Umm al-Qura University |
| Karachi | 18° | 18° | University of Islamic Sciences |
| Tehran | 17.7° | 14° | Institute of Geophysics |
| Jafari | 16° | 14° | Shia Ithna Ashari |

#### Core Functions

```typescript
/**
 * Calculate prayer times for a given date and location
 */
export function calculatePrayerTimes(
  date: Date,
  latitude: number,
  longitude: number,
  timezone: number,
  method: CalculationMethod,
  juristicMethod: JuristicMethod
): PrayerTimes {
  // Solar calculations
  const jd = julianDate(date);
  const sunPosition = calculateSunPosition(jd);
  
  // Prayer time calculations
  const fajr = calculateFajr(sunPosition, latitude, method);
  const sunrise = calculateSunrise(sunPosition, latitude);
  const dhuhr = calculateDhuhr(sunPosition, longitude, timezone);
  const asr = calculateAsr(sunPosition, latitude, juristicMethod);
  const maghrib = calculateMaghrib(sunPosition, latitude);
  const isha = calculateIsha(sunPosition, latitude, method);
  
  return { fajr, sunrise, dhuhr, asr, maghrib, isha };
}

/**
 * Get the next prayer from current time
 */
export function getNextPrayer(
  prayerTimes: PrayerTimes,
  currentTime: Date
): { prayer: Prayer; timeUntil: TimeUntil } | null;

/**
 * Format time until next prayer
 */
export function formatTimeUntil(
  targetTime: Date,
  currentTime: Date
): TimeUntil;
```

#### Hijri Date Calculation

```typescript
/**
 * Convert Gregorian date to Hijri
 */
export function toHijri(date: Date): HijriDate {
  // Julian Day calculation
  const jd = gregorianToJulian(date);
  
  // Convert to Hijri
  const hijri = julianToHijri(jd);
  
  return {
    day: hijri.day,
    month: hijriMonthNames[hijri.month - 1],
    monthNumber: hijri.month,
    year: hijri.year,
  };
}

const hijriMonthNames = [
  'محرم',      // Muharram
  'صفر',       // Safar
  'ربيع الأول', // Rabi al-Awwal
  'ربيع الثاني', // Rabi al-Thani
  'جمادى الأولى', // Jumada al-Ula
  'جمادى الثانية', // Jumada al-Thani
  'رجب',       // Rajab
  'شعبان',     // Shaban
  'رمضان',     // Ramadan
  'شوال',      // Shawwal
  'ذو القعدة',  // Dhu al-Qadah
  'ذو الحجة',   // Dhu al-Hijjah
];
```

---

### Qiblah Calculation

**File:** `src/lib/qiblahUtils.ts`

Calculates the direction to the Kaaba in Mecca from any location.

```typescript
// Kaaba coordinates
const KAABA_LAT = 21.4225;  // 21°25'21"N
const KAABA_LON = 39.8262;  // 39°49'34"E

/**
 * Calculate Qiblah direction using spherical bearing formula
 * @param lat - Observer's latitude in degrees
 * @param lon - Observer's longitude in degrees
 * @returns Bearing in degrees from true north (0-360)
 */
export function calculateQiblahDirection(lat: number, lon: number): number {
  // Convert to radians
  const φ1 = lat * (Math.PI / 180);
  const φ2 = KAABA_LAT * (Math.PI / 180);
  const Δλ = (KAABA_LON - lon) * (Math.PI / 180);
  
  // Spherical bearing calculation
  const x = Math.cos(φ2) * Math.sin(Δλ);
  const y = Math.cos(φ1) * Math.sin(φ2) - 
            Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  
  // Convert to degrees
  let bearing = Math.atan2(x, y) * (180 / Math.PI);
  
  // Normalize to 0-360 range
  return (bearing + 360) % 360;
}

/**
 * Convert degrees to cardinal direction
 * @param degrees - Bearing in degrees (0-360)
 * @returns Cardinal direction string
 */
export function getCardinalDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

/**
 * Format Qiblah direction for display
 * @param degrees - Bearing in degrees
 * @returns Formatted string like "135° SE"
 */
export function formatQiblahDirection(degrees: number): string {
  return `${Math.round(degrees)}° ${getCardinalDirection(degrees)}`;
}
```

#### Example Results

| City | Latitude | Longitude | Qiblah |
|------|----------|-----------|--------|
| New York | 40.7128 | -74.0060 | 58° NE |
| London | 51.5074 | -0.1278 | 119° ESE |
| Tokyo | 35.6762 | 139.6503 | 293° WNW |
| Sydney | -33.8688 | 151.2093 | 278° W |
| Istanbul | 41.0082 | 28.9784 | 150° SSE |
| Dubai | 25.2048 | 55.2708 | 257° WSW |
| Karachi | 24.8607 | 67.0011 | 270° W |

---

### Internationalization

**File:** `src/lib/i18n.ts`

Handles multi-language support with RTL detection.

```typescript
export type Language = 
  | 'en' | 'ar' | 'ur' | 'fr' | 'es' 
  | 'tr' | 'id' | 'bn' | 'de' | 'ru';

interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  rtl: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', rtl: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', rtl: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', rtl: false },
];

/**
 * Translation function with parameter interpolation
 * @param key - Translation key (e.g., "prayer.fajr")
 * @param params - Optional parameters for interpolation
 * @returns Translated string
 */
export function translate(
  key: string, 
  language: Language,
  params?: Record<string, string | number>
): string {
  const translations = getTranslations(language);
  let text = translations[key] || englishTranslations[key] || key;
  
  // Interpolate parameters
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  
  return text;
}
```

---

### Surah Backgrounds

**File:** `src/lib/surahBackgrounds.ts`

Maps surahs to thematic background images.

```typescript
interface SurahBackground {
  surahNumber: number;
  background: string;
  theme: 'light' | 'dark';
}

export function getSurahBackground(surahNumber: number): SurahBackground {
  // Map surahs to themes based on content
  const meccanSurahs = [/* ... */];
  const medinanSurahs = [/* ... */];
  
  // Return appropriate background
  if (meccanSurahs.includes(surahNumber)) {
    return { 
      surahNumber, 
      background: 'bg-desert', 
      theme: 'dark' 
    };
  }
  
  return { 
    surahNumber, 
    background: 'bg-paradise', 
    theme: 'light' 
  };
}
```

---

## Data Flow

### Prayer Times Flow

```
┌─────────────────┐
│   User Sets     │
│   Location      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│  AppContext     │────▶│ usePrayerTimes   │
│  (settings)     │     │ (hook)           │
└─────────────────┘     └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │ prayerUtils.ts   │
                        │ (calculations)   │
                        └────────┬─────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌──────────────────┐    ┌──────────────────┐
│  Idle Layouts   │     │  Prayer Cards    │    │  Adhan Trigger   │
│  (display)      │     │  (display)       │    │  (alerts)        │
└─────────────────┘     └──────────────────┘    └──────────────────┘
```

### Quran Playback Flow

```
┌─────────────────┐
│  User Selects   │
│  Surah/Reciter  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│  useQuranAPI    │────▶│  Al-Quran Cloud  │
│  (hook)         │     │  API             │
└────────┬────────┘     └──────────────────┘
         │
         ▼
┌─────────────────┐
│  React Query    │
│  (caching)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│  QuranContent   │────▶│  Audio Element   │
│  (component)    │     │  (playback)      │
└─────────────────┘     └──────────────────┘
         │
         ▼
┌─────────────────┐
│  PlayerState    │
│  (context)      │
└─────────────────┘
```

### Settings Persistence Flow

```
┌─────────────────┐
│  User Changes   │
│  Setting        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  updateSettings │
│  (context fn)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│  AppContext     │────▶│  localStorage    │
│  (state update) │     │  (persistence)   │
└────────┬────────┘     └──────────────────┘
         │
         ▼
┌─────────────────┐
│  Components     │
│  (re-render)    │
└─────────────────┘
```

---

## Error Handling

### API Errors

```typescript
class QuranAPIError extends Error {
  constructor(
    message: string,
    public code: number,
    public status: string
  ) {
    super(message);
    this.name = 'QuranAPIError';
  }
}

// Usage in API calls
async function fetchWithErrorHandling(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code !== 200) {
      throw new QuranAPIError(
        data.data || 'API request failed',
        data.code,
        data.status
      );
    }
    
    return data.data;
  } catch (error) {
    if (error instanceof QuranAPIError) {
      throw error;
    }
    throw new QuranAPIError(
      'Network error',
      0,
      'NETWORK_ERROR'
    );
  }
}
```

### Offline Handling

```typescript
// Check online status
const isOnline = navigator.onLine;

// Listen for connectivity changes
window.addEventListener('online', () => {
  // Refetch data
});

window.addEventListener('offline', () => {
  // Show offline indicator
});
```
