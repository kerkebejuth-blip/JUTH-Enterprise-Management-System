/** Request-scoped operational context propagated through infrastructure. */
export interface RequestContext {
  requestId: string;
  correlationId: string;
  userId?: string;
  department?: string;
  facility?: string;
  tenant?: string;
  sessionId?: string;
  method: string;
  path: string;
  userAgent?: string;
  ipAddress?: string;
}
