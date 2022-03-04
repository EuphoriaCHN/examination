import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ICU from 'i18next-icu';

import zhCN from '@/resources/zh-CN.json';
import enUS from '@/resources/en-US.json';

const STORAGE_KEY = 'locale';

export const LOCALE = ['zh-CN', 'en-US'] as const;
export type ProjectLocale = typeof LOCALE[number];

export const LOCALE_LABEL: Record<ProjectLocale, string> = {
  'zh-CN': '简体中文',
  'en-US': 'English'
} as const;

export function getLang(): ProjectLocale {
  const cacheData: any = localStorage.getItem(STORAGE_KEY) || '';

  return LOCALE.includes(cacheData) ? cacheData : 'zh-CN';
}

export function setLang(lang: ProjectLocale) {
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
