/** Contract for immutable audit events produced by enterprise modules. */
export interface AuditEvent {
  action: string;
  actorId?: string;
  aggregateId?: string;
  aggregateType?: string;
  occurredAt: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
}
