import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

import { HEADER_NAMES } from '../constants/application.constants';
import { RequestUtils } from '../utils/request.utils';

/** Ensures each request carries request and correlation identifiers. */
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  /** Adds request identity headers to inbound request and outbound response. */
  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = RequestUtils.resolveRequestId(request);
    const correlationId = RequestUtils.resolveCorrelationId(request, requestId);

    request.headers[HEADER_NAMES.requestId] = requestId;
    request.headers[HEADER_NAMES.correlationId] = correlationId;
    response.setHeader(HEADER_NAMES.requestId, requestId);
    response.setHeader(HEADER_NAMES.correlationId, correlationId);

    next();
  }
}
