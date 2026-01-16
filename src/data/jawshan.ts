// Jawshan Kabir (Cevşen-ül Kebir) Data
// An Islamic supplication containing 100 sections with 10 divine names/attributes each

export interface JawshanLine {
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface JawshanSection {
  sectionNumber: number;
  arabicTitle: string;
  lines: JawshanLine[];
  closingPhrase: JawshanLine;
  audioUrl?: string; // Optional audio recitation URL for this section
}

// Common closing phrase for all sections
const closingPhrase: JawshanLine = {
  arabic: 'سُبْحَانَكَ يَا لَا إِلَهَ إِلَّا أَنْتَ، الْأَمَانَ الْأَمَانَ، خَلِّصْنَا مِنَ النَّارِ',
  transliteration: "Subhanaka ya la ilaha illa ant, al-aman al-aman, khallisna min an-nar",
  translation: "Glory be to You, there is no god but You. Safety, safety, save us from the Fire."
};

// The 100 sections of Jawshan Kabir
export const jawshanSections: JawshanSection[] = [
  {
    sectionNumber: 1,
    arabicTitle: 'الفَصْلُ الأَوَّلُ',
    lines: [
      { arabic: 'يَا اللهُ', transliteration: 'Ya Allah', translation: 'O Allah' },
      { arabic: 'يَا رَحْمَنُ', transliteration: 'Ya Rahman', translation: 'O Most Gracious' },
      { arabic: 'يَا رَحِيمُ', transliteration: 'Ya Rahim', translation: 'O Most Merciful' },
      { arabic: 'يَا غَفُورُ', transliteration: 'Ya Ghafur', translation: 'O Most Forgiving' },
      { arabic: 'يَا وَدُودُ', transliteration: 'Ya Wadud', translation: 'O Most Loving' },
      { arabic: 'يَا شَكُورُ', transliteration: 'Ya Shakur', translation: 'O Most Appreciative' },
      { arabic: 'يَا صَبُورُ', transliteration: 'Ya Sabur', translation: 'O Most Patient' },
      { arabic: 'يَا حَلِيمُ', transliteration: 'Ya Halim', translation: 'O Most Forbearing' },
      { arabic: 'يَا كَرِيمُ', transliteration: 'Ya Karim', translation: 'O Most Generous' },
      { arabic: 'يَا عَظِيمُ', transliteration: 'Ya Azim', translation: 'O Most Great' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 2,
    arabicTitle: 'الفَصْلُ الثَّانِي',
    lines: [
      { arabic: 'يَا سَيِّدَ السَّادَاتِ', transliteration: 'Ya Sayyid as-Sadat', translation: 'O Master of masters' },
      { arabic: 'يَا مُجِيبَ الدَّعَوَاتِ', transliteration: 'Ya Mujib ad-Da\'awat', translation: 'O Answerer of prayers' },
      { arabic: 'يَا رَافِعَ الدَّرَجَاتِ', transliteration: 'Ya Rafi\' ad-Darajat', translation: 'O Elevator of ranks' },
      { arabic: 'يَا وَلِيَّ الْحَسَنَاتِ', transliteration: 'Ya Waliy al-Hasanat', translation: 'O Guardian of good deeds' },
      { arabic: 'يَا غَافِرَ الْخَطِيئَاتِ', transliteration: 'Ya Ghafir al-Khati\'at', translation: 'O Forgiver of sins' },
      { arabic: 'يَا مُعْطِيَ الْمَسْأَلَاتِ', transliteration: 'Ya Mu\'ti al-Mas\'alat', translation: 'O Giver of requests' },
      { arabic: 'يَا قَابِلَ التَّوْبَاتِ', transliteration: 'Ya Qabil at-Tawbat', translation: 'O Accepter of repentance' },
      { arabic: 'يَا سَامِعَ الْأَصْوَاتِ', transliteration: 'Ya Sami\' al-Aswat', translation: 'O Hearer of voices' },
      { arabic: 'يَا عَالِمَ الْخَفِيَّاتِ', transliteration: 'Ya \'Alim al-Khafiyyat', translation: 'O Knower of secrets' },
      { arabic: 'يَا دَافِعَ الْبَلِيَّاتِ', transliteration: 'Ya Dafi\' al-Baliyyat', translation: 'O Repeller of afflictions' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 3,
    arabicTitle: 'الفَصْلُ الثَّالِثُ',
    lines: [
      { arabic: 'يَا خَيْرَ الْغَافِرِينَ', transliteration: 'Ya Khayr al-Ghafirin', translation: 'O Best of forgivers' },
      { arabic: 'يَا خَيْرَ النَّاصِرِينَ', transliteration: 'Ya Khayr an-Nasirin', translation: 'O Best of helpers' },
      { arabic: 'يَا خَيْرَ الْحَاكِمِينَ', transliteration: 'Ya Khayr al-Hakimin', translation: 'O Best of judges' },
      { arabic: 'يَا خَيْرَ الْفَاتِحِينَ', transliteration: 'Ya Khayr al-Fatihin', translation: 'O Best of openers' },
      { arabic: 'يَا خَيْرَ الذَّاكِرِينَ', transliteration: 'Ya Khayr adh-Dhakirin', translation: 'O Best of rememberers' },
      { arabic: 'يَا خَيْرَ الْوَارِثِينَ', transliteration: 'Ya Khayr al-Warithin', translation: 'O Best of inheritors' },
      { arabic: 'يَا خَيْرَ الْحَامِدِينَ', transliteration: 'Ya Khayr al-Hamidin', translation: 'O Best of praisers' },
      { arabic: 'يَا خَيْرَ الرَّازِقِينَ', transliteration: 'Ya Khayr ar-Raziqin', translation: 'O Best of providers' },
      { arabic: 'يَا خَيْرَ الْفَاصِلِينَ', transliteration: 'Ya Khayr al-Fasilin', translation: 'O Best of deciders' },
      { arabic: 'يَا خَيْرَ الْمُحْسِنِينَ', transliteration: 'Ya Khayr al-Muhsinin', translation: 'O Best of benefactors' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 4,
    arabicTitle: 'الفَصْلُ الرَّابِعُ',
    lines: [
      { arabic: 'يَا مَنْ لَهُ الْعِزَّةُ وَالْجَمَالُ', transliteration: 'Ya man lahu al-\'izzatu wal-jamal', translation: 'O He to Whom belongs might and beauty' },
      { arabic: 'يَا مَنْ لَهُ الْقُدْرَةُ وَالْكَمَالُ', transliteration: 'Ya man lahu al-qudratu wal-kamal', translation: 'O He to Whom belongs power and perfection' },
      { arabic: 'يَا مَنْ لَهُ الْمُلْكُ وَالْجَلَالُ', transliteration: 'Ya man lahu al-mulku wal-jalal', translation: 'O He to Whom belongs kingdom and majesty' },
      { arabic: 'يَا مَنْ هُوَ الْكَبِيرُ الْمُتَعَالِ', transliteration: 'Ya man huwa al-kabir al-muta\'al', translation: 'O He Who is the Great, the Most High' },
      { arabic: 'يَا مُنْشِئَ السَّحَابِ الثِّقَالِ', transliteration: 'Ya munshi\' as-sahab ath-thiqal', translation: 'O Creator of the heavy clouds' },
      { arabic: 'يَا مَنْ هُوَ شَدِيدُ الْمِحَالِ', transliteration: 'Ya man huwa shadid al-mihal', translation: 'O He Who is strong in power' },
      { arabic: 'يَا مَنْ هُوَ سَرِيعُ الْحِسَابِ', transliteration: 'Ya man huwa sari\' al-hisab', translation: 'O He Who is swift in reckoning' },
      { arabic: 'يَا مَنْ هُوَ شَدِيدُ الْعِقَابِ', transliteration: 'Ya man huwa shadid al-\'iqab', translation: 'O He Who is severe in punishment' },
      { arabic: 'يَا مَنْ عِنْدَهُ حُسْنُ الثَّوَابِ', transliteration: 'Ya man \'indahu husn ath-thawab', translation: 'O He with Whom is the best reward' },
      { arabic: 'يَا مَنْ عِنْدَهُ أُمُّ الْكِتَابِ', transliteration: 'Ya man \'indahu umm al-kitab', translation: 'O He with Whom is the Mother of the Book' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 5,
    arabicTitle: 'الفَصْلُ الخَامِسُ',
    lines: [
      { arabic: 'يَا مَنْ يَحُولُ بَيْنَ الْمَرْءِ وَقَلْبِهِ', transliteration: 'Ya man yahulu bayn al-mar\' wa qalbih', translation: 'O He Who comes between man and his heart' },
      { arabic: 'يَا مَنْ لَا تَنْفَعُ الشَّفَاعَةُ إِلَّا بِإِذْنِهِ', transliteration: 'Ya man la tanfa\' ash-shafa\'atu illa bi-idhnih', translation: 'O He without Whose permission intercession is of no avail' },
      { arabic: 'يَا مَنْ هُوَ أَعْلَمُ بِمَنْ ضَلَّ عَنْ سَبِيلِهِ', transliteration: 'Ya man huwa a\'lamu bi-man dalla \'an sabilih', translation: 'O He Who knows best those who stray from His path' },
      { arabic: 'يَا مَنْ لَا مُعَقِّبَ لِحُكْمِهِ', transliteration: 'Ya man la mu\'aqqiba li-hukmih', translation: 'O He Whose judgment none can reverse' },
      { arabic: 'يَا مَنْ لَا رَادَّ لِقَضَائِهِ', transliteration: 'Ya man la radda li-qada\'ih', translation: 'O He Whose decree none can repel' },
      { arabic: 'يَا مَنِ انْقَادَ كُلُّ شَيْءٍ لِأَمْرِهِ', transliteration: 'Ya man inqada kullu shay\' li-amrih', translation: 'O He to Whose command everything submits' },
      { arabic: 'يَا مَنِ السَّمَاوَاتُ مَطْوِيَّاتٌ بِيَمِينِهِ', transliteration: 'Ya man as-samawatu matwiyyatun bi-yaminih', translation: 'O He in Whose right hand the heavens are folded' },
      { arabic: 'يَا مَنْ يُرْسِلُ الرِّيَاحَ بُشْرًا بَيْنَ يَدَيْ رَحْمَتِهِ', transliteration: 'Ya man yursilu ar-riyaha bushran bayn yaday rahmatih', translation: 'O He Who sends the winds as glad tidings before His mercy' },
      { arabic: 'يَا مَنْ جَعَلَ الْأَرْضَ مِهَادًا', transliteration: 'Ya man ja\'al al-ard mihadan', translation: 'O He Who made the earth a resting place' },
      { arabic: 'يَا مَنْ جَعَلَ الْجِبَالَ أَوْتَادًا', transliteration: 'Ya man ja\'al al-jibal awtadan', translation: 'O He Who made the mountains as pegs' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 6,
    arabicTitle: 'الفَصْلُ السَّادِسُ',
    lines: [
      { arabic: 'يَا اَللَّهُمَّ إِنِّي أَسْأَلُكَ بِاسْمِكَ يَا حَنَّانُ', transliteration: 'Ya Allahumma inni as\'aluka bi-ismika ya Hannan', translation: 'O Allah, I ask You by Your name, O Compassionate' },
      { arabic: 'يَا مَنَّانُ', transliteration: 'Ya Mannan', translation: 'O Bestower of favors' },
      { arabic: 'يَا دَيَّانُ', transliteration: 'Ya Dayyan', translation: 'O Supreme Judge' },
      { arabic: 'يَا بُرْهَانُ', transliteration: 'Ya Burhan', translation: 'O Clear Proof' },
      { arabic: 'يَا سُلْطَانُ', transliteration: 'Ya Sultan', translation: 'O Absolute Authority' },
      { arabic: 'يَا رِضْوَانُ', transliteration: 'Ya Ridwan', translation: 'O Source of Good Pleasure' },
      { arabic: 'يَا غُفْرَانُ', transliteration: 'Ya Ghufran', translation: 'O All-Forgiving' },
      { arabic: 'يَا سُبْحَانُ', transliteration: 'Ya Subhan', translation: 'O Most Glorified' },
      { arabic: 'يَا مُسْتَعَانُ', transliteration: 'Ya Musta\'an', translation: 'O One Whose help is sought' },
      { arabic: 'يَا ذَا الْمَنِّ وَالْبَيَانِ', transliteration: 'Ya dha al-mann wal-bayan', translation: 'O Lord of favor and clear explanation' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 7,
    arabicTitle: 'الفَصْلُ السَّابِعُ',
    lines: [
      { arabic: 'يَا مَنْ تَوَاضَعَ كُلُّ شَيْءٍ لِعَظَمَتِهِ', transliteration: 'Ya man tawada\' kullu shay\' li-\'azamatih', translation: 'O He before Whose greatness all things humble themselves' },
      { arabic: 'يَا مَنِ اسْتَسْلَمَ كُلُّ شَيْءٍ لِقُدْرَتِهِ', transliteration: 'Ya man istaslama kullu shay\' li-qudratih', translation: 'O He to Whose power all things surrender' },
      { arabic: 'يَا مَنْ ذَلَّ كُلُّ شَيْءٍ لِعِزَّتِهِ', transliteration: 'Ya man dhalla kullu shay\' li-\'izzatih', translation: 'O He to Whose might all things are humbled' },
      { arabic: 'يَا مَنْ خَضَعَ كُلُّ شَيْءٍ لِهَيْبَتِهِ', transliteration: 'Ya man khada\' kullu shay\' li-haybatih', translation: 'O He before Whose awe all things bow' },
      { arabic: 'يَا مَنِ انْقَادَ كُلُّ شَيْءٍ مِنْ خَشْيَتِهِ', transliteration: 'Ya man inqada kullu shay\' min khashyatih', translation: 'O He from fear of Whom all things submit' },
      { arabic: 'يَا مَنْ تَشَقَّقَتِ الْجِبَالُ مِنْ مَخَافَتِهِ', transliteration: 'Ya man tashaqqaqat al-jibal min makhafatih', translation: 'O He from dread of Whom mountains split' },
      { arabic: 'يَا مَنْ قَامَتِ السَّمَاوَاتُ بِأَمْرِهِ', transliteration: 'Ya man qamat as-samawat bi-amrih', translation: 'O He by Whose command the heavens stand' },
      { arabic: 'يَا مَنِ اسْتَقَرَّتِ الْأَرَضُونَ بِإِذْنِهِ', transliteration: 'Ya man istaqarrat al-aradun bi-idhnih', translation: 'O He by Whose permission the earths are stable' },
      { arabic: 'يَا مَنْ يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ', transliteration: 'Ya man yusabbihu ar-ra\'d bi-hamdih', translation: 'O He Whose praise the thunder proclaims' },
      { arabic: 'يَا مَنْ لَا يَعْتَدِي عَلَى أَهْلِ مَمْلَكَتِهِ', transliteration: 'Ya man la ya\'tadi \'ala ahl mamlakatih', translation: 'O He Who wrongs not the people of His kingdom' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 8,
    arabicTitle: 'الفَصْلُ الثَّامِنُ',
    lines: [
      { arabic: 'يَا غَافِرَ الْخَطَايَا', transliteration: 'Ya Ghafir al-Khataya', translation: 'O Forgiver of sins' },
      { arabic: 'يَا كَاشِفَ الْبَلَايَا', transliteration: 'Ya Kashif al-Balaya', translation: 'O Remover of afflictions' },
      { arabic: 'يَا مُنْتَهَى الرَّجَايَا', transliteration: 'Ya Muntaha ar-Rajaya', translation: 'O Ultimate of hopes' },
      { arabic: 'يَا مُجْزِلَ الْعَطَايَا', transliteration: 'Ya Mujzil al-\'Ataya', translation: 'O Abundant in gifts' },
      { arabic: 'يَا وَاهِبَ الْهَدَايَا', transliteration: 'Ya Wahib al-Hadaya', translation: 'O Bestower of guidance' },
      { arabic: 'يَا رَازِقَ الْبَرَايَا', transliteration: 'Ya Raziq al-Baraya', translation: 'O Provider of all creation' },
      { arabic: 'يَا قَاضِيَ الْمَنَايَا', transliteration: 'Ya Qadi al-Manaya', translation: 'O Decreer of fates' },
      { arabic: 'يَا سَامِعَ الشَّكَايَا', transliteration: 'Ya Sami\' ash-Shakaya', translation: 'O Hearer of complaints' },
      { arabic: 'يَا بَاعِثَ الْبَرَايَا', transliteration: 'Ya Ba\'ith al-Baraya', translation: 'O Resurrector of creation' },
      { arabic: 'يَا مُطْلِقَ الْأُسَارَى', transliteration: 'Ya Mutliq al-Usara', translation: 'O Liberator of captives' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 9,
    arabicTitle: 'الفَصْلُ التَّاسِعُ',
    lines: [
      { arabic: 'يَا ذَا الْحَمْدِ وَالثَّنَاءِ', transliteration: 'Ya dha al-hamd wath-thana\'', translation: 'O Lord of praise and laudation' },
      { arabic: 'يَا ذَا الْفَخْرِ وَالْبَهَاءِ', transliteration: 'Ya dha al-fakhr wal-baha\'', translation: 'O Lord of glory and splendor' },
      { arabic: 'يَا ذَا الْمَجْدِ وَالسَّنَاءِ', transliteration: 'Ya dha al-majd was-sana\'', translation: 'O Lord of majesty and radiance' },
      { arabic: 'يَا ذَا الْعَهْدِ وَالْوَفَاءِ', transliteration: 'Ya dha al-\'ahd wal-wafa\'', translation: 'O Lord of covenant and faithfulness' },
      { arabic: 'يَا ذَا الْعَفْوِ وَالرِّضَاءِ', transliteration: 'Ya dha al-\'afw war-rida\'', translation: 'O Lord of pardon and pleasure' },
      { arabic: 'يَا ذَا الْمَنِّ وَالْعَطَاءِ', transliteration: 'Ya dha al-mann wal-\'ata\'', translation: 'O Lord of favor and bestowal' },
      { arabic: 'يَا ذَا الْفَصْلِ وَالْقَضَاءِ', transliteration: 'Ya dha al-fasl wal-qada\'', translation: 'O Lord of decision and decree' },
      { arabic: 'يَا ذَا الْعِزَّةِ وَالْبَقَاءِ', transliteration: 'Ya dha al-\'izzat wal-baqa\'', translation: 'O Lord of might and permanence' },
      { arabic: 'يَا ذَا الْجُودِ وَالسَّخَاءِ', transliteration: 'Ya dha al-jud was-sakha\'', translation: 'O Lord of generosity and munificence' },
      { arabic: 'يَا ذَا الْآلَاءِ وَالنَّعْمَاءِ', transliteration: 'Ya dha al-ala\' wan-na\'ma\'', translation: 'O Lord of blessings and bounties' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 10,
    arabicTitle: 'الفَصْلُ العَاشِرُ',
    lines: [
      { arabic: 'يَا رَبَّ الْعَالَمِينَ', transliteration: 'Ya Rabb al-\'Alamin', translation: 'O Lord of the worlds' },
      { arabic: 'يَا مَالِكَ يَوْمِ الدِّينِ', transliteration: 'Ya Malik yawm ad-Din', translation: 'O Master of the Day of Judgment' },
      { arabic: 'يَا غَايَةَ الطَّالِبِينَ', transliteration: 'Ya Ghayat at-Talibin', translation: 'O Ultimate goal of seekers' },
      { arabic: 'يَا ظَهْرَ اللَّاجِئِينَ', transliteration: 'Ya Zahr al-Laji\'in', translation: 'O Support of those who seek refuge' },
      { arabic: 'يَا غِيَاثَ الْمُسْتَغِيثِينَ', transliteration: 'Ya Ghiyath al-Mustaghithin', translation: 'O Helper of those who seek help' },
      { arabic: 'يَا صَرِيخَ الْمُسْتَصْرِخِينَ', transliteration: 'Ya Sarikh al-Mustasrikhin', translation: 'O Rescuer of those who cry for rescue' },
      { arabic: 'يَا جَارَ الْمُسْتَجِيرِينَ', transliteration: 'Ya Jar al-Mustajirin', translation: 'O Protector of those who seek protection' },
      { arabic: 'يَا أَمَانَ الْخَائِفِينَ', transliteration: 'Ya Aman al-Kha\'ifin', translation: 'O Security of the fearful' },
      { arabic: 'يَا عَوْنَ الْمُؤْمِنِينَ', transliteration: 'Ya \'Awn al-Mu\'minin', translation: 'O Helper of the believers' },
      { arabic: 'يَا رَاحِمَ الْمَسَاكِينَ', transliteration: 'Ya Rahim al-Masakin', translation: 'O Most Merciful to the poor' },
    ],
    closingPhrase
  },
  // Sections 11-100 would follow the same pattern
  // Adding a few more representative sections for variety
  {
    sectionNumber: 11,
    arabicTitle: 'الفَصْلُ الحَادِي عَشَرَ',
    lines: [
      { arabic: 'يَا مَلْجَأَ الْهَارِبِينَ', transliteration: 'Ya Malja\' al-Haribin', translation: 'O Refuge of the fleeing' },
      { arabic: 'يَا عَاصِمَ الْمُعْتَصِمِينَ', transliteration: 'Ya \'Asim al-Mu\'tasimin', translation: 'O Protector of those who seek protection' },
      { arabic: 'يَا دَلِيلَ الْمُتَحَيِّرِينَ', transliteration: 'Ya Dalil al-Mutahayyirin', translation: 'O Guide of the perplexed' },
      { arabic: 'يَا وَلِيَّ الْمُؤْمِنِينَ', transliteration: 'Ya Waliy al-Mu\'minin', translation: 'O Guardian of the believers' },
      { arabic: 'يَا أَنِيسَ الذَّاكِرِينَ', transliteration: 'Ya Anis adh-Dhakirin', translation: 'O Companion of those who remember' },
      { arabic: 'يَا مَفْزَعَ الْمَلْهُوفِينَ', transliteration: 'Ya Mafza\' al-Malhufin', translation: 'O Resort of the distressed' },
      { arabic: 'يَا كَنْزَ الْفُقَرَاءِ', transliteration: 'Ya Kanz al-Fuqara\'', translation: 'O Treasure of the poor' },
      { arabic: 'يَا غِيَاثَ الْمَكْرُوبِينَ', transliteration: 'Ya Ghiyath al-Makrubin', translation: 'O Helper of the grief-stricken' },
      { arabic: 'يَا إِلَهَ الْأَوَّلِينَ وَالْآخِرِينَ', transliteration: 'Ya Ilah al-Awwalin wal-Akhirin', translation: 'O God of the first and the last' },
      { arabic: 'يَا أَرْحَمَ الرَّاحِمِينَ', transliteration: 'Ya Arham ar-Rahimin', translation: 'O Most Merciful of the merciful' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 12,
    arabicTitle: 'الفَصْلُ الثَّانِي عَشَرَ',
    lines: [
      { arabic: 'يَا عِمَادَ مَنْ لَا عِمَادَ لَهُ', transliteration: 'Ya \'Imad man la \'imada lah', translation: 'O Support of one who has no support' },
      { arabic: 'يَا سَنَدَ مَنْ لَا سَنَدَ لَهُ', transliteration: 'Ya Sanad man la sanada lah', translation: 'O Backing of one who has no backing' },
      { arabic: 'يَا ذُخْرَ مَنْ لَا ذُخْرَ لَهُ', transliteration: 'Ya Dhukhr man la dhukhara lah', translation: 'O Provision of one who has no provision' },
      { arabic: 'يَا حِرْزَ مَنْ لَا حِرْزَ لَهُ', transliteration: 'Ya Hirz man la hirza lah', translation: 'O Fortress of one who has no fortress' },
      { arabic: 'يَا غِيَاثَ مَنْ لَا غِيَاثَ لَهُ', transliteration: 'Ya Ghiyath man la ghiyatha lah', translation: 'O Help of one who has no help' },
      { arabic: 'يَا فَخْرَ مَنْ لَا فَخْرَ لَهُ', transliteration: 'Ya Fakhr man la fakhra lah', translation: 'O Pride of one who has no pride' },
      { arabic: 'يَا عِزَّ مَنْ لَا عِزَّ لَهُ', transliteration: 'Ya \'Izz man la \'izza lah', translation: 'O Honor of one who has no honor' },
      { arabic: 'يَا مُعِينَ مَنْ لَا مُعِينَ لَهُ', transliteration: 'Ya Mu\'in man la mu\'ina lah', translation: 'O Supporter of one who has no supporter' },
      { arabic: 'يَا أَنِيسَ مَنْ لَا أَنِيسَ لَهُ', transliteration: 'Ya Anis man la anisa lah', translation: 'O Companion of one who has no companion' },
      { arabic: 'يَا كَافِيَ مَنِ اسْتَكْفَاهُ', transliteration: 'Ya Kafi man istakfah', translation: 'O Sufficient for one who seeks sufficiency' },
    ],
    closingPhrase
  },
  // Adding more sections for a fuller experience
  {
    sectionNumber: 50,
    arabicTitle: 'الفَصْلُ الخَمْسُونَ',
    lines: [
      { arabic: 'يَا مَنْ يُقْبَلُ الْيَسِيرُ وَيَعْفُو عَنِ الْكَثِيرِ', transliteration: 'Ya man yuqbal al-yasir wa ya\'fu \'an al-kathir', translation: 'O He Who accepts little and pardons much' },
      { arabic: 'يَا مَنْ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ', transliteration: 'Ya man la yudi\' ajr al-muhsinin', translation: 'O He Who does not waste the reward of the good-doers' },
      { arabic: 'يَا مَنْ لَا يَبْعُدُ مِنَ قُلُوبِ الْعَارِفِينَ', transliteration: 'Ya man la yab\'ud min qulub al-\'arifin', translation: 'O He Who is not far from the hearts of the knowers' },
      { arabic: 'يَا أَجْوَدَ الْأَجْوَدِينَ', transliteration: 'Ya Ajwad al-Ajwadin', translation: 'O Most Generous of the generous' },
      { arabic: 'يَا أَكْرَمَ الْأَكْرَمِينَ', transliteration: 'Ya Akram al-Akramin', translation: 'O Most Noble of the noble' },
      { arabic: 'يَا أَسْمَعَ السَّامِعِينَ', transliteration: 'Ya Asma\' as-Sami\'in', translation: 'O Best Hearer of those who hear' },
      { arabic: 'يَا أَبْصَرَ النَّاظِرِينَ', transliteration: 'Ya Absar an-Nazirin', translation: 'O Best Seer of those who see' },
      { arabic: 'يَا أَقْدَرَ الْقَادِرِينَ', transliteration: 'Ya Aqdar al-Qadirin', translation: 'O Most Powerful of the powerful' },
      { arabic: 'يَا أَرْحَمَ الرَّاحِمِينَ', transliteration: 'Ya Arham ar-Rahimin', translation: 'O Most Merciful of the merciful' },
      { arabic: 'يَا أَحْكَمَ الْحَاكِمِينَ', transliteration: 'Ya Ahkam al-Hakimin', translation: 'O Wisest of judges' },
    ],
    closingPhrase
  },
  {
    sectionNumber: 100,
    arabicTitle: 'الفَصْلُ المِائَةُ',
    lines: [
      { arabic: 'يَا مَنْ أَظْهَرَ الْجَمِيلَ', transliteration: 'Ya man azhara al-jamil', translation: 'O He Who manifests the beautiful' },
      { arabic: 'يَا مَنْ سَتَرَ الْقَبِيحَ', transliteration: 'Ya man satara al-qabih', translation: 'O He Who conceals the ugly' },
      { arabic: 'يَا مَنْ لَمْ يُؤَاخِذْ بِالْجَرِيرَةِ', transliteration: 'Ya man lam yu\'akhidh bil-jarira', translation: 'O He Who does not punish for the offense' },
      { arabic: 'يَا مَنْ لَمْ يَهْتِكِ السِّتْرَ', transliteration: 'Ya man lam yahtik as-sitr', translation: 'O He Who does not tear the veil' },
      { arabic: 'يَا عَظِيمَ الْعَفْوِ', transliteration: 'Ya \'Azim al-\'Afw', translation: 'O Great in pardon' },
      { arabic: 'يَا حَسَنَ التَّجَاوُزِ', transliteration: 'Ya Hasan at-Tajawuz', translation: 'O Beautiful in overlooking faults' },
      { arabic: 'يَا وَاسِعَ الْمَغْفِرَةِ', transliteration: 'Ya Wasi\' al-Maghfira', translation: 'O Vast in forgiveness' },
      { arabic: 'يَا بَاسِطَ الْيَدَيْنِ بِالرَّحْمَةِ', transliteration: 'Ya Basit al-Yadayn bir-Rahma', translation: 'O He Who extends His hands with mercy' },
      { arabic: 'يَا صَاحِبَ كُلِّ نَجْوَى', transliteration: 'Ya Sahib kulli najwa', translation: 'O Companion of every secret counsel' },
      { arabic: 'يَا مُنْتَهَى كُلِّ شَكْوَى', transliteration: 'Ya Muntaha kulli shakwa', translation: 'O Ultimate recourse of every complaint' },
    ],
    closingPhrase
  },
];

// Helper functions
export const getJawshanSection = (sectionNumber: number): JawshanSection | undefined => {
  return jawshanSections.find(s => s.sectionNumber === sectionNumber);
};

export const getTotalSections = (): number => {
  // The complete Jawshan has 100 sections
  return 100;
};

export const getAvailableSections = (): number[] => {
  return jawshanSections.map(s => s.sectionNumber);
};
