import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, map } from 'rxjs';

import { APPLICATION_CONSTANTS } from '../constants/application.constants';
import { RequestContextService } from '../core';
import type { ApiResponse } from '../interfaces/api-response.interface';
import { DateUtils } from '../utils/date.utils';
import { RequestUtils } from '../utils/request.utils';

/** Wraps successful responses in the enterprise API envelope. */
@Injectable()
export class ResponseWrapperInterceptor<TData> implements NestInterceptor<
  TData,
  ApiResponse<TData>
> {
  constructor(private readonly contextService?: RequestContextService) {}

  /** Intercepts successful handler responses and adds response metadata. */
  intercept(
    context: ExecutionContext,
    next: CallHandler<TData>,
  ): Observable<ApiResponse<TData>> {
    const request = context.switchToHttp().getRequest<Request>();
    const startedAt = Date.now();
    const requestId =
      this.contextService?.getRequestId() ??
      RequestUtils.resolveRequestId(request);
    const correlationId =
      this.contextService?.getCorrelationId() ??
      RequestUtils.resolveCorrelationId(request, requestId);

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: 'Request completed successfully.',
        timestamp: DateUtils.nowIso(),
        requestId,
        correlationId,
        version: APPLICATION_CONSTANTS.apiVersion,
        data,
        metadata: {
          durationMs: Date.now() - startedAt,
        },
      })),
    );
  }
}
