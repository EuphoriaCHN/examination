import I18n from 'i18next';
import { initReactI18next, useTranslation, withTranslation } from 'react-i18next';
import ICU from 'i18next-icu';

I18n
  .use(ICU)
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false,
    },
    keySeparator: false,
    initImmediate: false,
    lng: 'zh-CN',
    resources: {
      'zh-CN': {
        translation: {}
      },
      'en-US': {
        translation: {}
      }
    }
  });

export const LOCALE_LABEL: { [k: string]: string } = {
  'zh-CN': '简体中文',
  'en-US': 'English'
};

export { useTranslation, withTranslation };
export default I18n;
