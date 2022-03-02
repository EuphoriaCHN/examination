import React from 'react';
import { Auth } from '@/api';

import { Spin } from 'semi';

import { useLoginPage } from '@/common/hooks/useLoginPage';
import { useUserAtom } from '@/store/user';
import { getAuthCache } from '@/common/utils';

function LoginWrapper(props: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const { dispatcher } = useUserAtom();

  const { routeToLoginPage } = useLoginPage();

  const onSiteUnauthorized = React.useCallback(() => {
    dispatcher(null);
    routeToLoginPage();
  }, [routeToLoginPage]);

  React.useEffect(() => {
    setLoading(true);

    if (!getAuthCache()) {
      // 本地没有缓存，直接 route
      routeToLoginPage();
      setLoading(false);
      return;
    }

    // Check Login Status
    Auth.profile().then(user => {
      dispatcher(user);
    }, () => {
      // Toast.error(t('用户未登录'));
      dispatcher(null);
      routeToLoginPage();
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener('unauthorized', onSiteUnauthorized);

    return () => {
      window.removeEventListener('unauthorized', onSiteUnauthorized)
    };
  }, [onSiteUnauthorized]);

  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Spin size={'large'} spinning />
      </div>
    );
  }

  return props.children as JSX.Element;
}

export default LoginWrapper;
