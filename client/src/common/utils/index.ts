import React from 'react';
import { useAtom, WritableAtom } from 'jotai';
import I18n from '@/i18n';
import { useSemiMode } from '@/common/hooks/useSemiMode';

import type { SetAtom } from 'jotai/core/atom';
import type { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree/interface';

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

interface ICreateIllustrationOptions {
  image: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  darkImage: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

/**
 * Semi Empty 的 Illustration 在切换暗色 / 亮色模式支持感觉有 bug
 * 快速创建一个 Illustration 组件
 */
export function createIllustration(options: ICreateIllustrationOptions) {
  return function (props: React.HTMLAttributes<HTMLSpanElement>) {
    const { mode } = useSemiMode();

    return React.createElement(
      'span',
      props,
      mode === 'dark' ?
        React.createElement(options.darkImage) :
        React.createElement(options.image)
    );
  }
}


/**
 * categories structure to semi tree data
 */
export function convertCategoriesToSemiTreeData(categories: Array<ICategoryItem>) {
  function process(items: Array<ICategoryItem>): Array<TreeNodeData> {
    return items.map(item => ({
      label: item.name,
      value: item.id,
      key: `${item.id}`,
      children: process(item.children),
      record: item
    }) as TreeNodeData)
  }

  return process(categories);
}

/**
 * For stop propagation
 */
export function quickStopPropagation<T extends React.SyntheticEvent<any>>(
  cb?: (ev: T) => void
) {
  return function (ev: T) {
    ev.stopPropagation();

    typeof cb === 'function' && cb(ev);
  };
}
