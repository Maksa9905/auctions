import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { Language } from '@shared/types';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    fallbackLng: Language.ru,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
