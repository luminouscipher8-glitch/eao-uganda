import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import messages from './local/index';

// Performance optimization: Cache translations
const cachedMessages = messages;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    resources: cachedMessages,
    interpolation: {
      escapeValue: false,
    },
    // Performance optimizations
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: 'added removed',
    },
    // Cache configuration
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: import.meta.env.DEV ? (lng, _ns, key) => {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
    } : undefined,
  });

export default i18n;