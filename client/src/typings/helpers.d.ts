import type React from 'react';

declare global {
  /**
   * 获取某个组件的 Props
   * 
   * @example
   * ```typescript
   * import { Button } from 'semi';
   * 
   * // Required<ButtonProps>
   * type A = GetComponentProps<typeof Button>;
   * ```
   */
  declare type GetComponentProps<C extends React.ComponentType<any>> =
    C extends (props: infer P) => JSX.Element ?
    Required<P> : Required<InstanceType<C>['props']>;

  /**
   * 提取某个 React 组件的若干 props
   * 
   * @example
   * ```typescript
   * import { Button } from 'semi';
   * 
   * // Required<ButtonProps>['type']
   * type A = PickProps<typeof Button, 'type'>;
   * 
   * // { type: Required<ButtonProps>['type'] }
   * type B = PickProps<typeof Button, ['type']>;
   * ```
   */
  declare type PickProps<
    C extends React.ComponentType<any>,
    K extends keyof Props | readonly Array<keyof Props>,
    Props = GetComponentProps<C>
    > =
    K extends Array<infer _K> ? { [PK in _K]: Props[PK]; } : Props[K];
}

export { };