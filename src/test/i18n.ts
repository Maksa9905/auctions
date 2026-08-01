import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import auctionsRu from '../../public/locales/ru/auctions.json';
import translationRu from '../../public/locales/ru/translation.json';

let initialized = false;

export function createMockT(prefix = '') {
  return ((key: string, options?: Record<string, unknown>) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (!options) return fullKey;
    return `${fullKey}:${JSON.stringify(options)}`;
  }) as unknown as import('i18next').TFunction;
}

export async function ensureTestI18n() {
  if (initialized) {
    return i18n;
  }

  await i18n.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'ru',
    resources: {
      ru: {
        auctions: auctionsRu,
        translation: translationRu,
      },
    },
    interpolation: { escapeValue: false },
  });

  initialized = true;
  return i18n;
}
