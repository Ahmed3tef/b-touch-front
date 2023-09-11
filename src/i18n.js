import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locale/ar';
import en from './locale/en';

const resources = {
  en,
  ar
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
