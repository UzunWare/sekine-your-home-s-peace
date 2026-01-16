// Invocations (Adhkar) after daily prayers

export interface Invocation {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  repetitions: number;
  source?: string;
}

export interface PrayerInvocations {
  prayerId: string;
  prayerName: string;
  arabicName: string;
  invocations: Invocation[];
}

// Common invocations after all prayers
const commonInvocations: Invocation[] = [
  {
    id: 'istighfar',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    translation: 'I seek forgiveness from Allah',
    repetitions: 3,
    source: 'Muslim'
  },
  {
    id: 'allahumma-antas-salam',
    arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration: "Allahumma antas-salam wa minkas-salam, tabarakta ya dhal-jalali wal-ikram",
    translation: 'O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of Glory and Honor.',
    repetitions: 1,
    source: 'Muslim'
  },
  {
    id: 'la-ilaha-illallah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    translation: 'There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is Able to do all things.',
    repetitions: 1,
    source: 'Bukhari & Muslim'
  },
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    translation: 'Glory be to Allah',
    repetitions: 33,
    source: 'Bukhari & Muslim'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'All praise is due to Allah',
    repetitions: 33,
    source: 'Bukhari & Muslim'
  },
  {
    id: 'allahu-akbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    repetitions: 33,
    source: 'Bukhari & Muslim'
  },
  {
    id: 'tahlil-complete',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    translation: 'There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is Able to do all things.',
    repetitions: 1,
    source: 'Muslim'
  },
  {
    id: 'ayatul-kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: "Allahu la ilaha illa huwal-hayyul-qayyum. La ta'khuzuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man zallazhi yashfa'u 'indahu illa bi-iznih. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi-shay'in min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifzuhuma wa huwal-'aliyyul-'azim.",
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth...',
    repetitions: 1,
    source: 'Quran 2:255'
  }
];

// Fajr-specific invocations (morning adhkar)
const fajrSpecificInvocations: Invocation[] = [
  {
    id: 'fajr-morning-dua',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: "Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah",
    translation: 'We have entered a new day and with it all dominion belongs to Allah. Praise is to Allah. None has the right to be worshipped but Allah alone, with no partner.',
    repetitions: 1,
    source: 'Abu Dawud'
  },
  {
    id: 'fajr-sayyid-istighfar',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
    transliteration: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata't",
    translation: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide to Your covenant and promise as best I can.',
    repetitions: 1,
    source: 'Bukhari'
  }
];

// Maghrib-specific invocations (evening adhkar)
const maghribSpecificInvocations: Invocation[] = [
  {
    id: 'maghrib-evening-dua',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: "Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah",
    translation: 'We have entered the evening and with it all dominion belongs to Allah. Praise is to Allah. None has the right to be worshipped but Allah alone, with no partner.',
    repetitions: 1,
    source: 'Abu Dawud'
  },
  {
    id: 'maghrib-protection',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: "A'udhu bi-kalimatillahit-tammati min sharri ma khalaq",
    translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    repetitions: 3,
    source: 'Muslim'
  }
];

export const prayerInvocations: PrayerInvocations[] = [
  {
    prayerId: 'fajr',
    prayerName: 'Fajr',
    arabicName: 'الفجر',
    invocations: [...commonInvocations, ...fajrSpecificInvocations]
  },
  {
    prayerId: 'dhuhr',
    prayerName: 'Dhuhr',
    arabicName: 'الظهر',
    invocations: [...commonInvocations]
  },
  {
    prayerId: 'asr',
    prayerName: 'Asr',
    arabicName: 'العصر',
    invocations: [...commonInvocations]
  },
  {
    prayerId: 'maghrib',
    prayerName: 'Maghrib',
    arabicName: 'المغرب',
    invocations: [...commonInvocations, ...maghribSpecificInvocations]
  },
  {
    prayerId: 'isha',
    prayerName: 'Isha',
    arabicName: 'العشاء',
    invocations: [...commonInvocations]
  }
];

export const getPrayerInvocations = (prayerId: string): PrayerInvocations | undefined => {
  return prayerInvocations.find(p => p.prayerId === prayerId);
};
