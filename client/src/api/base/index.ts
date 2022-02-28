import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { merge } from 'lodash';

import { isProd } from '@/common/utils';
import { commonFulfilled, commonRejected, commonRequestInterceptors } from './utils';

const BASE_CONFIG: AxiosRequestConfig = {
  baseURL: isProd ? '/' : '/api'
} as const;

interface IApiOptions {
  baseUrl?: string;
}

type ResponseDataWrapper<Res> = {
  data: Res
};

interface ISignOptions<Req, Res> extends AxiosRequestConfig {
  onFulfilled?: (res: AxiosResponse<ResponseDataWrapper<Res>>, params: Req) => Promise<any>;
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
    this.instance.interceptors.request.use(async function (config) {
      config = await commonRequestInterceptors(config);

      // await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 800 + 200)));

      return config;
    });
  }

  protected sign<Req extends any = any, Res extends any = any>(config: ISignOptions<Req, Res>) {
    const _this = this;

    return async function (data: Req, overrideConfig: ISignOptions<Req, Res> = {}): Promise<Res> {
      const requestConfig = merge({}, config, overrideConfig);

      requestConfig.method = (requestConfig.method || 'GET').toLowerCase() as Method;

      if (requestConfig.method === 'GET') {
        requestConfig.params = data;
      } else {
        requestConfig.data = data;
      }

      requestConfig.url = `${_this.options.baseUrl ?? ''}${requestConfig.url}`;

      const { method, params, data: body } = requestConfig;

      return _this
        .instance
        .request(requestConfig)
        .then(async res => {
          await commonFulfilled(res);

          let resData = res.data.data;

          if (typeof requestConfig.onFulfilled === 'function') {
            resData = await requestConfig.onFulfilled(res, method === 'get' ? params : data);
          }

          return resData;
        }, async err => {
          await commonRejected(err);

          window.console.error(err);

          return Promise.reject(err);
        })
    }
  }
}

export default Api;
