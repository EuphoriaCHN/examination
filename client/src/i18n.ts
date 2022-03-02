import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ICU from 'i18next-icu';

import zhCN from '@/resources/zh-CN.json';
import enUS from '@/resources/en-US.json';

const STORAGE_KEY = 'locale';

export function getLang() {
  const cacheData = localStorage.getItem(STORAGE_KEY);
  return /zh/.test(cacheData || '') ? 'zh-CN' : 'en-US';
}

export function setLang(lang: 'zh-CN' | 'en-US') {
  localStorage.setItem(STORAGE_KEY, lang);
  location.reload();
}

I18n
  .use(ICU)
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false,
    },
    keySeparator: false,
    initImmediate: false,
    lng: getLang(),
    resources: {
      'zh-CN': {
        translation: zhCN
      },
      'en-US': {
        translation: enUS
      }
    }
  });

export default I18n;
