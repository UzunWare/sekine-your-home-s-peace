// Quran API Types for Quran.com API v4

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string; // e.g., "1:1"
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number | null;
  page_number: number;
  juz_number: number;
  text_uthmani: string;
  text_imlaei?: string;
}

export interface Translation {
  id: number;
  resource_id: number;
  text: string;
  language_name: string;
  resource_name?: string;
}

export interface VerseWithTranslation extends Verse {
  translations: Translation[];
}

export interface VerseTiming {
  verse_key: string;
  timestamp_from: number; // milliseconds
  timestamp_to: number; // milliseconds
  duration: number;
  segments: [number, number, number, number][]; // [word_position, start_ms, end_ms, duration]
}

export interface AudioFile {
  id: number;
  chapter_id: number;
  file_size: number;
  format: string;
  audio_url: string;
}

export interface RecitationInfo {
  id: number;
  reciter_name: string;
  style: string | null;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface Chapter {
  id: number;
  revelation_place: 'makkah' | 'madinah';
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: [number, number];
  translated_name: {
    language_name: string;
    name: string;
  };
}

// API Response types
export interface VersesResponse {
  verses: VerseWithTranslation[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
}

export interface AudioTimingsResponse {
  audio_files: {
    verse_timings: VerseTiming[];
  }[];
}

export interface ChapterAudioResponse {
  audio_file: AudioFile;
}

// Translation resource IDs from Quran.com
export const TRANSLATION_RESOURCES: Record<string, number> = {
  en: 20, // Saheeh International
  ar: 1, // Arabic (no translation needed, but for consistency)
  ur: 54, // Fateh Muhammad Jalandhari
  fr: 31, // Muhammad Hamidullah
  es: 83, // Julio Cortes
  tr: 77, // Diyanet Isleri
  id: 33, // Indonesian Ministry of Religious Affairs
  bn: 163, // Taisirul Quran
  de: 27, // Bubenheim & Elyas
  ru: 45, // Kuliev
};

// Reciter IDs from Quran.com
export const RECITER_IDS: Record<string, number> = {
  mishary: 7, // Mishary Rashid Alafasy
  sudais: 6, // Abdul Rahman Al-Sudais
  minshawi: 9, // Mohamed Siddiq al-Minshawi
  husary: 5, // Mahmoud Khalil Al-Husary
  ghamdi: 8, // Saad Al Ghamdi
  ajmi: 2, // Ahmed ibn Ali al-Ajmi
};

export interface QuranPlayerState {
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  reciterId: string;
  reciterName: string;
  verses: VerseWithTranslation[];
  verseTimings: VerseTiming[];
  audioUrl: string;
  currentVerseKey: string | null;
  isLoading: boolean;
  error: string | null;
}
