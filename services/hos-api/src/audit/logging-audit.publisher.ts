import { Injectable } from '@nestjs/common';

import type { AuditEvent } from '../interfaces';
import { EnterpriseLoggerService } from '../logging';
import type { AuditPublisher } from './audit-publisher.interface';

/** Logging-backed audit publisher placeholder for future durable audit sinks. */
@Injectable()
export class LoggingAuditPublisher implements AuditPublisher {
  constructor(private readonly logger: EnterpriseLoggerService) {}

  /** Publishes an audit event to the enterprise logger. */
  publish(event: AuditEvent): void {
    this.logger.audit(
      `Audit ${event.action} recorded at ${event.occurredAt}`,
      event.metadata,
    );
  }
}
