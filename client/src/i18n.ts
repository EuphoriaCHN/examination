import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
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

export default I18n;
