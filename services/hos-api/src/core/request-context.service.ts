import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

import type { RequestContext } from '../interfaces';

/** Provides AsyncLocalStorage-backed access to the active request context. */
@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContext>();

  /** Executes a callback inside the supplied request context. */
  run<TValue>(context: RequestContext, callback: () => TValue): TValue {
    return this.storage.run(context, callback);
  }

  /** Returns the active request context when one exists. */
  getContext(): RequestContext | undefined {
    return this.storage.getStore();
  }

  /** Returns the current request ID or the system placeholder. */
  getRequestId(): string {
    return this.getContext()?.requestId ?? 'system';
  }

  /** Returns the current correlation ID or falls back to the request ID. */
  getCorrelationId(): string {
    const context = this.getContext();
    return context?.correlationId ?? context?.requestId ?? 'system';
  }

  /** Returns the authenticated user placeholder when one is present. */
  getUserId(): string | undefined {
    return this.getContext()?.userId;
  }

  /** Returns the active department placeholder when one is present. */
  getDepartment(): string | undefined {
    return this.getContext()?.department;
  }

  /** Returns the active facility placeholder when one is present. */
  getFacility(): string | undefined {
    return this.getContext()?.facility;
  }

  /** Returns the active tenant placeholder when one is present. */
  getTenant(): string | undefined {
    return this.getContext()?.tenant;
  }

  /** Returns the active session placeholder when one is present. */
  getSessionId(): string | undefined {
    return this.getContext()?.sessionId;
  }
}
