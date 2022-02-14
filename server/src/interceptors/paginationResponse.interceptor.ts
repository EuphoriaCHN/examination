import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

import type { Observable } from 'rxjs';

@Injectable()
export class PaginationResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(map(res => {
        const nextRes: Api._Base.ListResponse<any> = {
          data: [],
          total: 0,
        };

        if (Array.isArray(res) && Array.isArray(res[0]) && typeof res[1] === 'number') {
          nextRes.data = res[0];
          nextRes.total = res[1];
        } else if (Array.isArray(res.data) && typeof res.total === 'number') {
          nextRes.data = res.data;
          nextRes.total = res.total;
        }

        return nextRes;
      }));
  }
}
