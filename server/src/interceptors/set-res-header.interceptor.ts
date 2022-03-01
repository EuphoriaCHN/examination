import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

import type { Response } from 'express';
import type { Observable } from 'rxjs';

/**
 * 将 Controller 中 response 进行拆分
 * 所需要的数据结构为
 * 
 * ```ts
 * type Res = {
 *   token: { [tokenKey: string]: string };
 *   data?: any;
 * };
 * ```
 */
@Injectable()
export class SetResHeaderInterceptor implements NestInterceptor {
  constructor() { }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(map(resData => {
        const response = context.switchToHttp().getResponse<Response>();

        const { token = {}, data = {} } = resData;

        for (let key in token) {
          response.setHeader(key, token[key]);
        }

        return data;
      }));
  }
}