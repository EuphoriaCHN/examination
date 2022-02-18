import React from 'react';
import cls from 'classnames';

import { Typography } from 'semi';
import HighlightCodeRenderer from '@/components/HighlightCodeRenderer';

import type ReactMarkdown from 'react-markdown';

// const getComponent = (...args: Parameters<typeof React['createElement']>) => {
//   const [component, props = {} as any] = args;

//   const className = `${props.className || ''} md`;

//   return ({ children }: React.PropsWithChildren<any>) =>
//     React.createElement(component, Object.assign(props, { className }), children);
// };

type GetComponentResult = (props: React.PropsWithChildren<any>) => ReturnType<typeof React['createElement']>;
function getComponent<P extends React.HTMLAttributes<T>, T extends HTMLElement>(
  type: keyof React.ReactHTML,
  props?: React.ClassAttributes<T> & P | null
): GetComponentResult;
function getComponent<P extends React.ComponentType<{}>>(
  type: P,
  props?: React.ComponentProps<P>
): GetComponentResult;
function getComponent<P extends {}>(
  type: React.FunctionComponent<P> | React.ComponentClass<P>,
  props?: React.Attributes & P | null
): GetComponentResult;

function getComponent(type: unknown, opts?: unknown) {
  return (props: React.PropsWithChildren<any>) => {
    const clsFromOpts = (opts as any)?.className || '';
    const clsFromProps = (props as any)?.className || '';

    let className = cls(clsFromOpts, clsFromProps);

    if (typeof type === 'string') {
      className = cls(className, 'md', `md-${type}`);
    }

    return React.createElement(
      type as any,
      Object.assign({}, opts as any || {}, { className }),
      props.children
    );
  };
}

export const MarkdownComponents: GetComponentProps<typeof ReactMarkdown>['components'] = {
  p: getComponent('p'),
  span: getComponent('span'),
  a: ({ href, children }) => <a href={href} className='md md-a'>{children}</a>,

  h1: getComponent(Typography.Title, { heading: 1, className: 'md md-h1' }),
  h2: getComponent(Typography.Title, { heading: 2, className: 'md md-h2' }),
  h3: getComponent(Typography.Title, { heading: 3, className: 'md md-h3' }),
  h4: getComponent(Typography.Title, { heading: 4, className: 'md md-h4' }),
  h5: getComponent(Typography.Title, { heading: 5, className: 'md md-h5' }),
  h6: getComponent(Typography.Title, { heading: 6, className: 'md md-h6' }),

  ul: getComponent('ul'),
  ol: getComponent('ol'),
  li: getComponent('li'),

  table: getComponent('table'),
  th: ({ children, align }: any) => (
    <th style={{ textAlign: align || undefined }}>{children}</th>
  ),

  td: ({ children, align }: any) => (
    <td style={{ textAlign: align || undefined }}>{children}</td>
  ),

  hr: getComponent('hr'),
  pre: getComponent('pre'),
  code: getComponent(HighlightCodeRenderer),
} as const;
