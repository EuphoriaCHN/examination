import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function createLoginPageUrl(pathname: string, noConcat: boolean = false) {
  return noConcat ? '/login' : `/login?redirect=${encodeURIComponent(decodeURIComponent(pathname))}`;
}

export function isLoginPage(pathname: string = window.location.pathname) {
  return /^\/login/.test(pathname);
}

export function useLoginPage() {
  const _location = useLocation();
  const _navigate = useNavigate();

  const _isLoginPage = isLoginPage(_location.pathname);

  const routeToLoginPage = React.useCallback((home: boolean = false, noReplace: boolean = false) => {
    if (_isLoginPage) return;

    _navigate(createLoginPageUrl(_location.pathname, home), { replace: !noReplace });
  }, [_location.pathname]);

  return {
    isLoginPage: _isLoginPage,
    routeToLoginPage
  };
}
