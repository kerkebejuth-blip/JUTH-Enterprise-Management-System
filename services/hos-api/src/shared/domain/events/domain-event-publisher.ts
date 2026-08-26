import type { IDomainEvent } from './domain-event.interface';

/** Publishes domain events to an infrastructure-specific event mechanism. */
export interface DomainEventPublisher {
  publish(event: IDomainEvent): Promise<void>;
  publishAll(events: readonly IDomainEvent[]): Promise<void>;
}
