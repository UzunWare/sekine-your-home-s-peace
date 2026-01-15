import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Supported languages
export type Language = 'en' | 'ar' | 'ur' | 'fr' | 'es' | 'tr' | 'id' | 'bn' | 'de' | 'ru';

export interface LanguageInfo {
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

// Translation type
type TranslationKey = string;
type Translations = Record<TranslationKey, string>;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
  languageInfo: LanguageInfo;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translation files will be loaded dynamically
const translationCache: Partial<Record<Language, Translations>> = {};

// English translations (default/fallback)
const englishTranslations: Translations = {
  // Navigation
  'nav.home': 'Home',
  'nav.quran': 'Quran',
  'nav.settings': 'Settings',
  'nav.back': 'Back',
  
  // Common
  'common.loading': 'Loading...',
  'common.error': 'Error',
  'common.retry': 'Retry',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.select': 'Select',
  'common.confirm': 'Confirm',
  'common.ok': 'OK',
  
  // Prayer times
  'prayer.fajr': 'Fajr',
  'prayer.sunrise': 'Sunrise',
  'prayer.dhuhr': 'Dhuhr',
  'prayer.asr': 'Asr',
  'prayer.maghrib': 'Maghrib',
  'prayer.isha': 'Isha',
  'prayer.jumuah': "Jumu'ah",
  'prayer.next': 'Next Prayer',
  'prayer.iqamah': 'Iqamah',
  
  // Quran
  'quran.title': 'Quran',
  'quran.surah': 'Surah',
  'quran.verse': 'Verse',
  'quran.verses': 'Verses',
  'quran.reciter': 'Reciter',
  'quran.selectReciter': 'Select Reciter',
  'quran.selectSurah': 'Select Surah',
  'quran.nowPlaying': 'Now Playing',
  'quran.verseOf': 'Verse {current} of {total}',
  'quran.meccan': 'Meccan',
  'quran.medinan': 'Medinan',
  
  // Player
  'player.play': 'Play',
  'player.pause': 'Pause',
  'player.stop': 'Stop',
  'player.previous': 'Previous',
  'player.next': 'Next',
  'player.repeat': 'Repeat',
  'player.repeatOff': 'Repeat Off',
  'player.repeatOne': 'Repeat One',
  'player.repeatAll': 'Repeat All',
  'player.minimize': 'Minimize',
  'player.expand': 'Expand',
  'player.volume': 'Volume',
  
  // Settings
  'settings.title': 'Settings',
  'settings.language': 'Language',
  'settings.languageDesc': 'Choose your preferred language',
  'settings.location': 'Location',
  'settings.locationDesc': 'Set your location for prayer times',
  'settings.calculation': 'Prayer Calculation',
  'settings.calculationDesc': 'Choose calculation method',
  'settings.display': 'Display',
  'settings.displayDesc': 'Customize your display preferences',
  'settings.adhan': 'Adhan',
  'settings.adhanDesc': 'Adhan settings and sounds',
  'settings.iqamah': 'Iqamah',
  'settings.iqamahDesc': 'Set iqamah delay times',
  'settings.nightMode': 'Night Mode',
  'settings.nightModeDesc': 'Configure night mode settings',
  'settings.quranSettings': 'Quran Settings',
  'settings.quranSettingsDesc': 'Reciter and translation preferences',
  
  // Time
  'time.hours': 'hours',
  'time.minutes': 'minutes',
  'time.seconds': 'seconds',
  'time.in': 'in',
  
  // Idle screen
  'idle.offline': 'Offline',
  'idle.nextPrayer': 'Next Prayer',
  
  // Footer hints
  'hint.selectPress': 'Select/Press',
  'hint.navigate': 'Navigate',
  'hint.back': 'Back',
};

// Arabic translations
const arabicTranslations: Translations = {
  'nav.home': 'الرئيسية',
  'nav.quran': 'القرآن',
  'nav.settings': 'الإعدادات',
  'nav.back': 'رجوع',
  
  'common.loading': 'جاري التحميل...',
  'common.error': 'خطأ',
  'common.retry': 'إعادة المحاولة',
  'common.save': 'حفظ',
  'common.cancel': 'إلغاء',
  'common.select': 'اختيار',
  'common.confirm': 'تأكيد',
  'common.ok': 'موافق',
  
  'prayer.fajr': 'الفجر',
  'prayer.sunrise': 'الشروق',
  'prayer.dhuhr': 'الظهر',
  'prayer.asr': 'العصر',
  'prayer.maghrib': 'المغرب',
  'prayer.isha': 'العشاء',
  'prayer.jumuah': 'الجمعة',
  'prayer.next': 'الصلاة القادمة',
  'prayer.iqamah': 'الإقامة',
  
  'quran.title': 'القرآن الكريم',
  'quran.surah': 'سورة',
  'quran.verse': 'آية',
  'quran.verses': 'آيات',
  'quran.reciter': 'القارئ',
  'quran.selectReciter': 'اختر القارئ',
  'quran.selectSurah': 'اختر السورة',
  'quran.nowPlaying': 'يتم الآن',
  'quran.verseOf': 'الآية {current} من {total}',
  'quran.meccan': 'مكية',
  'quran.medinan': 'مدنية',
  
  'player.play': 'تشغيل',
  'player.pause': 'إيقاف مؤقت',
  'player.stop': 'إيقاف',
  'player.previous': 'السابق',
  'player.next': 'التالي',
  'player.repeat': 'تكرار',
  'player.repeatOff': 'إيقاف التكرار',
  'player.repeatOne': 'تكرار واحد',
  'player.repeatAll': 'تكرار الكل',
  'player.minimize': 'تصغير',
  'player.expand': 'توسيع',
  'player.volume': 'مستوى الصوت',
  
  'settings.title': 'الإعدادات',
  'settings.language': 'اللغة',
  'settings.languageDesc': 'اختر لغتك المفضلة',
  'settings.location': 'الموقع',
  'settings.locationDesc': 'حدد موقعك لمواقيت الصلاة',
  'settings.calculation': 'طريقة الحساب',
  'settings.calculationDesc': 'اختر طريقة حساب الصلاة',
  'settings.display': 'العرض',
  'settings.displayDesc': 'تخصيص تفضيلات العرض',
  'settings.adhan': 'الأذان',
  'settings.adhanDesc': 'إعدادات وأصوات الأذان',
  'settings.iqamah': 'الإقامة',
  'settings.iqamahDesc': 'تعيين أوقات تأخير الإقامة',
  'settings.nightMode': 'الوضع الليلي',
  'settings.nightModeDesc': 'تكوين إعدادات الوضع الليلي',
  'settings.quranSettings': 'إعدادات القرآن',
  'settings.quranSettingsDesc': 'تفضيلات القارئ والترجمة',
  
  'time.hours': 'ساعات',
  'time.minutes': 'دقائق',
  'time.seconds': 'ثواني',
  'time.in': 'في',
  
  'idle.offline': 'غير متصل',
  'idle.nextPrayer': 'الصلاة القادمة',
  
  'hint.selectPress': 'اختيار/ضغط',
  'hint.navigate': 'تنقل',
  'hint.back': 'رجوع',
};

// Urdu translations
const urduTranslations: Translations = {
  'nav.home': 'ہوم',
  'nav.quran': 'قرآن',
  'nav.settings': 'ترتیبات',
  'nav.back': 'واپس',
  
  'common.loading': 'لوڈ ہو رہا ہے...',
  'common.error': 'خرابی',
  'common.retry': 'دوبارہ کوشش کریں',
  'common.save': 'محفوظ کریں',
  'common.cancel': 'منسوخ کریں',
  'common.select': 'منتخب کریں',
  'common.confirm': 'تصدیق',
  'common.ok': 'ٹھیک ہے',
  
  'prayer.fajr': 'فجر',
  'prayer.sunrise': 'طلوع آفتاب',
  'prayer.dhuhr': 'ظہر',
  'prayer.asr': 'عصر',
  'prayer.maghrib': 'مغرب',
  'prayer.isha': 'عشاء',
  'prayer.jumuah': 'جمعہ',
  'prayer.next': 'اگلی نماز',
  'prayer.iqamah': 'اقامت',
  
  'quran.title': 'قرآن مجید',
  'quran.surah': 'سورۃ',
  'quran.verse': 'آیت',
  'quran.verses': 'آیات',
  'quran.reciter': 'قاری',
  'quran.selectReciter': 'قاری منتخب کریں',
  'quran.selectSurah': 'سورۃ منتخب کریں',
  'quran.nowPlaying': 'اب چل رہا ہے',
  'quran.verseOf': 'آیت {current} از {total}',
  'quran.meccan': 'مکی',
  'quran.medinan': 'مدنی',
  
  'player.play': 'چلائیں',
  'player.pause': 'روکیں',
  'player.stop': 'بند کریں',
  'player.previous': 'پچھلا',
  'player.next': 'اگلا',
  'player.repeat': 'دہرائیں',
  'player.repeatOff': 'دہرانا بند',
  'player.repeatOne': 'ایک دہرائیں',
  'player.repeatAll': 'سب دہرائیں',
  'player.minimize': 'چھوٹا کریں',
  'player.expand': 'بڑا کریں',
  'player.volume': 'آواز',
  
  'settings.title': 'ترتیبات',
  'settings.language': 'زبان',
  'settings.languageDesc': 'اپنی پسندیدہ زبان منتخب کریں',
  'settings.location': 'مقام',
  'settings.locationDesc': 'نماز کے اوقات کے لیے مقام',
  'settings.calculation': 'حساب کا طریقہ',
  'settings.calculationDesc': 'نماز کے حساب کا طریقہ',
  'settings.display': 'ڈسپلے',
  'settings.displayDesc': 'ڈسپلے کی ترجیحات',
  'settings.adhan': 'اذان',
  'settings.adhanDesc': 'اذان کی ترتیبات',
  'settings.iqamah': 'اقامت',
  'settings.iqamahDesc': 'اقامت کی تاخیر',
  'settings.nightMode': 'رات کا موڈ',
  'settings.nightModeDesc': 'رات کے موڈ کی ترتیبات',
  'settings.quranSettings': 'قرآن کی ترتیبات',
  'settings.quranSettingsDesc': 'قاری اور ترجمہ',
  
  'time.hours': 'گھنٹے',
  'time.minutes': 'منٹ',
  'time.seconds': 'سیکنڈ',
  'time.in': 'میں',
  
  'idle.offline': 'آف لائن',
  'idle.nextPrayer': 'اگلی نماز',
  
  'hint.selectPress': 'منتخب کریں',
  'hint.navigate': 'نیویگیٹ',
  'hint.back': 'واپس',
};

// French translations
const frenchTranslations: Translations = {
  'nav.home': 'Accueil',
  'nav.quran': 'Coran',
  'nav.settings': 'Paramètres',
  'nav.back': 'Retour',
  
  'common.loading': 'Chargement...',
  'common.error': 'Erreur',
  'common.retry': 'Réessayer',
  'common.save': 'Enregistrer',
  'common.cancel': 'Annuler',
  'common.select': 'Sélectionner',
  'common.confirm': 'Confirmer',
  'common.ok': 'OK',
  
  'prayer.fajr': 'Fajr',
  'prayer.sunrise': 'Lever du soleil',
  'prayer.dhuhr': 'Dhuhr',
  'prayer.asr': 'Asr',
  'prayer.maghrib': 'Maghrib',
  'prayer.isha': 'Isha',
  'prayer.jumuah': 'Joumouaa',
  'prayer.next': 'Prochaine prière',
  'prayer.iqamah': 'Iqama',
  
  'quran.title': 'Coran',
  'quran.surah': 'Sourate',
  'quran.verse': 'Verset',
  'quran.verses': 'Versets',
  'quran.reciter': 'Récitateur',
  'quran.selectReciter': 'Choisir un récitateur',
  'quran.selectSurah': 'Choisir une sourate',
  'quran.nowPlaying': 'En lecture',
  'quran.verseOf': 'Verset {current} sur {total}',
  'quran.meccan': 'Mecquoise',
  'quran.medinan': 'Médinoise',
  
  'player.play': 'Lecture',
  'player.pause': 'Pause',
  'player.stop': 'Arrêter',
  'player.previous': 'Précédent',
  'player.next': 'Suivant',
  'player.repeat': 'Répéter',
  'player.repeatOff': 'Répétition désactivée',
  'player.repeatOne': 'Répéter un',
  'player.repeatAll': 'Répéter tout',
  'player.minimize': 'Réduire',
  'player.expand': 'Agrandir',
  'player.volume': 'Volume',
  
  'settings.title': 'Paramètres',
  'settings.language': 'Langue',
  'settings.languageDesc': 'Choisissez votre langue',
  'settings.location': 'Emplacement',
  'settings.locationDesc': 'Pour les horaires de prière',
  'settings.calculation': 'Méthode de calcul',
  'settings.calculationDesc': 'Méthode de calcul des prières',
  'settings.display': 'Affichage',
  'settings.displayDesc': 'Préférences d\'affichage',
  'settings.adhan': 'Adhan',
  'settings.adhanDesc': 'Paramètres de l\'adhan',
  'settings.iqamah': 'Iqama',
  'settings.iqamahDesc': 'Délais d\'iqama',
  'settings.nightMode': 'Mode nuit',
  'settings.nightModeDesc': 'Paramètres du mode nuit',
  'settings.quranSettings': 'Paramètres du Coran',
  'settings.quranSettingsDesc': 'Récitateur et traduction',
  
  'time.hours': 'heures',
  'time.minutes': 'minutes',
  'time.seconds': 'secondes',
  'time.in': 'dans',
  
  'idle.offline': 'Hors ligne',
  'idle.nextPrayer': 'Prochaine prière',
  
  'hint.selectPress': 'Sélectionner',
  'hint.navigate': 'Naviguer',
  'hint.back': 'Retour',
};

// Spanish translations
const spanishTranslations: Translations = {
  'nav.home': 'Inicio',
  'nav.quran': 'Corán',
  'nav.settings': 'Ajustes',
  'nav.back': 'Volver',
  
  'common.loading': 'Cargando...',
  'common.error': 'Error',
  'common.retry': 'Reintentar',
  'common.save': 'Guardar',
  'common.cancel': 'Cancelar',
  'common.select': 'Seleccionar',
  'common.confirm': 'Confirmar',
  'common.ok': 'Aceptar',
  
  'prayer.fajr': 'Fajr',
  'prayer.sunrise': 'Amanecer',
  'prayer.dhuhr': 'Dhuhr',
  'prayer.asr': 'Asr',
  'prayer.maghrib': 'Maghrib',
  'prayer.isha': 'Isha',
  'prayer.jumuah': 'Yumu\'a',
  'prayer.next': 'Próxima oración',
  'prayer.iqamah': 'Iqama',
  
  'quran.title': 'Corán',
  'quran.surah': 'Sura',
  'quran.verse': 'Verso',
  'quran.verses': 'Versos',
  'quran.reciter': 'Recitador',
  'quran.selectReciter': 'Elegir recitador',
  'quran.selectSurah': 'Elegir sura',
  'quran.nowPlaying': 'Reproduciendo',
  'quran.verseOf': 'Verso {current} de {total}',
  'quran.meccan': 'Mequí',
  'quran.medinan': 'Medinense',
  
  'player.play': 'Reproducir',
  'player.pause': 'Pausar',
  'player.stop': 'Detener',
  'player.previous': 'Anterior',
  'player.next': 'Siguiente',
  'player.repeat': 'Repetir',
  'player.repeatOff': 'Repetir desactivado',
  'player.repeatOne': 'Repetir uno',
  'player.repeatAll': 'Repetir todo',
  'player.minimize': 'Minimizar',
  'player.expand': 'Expandir',
  'player.volume': 'Volumen',
  
  'settings.title': 'Ajustes',
  'settings.language': 'Idioma',
  'settings.languageDesc': 'Elige tu idioma preferido',
  'settings.location': 'Ubicación',
  'settings.locationDesc': 'Para horarios de oración',
  'settings.calculation': 'Método de cálculo',
  'settings.calculationDesc': 'Método de cálculo de oraciones',
  'settings.display': 'Pantalla',
  'settings.displayDesc': 'Preferencias de pantalla',
  'settings.adhan': 'Adhan',
  'settings.adhanDesc': 'Ajustes del adhan',
  'settings.iqamah': 'Iqama',
  'settings.iqamahDesc': 'Tiempos de iqama',
  'settings.nightMode': 'Modo nocturno',
  'settings.nightModeDesc': 'Ajustes del modo nocturno',
  'settings.quranSettings': 'Ajustes del Corán',
  'settings.quranSettingsDesc': 'Recitador y traducción',
  
  'time.hours': 'horas',
  'time.minutes': 'minutos',
  'time.seconds': 'segundos',
  'time.in': 'en',
  
  'idle.offline': 'Sin conexión',
  'idle.nextPrayer': 'Próxima oración',
  
  'hint.selectPress': 'Seleccionar',
  'hint.navigate': 'Navegar',
  'hint.back': 'Volver',
};

// Turkish translations
const turkishTranslations: Translations = {
  'nav.home': 'Ana Sayfa',
  'nav.quran': 'Kur\'an',
  'nav.settings': 'Ayarlar',
  'nav.back': 'Geri',
  
  'common.loading': 'Yükleniyor...',
  'common.error': 'Hata',
  'common.retry': 'Tekrar Dene',
  'common.save': 'Kaydet',
  'common.cancel': 'İptal',
  'common.select': 'Seç',
  'common.confirm': 'Onayla',
  'common.ok': 'Tamam',
  
  'prayer.fajr': 'İmsak',
  'prayer.sunrise': 'Güneş',
  'prayer.dhuhr': 'Öğle',
  'prayer.asr': 'İkindi',
  'prayer.maghrib': 'Akşam',
  'prayer.isha': 'Yatsı',
  'prayer.jumuah': 'Cuma',
  'prayer.next': 'Sonraki Namaz',
  'prayer.iqamah': 'İkamet',
  
  'quran.title': 'Kur\'an-ı Kerim',
  'quran.surah': 'Sure',
  'quran.verse': 'Ayet',
  'quran.verses': 'Ayetler',
  'quran.reciter': 'Kari',
  'quran.selectReciter': 'Kari Seç',
  'quran.selectSurah': 'Sure Seç',
  'quran.nowPlaying': 'Şimdi Çalıyor',
  'quran.verseOf': 'Ayet {current} / {total}',
  'quran.meccan': 'Mekki',
  'quran.medinan': 'Medeni',
  
  'player.play': 'Oynat',
  'player.pause': 'Duraklat',
  'player.stop': 'Durdur',
  'player.previous': 'Önceki',
  'player.next': 'Sonraki',
  'player.repeat': 'Tekrarla',
  'player.repeatOff': 'Tekrar Kapalı',
  'player.repeatOne': 'Bir Tekrar',
  'player.repeatAll': 'Tümünü Tekrarla',
  'player.minimize': 'Küçült',
  'player.expand': 'Genişlet',
  'player.volume': 'Ses',
  
  'settings.title': 'Ayarlar',
  'settings.language': 'Dil',
  'settings.languageDesc': 'Tercih ettiğiniz dili seçin',
  'settings.location': 'Konum',
  'settings.locationDesc': 'Namaz vakitleri için konum',
  'settings.calculation': 'Hesaplama Yöntemi',
  'settings.calculationDesc': 'Namaz hesaplama yöntemi',
  'settings.display': 'Görüntü',
  'settings.displayDesc': 'Görüntü tercihleri',
  'settings.adhan': 'Ezan',
  'settings.adhanDesc': 'Ezan ayarları',
  'settings.iqamah': 'İkamet',
  'settings.iqamahDesc': 'İkamet gecikmeleri',
  'settings.nightMode': 'Gece Modu',
  'settings.nightModeDesc': 'Gece modu ayarları',
  'settings.quranSettings': 'Kur\'an Ayarları',
  'settings.quranSettingsDesc': 'Kari ve tercüme',
  
  'time.hours': 'saat',
  'time.minutes': 'dakika',
  'time.seconds': 'saniye',
  'time.in': 'içinde',
  
  'idle.offline': 'Çevrimdışı',
  'idle.nextPrayer': 'Sonraki Namaz',
  
  'hint.selectPress': 'Seç',
  'hint.navigate': 'Gezin',
  'hint.back': 'Geri',
};

// All translations
const allTranslations: Record<Language, Translations> = {
  en: englishTranslations,
  ar: arabicTranslations,
  ur: urduTranslations,
  fr: frenchTranslations,
  es: spanishTranslations,
  tr: turkishTranslations,
  id: englishTranslations, // Fallback to English
  bn: englishTranslations, // Fallback to English
  de: englishTranslations, // Fallback to English
  ru: englishTranslations, // Fallback to English
};

const LANGUAGE_STORAGE_KEY = 'sekine-tv-language';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && SUPPORTED_LANGUAGES.some(l => l.code === stored)) {
        return stored as Language;
      }
    } catch {}
    return 'en';
  });

  const languageInfo = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  const isRTL = languageInfo.rtl;

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {}
  }, []);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const translations = allTranslations[language] || englishTranslations;
    let text = translations[key] || englishTranslations[key] || key;
    
    // Replace parameters
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, String(value));
      });
    }
    
    return text;
  }, [language]);

  const value = React.useMemo(() => ({
    language,
    setLanguage,
    t,
    isRTL,
    languageInfo,
  }), [language, setLanguage, t, isRTL, languageInfo]);

  return React.createElement(I18nContext.Provider, { value }, children);
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}

export function useLanguage() {
  const { language, setLanguage, languageInfo, isRTL } = useTranslation();
  return { language, setLanguage, languageInfo, isRTL };
}
