import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { merge } from 'lodash';

import { isProd } from '@/common/utils';

const BASE_CONFIG: AxiosRequestConfig = {
  baseURL: isProd ? '/' : '/api'
} as const;

interface IApiOptions {
  baseUrl?: string;
}

export abstract class Api {
  protected readonly instance: AxiosInstance;
  protected readonly instanceConfig: AxiosRequestConfig;
  protected readonly options: IApiOptions;

  constructor(options: IApiOptions, axiosInstanceConfig: AxiosRequestConfig = {}) {
    this.options = options;
    this.instanceConfig = merge({}, BASE_CONFIG, axiosInstanceConfig);

    this.instance = axios.create(this.instanceConfig);

    this._bindInterceptors();
  }

  private _bindInterceptors() {
    this.instance.interceptors.request.use(function (config) {
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

      return config;
    });
  }

  protected sign<Req extends object = any, Res extends object = any>(config: AxiosRequestConfig) {
    const _this = this;

    return async function (data: Req, overrideConfig: AxiosRequestConfig = {}): Promise<Res> {
      const requestConfig = merge({}, config, overrideConfig);

      requestConfig.method = requestConfig.method || 'GET';

      if (requestConfig.method === 'GET') {
        requestConfig.params = data;
      } else {
        requestConfig.data = data;
      }

      requestConfig.url = `${_this.options.baseUrl ?? ''}${requestConfig.url}`;

      return _this
        .instance
        .request(requestConfig)
        .then(res => res.data.data, () => { }) as any;
    }
  }
}

export default Api;
