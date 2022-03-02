import I18n from '@/i18n';
import { LOCAL_STORAGE_AUTH_KEY } from '@/common/utils/constants';
import { setAuthCache, getAuthCache } from '@/common/utils';

import { Toast } from 'semi';

import type { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

export async function commonFulfilled(res: AxiosResponse) {
  const jwtToken = res.headers[LOCAL_STORAGE_AUTH_KEY];

  if (typeof jwtToken === 'string' && !!jwtToken) {
    setAuthCache(jwtToken);
  }
}

export async function commonRejected(err: AxiosError) {
  if (err.response?.status === 401) {
    setAuthCache(null);

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
  config.headers[LOCAL_STORAGE_AUTH_KEY] = `Bearer ${getAuthCache() ?? ''}`;

  return config;
}