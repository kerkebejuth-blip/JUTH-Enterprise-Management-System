import { BaseAggregateRoot } from './aggregate-root';
import type { IDomainEvent } from './events';

class TestAggregateRoot extends BaseAggregateRoot {
  constructor(id: string) {
    super(id);
  }

  record(event: IDomainEvent): void {
    this.recordDomainEvent(event);
  }
}

describe('BaseAggregateRoot', () => {
  it('records and clears domain events', () => {
    const aggregate = new TestAggregateRoot('aggregate-1');
    const event: IDomainEvent = {
      eventId: 'event-1',
      eventName: 'AggregateChanged',
      eventVersion: 1,
      occurredAt: new Date('2026-08-01T00:00:00.000Z'),
      aggregateId: aggregate.id,
      payload: {},
      metadata: {},
    };

    aggregate.record(event);

    expect(aggregate.domainEvents).toEqual([event]);

    aggregate.clearDomainEvents();

    expect(aggregate.domainEvents).toEqual([]);
  });
});
