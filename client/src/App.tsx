import React from 'react';
import i18n, { useTranslation } from '@/i18n';

import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from 'semi';
import Layout from '@/containers/Layout';
import Router from '@/router';

import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';

const SEMI_LOCALES = {
  'zh-CN': zh_CN,
  'en-US': en_US
} as const;

function AppCore() {
  const { i18n } = useTranslation();

  return (
    <LocaleProvider locale={(SEMI_LOCALES as any)[i18n.language] || zh_CN}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </LocaleProvider>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AppCore />
    </I18nextProvider>
  );
}

export default App;
