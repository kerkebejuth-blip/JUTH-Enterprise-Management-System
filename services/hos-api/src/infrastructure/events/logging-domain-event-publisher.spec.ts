import { EnterpriseLoggerService } from '../../logging';
import type { IDomainEvent } from '../../shared';
import { LoggingDomainEventPublisher } from './logging-domain-event-publisher';

class CapturingLogger extends EnterpriseLoggerService {
  readonly auditMessages: string[] = [];

  override audit(message: string): void {
    this.auditMessages.push(message);
  }
}

describe('LoggingDomainEventPublisher', () => {
  const event: IDomainEvent = {
    eventId: 'event-1',
    eventName: 'InfrastructureEventPublished',
    eventVersion: 1,
    occurredAt: new Date('2026-08-02T00:00:00.000Z'),
    payload: {},
    metadata: {},
  };

  it('publishes events through enterprise audit logging', async () => {
    const logger = new CapturingLogger();
    const publisher = new LoggingDomainEventPublisher(logger);

    await publisher.publish(event);
    await publisher.publishAll([event]);

    expect(logger.auditMessages).toEqual([
      'Domain event published.',
      'Domain event published.',
    ]);
  });
});
