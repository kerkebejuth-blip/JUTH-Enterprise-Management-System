import { CompositeDomainEventDispatcher } from './domain-event-dispatcher';
import type { IDomainEvent } from './domain-event.interface';
import type { DomainEventPublisher } from './domain-event-publisher';

class CapturingPublisher implements DomainEventPublisher {
  readonly events: IDomainEvent[] = [];

  publish(event: IDomainEvent): Promise<void> {
    this.events.push(event);
    return Promise.resolve();
  }

  publishAll(events: readonly IDomainEvent[]): Promise<void> {
    this.events.push(...events);
    return Promise.resolve();
  }
}

describe('CompositeDomainEventDispatcher', () => {
  const event: IDomainEvent = {
    eventId: 'event-1',
    eventName: 'KernelEventRecorded',
    eventVersion: 1,
    occurredAt: new Date('2026-08-01T00:00:00.000Z'),
    payload: {},
    metadata: {},
  };

  it('dispatches one event to all publishers', async () => {
    const firstPublisher = new CapturingPublisher();
    const secondPublisher = new CapturingPublisher();
    const dispatcher = new CompositeDomainEventDispatcher([
      firstPublisher,
      secondPublisher,
    ]);

    await dispatcher.dispatch(event);

    expect(firstPublisher.events).toEqual([event]);
    expect(secondPublisher.events).toEqual([event]);
  });

  it('dispatches event batches to all publishers', async () => {
    const publisher = new CapturingPublisher();
    const dispatcher = new CompositeDomainEventDispatcher([publisher]);

    await dispatcher.dispatchAll([event]);

    expect(publisher.events).toEqual([event]);
  });
});
