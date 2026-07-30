import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

import { RequestUtils } from '../utils';
import { RequestContextService } from './request-context.service';

/** Creates AsyncLocalStorage request context for each inbound HTTP request. */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: RequestContextService) {}

  /** Initializes request context and continues the middleware pipeline. */
  use(request: Request, response: Response, next: NextFunction): void {
    this.contextService.run(RequestUtils.toContext(request), next);
  }
}
