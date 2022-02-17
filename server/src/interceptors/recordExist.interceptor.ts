import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class RecordExistInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => {
          if (err instanceof EntityNotFoundError) {
            Logger.error(err.message, 'EntityNotFoundError');
            return throwError(() => new BadRequestException('Record not found'));
          } else {
            console.error(err);
            return throwError(() => err);
          }
        }),
      );
  }
}