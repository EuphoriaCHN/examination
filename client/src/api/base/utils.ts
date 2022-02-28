import I18n from '@/i18n';

import { Toast } from 'semi';

import type { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

export const AUTHORIZATION = 'authorization';

export async function commonFulfilled(res: AxiosResponse) {
  const jwtToken = res.headers[AUTHORIZATION];

  if (typeof jwtToken === 'string' && !!jwtToken) {
    localStorage.setItem(AUTHORIZATION, jwtToken);
  }
}

export async function commonRejected(err: AxiosError) {
  if (err.response?.status === 401) {
    localStorage.removeItem(AUTHORIZATION);

    Toast.error(I18n.t('登录信息过期'));

    window.dispatchEvent(new Event('unauthorized'));
  }
}

export async function commonRequestInterceptors(config: AxiosRequestConfig) {
  // Get 参数格式化
  if (config.method?.toLowerCase() === 'get') {
    for (const paramKey in config.params ?? {}) {
      const val = config.params[paramKey];
      if (Array.isArray(val)) {
        config.params[paramKey] = val.join(',');
      } else if (!!val && typeof val === 'object') {
        config.params[paramKey] = JSON.stringify(val);
      }
    }
  }

  // Header 绑定
  if (!config.headers) {
    config.headers = {};
  }
  config.headers[AUTHORIZATION] = `Bearer ${localStorage.getItem(AUTHORIZATION) ?? ''}`;

  return config;
}