import { randomUUID } from 'crypto';
import type { Request } from 'express';

import { HEADER_NAMES } from '../constants/application.constants';
import type { RequestContext } from '../interfaces/request-context.interface';

/** Utility helpers for extracting request infrastructure metadata. */
export class RequestUtils {
  /** Returns the request ID from headers or generates a new one. */
  static resolveRequestId(request: Request): string {
    const headerValue = request.header(HEADER_NAMES.requestId);
    return headerValue?.trim() || randomUUID();
  }

  /** Returns the correlation ID from headers or falls back to request ID. */
  static resolveCorrelationId(request: Request, requestId: string): string {
    const headerValue = request.header(HEADER_NAMES.correlationId);
    return headerValue?.trim() || requestId;
  }

  /** Builds the standard request context used by logs and responses. */
  static toContext(request: Request): RequestContext {
    const requestId = this.resolveRequestId(request);
    return {
      requestId,
      correlationId: this.resolveCorrelationId(request, requestId),
      userId: request.header(HEADER_NAMES.userId),
      department: request.header(HEADER_NAMES.department),
      tenant: request.header(HEADER_NAMES.tenant),
      sessionId: request.header(HEADER_NAMES.sessionId),
      method: request.method,
      path: request.originalUrl,
      userAgent: request.header('user-agent'),
      ipAddress: request.ip,
    };
  }
}
