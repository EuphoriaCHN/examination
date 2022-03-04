import React from 'react';

type UseKeydownConfig = {
  element?: typeof window | HTMLElement;
};

export enum KeyCode {
  Enter = 'Enter'
}

export function useKeydown(
  cb?: (ev: KeyboardEvent) => void,
  config: UseKeydownConfig = {}
) {
  const handler = React.useCallback((ev: Event) => {
    typeof cb === 'function' && cb(ev as KeyboardEvent);
  }, [cb]);

  React.useEffect(() => {
    const el = config.element ?? window;

    el.addEventListener('keydown', handler);

    return () => {
      el.removeEventListener('keydown', handler);
    };
  }, [handler, config.element]);
}
