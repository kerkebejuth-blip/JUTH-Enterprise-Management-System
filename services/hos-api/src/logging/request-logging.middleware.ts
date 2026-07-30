import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

import { RequestUtils } from '../utils/request.utils';
import { EnterpriseLoggerService } from './enterprise-logger.service';

/** Logs inbound request completion with request identity metadata. */
@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: EnterpriseLoggerService) {}

  /** Attaches completion logging to the response lifecycle. */
  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = Date.now();

    response.on('finish', () => {
      const context = RequestUtils.toContext(request);
      const durationMs = Date.now() - startedAt;
      this.logger.log(
        `${context.method} ${context.path} ${response.statusCode} ${durationMs}ms [${context.requestId}]`,
        'Request',
      );
    });

    next();
  }
}
