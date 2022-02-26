import React from 'react';

import { Spin } from 'semi';

import { useLoginPage } from '@/common/hooks/useLoginPage';

function LoginWrapper(props: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);

  const { routeToLoginPage } = useLoginPage();

  React.useEffect(() => {
    setLoading(true);

    // Check Login Status
    setTimeout(() => {
      // !user
      routeToLoginPage();

      setLoading(false);
    }, 1000);
  }, []);

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
