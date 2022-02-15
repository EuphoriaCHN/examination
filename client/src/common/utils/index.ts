import React from 'react';
import { useAtom, WritableAtom } from 'jotai';
import I18n from '@/i18n';

import type { SetAtom } from 'jotai/core/atom';

export const isProd = /^prod(?:uction)?$/.test(process.env.NODE_ENV ?? '');

/**
 * 为 Form 组件中的 label 加上 `（选填）` 样式
 */
export function createOptionalFormLabel(label: React.ReactNode) {
  return React.createElement(
    React.Fragment, {}, label,
    React.createElement(
      'span', { style: { color: 'var(--semi-color-text-2)' } }, I18n.t('（选填）')
    )
  );
}

/**
 * 快速创建一个 Jotai reducer
 */
export function createJotaiHook<
  Value, Update, Result extends void | Promise<void>
>(atom: WritableAtom<Value, Update, Result>) {
  return function (): {
    value: Value,
    dispatcher: SetAtom<Update, Result>
  } & [Value, SetAtom<Update, Result>] {
    const [value, dispatcher] = useAtom(atom);

    return {
      0: value,
      1: dispatcher,
      value,
      dispatcher
    } as any;
  }
}