import type { IDomainEvent } from './domain-event.interface';
import type { DomainEventPublisher } from './domain-event-publisher';

/** Dispatches domain events through registered publishers without broker coupling. */
export interface DomainEventDispatcher {
  dispatch(event: IDomainEvent): Promise<void>;
  dispatchAll(events: readonly IDomainEvent[]): Promise<void>;
}

/** Framework-independent dispatcher that delegates to configured publishers. */
export class CompositeDomainEventDispatcher implements DomainEventDispatcher {
  constructor(private readonly publishers: readonly DomainEventPublisher[]) {}

  /** Dispatches one event to every configured publisher. */
  async dispatch(event: IDomainEvent): Promise<void> {
    await Promise.all(
      this.publishers.map((publisher) => publisher.publish(event)),
    );
  }

  /** Dispatches multiple events to every configured publisher. */
  async dispatchAll(events: readonly IDomainEvent[]): Promise<void> {
    await Promise.all(
      this.publishers.map((publisher) => publisher.publishAll(events)),
    );
  }
}
