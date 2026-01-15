// Juz (parts) of the Quran - 30 parts
export interface Juz {
  number: number;
  arabicName: string;
  englishName: string;
  startSurah: number;
  startVerse: number;
  endSurah: number;
  endVerse: number;
}

export const juzData: Juz[] = [
  { number: 1, arabicName: 'الجزء الأول', englishName: 'Alif Lam Mim', startSurah: 1, startVerse: 1, endSurah: 2, endVerse: 141 },
  { number: 2, arabicName: 'الجزء الثاني', englishName: 'Sayaqul', startSurah: 2, startVerse: 142, endSurah: 2, endVerse: 252 },
  { number: 3, arabicName: 'الجزء الثالث', englishName: 'Tilkar Rusul', startSurah: 2, startVerse: 253, endSurah: 3, endVerse: 92 },
  { number: 4, arabicName: 'الجزء الرابع', englishName: 'Lan Tanaloo', startSurah: 3, startVerse: 93, endSurah: 4, endVerse: 23 },
  { number: 5, arabicName: 'الجزء الخامس', englishName: 'Wal Muhsanat', startSurah: 4, startVerse: 24, endSurah: 4, endVerse: 147 },
  { number: 6, arabicName: 'الجزء السادس', englishName: 'La Yuhibbullah', startSurah: 4, startVerse: 148, endSurah: 5, endVerse: 81 },
  { number: 7, arabicName: 'الجزء السابع', englishName: 'Wa Iza Samiu', startSurah: 5, startVerse: 82, endSurah: 6, endVerse: 110 },
  { number: 8, arabicName: 'الجزء الثامن', englishName: 'Wa Law Annana', startSurah: 6, startVerse: 111, endSurah: 7, endVerse: 87 },
  { number: 9, arabicName: 'الجزء التاسع', englishName: 'Qalal Malao', startSurah: 7, startVerse: 88, endSurah: 8, endVerse: 40 },
  { number: 10, arabicName: 'الجزء العاشر', englishName: 'Wa Alamu', startSurah: 8, startVerse: 41, endSurah: 9, endVerse: 92 },
  { number: 11, arabicName: 'الجزء الحادي عشر', englishName: 'Yatazeroon', startSurah: 9, startVerse: 93, endSurah: 11, endVerse: 5 },
  { number: 12, arabicName: 'الجزء الثاني عشر', englishName: 'Wa Ma Min Dabbah', startSurah: 11, startVerse: 6, endSurah: 12, endVerse: 52 },
  { number: 13, arabicName: 'الجزء الثالث عشر', englishName: 'Wa Ma Ubarrio', startSurah: 12, startVerse: 53, endSurah: 14, endVerse: 52 },
  { number: 14, arabicName: 'الجزء الرابع عشر', englishName: 'Rubama', startSurah: 15, startVerse: 1, endSurah: 16, endVerse: 128 },
  { number: 15, arabicName: 'الجزء الخامس عشر', englishName: 'Subhanallazi', startSurah: 17, startVerse: 1, endSurah: 18, endVerse: 74 },
  { number: 16, arabicName: 'الجزء السادس عشر', englishName: 'Qal Alam', startSurah: 18, startVerse: 75, endSurah: 20, endVerse: 135 },
  { number: 17, arabicName: 'الجزء السابع عشر', englishName: 'Iqtaraba', startSurah: 21, startVerse: 1, endSurah: 22, endVerse: 78 },
  { number: 18, arabicName: 'الجزء الثامن عشر', englishName: 'Qad Aflaha', startSurah: 23, startVerse: 1, endSurah: 25, endVerse: 20 },
  { number: 19, arabicName: 'الجزء التاسع عشر', englishName: 'Wa Qalallazina', startSurah: 25, startVerse: 21, endSurah: 27, endVerse: 55 },
  { number: 20, arabicName: 'الجزء العشرون', englishName: 'Amman Khalaq', startSurah: 27, startVerse: 56, endSurah: 29, endVerse: 45 },
  { number: 21, arabicName: 'الجزء الحادي والعشرون', englishName: 'Utlu Ma Oohi', startSurah: 29, startVerse: 46, endSurah: 33, endVerse: 30 },
  { number: 22, arabicName: 'الجزء الثاني والعشرون', englishName: 'Wa Manyaqnut', startSurah: 33, startVerse: 31, endSurah: 36, endVerse: 27 },
  { number: 23, arabicName: 'الجزء الثالث والعشرون', englishName: 'Wa Mali', startSurah: 36, startVerse: 28, endSurah: 39, endVerse: 31 },
  { number: 24, arabicName: 'الجزء الرابع والعشرون', englishName: 'Faman Azlam', startSurah: 39, startVerse: 32, endSurah: 41, endVerse: 46 },
  { number: 25, arabicName: 'الجزء الخامس والعشرون', englishName: 'Elaih Yuraddo', startSurah: 41, startVerse: 47, endSurah: 45, endVerse: 37 },
  { number: 26, arabicName: 'الجزء السادس والعشرون', englishName: 'Ha Mim', startSurah: 46, startVerse: 1, endSurah: 51, endVerse: 30 },
  { number: 27, arabicName: 'الجزء السابع والعشرون', englishName: 'Qala Fama Khatbukum', startSurah: 51, startVerse: 31, endSurah: 57, endVerse: 29 },
  { number: 28, arabicName: 'الجزء الثامن والعشرون', englishName: 'Qad Sami Allah', startSurah: 58, startVerse: 1, endSurah: 66, endVerse: 12 },
  { number: 29, arabicName: 'الجزء التاسع والعشرون', englishName: 'Tabarakallazi', startSurah: 67, startVerse: 1, endSurah: 77, endVerse: 50 },
  { number: 30, arabicName: 'الجزء الثلاثون', englishName: 'Amma Yatasa\'aloon', startSurah: 78, startVerse: 1, endSurah: 114, endVerse: 6 },
];
