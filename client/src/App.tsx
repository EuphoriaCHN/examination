import React from 'react';
import { Provider as JoTaiProvider } from 'jotai';
import i18n from '@/i18n';

import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from 'semi';
import Layout from '@/containers/Layout';
import Router from '@/router';
import { withFallbackRenderer } from '@/components/FallbackRenderer';

import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';

const SEMI_LOCALES = {
  'zh-CN': zh_CN,
  'en-US': en_US
} as const;

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LocaleProvider locale={(SEMI_LOCALES as any)[i18n.language] || zh_CN}>
        <JoTaiProvider>
          <BrowserRouter>
            <Layout>
              <Router />
            </Layout>
          </BrowserRouter>
        </JoTaiProvider>
      </LocaleProvider>
    </I18nextProvider>
  );
}

export default withFallbackRenderer()(App);
