// Background images for Quran player based on surah themes
import bgCelestial from '@/assets/bg-celestial.jpg';
import bgParadise from '@/assets/bg-paradise.jpg';
import bgMountains from '@/assets/bg-mountains.jpg';
import bgOcean from '@/assets/bg-ocean.jpg';
import bgLight from '@/assets/bg-light.jpg';
import bgDesert from '@/assets/bg-desert.jpg';

export type BackgroundTheme = 'celestial' | 'paradise' | 'mountains' | 'ocean' | 'light' | 'desert';

// Map of background themes to their images
export const backgroundImages: Record<BackgroundTheme, string> = {
  celestial: bgCelestial,
  paradise: bgParadise,
  mountains: bgMountains,
  ocean: bgOcean,
  light: bgLight,
  desert: bgDesert,
};

// Surah themes based on their primary content and meaning
// Categories:
// - celestial: Creation, cosmos, Day of Judgment, stars, night
// - paradise: Jannah, gardens, rewards, blessings
// - mountains: Earth, nature, prophets' stories on mountains
// - ocean: Water, seas, life, Noah's story
// - light: Guidance, revelation, divine light, mercy
// - desert: Prophets' journeys, Makkah, Ibrahim, Hajj

const surahThemes: Record<number, BackgroundTheme> = {
  // Al-Fatiha - The Opening, seeking guidance
  1: 'light',
  
  // Al-Baqarah - The Cow, comprehensive guidance
  2: 'light',
  
  // Aal-Imran - Family of Imran
  3: 'light',
  
  // An-Nisa - Women, social laws
  4: 'paradise',
  
  // Al-Maida - The Table Spread
  5: 'paradise',
  
  // Al-An'am - Cattle, creation
  6: 'mountains',
  
  // Al-A'raf - The Heights
  7: 'mountains',
  
  // Al-Anfal - Spoils of War
  8: 'desert',
  
  // At-Tawbah - Repentance
  9: 'desert',
  
  // Yunus - Prophet Jonah
  10: 'ocean',
  
  // Hud - Prophet Hud
  11: 'desert',
  
  // Yusuf - Prophet Joseph
  12: 'desert',
  
  // Ar-Ra'd - Thunder
  13: 'celestial',
  
  // Ibrahim - Prophet Abraham
  14: 'desert',
  
  // Al-Hijr - Rocky Tract
  15: 'mountains',
  
  // An-Nahl - The Bee, nature
  16: 'paradise',
  
  // Al-Isra - Night Journey
  17: 'celestial',
  
  // Al-Kahf - The Cave
  18: 'mountains',
  
  // Maryam - Mary
  19: 'paradise',
  
  // Ta-Ha - Prophet Moses
  20: 'desert',
  
  // Al-Anbiya - The Prophets
  21: 'light',
  
  // Al-Hajj - Pilgrimage
  22: 'desert',
  
  // Al-Mu'minun - The Believers
  23: 'paradise',
  
  // An-Nur - The Light
  24: 'light',
  
  // Al-Furqan - The Criterion
  25: 'light',
  
  // Ash-Shu'ara - The Poets
  26: 'desert',
  
  // An-Naml - The Ants
  27: 'mountains',
  
  // Al-Qasas - The Story (Moses)
  28: 'desert',
  
  // Al-Ankabut - The Spider
  29: 'desert',
  
  // Ar-Rum - Romans
  30: 'celestial',
  
  // Luqman - Wise man
  31: 'light',
  
  // As-Sajdah - Prostration
  32: 'light',
  
  // Al-Ahzab - Confederates
  33: 'desert',
  
  // Saba - Sheba
  34: 'paradise',
  
  // Fatir - Originator
  35: 'celestial',
  
  // Ya-Sin - Heart of Quran
  36: 'light',
  
  // As-Saffat - Those in Ranks
  37: 'celestial',
  
  // Sad - Letter Sad
  38: 'mountains',
  
  // Az-Zumar - Groups
  39: 'celestial',
  
  // Ghafir - Forgiver
  40: 'light',
  
  // Fussilat - Explained in Detail
  41: 'celestial',
  
  // Ash-Shura - Consultation
  42: 'ocean',
  
  // Az-Zukhruf - Gold Ornaments
  43: 'paradise',
  
  // Ad-Dukhan - Smoke
  44: 'celestial',
  
  // Al-Jathiyah - Kneeling
  45: 'celestial',
  
  // Al-Ahqaf - Sand Dunes
  46: 'desert',
  
  // Muhammad - The Prophet
  47: 'paradise',
  
  // Al-Fath - Victory
  48: 'desert',
  
  // Al-Hujurat - Chambers
  49: 'light',
  
  // Qaf - Letter Qaf
  50: 'celestial',
  
  // Adh-Dhariyat - Winnowing Winds
  51: 'desert',
  
  // At-Tur - The Mount
  52: 'mountains',
  
  // An-Najm - The Star
  53: 'celestial',
  
  // Al-Qamar - The Moon
  54: 'celestial',
  
  // Ar-Rahman - The Merciful
  55: 'paradise',
  
  // Al-Waqi'ah - The Event
  56: 'celestial',
  
  // Al-Hadid - Iron
  57: 'celestial',
  
  // Al-Mujadilah - Pleading Woman
  58: 'light',
  
  // Al-Hashr - Gathering
  59: 'light',
  
  // Al-Mumtahanah - Examined Woman
  60: 'light',
  
  // As-Saff - Ranks
  61: 'light',
  
  // Al-Jumu'ah - Friday
  62: 'light',
  
  // Al-Munafiqun - Hypocrites
  63: 'desert',
  
  // At-Taghabun - Loss & Gain
  64: 'light',
  
  // At-Talaq - Divorce
  65: 'light',
  
  // At-Tahrim - Prohibition
  66: 'light',
  
  // Al-Mulk - Sovereignty
  67: 'celestial',
  
  // Al-Qalam - The Pen
  68: 'ocean',
  
  // Al-Haqqah - Reality
  69: 'celestial',
  
  // Al-Ma'arij - Ascending Ways
  70: 'celestial',
  
  // Nuh - Prophet Noah
  71: 'ocean',
  
  // Al-Jinn - The Jinn
  72: 'celestial',
  
  // Al-Muzzammil - Wrapped One
  73: 'light',
  
  // Al-Muddaththir - Cloaked One
  74: 'light',
  
  // Al-Qiyamah - Resurrection
  75: 'celestial',
  
  // Al-Insan - Human
  76: 'paradise',
  
  // Al-Mursalat - Those Sent
  77: 'celestial',
  
  // An-Naba - The News
  78: 'celestial',
  
  // An-Nazi'at - Those Who Pull Out
  79: 'celestial',
  
  // Abasa - He Frowned
  80: 'light',
  
  // At-Takwir - Folding Up
  81: 'celestial',
  
  // Al-Infitar - Splitting
  82: 'celestial',
  
  // Al-Mutaffifin - Defrauders
  83: 'light',
  
  // Al-Inshiqaq - Splitting Asunder
  84: 'celestial',
  
  // Al-Buruj - Constellations
  85: 'celestial',
  
  // At-Tariq - Night Star
  86: 'celestial',
  
  // Al-A'la - The Most High
  87: 'light',
  
  // Al-Ghashiyah - Overwhelming
  88: 'celestial',
  
  // Al-Fajr - Dawn
  89: 'celestial',
  
  // Al-Balad - The City
  90: 'desert',
  
  // Ash-Shams - The Sun
  91: 'celestial',
  
  // Al-Layl - The Night
  92: 'celestial',
  
  // Ad-Duha - Morning Light
  93: 'light',
  
  // Ash-Sharh - Relief
  94: 'light',
  
  // At-Tin - The Fig
  95: 'mountains',
  
  // Al-Alaq - The Clot
  96: 'light',
  
  // Al-Qadr - Power/Destiny
  97: 'celestial',
  
  // Al-Bayyinah - Clear Evidence
  98: 'light',
  
  // Az-Zalzalah - Earthquake
  99: 'mountains',
  
  // Al-Adiyat - War Horses
  100: 'desert',
  
  // Al-Qari'ah - Calamity
  101: 'celestial',
  
  // At-Takathur - Rivalry
  102: 'light',
  
  // Al-Asr - Time
  103: 'celestial',
  
  // Al-Humazah - Slanderer
  104: 'light',
  
  // Al-Fil - The Elephant
  105: 'desert',
  
  // Quraysh - Tribe of Quraysh
  106: 'desert',
  
  // Al-Ma'un - Small Kindness
  107: 'light',
  
  // Al-Kawthar - Abundance
  108: 'paradise',
  
  // Al-Kafirun - Disbelievers
  109: 'light',
  
  // An-Nasr - Victory
  110: 'light',
  
  // Al-Masad - Palm Fiber
  111: 'desert',
  
  // Al-Ikhlas - Sincerity
  112: 'light',
  
  // Al-Falaq - Daybreak
  113: 'celestial',
  
  // An-Nas - Mankind
  114: 'light',
};

/**
 * Get the background image for a specific surah based on its theme
 */
export function getSurahBackground(surahNumber: number): string {
  const theme = surahThemes[surahNumber] || 'light';
  return backgroundImages[theme];
}

/**
 * Get the background theme name for a specific surah
 */
export function getSurahTheme(surahNumber: number): BackgroundTheme {
  return surahThemes[surahNumber] || 'light';
}
