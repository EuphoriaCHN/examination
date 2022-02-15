import React from 'react';
import I18n from '@/i18n';

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