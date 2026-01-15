import { Reciter, AdhanStyle } from '@/types/app';

export const quranReciters: Reciter[] = [
  { id: 'mishary', name: 'Mishary Rashid Alafasy', nationality: 'Kuwait' },
  { id: 'sudais', name: 'Abdul Rahman Al-Sudais', nationality: 'Saudi Arabia' },
  { id: 'abdul-basit', name: 'Abdul Basit Abdul Samad', nationality: 'Egypt' },
  { id: 'hussary', name: 'Mahmoud Khalil Al-Hussary', nationality: 'Egypt' },
  { id: 'ghamdi', name: 'Saad Al-Ghamdi', nationality: 'Saudi Arabia' },
  { id: 'shatri', name: 'Abu Bakr Al-Shatri', nationality: 'Saudi Arabia' },
  { id: 'rifai', name: 'Hani Ar-Rifai', nationality: 'Saudi Arabia' },
  { id: 'muaiqly', name: 'Maher Al-Muaiqly', nationality: 'Saudi Arabia' },
];

// Alias for backward compatibility
export const reciters = quranReciters;

export const adhanStyles: AdhanStyle[] = [
  { id: 'makkah', name: 'Makkah', origin: 'Masjid al-Haram' },
  { id: 'madinah', name: 'Madinah', origin: 'Masjid an-Nabawi' },
  { id: 'mishary', name: 'Mishary Alafasy', origin: 'Kuwait' },
  { id: 'nasser', name: 'Nasser Alqatami', origin: 'Saudi Arabia' },
  { id: 'mansoor', name: 'Mansoor Azzahrani', origin: 'Saudi Arabia' },
  { id: 'ahmad', name: 'Ahmad Nuayna', origin: 'Egypt' },
  { id: 'hamad', name: 'Hamad Deghreri', origin: 'Saudi Arabia' },
];

export const calculationMethods = [
  { id: 'ISNA', name: 'Islamic Society of North America (ISNA)', description: 'Used in North America' },
  { id: 'MWL', name: 'Muslim World League', description: 'Used in Europe, Far East, parts of USA' },
  { id: 'UmmAlQura', name: 'Umm Al-Qura University, Makkah', description: 'Used in Saudi Arabia' },
  { id: 'Egyptian', name: 'Egyptian General Authority of Survey', description: 'Used in Africa, Syria, Lebanon' },
  { id: 'Karachi', name: 'University of Islamic Sciences, Karachi', description: 'Used in Pakistan, Afghanistan, India' },
  { id: 'Tehran', name: 'Institute of Geophysics, University of Tehran', description: 'Used in Iran' },
  { id: 'Gulf', name: 'Gulf Region', description: 'Used in Gulf countries' },
  { id: 'Kuwait', name: 'Kuwait', description: 'Used in Kuwait' },
] as const;
