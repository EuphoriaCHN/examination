import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

import type { Response } from 'express';
import type { Observable } from 'rxjs';

@Injectable()
export class SetResHeaderInterceptor implements NestInterceptor {
  constructor(private options: { scope?: string, authorization?: boolean } = {}) { }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const scope: string | undefined = !!this.options.authorization ? 'authorization' : this.options.scope;

    return next
      .handle()
      .pipe(map(data => {
        const response = context.switchToHttp().getResponse<Response>();

        if (typeof data !== 'object' || Array.isArray(data)) {
          if (!!scope) {
            response.setHeader(scope, data);
          }
        } else if (!!data) {
          for (let key in data) {
            response.setHeader(key, data[key]);
          }
        }

        return {};
      }));
  }
}