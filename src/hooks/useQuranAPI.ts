import { useQuery } from '@tanstack/react-query';
import { 
  fetchChapters, 
  fetchAllVerses, 
  fetchAudioTimings, 
  fetchChapterAudio,
  fetchChapterInfo 
} from '@/lib/quranAPI';
import { Chapter, VerseWithTranslation, VerseTiming } from '@/types/quran';

// Fetch all chapters (surahs)
export function useChapters() {
  return useQuery<Chapter[]>({
    queryKey: ['quran', 'chapters'],
    queryFn: fetchChapters,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}

// Fetch verses for a chapter with translation
export function useVerses(chapterNumber: number, translationLanguage: string = 'en') {
  return useQuery<VerseWithTranslation[]>({
    queryKey: ['quran', 'verses', chapterNumber, translationLanguage],
    queryFn: () => fetchAllVerses(chapterNumber, translationLanguage),
    enabled: chapterNumber > 0,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}

// Fetch audio timings for a chapter
export function useAudioTimings(chapterNumber: number, reciterId: string = 'mishary') {
  return useQuery<VerseTiming[]>({
    queryKey: ['quran', 'timings', chapterNumber, reciterId],
    queryFn: () => fetchAudioTimings(chapterNumber, reciterId),
    enabled: chapterNumber > 0,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}

// Fetch chapter audio URL
export function useChapterAudio(chapterNumber: number, reciterId: string = 'mishary') {
  return useQuery<string>({
    queryKey: ['quran', 'audio', chapterNumber, reciterId],
    queryFn: () => fetchChapterAudio(chapterNumber, reciterId),
    enabled: chapterNumber > 0,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}

// Fetch chapter info
export function useChapterInfo(chapterNumber: number) {
  return useQuery<Chapter>({
    queryKey: ['quran', 'chapter', chapterNumber],
    queryFn: () => fetchChapterInfo(chapterNumber),
    enabled: chapterNumber > 0,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

// Combined hook for player - fetches verses, timings, and audio URL together
export function useQuranPlayer(
  chapterNumber: number, 
  reciterId: string = 'mishary',
  translationLanguage: string = 'en'
) {
  const verses = useVerses(chapterNumber, translationLanguage);
  const timings = useAudioTimings(chapterNumber, reciterId);
  const audioUrl = useChapterAudio(chapterNumber, reciterId);
  const chapterInfo = useChapterInfo(chapterNumber);

  return {
    verses: verses.data || [],
    timings: timings.data || [],
    audioUrl: audioUrl.data || '',
    chapterInfo: chapterInfo.data,
    isLoading: verses.isLoading || timings.isLoading || audioUrl.isLoading || chapterInfo.isLoading,
    error: verses.error || timings.error || audioUrl.error || chapterInfo.error,
    refetch: () => {
      verses.refetch();
      timings.refetch();
      audioUrl.refetch();
      chapterInfo.refetch();
    },
  };
}
