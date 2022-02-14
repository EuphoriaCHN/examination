import React from 'react';

import { Layout } from 'semi';

import Sider from '@/components/Sider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './index.scss';

function SiteLayout(props: React.PropsWithChildren<{}>) {
  return (
    <Layout className={'site-layout'}>
      <Sider />
      <Layout>
        <Header />
        <Layout.Content className={'site-layout-content'}>
          {props.children}
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default SiteLayout;
