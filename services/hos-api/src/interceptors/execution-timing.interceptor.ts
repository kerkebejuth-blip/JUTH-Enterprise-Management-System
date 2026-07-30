import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

import { HEADER_NAMES } from '../constants/application.constants';
import { EnterpriseLoggerService } from '../logging';

/** Adds execution timing headers and performance logging. */
@Injectable()
export class ExecutionTimingInterceptor implements NestInterceptor {
  constructor(private readonly logger: EnterpriseLoggerService) {}

  /** Measures request execution time after route handling completes. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const durationMs = Date.now() - startedAt;
        response.setHeader(HEADER_NAMES.responseTime, String(durationMs));
        this.logger.performance(
          `${request.method} ${request.originalUrl} completed in ${durationMs}ms`,
        );
      }),
    );
  }
}
