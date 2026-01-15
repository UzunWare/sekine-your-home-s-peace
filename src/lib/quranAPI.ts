// Quran.com API v4 Integration
import { 
  Chapter, 
  VersesResponse, 
  VerseWithTranslation, 
  VerseTiming, 
  AudioTimingsResponse,
  TRANSLATION_RESOURCES,
  RECITER_IDS 
} from '@/types/quran';

const API_BASE = 'https://api.quran.com/api/v4';
const AUDIO_CDN = 'https://verses.quran.com';

// Get all chapters (surahs)
export async function fetchChapters(): Promise<Chapter[]> {
  const response = await fetch(`${API_BASE}/chapters`);
  if (!response.ok) throw new Error('Failed to fetch chapters');
  const data = await response.json();
  return data.chapters;
}

// Get verses for a chapter with translation
export async function fetchVerses(
  chapterNumber: number,
  translationLanguage: string = 'en',
  page: number = 1,
  perPage: number = 50
): Promise<VersesResponse> {
  const translationId = TRANSLATION_RESOURCES[translationLanguage] || TRANSLATION_RESOURCES.en;
  
  const params = new URLSearchParams({
    translations: translationId.toString(),
    fields: 'text_uthmani',
    page: page.toString(),
    per_page: perPage.toString(),
  });
  
  const response = await fetch(`${API_BASE}/verses/by_chapter/${chapterNumber}?${params}`);
  if (!response.ok) throw new Error('Failed to fetch verses');
  return response.json();
}

// Get all verses for a chapter (handles pagination)
export async function fetchAllVerses(
  chapterNumber: number,
  translationLanguage: string = 'en'
): Promise<VerseWithTranslation[]> {
  const allVerses: VerseWithTranslation[] = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetchVerses(chapterNumber, translationLanguage, page, 50);
    allVerses.push(...response.verses);
    hasMore = response.pagination.next_page !== null;
    page++;
  }
  
  return allVerses;
}

// Get audio timing for a chapter (from chapter_recitations endpoint which includes timestamps)
export async function fetchAudioTimings(
  chapterNumber: number,
  reciterId: string = 'mishary'
): Promise<VerseTiming[]> {
  const reciterApiId = RECITER_IDS[reciterId] || RECITER_IDS.mishary;
  
  const response = await fetch(
    `${API_BASE}/chapter_recitations/${reciterApiId}/${chapterNumber}`
  );
  if (!response.ok) throw new Error('Failed to fetch audio timings');
  
  const data = await response.json();
  
  // The timestamps are in audio_file.timestamps for chapter_recitations endpoint
  if (data.audio_file?.timestamps) {
    return data.audio_file.timestamps;
  }
  
  return [];
}

// Get chapter audio file URL
export async function fetchChapterAudio(
  chapterNumber: number,
  reciterId: string = 'mishary'
): Promise<string> {
  const reciterApiId = RECITER_IDS[reciterId] || RECITER_IDS.mishary;
  
  const response = await fetch(
    `${API_BASE}/chapter_recitations/${reciterApiId}/${chapterNumber}`
  );
  if (!response.ok) throw new Error('Failed to fetch chapter audio');
  
  const data = await response.json();
  return data.audio_file?.audio_url || '';
}

// Get individual verse audio URL
export function getVerseAudioUrl(verseKey: string, reciterId: string = 'mishary'): string {
  const reciterApiId = RECITER_IDS[reciterId] || RECITER_IDS.mishary;
  // Format: verses.quran.com/{reciter_id}/{verse_key}.mp3
  const formattedKey = verseKey.replace(':', '/').padStart(6, '0');
  return `${AUDIO_CDN}/${reciterApiId}/${formattedKey}.mp3`;
}

// Get chapter info
export async function fetchChapterInfo(chapterNumber: number): Promise<Chapter> {
  const response = await fetch(`${API_BASE}/chapters/${chapterNumber}`);
  if (!response.ok) throw new Error('Failed to fetch chapter info');
  const data = await response.json();
  return data.chapter;
}

// Reciter info mapping
export const RECITERS_INFO: Record<string, { name: string; arabicName: string; nationality: string }> = {
  mishary: { name: 'Mishary Rashid Alafasy', arabicName: 'مشاري راشد العفاسي', nationality: 'Kuwait' },
  sudais: { name: 'Abdul Rahman Al-Sudais', arabicName: 'عبد الرحمن السديس', nationality: 'Saudi Arabia' },
  minshawi: { name: 'Mohamed Siddiq al-Minshawi', arabicName: 'محمد صديق المنشاوي', nationality: 'Egypt' },
  husary: { name: 'Mahmoud Khalil Al-Husary', arabicName: 'محمود خليل الحصري', nationality: 'Egypt' },
  ghamdi: { name: 'Saad Al Ghamdi', arabicName: 'سعد الغامدي', nationality: 'Saudi Arabia' },
  ajmi: { name: 'Ahmed ibn Ali al-Ajmi', arabicName: 'أحمد بن علي العجمي', nationality: 'Saudi Arabia' },
};

// Translation info
export const TRANSLATIONS_INFO: Record<string, { name: string; author: string }> = {
  en: { name: 'English', author: 'Saheeh International' },
  ar: { name: 'Arabic', author: 'Original' },
  ur: { name: 'Urdu', author: 'Fateh Muhammad Jalandhari' },
  fr: { name: 'French', author: 'Muhammad Hamidullah' },
  es: { name: 'Spanish', author: 'Julio Cortes' },
  tr: { name: 'Turkish', author: 'Diyanet Isleri' },
  id: { name: 'Indonesian', author: 'Ministry of Religious Affairs' },
  bn: { name: 'Bengali', author: 'Taisirul Quran' },
  de: { name: 'German', author: 'Bubenheim & Elyas' },
  ru: { name: 'Russian', author: 'Kuliev' },
};
