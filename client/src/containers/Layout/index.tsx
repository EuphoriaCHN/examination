import React from 'react';

import { Layout } from 'semi';

import Sider from '@/components/Sider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { useLoginPage } from '@/common/hooks/useLoginPage';

import './index.scss';

function SiteLayout(props: React.PropsWithChildren<{}>) {
  const { isLoginPage } = useLoginPage();

  return (
    <Layout className={'site-layout'}>
      {isLoginPage ? props.children : (
        <React.Fragment>
          <Sider />
          <Layout>
            <Header />
            <Layout.Content className={'site-layout-content'}>
              {props.children}
            </Layout.Content>
            <Footer />
          </Layout>
        </React.Fragment>
      )}
    </Layout>
  );
}

export default SiteLayout;
