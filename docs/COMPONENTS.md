# Component Documentation

This document provides detailed documentation for all React components in the Sekine TV application.

---

## Table of Contents

- [Core Components](#core-components)
- [Idle Layout Components](#idle-layout-components)
- [Screensaver Layout Components](#screensaver-layout-components)
- [Player Components](#player-components)
- [UI Components](#ui-components)
- [Layout Preview Components](#layout-preview-components)

---

## Core Components

### `BackgroundSlideshow`

**File:** `src/components/BackgroundSlideshow.tsx`

Renders an animated background slideshow with parallax effects and smooth transitions.

**Props:**
```typescript
interface BackgroundSlideshowProps {
  className?: string;
}
```

**Features:**
- Automatic image rotation based on settings
- Parallax scrolling effect
- Smooth crossfade transitions
- Supports 6 built-in background themes

**Usage:**
```tsx
<BackgroundSlideshow className="absolute inset-0" />
```

---

### `CurrentTime`

**File:** `src/components/CurrentTime.tsx`

Displays the current time with automatic updates.

**Props:**
```typescript
interface CurrentTimeProps {
  format?: '12h' | '24h';
  showSeconds?: boolean;
  className?: string;
}
```

**Features:**
- Real-time updates every second
- 12-hour or 24-hour format
- Optional seconds display
- Tabular number formatting for stable width

---

### `DateDisplay`

**File:** `src/components/DateDisplay.tsx`

Displays the current date with optional Hijri date.

**Props:**
```typescript
interface DateDisplayProps {
  showHijri?: boolean;
  className?: string;
}
```

**Features:**
- Gregorian date in localized format
- Optional Hijri (Islamic) date
- RTL support for Arabic

---

### `LocationBadge`

**File:** `src/components/LocationBadge.tsx`

Compact badge showing the user's configured location.

**Props:**
```typescript
interface LocationBadgeProps {
  className?: string;
}
```

**Features:**
- Shows city and country
- Map pin icon
- Glass-card styling

---

### `QiblahCompass`

**File:** `src/components/QiblahCompass.tsx`

Static SVG compass showing the direction to Mecca (Qiblah).

**Props:**
```typescript
interface QiblahCompassProps {
  degrees: number;        // Qiblah bearing in degrees (0-360)
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDegrees?: boolean;  // Show degree reading inside compass
}
```

**Size Variants:**
| Size | Dimensions | Use Case |
|------|------------|----------|
| `sm` | 48×48 px | Badges, compact displays |
| `md` | 80×80 px | Inline displays |
| `lg` | 140×140 px | Featured, standalone |

**Visual Elements:**
- Outer ring with gradient border
- Tick marks every 15° (major at 45°, cardinal at 90°)
- Cardinal direction labels (N, E, S, W)
- Gold gradient arrow pointing to Qiblah
- Kaaba symbol at arrow tip
- Center dot with primary color accent
- Optional degree reading

**Styling:**
- Uses CSS filters for glow effects
- SVG gradients for premium appearance
- Glass-effect background

**Usage:**
```tsx
<QiblahCompass degrees={135} size="md" showDegrees />
```

---

### `QiblahBadge`

**File:** `src/components/QiblahBadge.tsx`

Compact badge component combining `QiblahCompass` with direction text.

**Props:**
```typescript
interface QiblahBadgeProps {
  className?: string;
  compact?: boolean;  // Use smaller, inline variant
}
```

**Features:**
- Automatic Qiblah calculation from user location
- Shows compass + formatted direction (e.g., "135° SE")
- "Qiblah" label with gold accent
- Glass-card styling with fade-in animation
- Returns `null` if location is not configured

**Variants:**
- **Default:** Full badge with label and compass
- **Compact:** Smaller inline badge without label

**Usage:**
```tsx
// Full badge
<QiblahBadge />

// Compact inline variant
<QiblahBadge compact />
```

---

### `PrayerTimesGrid`

**File:** `src/components/PrayerTimesGrid.tsx`

Grid layout displaying all prayer times.

**Props:**
```typescript
interface PrayerTimesGridProps {
  prayers: Prayer[];
  nextPrayer?: Prayer;
  layout?: 'horizontal' | 'vertical' | 'grid';
  className?: string;
}
```

**Features:**
- Multiple layout options
- Highlights next prayer
- Shows passed prayers with reduced opacity
- Arabic and English prayer names

---

### `PrayerCard`

**File:** `src/components/PrayerCard.tsx`

Individual prayer time card.

**Props:**
```typescript
interface PrayerCardProps {
  prayer: Prayer;
  isNext?: boolean;
  isPassed?: boolean;
  showCountdown?: boolean;
  className?: string;
}
```

**Features:**
- Prayer name (Arabic and English)
- Prayer time
- Optional countdown for next prayer
- Visual indication for next/passed status

---

### `NavigationBar`

**File:** `src/components/NavigationBar.tsx`

TV-friendly navigation bar with keyboard support.

**Props:**
```typescript
interface NavigationBarProps {
  items: NavItem[];
  activeItem?: string;
  onSelect: (item: NavItem) => void;
}
```

**Features:**
- Horizontal button layout
- Keyboard navigation support
- Active state indication
- Focus management

---

### `NavLink`

**File:** `src/components/NavLink.tsx`

Navigation link component with active state styling.

**Props:**
```typescript
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}
```

---

### `InvocationsButton`

**File:** `src/components/InvocationsButton.tsx`

Button to open the invocations (adhkar) selection dialog.

**Props:**
```typescript
interface InvocationsButtonProps {
  onClick: () => void;
  compact?: boolean;
}
```

---

### `JawshanButton`

**File:** `src/components/JawshanButton.tsx`

Button to navigate to the Jawshan Kabir reader.

**Props:**
```typescript
interface JawshanButtonProps {
  onClick: () => void;
  compact?: boolean;
}
```

---

### `GlobalAudioPlayer`

**File:** `src/components/GlobalAudioPlayer.tsx`

Global audio player component managing all audio playback.

**Features:**
- Manages audio element lifecycle
- Handles play/pause/stop
- Volume control
- Track progress
- Supports Quran, Adhan, Invocations, Jawshan

---

### `MiniPlayer`

**File:** `src/components/MiniPlayer.tsx`

Minimized player bar shown at bottom of screen.

**Props:**
```typescript
interface MiniPlayerProps {
  isVisible: boolean;
  onExpand: () => void;
  onClose: () => void;
}
```

**Features:**
- Shows current track info
- Play/pause button
- Progress indicator
- Expand to full player

---

### `PrayerSelectionDialog`

**File:** `src/components/PrayerSelectionDialog.tsx`

Dialog for selecting prayers (used for invocations).

**Props:**
```typescript
interface PrayerSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (prayer: string) => void;
}
```

---

### `AdhanOverlay`

**File:** `src/components/AdhanOverlay.tsx`

Full-screen overlay shown during Adhan playback.

**Features:**
- Prayer name display
- Animated mosque silhouette
- Audio controls
- Auto-dismiss after Adhan ends

---

## Idle Layout Components

Located in `src/components/idle-layouts/`

All idle layouts implement the `IdleLayoutProps` interface:

```typescript
interface IdleLayoutProps {
  currentTime: Date;
  formatTime: (date: Date) => string;
  formatDate: (date: Date) => string;
  prayers: Prayer[];
  nextPrayer?: Prayer;
  timeUntilNextPrayer?: TimeUntil;
  hijriDate?: HijriDate;
  quoteOfTheDay: Quote;
  settings: AppSettings;
  isMiniPlayerVisible: boolean;
  onNavigate: (path: string) => void;
  onOpenInvocationsDialog: () => void;
  onOpenJawshan: () => void;
}
```

### `ClassicLayout`

Traditional layout with centered time and prayer grid footer.

**Features:**
- Large centered time display
- Date and Hijri date
- Next prayer countdown
- Quote of the day
- Prayer times footer grid
- Location badge with Qiblah compass

---

### `MinimalLayout`

Ultra-clean layout with minimal UI elements.

**Features:**
- Extra-large time (up to 20rem)
- Subtle header buttons
- Footer with next prayer indicator
- Qiblah direction text
- No prayer grid (maximally minimal)

---

### `SplitLayout`

Two-column layout with time/quote on left, prayers on right.

**Features:**
- Split-screen design
- Full prayer list with times
- Quote display
- Action buttons
- Location + Qiblah badges

---

### `PrayerFocusLayout`

Large prayer cards as the main focus.

**Features:**
- 3-column grid of prayer cards
- Clickable cards for next prayer
- Compact header with time/date
- Quote footer
- Qiblah badge in header

---

### `DashboardLayout`

Tile-based dashboard layout.

**Features:**
- Time tile with Qiblah badge
- Next prayer tile with countdown
- Prayer times row
- Quote tile
- Navigation buttons

---

## Screensaver Layout Components

Located in `src/components/screensaver-layouts/`

All screensaver layouts implement a similar props interface with transition support:

```typescript
interface ScreensaverLayoutProps {
  currentTime: Date;
  formatTime: (date: Date) => string;
  nextPrayer?: Prayer;
  timeUntilNextPrayer?: TimeUntil;
  currentQuote: Quote;
  isTransitioning: boolean;
  hijriDate?: HijriDate;
  settings: AppSettings;
}
```

### `ClassicScreensaverLayout`

**Features:**
- Time and date in top-left
- Next prayer in top-right
- Centered quote with fade transitions

---

### `MinimalScreensaverLayout`

**Features:**
- Ultra-minimal with just time
- Subtle prayer indicator
- Maximum focus on time display

---

### `AmbientScreensaverLayout`

**Features:**
- Floating elements with subtle movement
- Quote with ambient animations
- Calming, meditation-focused design

---

### `QuoteFocusScreensaverLayout`

**Features:**
- Large centered quote
- Time in corner
- Quote transitions with fade effects

---

### `PrayerFocusScreensaverLayout`

**Features:**
- Large next prayer display
- Arabic prayer name prominent
- Countdown timer
- Quote at bottom

---

## Player Components

Located in `src/components/player/`

### `QuranContent`

Full Quran player with verse-by-verse display.

**Features:**
- Arabic verse text
- English translation
- Verse number indicator
- Surah progress
- Audio controls
- Repeat options

---

### `AdhanContent`

Adhan player with visual display.

**Features:**
- Prayer name
- Mosque imagery
- Audio playback
- Stop/close controls

---

### `InvocationsContent`

Invocations (adhkar) player.

**Features:**
- Arabic text with translation
- Audio playback
- Progress through adhkar
- Category display (morning, evening, prayer-specific)

---

### `JawshanContent`

Jawshan Kabir reader and player.

**Features:**
- Section navigation (1-100)
- Line-by-line display
- Arabic with transliteration
- Audio playback per section
- Progress tracking
- Keyboard navigation

---

### `PlayerControls`

Shared player control components.

**Features:**
- Play/pause button
- Previous/next
- Progress slider
- Volume control
- Repeat toggle
- Minimize/close buttons

---

## UI Components

Located in `src/components/ui/`

These are shadcn/ui components built on Radix UI primitives. See the [shadcn/ui documentation](https://ui.shadcn.com/docs) for detailed usage.

### Key Components:

| Component | Purpose |
|-----------|---------|
| `Button` | Primary button component with variants |
| `Card` | Card container with header/content/footer |
| `Dialog` | Modal dialog |
| `Sheet` | Slide-out panel |
| `Tabs` | Tab navigation |
| `Select` | Dropdown select |
| `Switch` | Toggle switch |
| `Slider` | Range slider |
| `ScrollArea` | Custom scrollbar container |
| `Badge` | Status/label badge |
| `Toast` | Notification toast |
| `Tooltip` | Hover tooltip |

---

## Layout Preview Components

Located in `src/components/layout-previews/`

### `LayoutPreviewCard`

Preview card for idle layout selection.

**Props:**
```typescript
interface LayoutPreviewCardProps {
  layout: IdleLayout;
  isSelected: boolean;
  onSelect: () => void;
}
```

---

### `ScreensaverLayoutPreviewCard`

Preview card for screensaver layout selection.

**Props:**
```typescript
interface ScreensaverLayoutPreviewCardProps {
  layout: ScreensaverLayout;
  isSelected: boolean;
  onSelect: () => void;
}
```

---

## Component Best Practices

### Focus Management

For TV navigation support, add `data-focusable="true"`:

```tsx
<button data-focusable="true" onClick={handleClick}>
  Focusable Button
</button>
```

### Glass Card Styling

Use the `glass-card` class for consistent card styling:

```tsx
<div className="glass-card p-4">
  Card content
</div>
```

### Responsive Text

Use responsive text classes:

```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
  Responsive Heading
</h1>
```

### Animation Classes

Available animations:
- `animate-fade-in` - Fade in with slight upward movement
- `animate-scale-in` - Scale up with fade
- `animate-pulse` - Pulsing opacity
- `gold-glow` - Gold shadow glow effect

```tsx
<div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
  Animated content
</div>
```
