import 'i18next';

import translation from '../public/locales/ru/translation.json'
import auctions from '../public/locales/ru/auctions.json';
import bets from '../public/locales/ru/bets.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof translation;
      auctions: typeof auctions;
      bets: typeof bets;
    };
  }
}
