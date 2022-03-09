import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { getCustomPortal } from '@/common/utils';

export type StaticAttrComponent<P extends any, T> = ((props: P) => JSX.Element) & T;

export function withModalPortalWrapper() {
  return function <P extends {}>(Component: React.ComponentType<P>): StaticAttrComponent<P, {
    open: (config: P) => void;
    close: () => void;
  }> {
    const WrappedComponent: any = Component;

    const HotComponent = hot(WrappedComponent);

    WrappedComponent.open = (props: P) => {
      render(
        React.createElement(HotComponent, props),
        getCustomPortal()
      );
    };

    WrappedComponent.close = () => {
      unmountComponentAtNode(getCustomPortal());
    };

    return WrappedComponent;
  }
}