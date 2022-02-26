import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useLoginPage() {
  const _location = useLocation();
  const _navigate = useNavigate();

  const isLoginPage = /^\/login/.test(_location.pathname);

  const routeToLoginPage = React.useCallback((noReplace: boolean = false) => {
    if (isLoginPage) return;

    _navigate(`/login?redirect=${encodeURIComponent(_location.pathname)}`, { replace: !noReplace });
  }, [_location.pathname]);

  return {
    isLoginPage,
    routeToLoginPage
  };
}
