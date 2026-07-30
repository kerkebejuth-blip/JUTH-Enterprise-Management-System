import { Injectable } from '@nestjs/common';

import type { AuditEvent } from '../interfaces/audit-event.interface';
import type { AuditPublisher } from './audit-publisher.interface';
import { LoggingAuditPublisher } from './logging-audit.publisher';

/** Foundation service for recording immutable enterprise audit events. */
@Injectable()
export class AuditService {
  constructor(private readonly publisher: LoggingAuditPublisher) {}

  /** Records an audit event through the current logging-backed placeholder. */
  record(event: AuditEvent): void | Promise<void> {
    const publisher: AuditPublisher = this.publisher;
    return publisher.publish(event);
  }
}
