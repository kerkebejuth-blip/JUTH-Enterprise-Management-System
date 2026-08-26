import { Injectable } from '@nestjs/common';

import { EnterpriseLoggerService } from '../../logging';
import type { DomainEventPublisher, IDomainEvent } from '../../shared/domain';

/** Infrastructure domain event publisher that records events through logging. */
@Injectable()
export class LoggingDomainEventPublisher implements DomainEventPublisher {
  constructor(private readonly logger: EnterpriseLoggerService) {}

  /** Publishes one event to the current infrastructure logging channel. */
  publish(event: IDomainEvent): Promise<void> {
    this.logger.audit('Domain event published.', {
      eventId: event.eventId,
      eventName: event.eventName,
      eventVersion: event.eventVersion,
      aggregateId: event.aggregateId,
      correlationId: event.metadata.correlationId,
    });

    return Promise.resolve();
  }

  /** Publishes a batch of events to the current infrastructure logging channel. */
  async publishAll(events: readonly IDomainEvent[]): Promise<void> {
    await Promise.all(events.map((event) => this.publish(event)));
  }
}
