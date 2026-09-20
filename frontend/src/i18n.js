import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';

const resources = {
  EN: {
    translation: enTranslations
  },
  FR: {
    translation: frTranslations
  },
  DE: {
    translation: deTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'DE', // Default language
    fallbackLng: 'DE',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
