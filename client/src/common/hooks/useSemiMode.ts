import React from 'react';

export type SemiMode = 'light' | 'dark';

export const THEME_ATTR_NAME = 'theme-mode' as const;

export function getSemiMode() {
  return document.body.getAttribute(THEME_ATTR_NAME) === 'dark' ? 'dark' : 'light';
}

export function setSemiMode(theme: SemiMode) {
  document.body.setAttribute(THEME_ATTR_NAME, theme);
}

export function useSemiMode() {
  const [mode, modeDispatcher] = React.useState<SemiMode>(getSemiMode());

  const setMode = React.useCallback<typeof modeDispatcher>(reducer => {
    const next = typeof reducer === 'function' ? reducer(getSemiMode()) : reducer;
    setSemiMode(next);
  }, []);

  React.useEffect(() => {
    const observer = new MutationObserver(function ([mutation]) {
      if (mutation.attributeName !== THEME_ATTR_NAME) return;

      modeDispatcher(getSemiMode());
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: [THEME_ATTR_NAME]
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return { mode, setMode } as const;
}

export function withSemiMode<C extends React.ComponentType<C>>(Components: C) {
  const HOC: any = (props: any) => {
    const context = useSemiMode();

    return React.createElement(Components, Object.assign({}, props, context));
  };

  return HOC as C;
}