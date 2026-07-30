import type { AuditEvent } from '../interfaces';

/** Contract for publishing audit events to durable sinks. */
export interface AuditPublisher {
  publish(event: AuditEvent): void | Promise<void>;
}
